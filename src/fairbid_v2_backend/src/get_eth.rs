use evm_rpc_canister_types::{
    EVM_RPC , MultiGetTransactionReceiptResult, RpcError, 
    GetTransactionReceiptResult, RpcServices, TransactionReceipt, RpcConfig,
    EthSepoliaService,
};
use candid::{self, CandidType, Deserialize, Principal};

use ic_cdk::println;


use ic_cdk::api::call::call_with_payment128;


// #[derive(Serialize)]
// enum ReceiptWrapper {
//     Ok(TransactionReceiptData),
//     Err(String),
// }

// #[derive(Serialize)]
// struct TransactionReceiptData {
//     to: String,
//     status: String, // We'll convert Nat to String for serialization
//     transaction_hash: String,
//     block_number: String, // We'll convert Nat to String for serialization
//     from: String,
//     //
// }

pub const CANISTER_ID: Principal = Principal::from_slice(b"\x00\x00\x00\x00\x02\x30\x00\xCC\x01\x01"); // 7hfb6-caaaa-aaaar-qadga-cai


    // fn from(result: GetTransactionReceiptResult) -> Self {
    //     match result {
    //         GetTransactionReceiptResult::Ok(receipt) => {
    //             if let Some(receipt) = receipt {
    //                 ReceiptWrapper::Ok(TransactionReceiptData {
    //                     to: receipt.to,
    //                     status: receipt.status.to_string(),
    //                     transaction_hash: receipt.transactionHash,
    //                     block_number: receipt.blockNumber.to_string(),
    //                     from: receipt.from,
    //                     // ... map other fields as needed
    //                 })
    //             } else {
    //                 ReceiptWrapper::Err("Receipt is None".to_string())
    //             }
    //         },
    //         GetTransactionReceiptResult::Err(e) => ReceiptWrapper::Err(format!("Error on Get transaction receipt result: {:?}", e)),
    //     }
    // }

    // Function for getting transaction receipt the transaction hash
async fn eth_get_transaction_receipt(hash: String) -> Result<GetTransactionReceiptResult, String> {
    // Make the call to the EVM_RPC canister
    let result: Result<(MultiGetTransactionReceiptResult,), _> = call_with_payment128(
        CANISTER_ID,
        "eth_getTransactionReceipt",
        (
            RpcServices::EthSepolia(Some(vec![
                EthSepoliaService::PublicNode,
                EthSepoliaService::BlockPi,
                EthSepoliaService::Ankr,
            ])),
            (),
            hash,
        ),
        10_000_000_000,
    )
    .await
    .map_err(|e| format!("Failed to call eth_getTransactionReceipt: {:?}", e));

    println!("Raww result: {:?}", result);

    match result {
        Ok((MultiGetTransactionReceiptResult::Consistent(receipt),)) => {
            Ok(receipt)
        },
        Ok((MultiGetTransactionReceiptResult::Inconsistent(error),)) => {
            Err(format!("EVM_RPC returned inconsistent results: {:?}", error))
        },
        Err(e) => Err(format!("Error calling EVM_RPC: {}", e)),
    }    
}

#[ic_cdk::update]
async fn get_receipt(hash: String) -> GetTransactionReceiptResult {
    eth_get_transaction_receipt(hash).await.unwrap()
}

// #[ic_cdk::update]
// async fn get_receipt(hash: String) -> String {
//     let receipt = eth_get_transaction_receipt(hash).await.unwrap();
//     let wrapper = ReceiptWrapper::from(receipt);
//     serde_json::to_string(&wrapper).unwrap()
// }


// #[ic_cdk::update]
// pub async fn get_tx_receipt(hash: String) ->Result<Option<TransactionReceipt>, String> {
    
//     let cycles: i64 = 10000000000; // Adjust as needed

//     let rpc_services = RpcServices::EthSepolia(Some(vec![
//         EthSepoliaService::PublicNode,
//         EthSepoliaService::BlockPi,
//         EthSepoliaService::Ankr,
//     ]));

  

//     let (results,): (MultiGetTransactionReceiptResult,) = call_with_payment128(
//         CANISTER_ID,
//         "eth_getTransactionReceipt",
//         (
//             RpcServices::EthSepolia(Some(vec![
//                 EthSepoliaService::PublicNode,
//                 EthSepoliaService::BlockPi,
//                 EthSepoliaService::Ankr,
//             ])),
//             (),
//             hash,
//         ),
//         10000000000,
//     )
//     .await
//     .unwrap(); // This will panic if the call fails

//     println!("Raw result: {:?}", results);

//     match results {
//         MultiGetTransactionReceiptResult::Consistent(receipt_result) => {
//             match receipt_result {
//                 GetTransactionReceiptResult::Ok(receipt) => Ok(receipt),
//                 GetTransactionReceiptResult::Err(e) => Err(format!("RPC error: {:?}", e)),
//             }
//         },
//         MultiGetTransactionReceiptResult::Inconsistent(results) => {
//             // Try to find a successful result
//             let successful_result = results.into_iter()
//                 .find_map(|(_, result)| {
//                     if let GetTransactionReceiptResult::Ok(Some(receipt)) = result {
//                         Some(receipt)
//                     } else {
//                         None
//                     }
//                 });
            
//             match successful_result {
//                 Some(receipt) => Ok(Some(receipt)),
//                 None => Ok(None), // No provider returned a receipt
//             }
//         },
//     }
// }