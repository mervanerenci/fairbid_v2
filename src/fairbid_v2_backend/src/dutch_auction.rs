use ic_cdk::*;
use ic_cdk_timers::set_timer;
use std::time::Duration;
use candid::{Principal};
use qrcode_generator::QrCodeEcc;
use ic_cdk::spawn;

use crate::{ITEMS, DUTCH_AUCTION_MAP, CONVERSATION_MAP, QUESTION_MAP, SCHEDULED_DUTCH_AUCTIONS, WHITELIST_MAP, Conversation, DutchAuction, Item, ItemDetails, Bid, AuctionId, AuctionOverview, AuctionDetails, QuestionId, QuestionMap, AuctionType, };
use crate::eng_auction::random_id_eng;
use crate::eng_auction::is_whitelisted;

#[ic_cdk::update]

fn new_dutch_auction(item: Item,  price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool) {
    let item_clone = item.clone();
    DUTCH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        let id = auction_map.len() as AuctionId;

        let auction = DutchAuction {

            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::Dutch,
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
            end_dutch_auction(auction.id).unwrap();
        });
    });

}

#[ic_cdk::update]
fn lower_price(id: AuctionId, price: u64) -> Result<(), &'static str>{
    DUTCH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some( auction) = auction_map.get_mut(&id) {
            if auction.remaining_time == 0 {
                return Err("Auction has ended");
            }

            if price >= auction.starting_price.unwrap() {
                return Err("Bid must be LOWER than the starting price");
            }

            if let Some(highest_bid) = auction.bid_history.last() {
                if price >= highest_bid.price {
                    return Err("Bid must be lower than the current highest bid");
                }
            }

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


// Allows bidders to accept the current price and complete the transaction.
#[ic_cdk::update]
fn accept_price(id: AuctionId) -> Result<(), &'static str> {
    

    DUTCH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some( auction) = auction_map.get_mut(&id) {
            
            if auction.whitelist {
                if !is_whitelisted(id, api::caller()) {
                    return Err("You are not whitelisted for this auction");
                }
            }

            if auction.remaining_time == 0 {
                return Err("Auction has ended");
            }

            if let Some(_highest_bid) = auction.bid_history.last() {
                let winner = api::caller();
                auction.winner = Some(winner);

                // Clone the auction object to move it into the closure
                let auction_clone = auction.clone();

                // Schedule the end_auction function to be called after duration seconds
                set_timer(Duration::from_secs(3), move || {
                    end_dutch_auction(auction_clone.id).unwrap();
                });

                Ok(())
            } else {
                Err("No bids have been placed")
            }
        } else {
            Err("Auction not found")
        }
    })
}

#[ic_cdk::update]
fn end_dutch_auction(id: AuctionId) -> Result<(), &'static str> {
    if api::caller() != api::id() {
        return Err("Only the canister itself can call this function");
    }

    DUTCH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some(auction) = auction_map.get_mut(&id) {
            auction.remaining_time = 0;
            
        }
    });

    Ok(())
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
async fn new_dutch_auction_s(item: Item, price: u64, duration: u64, contact: String, location: String,  image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, id: u64) {
    ic_cdk::api::print(format!("Starting new_auction_s for auction id: {}", id));
    let item_clone = item.clone();
    DUTCH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        
        let auction = DutchAuction {

            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::Dutch,
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
            end_dutch_auction(auction.id).unwrap();
        });
    });

    ic_cdk::api::print(format!("Completed new_auction_s for auction id: {}", id));
}


