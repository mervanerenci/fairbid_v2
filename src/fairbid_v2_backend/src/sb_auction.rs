use ic_cdk::*;
use ic_cdk_timers::set_timer;
use std::time::Duration;
use candid::{Principal};
use qrcode_generator::QrCodeEcc;

use crate::{ITEMS, SB_AUCTION_MAP, CONVERSATION_MAP, QUESTION_MAP, SCHEDULED_SB_AUCTIONS, Conversation, SbAuction, Item, ItemDetails, Bid, AuctionId, AuctionOverview, SbAuctionDetails, QuestionId, QuestionMap, AuctionType };
use crate::eng_auction::random_id_eng;
use crate::eng_auction::is_whitelisted;

// FUNCTIONS //

// Create a new auction
// Duration is in seconds
#[ic_cdk::update]
fn new_sb_auction(item: Item, price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool) {
    let item_clone = item.clone();
    SB_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        let id = auction_map.len() as AuctionId;

        let auction = SbAuction {
            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::SealedBid,
            winner: None,
            whitelist: whitelist,
            list_on_site: list_on_site,
            is_eth: is_eth,
        };

        

        // Clone the auction before inserting it into the map
        let auction_clone = auction.clone();
        let auction_id = auction.id;
        auction_map.insert(id, auction_clone);

        ITEMS.with(|items| {
            let mut items_map = items.borrow_mut();
            items_map.insert(auction_id, ItemDetails {
                item: item,
                image: image,
            });
        });

        // Schedule the end_auction function to be called after duration seconds
        set_timer(Duration::from_secs(duration), move || {
            end_sb_auction(auction.id).unwrap();
        });
    });

    
}

 // find the highest value and check if there is multiple highest values
        // if there is no multiple highest values, then assign the winner
#[ic_cdk::update]
fn end_sb_auction(id: AuctionId) -> Result<(), &'static str> {
    if api::caller() != api::id() {
        return Err("Only the canister itself can call this function");
    }
    
    SB_AUCTION_MAP.with(|am| {
        let bids = get_all_bid_values_by_sb_auction_id(id);
        let max_bid = find_max_and_size(bids);
        if let Some((max_bid, count)) = max_bid {

            if count > 1 {
                // get all the highest bid details in a new vector
                let mut highest_bids = Vec::new();
                let bid_history = {
                    let auction_map = am.borrow();
                    if let Some(auction) = auction_map.get(&id) {
                        auction.bid_history.clone()
                    } else {
                        Vec::new()
                    }
                };

                for bid in bid_history.iter() {
                    if bid.price == max_bid {
                        highest_bids.push(bid);
                    }
                }
                // look for time  of each nid in highest_bids vector and find the bid with lowest time, than assign the winner, originator of the bid
                
                let mut lowest_time = highest_bids[0].time;
                let mut originator = highest_bids[0].originator;
                for bid in highest_bids.iter() {
                    if bid.time < lowest_time {
                        lowest_time = bid.time;
                        originator = bid.originator;
                    }
                }

                let mut auction_map = am.borrow_mut();
                if let Some( auction) = auction_map.get_mut(&id) {
                    auction.remaining_time = 0;
                    auction.winner = Some(originator);
                    
                }
                
                
                
            } else {

                let mut auction_map = am.borrow_mut();
                if let Some(auction) = auction_map.get_mut(&id) {

                    let bid_history = auction.bid_history.clone();
                    // find the originator trough max_bid
                    let originator = bid_history.iter().find(|bid| bid.price == max_bid).unwrap().originator;
                    auction.remaining_time = 0;
                    auction.winner = Some(originator);
                    // auction_map.insert(id, auction.clone());
                }
            }
            
        }
        // Ok(())
        // let mut auction_map = am.borrow_mut();
        
 

        // if let Some(mut auction) = auction_map.get(&id).clone() {
        //     auction.remaining_time = 0;
        //     auction_map.insert(id, auction);
        // }
    });

    Ok(())
}

