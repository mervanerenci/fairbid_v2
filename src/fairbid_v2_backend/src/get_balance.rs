// use alloy::{
//     network::TxSigner,
//     primitives::Address,
//     providers::{Provider, ProviderBuilder},
//     transports::icp::IcpConfig,
// };



// use alloy::{
//     signers::icp::IcpSigner,
//     transports::icp::{RpcApi, RpcService},
// };


// // The toolkit app uses an external EVM RPC Proxy instead of the EVM RPC Canister
// // available on IC. When you make a call to the EVM RPC canister, that call gets
// // made by all nodes in the subnet. For a successfull response to be returned,
// // all RPC responses returned must be identical. In most cases this is not a problem
// // but more often than seldom this becomes an issue. When for instance getting the
// // latest block number, it is quite likely that a new block gets created during the
// // time it takes for the RPC procider to execute the requests.
// fn get_rpc_service_sepolia() -> RpcService {
//     // Uncomment to use EVM RPC Canister
//     // RpcService::EthSepolia(EthSepoliaService::Alchemy)

//     // Below proxy is intended for limited use with this demo, DO NOT use in a
//     // production setting. To deploy an proxy on CloudFlare for Alchemy as provider,
//     // fork and deploy this example: https://github.com/c-atts/catts-evm-rpc-proxy
//     RpcService::Custom(RpcApi {
//         url: "https://ic-alloy-evm-rpc-proxy.kristofer-977.workers.dev/eth-sepolia".to_string(),
//         headers: None,
//     })
// }

// fn get_rpc_service_base() -> RpcService {
//     // Uncomment to use EVM RPC Canister
//     // RpcService::BaseMainnet(L2MainnetService::Alchemy)

//     RpcService::Custom(RpcApi {
//         url: "https://ic-alloy-evm-rpc-proxy.kristofer-977.workers.dev/eth-sepolia".to_string(),
//         headers: None,
//     })
// }

// fn get_ecdsa_key_name() -> String {
//     #[allow(clippy::option_env_unwrap)]
//     let dfx_network = option_env!("DFX_NETWORK").unwrap();
//     match dfx_network {
//         "local" => "dfx_test_key".to_string(),
//         "ic" => "key_1".to_string(),
//         _ => panic!("Unsupported network."),
//     }
// }

// async fn create_icp_sepolia_signer() -> IcpSigner {
//     let ecdsa_key_name = get_ecdsa_key_name();
//     IcpSigner::new(vec![], &ecdsa_key_name, None).await.unwrap()
// }

// /// Request the balance of an ETH account.
// #[ic_cdk::update]
// async fn get_balance(address: Option<String>) -> Result<String, String> {
//     let address = match address {
//         Some(val) => val,
//         None => {
//             let signer = create_icp_sepolia_signer().await;
//             signer.address().to_string()
//         }
//     };
//     let address = address.parse::<Address>().map_err(|e| e.to_string())?;
//     let rpc_service = get_rpc_service_sepolia();
//     let config = IcpConfig::new(rpc_service);
//     let provider = ProviderBuilder::new().on_icp(config);
//     let result = provider.get_balance(address).await;

//     match result {
//         Ok(balance) => Ok(balance.to_string()),
//         Err(e) => Err(e.to_string()),
//     }
// }