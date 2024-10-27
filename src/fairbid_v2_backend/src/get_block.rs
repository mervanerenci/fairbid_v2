


#![allow(non_snake_case)]

use candid::{self, CandidType, Deserialize, Principal};
use ic_cdk::{self, api::call::CallResult};
use ic_cdk::api::call::call_with_payment128;
use evm_rpc_canister_types::{
    EVM_RPC , MultiGetTransactionReceiptResult, RpcError, GetTransactionReceiptResult
};



#[derive(CandidType, Deserialize)]
enum RpcSource {
    EthSepolia,
    // Add other variants if needed
}

pub struct EvmRpcCanister;
impl EvmRpcCanister {
    pub async fn eth_get_block_by_number(
        services: RpcServices,
        config: Option<RpcConfig>,
        block_tag: BlockTag,
        cycles: u128,
    ) -> CallResult<(MultiGetBlockByNumberResult,)> {
        ic_cdk::api::call::call_with_payment128(
            CANISTER_ID,
            "eth_getBlockByNumber",
            (services, config, block_tag),
            cycles,
        )
        .await
    }
}

#[ic_cdk::update]
async fn get_latest_ethereum_block() -> Block {
    let rpc_providers = RpcServices::EthSepolia(Some(vec![
        EthSepoliaService::Alchemy,
        EthSepoliaService::BlockPi,
        EthSepoliaService::PublicNode,
        EthSepoliaService::Ankr,
    ]));

    let cycles = 10_000_000_000;
    let (result,) =
        EvmRpcCanister::eth_get_block_by_number(rpc_providers, None, BlockTag::Latest, cycles)
            .await
            .expect("Call failed");

    match result {
        MultiGetBlockByNumberResult::Consistent(r) => match r {
            GetBlockByNumberResult::Ok(block) => block,
            GetBlockByNumberResult::Err(err) => panic!("{err:?}"),
        },
        MultiGetBlockByNumberResult::Inconsistent(_) => {
            panic!("RPC providers gave inconsistent results")
        }
    }
}

// #[ic_cdk::update]
// pub async fn eth_get_tx_receipt(hash: String) -> Result<GetTransactionReceiptResult, String> {
//     let cycles = 20_000_000_000; // 20 billion cycles, adjust as needed
//     let services = RpcServices::EthSepolia(Some(vec![
//         EthSepoliaService::Alchemy,
//         EthSepoliaService::BlockPi,
//         EthSepoliaService::Ankr,
//     ]));

//     let (result,): (MultiGetTransactionReceiptResult,) = call_with_payment128(
//         evm_rpc.0,
//         "eth_getTransactionReceipt",
//         (
//             services,
//             (),
//             hash,
//         ),
//         cycles,
//     )
//     .await
//     .map_err(|e| format!("Error calling evm_rpc canister: {:?}", e))?;

//     match result {
//         Ok((MultiGetTransactionReceiptResult::Consistent(receipt),)) => Ok(receipt),
//         Ok((MultiGetTransactionReceiptResult::Inconsistent(error),)) => Err(format!(
//             "EVM_RPC returned inconsistent results: {:?}",
//             error
//         )),
//         Err(e) => Err(format!("Error calling EVM_RPC: {}", e)),
//     }


// }

// // Testing get receipt function
// #[ic_cdk::update]
// async fn get_receipt(hash: String) -> GetTransactionReceiptResult {
//     eth_get_tx_receipt(hash).await.unwrap()
// }