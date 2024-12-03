
// balance
use b3_utils::ledger::{ICRCAccount, ICRC1};
use candid::Principal;

// transfer
use b3_utils::ledger::{ICRC1TransferArgs, ICRC1TransferResult};
use std::str::FromStr;

// approve
use b3_utils::ledger::{ICRC2ApproveArgs, ICRC2ApproveResult, ICRC2};


// withdraw
use candid::{CandidType, Deserialize};
use b3_utils::api::{InterCall, CallCycles};

use candid::Nat;


use crate::CREDITS;

const LEDGER: &str = "apia6-jaaaa-aaaar-qabma-cai";
const MINTER: &str = "jzenf-aiaaa-aaaar-qaa7q-cai";


#[derive(CandidType, Deserialize)]
pub struct WithdrawalArg {
    pub amount: Nat,
    pub recipient: String,
    pub from_subaccount: Option<Vec<u8>>,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct RetrieveEthRequest {
    pub block_index: Nat,
}

#[derive(CandidType, Deserialize, Debug)]
pub enum WithdrawalError {
    AmountTooLow { min_withdrawal_amount: Nat },
    InsufficientFunds { balance: Nat },
    InsufficientAllowance { allowance: Nat },
    TemporarilyUnavailable(String),
}

type WithdrawalResult = Result<RetrieveEthRequest, WithdrawalError>;


#[ic_cdk::update]
async fn withdraw(amount: Nat, recipient: String) -> WithdrawalResult {
    // TODO: check if the caller has enough credits
    
    // CREDITS.with(|c| {
    //     let credits = c.borrow();
    //     let balance = credits.get_balance(ic_cdk::caller());
    // });

    // if balance < amount {
    //     return Err(WithdrawalError::InsufficientFunds { balance });
    // }

    let withdraw_arg = WithdrawalArg {
        amount,
        recipient,
        from_subaccount: None,
    };

    InterCall::from(MINTER)
        .call("withdraw_eth", withdraw_arg, CallCycles::NoPay)
        .await
        .unwrap()
}


#[ic_cdk::update]
async fn balance() -> Nat {
    let account = ICRCAccount::new(ic_cdk::id(), None);

    ICRC1::from(LEDGER).balance_of(account).await.unwrap()
}

#[ic_cdk::update]
async fn transfer(to: String, amount: Nat) -> ICRC1TransferResult {
    let to = ICRCAccount::from_str(&to).unwrap();

    let transfer_args = ICRC1TransferArgs {
        to,
        amount,
        from_subaccount: None,
        fee: None,
        memo: None,
        created_at_time: None,
    };

    ICRC1::from(LEDGER).transfer(transfer_args).await.unwrap()
}

#[ic_cdk::update]
async fn approve(amount: Nat) -> ICRC2ApproveResult {
    let minter = Principal::from_text(&MINTER).unwrap();

    let spender = ICRCAccount::new(minter, None);

    let args = ICRC2ApproveArgs {
        amount,
        spender,
        created_at_time: None,
        expected_allowance: None,
        expires_at: None,
        fee: None,
        memo: None,
        from_subaccount: None,
    };

    ICRC2::from(LEDGER).approve(args).await.unwrap()
}

// Export -----------------------------
// ic_cdk::export_candid!();
