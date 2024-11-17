use candid::{CandidType, Decode, Deserialize, Encode, Principal};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};
use std::collections::HashMap;
use ic_cdk::*;
use ic_cdk::call;
use ic_cdk::{
    api::call::ManualReply, init, post_upgrade, pre_upgrade, query, storage,
    update,
};
use std::collections::{BTreeMap, BTreeSet};


mod eng_auction;
mod dutch_auction;
mod sb_auction;


mod get_eth;
mod get_alchemy;

use get_alchemy::verify_transaction;
use get_alchemy::VerificationResult;
// TYPES START //

type Memory = VirtualMemory<DefaultMemoryImpl>;
type Items = HashMap<AuctionId, ItemDetails>;


type QuestionMap = HashMap<QuestionId, Conversation>;
type ConversationMap = BTreeMap<AuctionId, Vec<u64>>;
type BuyCodes = HashMap<AuctionId, u64>;
type Credits = HashMap<Principal, u64>;


type QuestionId = u64;

// tOdO: 
// type DutchAuctions = HashMap<AuctionId, DutchAuction>; 
// type SbAuctions = HashMap<AuctionId, SbAuction>;
// ...

const MAX_VALUE_SIZE: u32 = 5000;
const IMAGE_SIZE_IN_PIXELS: u32 = 1024;


