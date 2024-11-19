use ic_cdk::*;
use ic_cdk_timers::set_timer;
use std::time::Duration;
use candid::{Principal};
use qrcode_generator::QrCodeEcc;
use ic_cdk::spawn;


use crate::{ITEMS, ENGLISH_AUCTION_MAP, CONVERSATION_MAP, QUESTION_MAP, SCHEDULED_ENG_AUCTIONS, WHITELIST_MAP ,Conversation, Auction, Item, ItemDetails, Bid, AuctionId, AuctionOverview, AuctionDetails, QuestionId, QuestionMap, AuctionType };


// FUNCTIONS //

// Create a new auction
// Duration is in seconds

// list_on_site is a boolean value that determines if the auction is listed on the site or not
// whitelist boolean value that determines if the auction has a whitelisted or not

#[ic_cdk::update]
async fn new_auction(item: Item, price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool) {
    // add whitelist and list_on_site to the function signature
    let item_clone = item.clone();
    let id = random_id_eng().await;
    ENGLISH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        

        let auction = Auction {
            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::English,
            whitelist: whitelist,
            list_on_site: list_on_site,
            is_eth: is_eth,
        };

        

        // Clone the auction before inserting it into the map
        let auction_clone = auction.clone();
        let auction_id = auction.id;
        auction_map.insert(id, auction_clone);

        // if whitelist is true, add the auction to the whitelist map with originator as first member
        if whitelist {
            WHITELIST_MAP.with(|wa| {
                let mut whitelist_map = wa.borrow_mut();
                whitelist_map.insert(id,  vec![api::caller()]);
            });
        }


        ITEMS.with(|items| {
            let mut items_map = items.borrow_mut();
            items_map.insert(auction_id, ItemDetails {
                item: item,
                image: image,
            });
        });

        // Schedule the end_auction function to be called after duration seconds
        set_timer(Duration::from_secs(duration), move || {
            end_auction(auction.id).unwrap();
        });
    });

    
}



#[ic_cdk::update]
fn end_auction(id: AuctionId) -> Result<(), &'static str> {
    if api::caller() != api::id() {
        return Err("Only the canister itself can call this function");
    }

    ENGLISH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some( auction) = auction_map.get_mut(&id) {
            auction.remaining_time = 0;
            
        }
    });

    Ok(())
}

#[ic_cdk::update]
fn make_bid(id: AuctionId, price: u64) -> Result<(), &'static str> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        if let Some( auction) = auction_map.get_mut(&id) {
            if auction.remaining_time == 0 {
                return Err("Auction has ended");
            }

            // if api::caller() == auction.originator {
            //     return Err("Originator cannot bid on their own auction");
            // }

             if auction.whitelist {
                if !is_whitelisted(id, api::caller()) {
                    return Err("You are not whitelisted for this auction");
                }
            }


            if price <= auction.starting_price.unwrap() {
                return Err("Bid must be higher than the starting price");
            }

            if let Some(highest_bid) = auction.bid_history.last() {
                if price <= highest_bid.price {
                    return Err("Bid must be higher than the current highest bid");
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
async fn new_auction_s(item: Item, price: u64, duration: u64, contact: String, location: String,  image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, id: u64) {
    ic_cdk::api::print(format!("Starting new_auction_s for auction id: {}", id));
    let item_clone = item.clone();
    ENGLISH_AUCTION_MAP.with(|am| {
        let mut auction_map = am.borrow_mut();
        
        let auction = Auction {
            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact,
            location: location,
            auction_type: AuctionType::English,
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
            end_auction(auction.id).unwrap();
        });
    });

    ic_cdk::api::print(format!("Completed new_auction_s for auction id: {}", id));
}


#[ic_cdk::update]
async fn schedule_new_auction(item: Item, price: u64, duration: u64, contact: String, location: String, image: Vec<u8>, whitelist: bool, list_on_site: bool, is_eth: bool, time: u64) {
    let id = random_id_eng().await ;

    let item_clone = item.clone();
    SCHEDULED_ENG_AUCTIONS.with(|am| {
        let mut auction_map = am.borrow_mut();
        


        let auction = Auction {
            id: id,
            item: item_clone,
            bid_history: Vec::new(),
            end_time: api::time() + duration * 1_000_000_000,
            remaining_time: duration,
            starting_price: Some(price),
            originator: api::caller(),
            contact: contact.clone(),
            location: location.clone(),
            auction_type: AuctionType::English,
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
            ic_cdk::api::print(format!("Executing new_auction_s for auction id: {}", id));
            let contact = contact.clone(); // Clone here
            let location = location.clone(); // Clone here
            let item = item.clone(); // Clone here
            let image = image.clone(); // Clone here
            move || {
                spawn(async move {
                    ic_cdk::api::print(format!("Executing new_auction_s for auction id: {}", id));
                    ic_cdk::api::print(format!("Executing new_auction_s with these details: {} {} {} {}", price, duration, contact, location));
                    new_auction_s(item, price, duration, contact, location, image, whitelist, list_on_site, is_eth, id).await;
                    ic_cdk::api::print(format!("Executed new_auction_s for auction id: {}", id));
                });
            }
            
        });

        //REMOVE FROM SHCEDULED_AUCTIONS REFCELL 
        set_timer(Duration::from_secs(time), move || {
            ic_cdk::api::print(format!("Removing auction id: {} from scheduled auctions", id));
            remove_from_scheduled_auctions(id);
        });

        
    });


        

    
}

