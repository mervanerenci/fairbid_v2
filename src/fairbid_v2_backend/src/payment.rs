// use b3_utils::{vec_to_hex_string_with_0x, Subaccount};
// use ic_cdk::api::call::call_with_payment128;
// use candid::Principal;
// // Import the structs from the crate
// use evm_rpc_canister_types::{
//     BlockTag, GetBlockByNumberResult, GetLogsArgs, GetLogsResult, HttpOutcallError,
//     MultiGetBlockByNumberResult, MultiGetLogsResult, RejectionCode, RpcError,  
//     MultiGetTransactionReceiptResult, GetTransactionReceiptResult,  RpcServices,
//     Block,  
// };
// use evm_rpc_canister_types::EthSepoliaService;
// use candid::Nat;
// use b3_utils::hex_string_with_0x_to_nat;
// use candid::CandidType;
// use candid::Deserialize;

// const MINTER_ADDRESS: &str = "0xb44b5e756a894775fc32eddf3314bb1b1944dc34";

// #[derive(CandidType, Deserialize, Clone, Debug)]
// pub struct Transaction {
//     pub hash: String,
//     pub nonce: u64,
//     pub block_hash: Option<String>,
//     pub block_number: Option<u64>,
//     pub transaction_index: Option<u64>,
//     pub from: String,
//     pub to: Option<String>,
//     pub value: u128,
//     pub gas_price: u64,
//     pub gas: u64,
//     pub input: String,
//     pub v: u64,
//     pub r: String,
//     pub s: String,
// }

// #[derive(CandidType, Deserialize)]
// pub struct VerifiedTransactionDetails {
//     pub from: String,
//     pub amount: Nat,
    
// }

// #[ic_cdk::update]
// async fn get_latest_sepolia_block() -> Result<Block, String> {
//     // Select RPC services for Sepolia
//     let services = RpcServices::EthSepolia(Some(vec![
//         EthSepoliaService::Alchemy,
//         EthSepoliaService::BlockPi,
//         EthSepoliaService::Ankr,
//     ]));

//     // Call `eth_getBlockByNumber` RPC method
//     let result: Result<(MultiGetBlockByNumberResult,), _> = EVM_RPC
//         .eth_get_block_by_number(
//             services,
//             None,
//             BlockTag::Latest,
//             10_000_000_000, // cycles
//         )
//         .await
//         .map_err(|e| format!("Failed to call eth_getBlockByNumber: {:?}", e));

//     match result {
//         Ok((MultiGetBlockByNumberResult::Consistent(GetBlockByNumberResult::Ok(block)),)) => Ok(block),
//         Ok((MultiGetBlockByNumberResult::Consistent(GetBlockByNumberResult::Err(error)),)) => {
//             Err(format!("Error: {:?}", error))
//         }
//         Ok((MultiGetBlockByNumberResult::Inconsistent(_),)) => {
//             Err("Inconsistent results".to_string())
//         }
//         Err(e) => Err(format!("Error calling EVM_RPC: {}", e)),
//     }
// }




// #[ic_cdk::update]
// async fn verify_transaction(hash: String) -> VerifiedTransactionDetails {
//     // Get the transaction receipt
//     let receipt_result = match eth_get_transaction_receipt(hash).await {
//         Ok(receipt) => receipt,
//         Err(e) => panic!("Failed to get receipt: {}", e),
//     };

//     // Ensure the transaction was successful
//     let receipt = match receipt_result {
//         GetTransactionReceiptResult::Ok(Some(receipt)) => receipt,
//         GetTransactionReceiptResult::Ok(None) => panic!("Receipt is None"),
//         GetTransactionReceiptResult::Err(e) => {
//             panic!("Error on Get transaction receipt result: {:?}", e)
//         }
//     };

//     // Check if the status indicates success (Nat 1)
//     let success_status = Nat::from(1u8);
//     if receipt.status != success_status {
//         panic!("Transaction failed");
//     }

//     // Verify the 'to' address matches the minter address
//     if receipt.to != MINTER_ADDRESS {
//         panic!("Minter address does not match");
//     }

//     let deposit_principal = canister_deposit_principal();

//     // Verify the principal in the logs matches the deposit principal
//     let log_principal = receipt
//         .logs
//         .iter()
//         .find(|log| log.topics.get(2).map(|topic| topic.as_str()) == Some(&deposit_principal))
//         .unwrap_or_else(|| panic!("Principal not found in logs"));

//     // Extract relevant transaction details
//     let amount = hex_string_with_0x_to_nat(&log_principal.data)
//         .unwrap_or_else(|e| panic!("Failed to parse amount: {}", e));
//     let from_address = receipt.from.clone();

//     VerifiedTransactionDetails {
//         from: from_address,
//         amount,
        
//     }
// }

// #[ic_cdk::query]
// fn deposit_principal(principal: String) -> String {
//     let principal = Principal::from_text(principal).unwrap();
//     let subaccount = Subaccount::from_principal(principal);

//     let bytes32 = subaccount.to_bytes32().unwrap();

//     vec_to_hex_string_with_0x(bytes32)
// }

// // Implementing the eth_get_transaction function
// async fn eth_get_transaction_receipt(hash: String) ->  {
//     // Make the call to the EVM_RPC canister
    
// }

// // Testing get receipt function
// // #[ic_cdk::update]
// // async fn get_receipt(hash: String) -> GetTransactionReceiptResult {
// //     eth_get_transaction_receipt(hash).await.unwrap()
// // }

// #[ic_cdk::query]
// fn canister_deposit_principal() -> String {
//     let subaccount = Subaccount::from(ic_cdk::id());

//     let bytes32 = subaccount.to_bytes32().unwrap();

//     vec_to_hex_string_with_0x(bytes32)
// }