#[derive(CandidType, Deserialize, Clone)]
pub struct Item {
    title: String,
    description: String,
    // owner: Principal,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct ItemDetails {
    item: Item,
    image: Vec<u8>,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Bid {
    price: u64,
    time: u64,
    originator: Principal,
}

pub type AuctionId = u64;

#[derive(CandidType, Deserialize, Clone)]
pub enum AuctionType {
    English,
    Dutch,
    SealedBid,
}

#[derive(CandidType)]
pub struct AuctionOverview {
    id: AuctionId,
    item: Item,
}

#[derive(CandidType)]
pub struct AuctionDetails {
    item: Item,
    bid_history: Vec<Bid>,
    end_time: u64,
    starting_price: Option<u64>,
    originator: Principal,
    contact: String,
    location: String,
    is_eth: bool,
}

#[derive(CandidType)]
pub struct SbAuctionDetails {
    item: Item,
    bid_history: Vec<Bid>,
    end_time: u64,
    starting_price: Option<u64>,
    originator: Principal,
    contact: String,
    location: String,
    is_eth: bool,
    winner: Option<Principal>,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Auction {
    id: AuctionId,
    item: Item,
    bid_history: Vec<Bid>,
    end_time: u64,
    remaining_time: u64,
    starting_price: Option<u64>,
    originator: Principal,
    contact: String,
    location: String,
    auction_type: AuctionType,
    list_on_site: bool,
    whitelist: bool,
    is_eth: bool,
}

#[derive(CandidType, Deserialize, Clone)]

pub struct DutchAuction {
    id: AuctionId,
    item: Item,
    bid_history: Vec<Bid>,
    end_time: u64,
    remaining_time: u64,
    starting_price: Option<u64>,
    originator: Principal,
    contact: String,
    location: String,
    auction_type: AuctionType,
    winner: Option<Principal>,
    whitelist: bool,
    list_on_site: bool,
    is_eth: bool,
}

#[derive(CandidType, Deserialize, Clone)]

pub struct SbAuction {
    id: AuctionId,
    item: Item,
    bid_history: Vec<Bid>,
    end_time: u64,
    remaining_time: u64,
    starting_price: Option<u64>,
    originator: Principal,
    contact: String,
    location: String,
    auction_type: AuctionType,
    winner: Option<Principal>,
    whitelist: bool,
    list_on_site: bool,
    is_eth: bool,
} 



#[derive(CandidType, Deserialize, Clone)]
pub struct Conversation {
    question: String,
    answer: String,
    originator: Principal,
    is_private: bool,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct CreditTransaction {
    amount: u64,
    timestamp: u64,
    transaction_type: TransactionType,
    from: Principal,
    to: Principal,
}

#[derive(CandidType, Deserialize, Clone)]
pub enum TransactionType {
    Deposit,
    Withdrawal,
    Transfer,
}


//TYPES END //

// TODO
// 
// post and pre upgrade functions and new storage types(refcell)
// type reformatting for each auction type

// 
// 
// 
// 
// 
impl Storable for Auction {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Auction {
    const MAX_SIZE: u32 = MAX_VALUE_SIZE;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for DutchAuction {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for DutchAuction {
    const MAX_SIZE: u32 = MAX_VALUE_SIZE;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for SbAuction {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for SbAuction {
    const MAX_SIZE: u32 = MAX_VALUE_SIZE;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for CreditTransaction {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for CreditTransaction {
    const MAX_SIZE: u32 = MAX_VALUE_SIZE;
    const IS_FIXED_SIZE: bool = false;
}

thread_local! {
    
    // pub static ENGLISH_AUCTION_MAP: RefCell<StableBTreeMap<AuctionId, Auction, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(0)))));            
    // pub static DUTCH_AUCTION_MAP: RefCell<StableBTreeMap<AuctionId, DutchAuction, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(1))))); 
    // pub static SB_AUCTION_MAP: RefCell<StableBTreeMap<AuctionId, SbAuction, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(2)))));
   
    
    pub static ENGLISH_AUCTION_MAP: RefCell<HashMap<AuctionId, Auction>> = RefCell::default();
    pub static DUTCH_AUCTION_MAP: RefCell<HashMap<AuctionId, DutchAuction>> = RefCell::default();
    pub static SB_AUCTION_MAP: RefCell<HashMap<AuctionId, SbAuction>> = RefCell::default();
    
    pub static ITEMS: RefCell<Items> = RefCell::default();
    pub static CONVERSATION_MAP: RefCell<ConversationMap> = RefCell::default();
    pub static QUESTION_MAP: RefCell<QuestionMap> = RefCell::default();
    static BUY_CODE_MAP: RefCell<BuyCodes> = RefCell::default();
    pub static USERNAMES: RefCell<HashMap<Principal, String>> = RefCell::default();
    pub static WHITELIST_MAP: RefCell<HashMap<AuctionId, Vec<Principal>>> = RefCell::default();
    // tOdO:
    // static DUTCH_AUCTION_MAP: RefCell<DutchAuctions> = RefCell::default();
    // static SB_AUCTION_MAP: RefCell<SbAuctions> = RefCell::default();
    // CREDITS
    // USERS
    // SCHEDULED_ENG_AUCTIONS_MAP
    pub static SCHEDULED_ENG_AUCTIONS: RefCell<HashMap<AuctionId, Auction>> = RefCell::default();
    // SCHEDULED_DUTCH_AUCTIONS_MAP
    pub static SCHEDULED_DUTCH_AUCTIONS: RefCell<HashMap<AuctionId, DutchAuction>> = RefCell::default();
    // SCHEDULED_SB_AUCTIONS_MAP
    pub static SCHEDULED_SB_AUCTIONS: RefCell<HashMap<AuctionId, SbAuction>> = RefCell::default();


    pub static CREDITS: RefCell<Credits> = RefCell::default();
    pub static CREDIT_HISTORY: RefCell<HashMap<Principal, Vec<CreditTransaction>>> = RefCell::default();
   
    
}



///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  UPGRADE ///////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///

#[init]
fn init() {
    USERNAMES.with(|users| users.borrow_mut().insert(ic_cdk::api::caller(), String::from("default_username")));
    WHITELIST_MAP.with(|whitelist_map| whitelist_map.borrow_mut().insert(0, Vec::new()));
    SCHEDULED_ENG_AUCTIONS.with(|scheduled_eng_auctions| scheduled_eng_auctions.borrow_mut().insert(0, Auction {
        id: 0,
        item: Item {
            title: String::from("default_title"),
            description: String::from("default_description"),
        },
        bid_history: Vec::new(),
        end_time: 0,
        remaining_time: 0,
        starting_price: None,
        originator: ic_cdk::api::caller(),
        contact: String::from("default_contact"),
        location: String::from("default_location"),
        auction_type: AuctionType::English,
        list_on_site: false,
        whitelist: false,
        is_eth: false,
    }));
}


#[pre_upgrade]

fn pre_upgrade() {

    CREDITS.with(|credits| {
        let credits = credits.borrow();
        if let Err(e) = storage::stable_save((credits.clone(),)) {
            ic_cdk::api::print(format!("Failed to save credits to stable memory: {:?}", e));
        }
    });

    CREDIT_HISTORY.with(|history| {
        let history = history.borrow();
        if let Err(e) = storage::stable_save((history.clone(),)) {
            ic_cdk::api::print(format!("Failed to save credit history to stable memory: {:?}", e));
        }
    });

    ENGLISH_AUCTION_MAP.with(|english_auction_map| {
        let english_auction_map = english_auction_map.borrow();
        if let Err(e) = storage::stable_save((english_auction_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    DUTCH_AUCTION_MAP.with(|dutch_auction_map| {
        let dutch_auction_map = dutch_auction_map.borrow();
        if let Err(e) = storage::stable_save((dutch_auction_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    SB_AUCTION_MAP.with(|sb_auction_map| {
        let sb_auction_map = sb_auction_map.borrow();
        if let Err(e) = storage::stable_save((sb_auction_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    ITEMS.with(|items| {
        let items = items.borrow();
        if let Err(e) = storage::stable_save((items.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    CONVERSATION_MAP.with(|conversation_map| {
        let conversation_map = conversation_map.borrow();
        if let Err(e) = storage::stable_save((conversation_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    QUESTION_MAP.with(|question_map| {
        let question_map = question_map.borrow();
        if let Err(e) = storage::stable_save((question_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    BUY_CODE_MAP.with(|buy_code_map| {
        let buy_code_map = buy_code_map.borrow();
        if let Err(e) = storage::stable_save((buy_code_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });



    USERNAMES.with(|users| {
        let users = users.borrow();
        if let Err(e) = storage::stable_save((users.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    WHITELIST_MAP.with(|whitelist_map| {
        let whitelist_map = whitelist_map.borrow();
        if let Err(e) = storage::stable_save((whitelist_map.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    SCHEDULED_ENG_AUCTIONS.with(|scheduled_eng_auctions| {
        let scheduled_eng_auctions = scheduled_eng_auctions.borrow();
        if let Err(e) = storage::stable_save((scheduled_eng_auctions.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    SCHEDULED_DUTCH_AUCTIONS.with(|scheduled_dutch_auctions| {
        let scheduled_dutch_auctions = scheduled_dutch_auctions.borrow();
        if let Err(e) = storage::stable_save((scheduled_dutch_auctions.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    SCHEDULED_SB_AUCTIONS.with(|scheduled_sb_auctions| {
        let scheduled_sb_auctions = scheduled_sb_auctions.borrow();
        if let Err(e) = storage::stable_save((scheduled_sb_auctions.clone(),)) {
            ic_cdk::api::print(format!("Failed to save stable memory: {:?}", e));
        }
    });

    
}


#[post_upgrade]
fn post_upgrade() {

    match storage::stable_restore::<(HashMap<AuctionId, Auction>,)>() {
        Ok((old_english_auction_map,)) => {
            ENGLISH_AUCTION_MAP.with(|english_auction_map| *english_auction_map.borrow_mut() = old_english_auction_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, DutchAuction>,)>() {
        Ok((old_dutch_auction_map,)) => {
            DUTCH_AUCTION_MAP.with(|dutch_auction_map| *dutch_auction_map.borrow_mut() = old_dutch_auction_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, SbAuction>,)>() {
        Ok((old_sb_auction_map,)) => {
            SB_AUCTION_MAP.with(|sb_auction_map| *sb_auction_map.borrow_mut() = old_sb_auction_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(Items,)>() {
        Ok((old_items,)) => {
            ITEMS.with(|items| *items.borrow_mut() = old_items);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(ConversationMap,)>() {
        Ok((old_conversation_map,)) => {
            CONVERSATION_MAP.with(|conversation_map| *conversation_map.borrow_mut() = old_conversation_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(QuestionMap,)>() {
        Ok((old_question_map,)) => {
            QUESTION_MAP.with(|question_map| *question_map.borrow_mut() = old_question_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(BuyCodes,)>() {
        Ok((old_buy_code_map,)) => {
            BUY_CODE_MAP.with(|buy_code_map| *buy_code_map.borrow_mut() = old_buy_code_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }



    match storage::stable_restore::<(HashMap<Principal, String>,)>() {
        Ok((old_users,)) => {
            USERNAMES.with(|users| *users.borrow_mut() = old_users);

            
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, Vec<Principal>>,)>() {
        Ok((old_whitelist_map,)) => {
            WHITELIST_MAP.with(|whitelist_map| *whitelist_map.borrow_mut() = old_whitelist_map);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, Auction>,)>() {
        Ok((old_scheduled_eng_auctions,)) => {
            SCHEDULED_ENG_AUCTIONS.with(|scheduled_eng_auctions| *scheduled_eng_auctions.borrow_mut() = old_scheduled_eng_auctions);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, DutchAuction>,)>() {
        Ok((old_scheduled_dutch_auctions,)) => {
            SCHEDULED_DUTCH_AUCTIONS.with(|scheduled_dutch_auctions| *scheduled_dutch_auctions.borrow_mut() = old_scheduled_dutch_auctions);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<AuctionId, SbAuction>,)>() {
        Ok((old_scheduled_sb_auctions,)) => {
            SCHEDULED_SB_AUCTIONS.with(|scheduled_sb_auctions| *scheduled_sb_auctions.borrow_mut() = old_scheduled_sb_auctions);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(Credits,)>() {
        Ok((old_credits,)) => {
            CREDITS.with(|credits| *credits.borrow_mut() = old_credits);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore credits from stable memory: {:?}", e));
        }
    }

    match storage::stable_restore::<(HashMap<Principal, Vec<CreditTransaction>>,)>() {
        Ok((old_history,)) => {
            CREDIT_HISTORY.with(|history| *history.borrow_mut() = old_history);
        }
        Err(e) => {
            ic_cdk::api::print(format!("Failed to restore credit history from stable memory: {:?}", e));
        }
    }



}


///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  CREDITS  //////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///


#[ic_cdk::update]
pub async fn add_credits(amount: u64, tx_hash: String) -> Result<(), String> {
    let caller = ic_cdk::caller();
    
    // Verify the transaction first
    let verification = verify_transaction(tx_hash).await;
    
    // Convert the verified amount from Nat to u64
    let verified_amount = u64::try_from(verification.amount.0)
        .map_err(|_| "Amount too large to process".to_string())?;

    if verified_amount != amount {
        return Err(format!("Amount mismatch: expected {}, got {}", amount, verified_amount));
    }

    CREDITS.with(|credits| {
        let mut credits = credits.borrow_mut();
        let new_balance = credits.get(&caller).unwrap_or(&0) + amount;
        credits.insert(caller, new_balance);
    });

    // Record the transaction
    let transaction = CreditTransaction {
        amount,
        timestamp: ic_cdk::api::time(),
        transaction_type: TransactionType::Deposit,
        from: caller,
        to: caller,
    };

    CREDIT_HISTORY.with(|history| {
        let mut history = history.borrow_mut();
        history.entry(caller)
            .or_insert_with(Vec::new)
            .push(transaction);
    });

    Ok(())
}

#[ic_cdk::query]
pub fn get_credit_balance() -> u64 {
    let caller = ic_cdk::caller();
    CREDITS.with(|credits| {
        *credits.borrow().get(&caller).unwrap_or(&0)
    })
}

#[ic_cdk::query]
pub fn get_credit_history() -> Vec<CreditTransaction> {
    let caller = ic_cdk::caller();
    CREDIT_HISTORY.with(|history| {
        history.borrow()
            .get(&caller)
            .cloned()
            .unwrap_or_default()
    })
}

// Transfer credit to another user
#[ic_cdk::update]
pub fn transfer_credit(to: Principal, amount: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();

    CREDITS.with(|credits| -> Result<(), String> {  // Explicitly specify return type
        let mut credits = credits.borrow_mut();
        let caller_balance = credits.get(&caller).unwrap_or(&0);
        
        if *caller_balance < amount {
            return Err(format!(
                "Caller does not have enough credits to transfer. Caller has {} credits, trying to transfer {}", 
                caller_balance, 
                amount
            ));
        }

        let new_caller_balance = *caller_balance - amount;
        credits.insert(caller, new_caller_balance);

        let recipient_balance = credits.get(&to).unwrap_or(&0);
        let new_recipient_balance = *recipient_balance + amount;
        credits.insert(to, new_recipient_balance);

        let transaction = CreditTransaction {
            amount,
            timestamp: ic_cdk::api::time(),
            transaction_type: TransactionType::Transfer,
            from: caller,
            to: to,
        };

        CREDIT_HISTORY.with(|history| {
            let mut history = history.borrow_mut();
            history.entry(caller)
                .or_insert_with(Vec::new)
                .push(transaction.clone());
        });

        CREDIT_HISTORY.with(|history| {
            let mut history = history.borrow_mut();
            history.entry(to)
                .or_insert_with(Vec::new)
                .push(transaction);
        });

        

        Ok(())  // Return Ok if successful
    })
}




///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
///////////////////////// BUY CODE  //////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///

// get secret random number for secure communication between highest bidder and auctioneer
#[ic_cdk::update]
pub async fn random_number() -> u64 {
    let (random_bytes,): (Vec<u8>,) = call(Principal::management_canister(), "raw_rand", ()).await.unwrap();
    let mut number: u32 = 0;
    for i in 0..4 {
        number = (number << 8) | (random_bytes[i] as u32);
    }
    (number % 1_000_000).into()
}

#[ic_cdk::update]
// assign buy code to auction id for secure communication between highest bidder and auctioneer
pub async fn assign_buy_code(auction_id: AuctionId) {
    // if buy code is already assigned, return
    if BUY_CODE_MAP.with(|buy_code_map| buy_code_map.borrow().contains_key(&auction_id)) {
        return;
    }

    let buy_code = random_number().await;
    BUY_CODE_MAP.with(|buy_code_map| {
        buy_code_map.borrow_mut().insert(auction_id, buy_code);
    });
}

#[ic_cdk::query]
// get buy code for auction id
pub fn get_buy_code(auction_id: AuctionId) -> u64 {
    // if caller is not the auction owner nor the highest bidder, return

    BUY_CODE_MAP.with(|buy_code_map| {
        buy_code_map.borrow().get(&auction_id).unwrap().clone()
    })
}

// who_am_i function to get the caller's principal
#[ic_cdk::query]
pub fn who_am_i() -> Principal {
    api::caller()
}




///                                                            ///
///                                                            ///
///                                                            ///
//////////////////////////////////////////////////////////////////
/////////////////////////  USERNAME //////////////////////////////
//////////////////////////////////////////////////////////////////
///                                                            ///
///                                                            ///
///                                                            ///
  
//  TODO: OPT OLAYLARINI YAPMACA

// get_username function to get the username of the caller
#[ic_cdk::query]
pub fn get_username() -> String {
    let caller = api::caller();
    USERNAMES.with(|usernames| {
        usernames.borrow().get(&caller).unwrap().clone()
    })
}

#[ic_cdk::query]
pub fn get_username_by_principal(principal: Principal) -> String {
    USERNAMES.with(|usernames| {
        usernames.borrow().get(&principal).unwrap().clone()
    })
}

// get principle by username function to get the principal of the given username
#[ic_cdk::query]
pub fn get_principal_by_username(username: String) -> Principal {
    USERNAMES.with(|usernames| {
        usernames.borrow().iter().find(|(_, u)| u == &&username).unwrap().0.clone()
    })
}

// set_username function to set the username of the caller
#[ic_cdk::update]
pub fn set_username(username: String) {

    //
    // TODO : 
    //        FONKSIYON  UYGUN ERROR DONDURMELI opt muabbeti
    //
    // if username is already set, return
    let caller = api::caller();

    if USERNAMES.with(|usernames| usernames.borrow().contains_key(&caller)) {
        return;
    }


    // if username is already taken, return
    if USERNAMES.with(|usernames| usernames.borrow().values().any(|u| u == &username)) {
        return;
    }

    USERNAMES.with(|usernames| {
        usernames.borrow_mut().insert(caller, username);
    });
}

// get_all_usernames as vec(string) function to get all usernames
#[ic_cdk::query]
pub fn get_all_usernames() -> Vec<String> {
    USERNAMES.with(|usernames| {
        usernames.borrow().values().cloned().collect()
    })
}


//////////////////////////////////////////////////////////////////
////////////////////// WHITELIST FUNCTIONS ///////////////////////
//////////////////////////////////////////////////////////////////



// #[ic_cdk::update]
// pub fn add_to_whitelist(auction_id: AuctionId, principal: Principal) {
//     WHITELIST_MAP.with(|whitelist_map| {
//         let whitelist = whitelist_map.borrow_mut();
//         let whitelist = whitelist.entry(auction_id).or_insert_with(Vec::new);
//         whitelist.push(principal);
//     });
// }

// #[ic_cdk::update]
// pb fn add_to_whitelist_username(auction_id: AuctionId, username: String) {
//     let principal = get_principal_by_username(username);
//     add_to_whitelist(auction_id, principal);
// }


// #[ic_cdk::update]
// pub fn remove_from_whitelist(auction_id: AuctionId, principal: Principal) {
//     WHITELIST_MAP.with(|whitelist_map| {
//         let whitelist = whitelist_map.borrow_mut();
//         if let Some(whitelist) = whitelist.get_mut(&auction_id) {
//             whitelist.retain(|p| p != &principal);
//         }
//     });
// }

// #[ic_cdk::query]
// pub fn get_whitelist(auction_id: AuctionId) -> Vec<Principal> {
//     WHITELIST_MAP.with(|whitelist_map| {
//         whitelist_map.borrow().get(&auction_id).cloned().unwrap_or_default()
//     })
// }

// #[ic_cdk::query]
// pub fn is_whitelisted(auction_id: AuctionId, principal: Principal) -> bool {
//     WHITELIST_MAP.with(|whitelist_map| {
//         whitelist_map.borrow().get(&auction_id).map(|whitelist| whitelist.contains(&principal)).unwrap_or(false)
//     })
// }