#[ic_cdk::update]
fn make_bid_sb(id: AuctionId, price: u64) -> Result<(), &'static str> {
    SB_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some( auction) = auction_map.get_mut(&id) {
            if auction.remaining_time == 0 {
                return Err("Auction has ended");
            }

            if auction.whitelist {
                if !is_whitelisted(id, api::caller()) {
                    return Err("You are not whitelisted for this auction");
                }
            }

            if price <= auction.starting_price.unwrap() {
                return Err("Bid must be higher than the starting price");
            }

            // if let Some(highest_bid) = auction.bid_history.last() {
            //     if price <= highest_bid.price {
            //         return Err("Bid must be higher than the current highest bid");
            //     }
            // }

            let bid = Bid {
                price: price,
                time: api::time(),
                originator: api::caller(),
            };

            auction.bid_history.push(bid);
            
            Ok(())
        } else {
            Err("Auction not found")
        }
    })
}


///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  SCHEDULE //////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
 

// mustbe only callable buy the canister itself
// update new parameters 


#[ic_cdk::update]
async fn new_sb_auction_s(item: Item, price: u64, duration: u64, contact: String, location: String,  image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, id: u64) {
    ic_cdk::api::print(format!("Starting new_auction_s for auction id: {}", id));
    let item_clone = item.clone();
    SB_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        
        let auction = SbAuction {

            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::SealedBid,
            winner: None,
            whitelist: whitelist,
            list_on_site: list_on_site,
            is_eth: is_eth,
        };

        

        // Clone the auction before inserting it into the map
        let auction_clone = auction.clone();
        let auction_id = auction.id;
        auction_map.insert(id, auction_clone);
        ic_cdk::api::print(format!("Auction id: {} added to ENGLISH_AUCTIONS", id));

        ITEMS.with(|items| {
            let mut items_map = items.borrow_mut();
            items_map.insert(auction_id, ItemDetails {
                item: item,
                image: image,
            });
            ic_cdk::api::print(format!("Item details for auction id: {} added to ITEMS", id));
        });

        

        // Schedule the end_auction function to be called after duration seconds
        set_timer(Duration::from_secs(duration), move || {
            end_sb_auction(auction.id).unwrap();
        });
    });

    ic_cdk::api::print(format!("Completed new_auction_s for auction id: {}", id));
}


#[ic_cdk::update]
async fn schedule_new_sb_auction(item: Item, price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, time: u64) {
    let id = random_id_eng().await ;

    let item_clone = item.clone();
    let contact_clone = contact.clone();
    let location_clone = location.clone(); 

    SCHEDULED_SB_AUCTIONS.with(|am| {
        let mut auction_map = am.borrow_mut();
        


        let auction = SbAuction {

            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::SealedBid,
            winner: None,
            whitelist: whitelist,
            list_on_site: list_on_site,
            is_eth: is_eth,
        };

        

        // Clone the auction before inserting it into the map
        let auction_clone = auction.clone();
        let auction_id = auction.id;
        auction_map.insert(id, auction_clone);

        ITEMS.with(|items| {
            // TODO : check if item is already in the map

            if items.borrow().contains_key(&auction_id) {
                ic_cdk::api::print(format!("Item already exists in the map"));
            }

            let mut items_map = items.borrow_mut();
            items_map.insert(auction_id, ItemDetails {
                item: item.clone(),
                image: image.clone(),
            });
        });

        //time will be calcualted in frontend before passing it to this function

        // Schedule the new_auction_s function to be called after time in seconds
        set_timer(Duration::from_secs(time + 10), {
            ic_cdk::api::print(format!("Executing new_sb_auction_s for auction id: {}", id));
            let contact = contact_clone; // Clone here
            let location = location_clone; // Clone here
            let item = item.clone(); // Clone here
            let image = image.clone(); // Clone here
            move || {
                spawn(async move {
                    ic_cdk::api::print(format!("Executing new_sb_auction_s for auction id: {}", id));
                    ic_cdk::api::print(format!("Executing new_sb_auction_s with these details: {} {} {} {}", price, duration, contact, location));
                    new_sb_auction_s(item, price, duration, contact, location, image, whitelist, list_on_site, is_eth, id).await;
                    ic_cdk::api::print(format!("Executed new_sb_auction_s for auction id: {}", id));
                });
            }
            
        });

        //REMOVE FROM SHCEDULED_AUCTIONS REFCELL 
        set_timer(Duration::from_secs(time), move || {
            ic_cdk::api::print(format!("Removing auction id: {} from scheduled auctions", id));
            remove_from_scheduled_sb_auctions(id);
        });

        
    });


        

    
}

// remove from scheduled auctions
#[ic_cdk::update]
fn remove_from_scheduled_sb_auctions(id: u64) {
    SCHEDULED_SB_AUCTIONS.with(|sa| {
        let mut scheduled_auctions = sa.borrow_mut();
        scheduled_auctions.remove(&id);
    });
}