#[ic_cdk::update]
async fn schedule_new_dutch_auction(item: Item, price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, time: u64) {
    let id = random_id_eng().await ;

    let item_clone = item.clone();
    let contact_clone = contact.clone();
    let location_clone = location.clone(); 

    SCHEDULED_DUTCH_AUCTIONS.with(|am| {
        let mut auction_map = am.borrow_mut();
        


        let auction = DutchAuction {

            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::Dutch,
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
            let mut items_map = items.borrow_mut();
            items_map.insert(auction_id, ItemDetails {
                item: item.clone(),
                image: image.clone(),
            });
        });

        //time will be calcualted in frontend before passing it to this function

        // Schedule the new_auction_s function to be called after time in seconds
        set_timer(Duration::from_secs(time + 10), {
            ic_cdk::api::print(format!("Executing new_dutch_auction_s for auction id: {}", id));
            let contact = contact_clone; // Clone here
            let location = location_clone; // Clone here
            let item = item.clone(); // Clone here
            let image = image.clone(); // Clone here
            move || {
                spawn(async move {
                    ic_cdk::api::print(format!("Executing new_dutch_auction_s for auction id: {}", id));
                    ic_cdk::api::print(format!("Executing new_dutch_auction_s with these details: {} {} {} {}", price, duration, contact, location));
                    new_dutch_auction_s(item, price, duration, contact, location, image, whitelist, list_on_site, is_eth, id).await;
                    ic_cdk::api::print(format!("Executed new_dutch_auction_s for auction id: {}", id));
                });
            }
            
        });

        //REMOVE FROM SHCEDULED_AUCTIONS REFCELL 
        set_timer(Duration::from_secs(time), move || {
            ic_cdk::api::print(format!("Removing auction id: {} from scheduled auctions", id));
            remove_from_scheduled_dutch_auctions(id);
        });

        
    });


        

    
}

// remove from scheduled auctions
#[ic_cdk::update]
fn remove_from_scheduled_dutch_auctions(id: u64) {
    SCHEDULED_DUTCH_AUCTIONS.with(|sa| {
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
fn get_dutch_auction_details(id: AuctionId) -> Option<AuctionDetails> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| AuctionDetails {
            item: auction.item.clone(),
            bid_history: auction.bid_history.clone(),
            end_time: auction.end_time,
            starting_price: auction.starting_price,
            originator: auction.originator,
            contact: auction.contact.clone(),
            location: auction.location.clone(),
            is_eth: auction.is_eth,
           
        })
    })
}

#[ic_cdk::query]
fn get_dutch_auction(id: AuctionId) -> Option<DutchAuction> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_current_bid_dutch(id: AuctionId) -> Option<u64> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).and_then(|auction| auction.bid_history.last().map(|bid| bid.price))
    })
}

#[ic_cdk::query]
fn get_active_dutch_auctions() -> Vec<AuctionOverview> {
    DUTCH_AUCTION_MAP.with(|am| {
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
fn get_all_bids_by_dutch_auction_id(id: AuctionId) -> Vec<Bid> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.bid_history.clone()
        } else {
            Vec::new()
        }
    })
}


#[ic_cdk::query]
fn get_ended_dutch_auctions() -> Vec<AuctionOverview> {
    DUTCH_AUCTION_MAP.with(|am| {
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

#[ic_cdk::query]
fn get_dutch_overview_list() -> Vec<AuctionOverview> {
    DUTCH_AUCTION_MAP.with(|am| {
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
fn get_dutch_auction_originator(id: AuctionId) -> Option<Principal> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.originator)
    })
}

#[ic_cdk::query]
fn get_all_dutch_auctions_by_originator() -> Vec<DutchAuction> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .filter(|(_, auction)| auction.originator == api::caller())
            .map(|(_, auction)| auction.clone())
            .collect()
    })
}

#[ic_cdk::query]
fn get_remaining_time_dutch(id: AuctionId) -> Option<u64> {

    DUTCH_AUCTION_MAP.with(|am| {
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
fn get_all_dutch_bids_by_auction_id(id: AuctionId) -> Vec<Bid> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.bid_history.clone()
        } else {
            Vec::new()
        }
    })
}

#[ic_cdk::query]
fn get_dutch_winner_by_auction_id(id: AuctionId) -> Option<Principal> {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.winner
        } else {
            None
        }
    })
}


#[ic_cdk::query]
pub fn is_listed_dutch(id: AuctionId) -> bool {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.list_on_site
        } else {
            false
        }
    })
}   



// get scheduled auctions
#[ic_cdk::query]
fn get_scheduled_dutch_auction(id: AuctionId) -> Option<DutchAuction> {
    SCHEDULED_DUTCH_AUCTIONS.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_all_scheduled_dutch_auctions() -> Vec<AuctionOverview> {
    SCHEDULED_DUTCH_AUCTIONS.with(|am| {
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
fn get_dutch_auction_is_eth(id: AuctionId) -> bool {
    DUTCH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.is_eth).unwrap_or(false)
    })
}

// #[ic_cdk::query]


// #[ic_cdk::query]