// remove from scheduled auctions
#[ic_cdk::update]
fn remove_from_scheduled_auctions(id: u64) {
    SCHEDULED_ENG_AUCTIONS.with(|sa| {
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
fn get_auction(id: AuctionId) -> Option<Auction> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_all_auctions_by_originator() -> Vec<Auction> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .iter()
            .filter(|(_, auction)| auction.originator == api::caller())
            .map(|(_, auction)| auction.clone())
            .collect()
    })
}

#[ic_cdk::query]
fn get_auction_details(id: AuctionId) -> Option<AuctionDetails> {
    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_auction_originator(id: AuctionId) -> Option<Principal> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.originator)
    })
}

#[ic_cdk::query]
fn get_item_image(id: AuctionId) -> Vec<u8> {
    ITEMS.with(|items| {
        let items_map = items.borrow();
        items_map.get(&id).map(|item| item.image.clone()).unwrap()
    })
}


// Returns in Nanoseconds
#[ic_cdk::query]
fn get_remaining_time(id: AuctionId) -> Option<u64> {

    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_overview_list() -> Vec<AuctionOverview> {
    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_active_auctions() -> Vec<AuctionOverview> {
    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_ended_auctions() -> Vec<AuctionOverview> {
    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_all_auctions() -> Vec<AuctionOverview> {
    ENGLISH_AUCTION_MAP.with(|am| {
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
fn get_highest_bid_details(id: AuctionId) -> Option<Bid> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .get(&id)
            .and_then(|auction| auction.bid_history.last().map(|bid| bid.clone()))
    })
}

// get highest bidder's principal id
#[ic_cdk::query]
fn get_highest_bidder(id: AuctionId) -> Option<Principal> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map
            .get(&id)
            .and_then(|auction| auction.bid_history.last().map(|bid| bid.originator.clone()))
    })
}

// delete the Option part if error persists
#[ic_cdk::query]
fn get_all_bids(id: AuctionId) -> Option<Vec<Bid>> {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.bid_history.clone())
    })
}

// get scheduled auctions
#[ic_cdk::query]
fn get_scheduled_auction(id: AuctionId) -> Option<Auction> {
    SCHEDULED_ENG_AUCTIONS.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).cloned()
    })
}