///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  GETTERS ///////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///



#[ic_cdk::query]
fn get_sb_auction_details(id: AuctionId) -> Option<SbAuctionDetails> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| SbAuctionDetails {
            item: auction.item.clone(),
            bid_history: auction.bid_history.clone(),
            end_time: auction.end_time,
            starting_price: auction.starting_price,
            originator: auction.originator,
            contact: auction.contact.clone(),
            location: auction.location.clone(),
            is_eth: auction.is_eth,
            winner: auction.winner,
        })
    })
}


#[ic_cdk::query]
fn get_sb_auction(id: AuctionId) -> Option<SbAuction> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_sb_auction_originator(id: AuctionId) -> Option<Principal> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.originator)
    })
}



// #[ic_cdk::query]
// fn get_sb_item_image(id: AuctionId) -> Vec<u8> {
//     ITEMS.with(|items| {
//         let items_map = items.borrow();
//         items_map.get(&id).map(|item| item.image.clone()).unwrap()
//     })
// }

#[ic_cdk::query]
fn get_all_sb_auctions_by_originator() -> Vec<SbAuction> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .filter(|(_, auction)| auction.originator == api::caller())
            .map(|(_, auction)| auction.clone())
            .collect()
    })
}

#[ic_cdk::query]
fn get_active_sb_auctions() -> Vec<AuctionOverview> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .filter(|(_, auction)| auction.remaining_time > 0)
            .map(|(id, auction)| AuctionOverview {
                id: *id, // remove the dereference operator here
                item: auction.item.clone(),
            })
            .collect()
    })
}

#[ic_cdk::query]
fn get_remaining_time_sb(id: AuctionId) -> Option<u64> {

    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction|

            if auction.remaining_time == 0 {
                0
            } else {
                auction.end_time - api::time()
            }
            
            )

    })
}


#[ic_cdk::query]
fn get_sb_overview_list() -> Vec<AuctionOverview> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .map(|(id, auction)| AuctionOverview {
                id: *id, // remove the dereference operator here
                item: auction.item.clone(),
            })
            .collect()
    })
}


#[ic_cdk::query]
fn get_all_bid_values_by_sb_auction_id(id: AuctionId) -> Vec<u64> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.bid_history.iter().map(|bid| bid.price).collect()
        } else {
            Vec::new()
        }
    })
}

#[ic_cdk::query]
fn get_all_sb_bids_by_auction_id(id: AuctionId) -> Vec<Bid> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.bid_history.clone()
        } else {
            Vec::new()
        }
    })
}

#[ic_cdk::query]
fn get_sb_winner_by_auction_id(id: AuctionId) -> Option<Principal> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.winner
        } else {
            None
        }
    })
}

#[ic_cdk::query]
fn get_ended_sb_auctions() -> Vec<AuctionOverview> {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .filter(|(_, auction)| auction.remaining_time == 0)
            .map(|(id, auction)| AuctionOverview {
                id: *id, // remove the dereference operator here
                item: auction.item.clone(),
            })
            .collect()
    })
}

// get scheduled auctions
#[ic_cdk::query]
fn get_scheduled_sb_auction(id: AuctionId) -> Option<SbAuction> {
    SCHEDULED_SB_AUCTIONS.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_all_scheduled_sb_auctions() -> Vec<AuctionOverview> {
    SCHEDULED_SB_AUCTIONS.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .map(|(id, auction)| AuctionOverview {
                id: *id, // remove the dereference operator here
                item: auction.item.clone(),
            })
            .collect()
    })
}

#[ic_cdk::query]
fn get_sb_auction_is_eth(id: AuctionId) -> bool {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.is_eth).unwrap_or(false)
    })
}



////////////////

fn find_max_and_size(numbers: Vec<u64>) -> Option<(u64, usize)> {
    if numbers.is_empty() {
        None
    } else {
        let max = *numbers.iter().max().unwrap();
        let count = numbers.iter().filter(|&&x| x == max).count();
        Some((max, count))
    }
}

#[ic_cdk::update]
fn quick_end_auction(id: AuctionId)  {
    set_timer(Duration::from_secs(3), move || {
        end_sb_auction(id).unwrap();
    });
}

#[ic_cdk::query]
pub fn is_listed_sb(id: AuctionId) -> bool {
    SB_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.list_on_site
        } else {
            false
        }
    })
}   