use ic_cdk::api::management_canister::http_request::{
    http_request,
    CanisterHttpRequestArgument,
    HttpHeader,
    HttpMethod,
    HttpResponse,
    TransformArgs,
    TransformContext,
    TransformFunc,
};
use candid::{ CandidType, Deserialize };
use serde_json::Value;

use b3_utils::hex_string_with_0x_to_nat;
use candid::Nat;
use b3_utils::vec_to_hex_string_with_0x;
use b3_utils::Subaccount;
use candid::Principal;

const MINTER_ADDRESS: &str = "0xb44b5e756a894775fc32eddf3314bb1b1944dc34";
const ALCHEMY_API_KEY: &str = "XxgJ2PxT7vT_u9Bzz8cilmM6nuit4qFK";

#[derive(CandidType, Deserialize)]
pub struct VerifiedTransactionDetails {
    pub amount: Nat,
    pub from: String,
}
#[derive(Debug, Deserialize)]
struct TransactionReceipt {
    result: TransactionResult,
}

#[derive(Debug, Deserialize)]
struct TransactionResult {
    status: String,
    to: String,
    from: String,
    logs: Vec<Log>,
}

#[derive(Debug, Deserialize, Clone)]
struct Log {
    address: String,
    data: String,
    topics: Vec<String>,
}

#[derive(CandidType, Deserialize)]
pub struct VerificationResult {
    pub amount: Nat,
    pub from: String,
}


#[ic_cdk::query]
fn canister_deposit_principal() -> String {
    let subaccount = Subaccount::from(ic_cdk::id());

    let bytes32 = subaccount.to_bytes32().unwrap();

    vec_to_hex_string_with_0x(bytes32)
}

#[ic_cdk::query]
fn deposit_principal(principal: String) -> String {
    let principal = Principal::from_text(principal).unwrap();
    let subaccount = Subaccount::from_principal(principal);

    let bytes32 = subaccount.to_bytes32().unwrap();

    vec_to_hex_string_with_0x(bytes32)
}

// Then modify the verify_transaction function
#[ic_cdk::update]
pub async fn verify_transaction(hash: String) -> VerificationResult {
    let receipt_str = get_transaction_receipt(hash).await;
    
    // Parse the JSON string into our TransactionReceipt struct
    let tx: TransactionReceipt = serde_json::from_str(&receipt_str)
        .unwrap_or_else(|e| panic!("Failed to parse transaction receipt: {}", e));

    if tx.result.status != "0x1" {
        panic!("Transaction failed");
    }

    let log = tx.result.logs[0].clone();

    if tx.result.to != MINTER_ADDRESS || log.address != MINTER_ADDRESS {
        panic!("Address mismatch");
    }

    if log.topics[2] != canister_deposit_principal() {
        panic!("Principal mismatch");
    }

    let amount = hex_string_with_0x_to_nat(&log.data).unwrap();

    VerificationResult {
        amount,
        from: tx.result.from
    }
}



#[ic_cdk::update]
async fn get_transaction_receipt(tx_hash: String) -> String {
    // Setup the URL
    let host = "eth-sepolia.g.alchemy.com";
    let url = format!("https://{}/v2/{}", host, ALCHEMY_API_KEY);

    // Prepare request headers
    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}"),
        },
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        }
    ];

    // Prepare the JSON-RPC request body
    let body =
        format!(r#"{{
            "jsonrpc": "2.0",
            "method": "eth_getTransactionReceipt",
            "params": ["{}"],
            "id": 1
        }}"#, tx_hash);

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::POST, // Changed to POST for JSON-RPC
        body: Some(body.into_bytes()),
        max_response_bytes: None,
        transform: Some(TransformContext {
            function: TransformFunc(candid::Func {
                principal: ic_cdk::api::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
        headers: request_headers,
    };

    // Make the HTTP request
    let cycles = 230_949_972_000;

    match http_request(request, cycles).await {
        Ok((response,)) => {
            String::from_utf8(response.body).expect("Transformed response is not UTF-8 encoded.")
        }
        Err((r, m)) => {
            format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}")
        }
    }
}

#[ic_cdk::query]
fn transform(raw: TransformArgs) -> HttpResponse {
    let headers = vec![
        HttpHeader {
            name: "Content-Security-Policy".to_string(),
            value: "default-src 'self'".to_string(),
        },
        HttpHeader {
            name: "Referrer-Policy".to_string(),
            value: "strict-origin".to_string(),
        },
        HttpHeader {
            name: "Permissions-Policy".to_string(),
            value: "geolocation=(self)".to_string(),
        },
        HttpHeader {
            name: "Strict-Transport-Security".to_string(),
            value: "max-age=63072000".to_string(),
        },
        HttpHeader {
            name: "X-Frame-Options".to_string(),
            value: "DENY".to_string(),
        },
        HttpHeader {
            name: "X-Content-Type-Options".to_string(),
            value: "nosniff".to_string(),
        }
    ];

    let mut res = HttpResponse {
        status: raw.response.status.clone(),
        body: raw.response.body.clone(),
        headers,
    };

    if res.status == 200u64 {
        res.body = raw.response.body;
    } else {
        ic_cdk::api::print(format!("Received an error from Alchemy: err = {:?}", raw));
    }
    res
}