#[ic_cdk::query]
fn get_all_scheduled_auctions() -> Vec<AuctionOverview> {
    SCHEDULED_ENG_AUCTIONS.with(|am| {
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


// #[ic_cdk::query]
// fn get_highest_bid(id: AuctionId) -> Option<u64> {
//     AUCTION_MAP.with(|am| {
//         let auction_map = am.borrow();
//         auction_map
//             .get(&id)
//             .and_then(|auction| auction.bid_history.last().map(|bid| bid.price))
//     })
// }




///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  WHITELIST /////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///


#[ic_cdk::update]
pub fn add_to_whitelist(auction_id: AuctionId, principal: Principal) {
    WHITELIST_MAP.with(|whitelist_map| {
        let mut whitelist = whitelist_map.borrow_mut();
        let whitelist = whitelist.entry(auction_id).or_insert_with(Vec::new);
        whitelist.push(principal);
    });
}

#[ic_cdk::update]
pub fn remove_from_whitelist(auction_id: AuctionId, principal: Principal) {
    WHITELIST_MAP.with(|whitelist_map| {
        let mut whitelist = whitelist_map.borrow_mut();
        if let Some(whitelist) = whitelist.get_mut(&auction_id) {
            whitelist.retain(|&x| x != principal);
        }
    });
}

#[ic_cdk::query]
pub fn get_whitelist(auction_id: AuctionId) -> Vec<Principal> {
    WHITELIST_MAP.with(|whitelist_map| {
        let whitelist = whitelist_map.borrow();
        whitelist.get(&auction_id).cloned().unwrap_or_default()
    })
}

#[ic_cdk::query]
pub fn is_whitelisted(auction_id: AuctionId, principal: Principal) -> bool {
    WHITELIST_MAP.with(|whitelist_map| {
        let whitelist = whitelist_map.borrow();
        if let Some(whitelist) = whitelist.get(&auction_id) {
            whitelist.contains(&principal)
        } else {
            false
        }
    })
}

#[ic_cdk::query]
fn get_auction_is_eth(id: AuctionId) -> bool {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        auction_map.get(&id).map(|auction| auction.is_eth).unwrap_or(false)
    })
}


///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
////////////////////// Q&A FUNCTIONS /////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///

// ask for an item
#[ic_cdk::update]
fn ask_question(id: AuctionId, question: String) {
    // record question to question map
    QUESTION_MAP.with(|qm| {
        let mut question_map = qm.borrow_mut();
        let _id = question_map.len() as QuestionId;

        let question = Conversation {
            question: question,
            answer: "".to_string(),
            originator: api::caller(),
            is_private: true,
        };

        question_map.insert(_id, question.clone());

        // add questions id to Conversation (AuctionId,Vec<u64> )map(u64-vec<u64>)
        CONVERSATION_MAP.with(|cm| {
            let mut conversation_map = cm.borrow_mut();
            if let Some(question_ids) = conversation_map.get_mut(&id) {
                question_ids.push(_id);
            } else {
                conversation_map.insert(id, vec![_id]);
            }
        });
    });
}

// answer a question
#[ic_cdk::update]
fn answer_question(id: u64, answer: String) {
    QUESTION_MAP.with(|qm| {
        let mut question_map = qm.borrow_mut();
        if let Some(question) = question_map.get(&id).cloned() {
            let mut question = question;
            question.answer = answer;
            question.is_private = false;
            question_map.insert(id, question);
        }
    });
}

//answer a question privately
#[ic_cdk::update]
fn answer_question_private(id: u64, answer: String) {
    QUESTION_MAP.with(|qm| {
        let mut question_map = qm.borrow_mut();
        if let Some(question) = question_map.get(&id).cloned() {
            let mut question = question;
            question.answer = answer;
            question_map.insert(id, question);
        }
    });
}


#[ic_cdk::query]
fn get_questions(id: u64) -> Vec<Conversation> {
    let mut questions = Vec::new();
    let mut question_ids = Vec::new();
    question_ids = get_question_ids_by_auction_id(id);

    questions = get_questions_by_ids(question_ids);

    questions
        
}

// get question by its id 
#[ic_cdk::query]
fn get_question(id: u64) -> Option<Conversation> {
    QUESTION_MAP.with(|qm| {
        let question_map = qm.borrow();
        question_map.get(&id).cloned()
    })
}


// get questions by auction id
#[ic_cdk::query]
fn get_question_ids_by_auction_id(id: u64) -> Vec<u64> {
    let mut question_ids = Vec::new();

    // Access the CONVERSATION_MAP using the provided id
    CONVERSATION_MAP.with(|cm| {
        let conversation_map = cm.borrow();

        // If the id exists in the CONVERSATION_MAP, get the vector of question ids
        if let Some(ids) = conversation_map.get(&id) {
            question_ids = ids.clone();
        }
    });

    question_ids
}

#[ic_cdk::query]
fn get_questions_by_ids(ids: Vec<u64>) -> Vec<Conversation> {
    let mut conversations = Vec::new();

    // For each id in the vector, access the QUESTION_MAP and get the Conversation
    QUESTION_MAP.with(|qm| {
        let question_map = qm.borrow();
        for id in ids {
            if let Some(conversation) = question_map.get(&id) {
                conversations.push(conversation.clone());
            }
        }
    });

    conversations
}



// delete a question
#[ic_cdk::update]
fn delete_question(id: u64) {
    CONVERSATION_MAP.with(|am| {
        let mut ask_map = am.borrow_mut();
        ask_map.remove(&id);
    });
}


///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  HELPERS ///////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
///                                                            ///
 
 
 

#[ic_cdk::update]
fn get_qr_code(string: String ) -> Vec<u8> {
    let result: Vec<u8> = qrcode_generator::to_png_to_vec(string, QrCodeEcc::Low, 1024).unwrap();
    result
}


// get secret random number for secure communication between highest bidder and auctioneer
#[ic_cdk::update]
pub async fn random_id_eng() -> u64 {
    let (random_bytes,): (Vec<u8>,) = call(Principal::management_canister(), "raw_rand", ()).await.unwrap();
    let mut number: u32 = 0;
    for i in 0..4 {
        number = (number << 8) | (random_bytes[i] as u32);
    }
    (number % 1_000_000).into()
}

#[ic_cdk::query]
pub fn is_listed_eng(id: AuctionId) -> bool {
    ENGLISH_AUCTION_MAP.with(|am| {
        let auction_map = am.borrow();
        if let Some(auction) = auction_map.get(&id) {
            auction.list_on_site
        } else {
            false
        }
    })
}   


// http call to convert local currency to usd, using convert.rs http call
// #[ic_cdk::update]
// async fn get_conversion_to_usd(from: String, amount: f64) -> String {
//     let conversion = convert::convert_to_usd(from, amount).await;
//     conversion
// }
