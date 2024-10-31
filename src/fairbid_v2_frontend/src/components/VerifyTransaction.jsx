import { useEffect , useState} from "react"

import { formatEther } from "viem"
import {fairbid_v2_backend} from "../declarations/fairbid_v2_backend";
import { idlFactory,  CreateActorOptions } from "../declarations/fairbid_v2_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
console.log("Imported backend:", fairbid_v2_backend);
const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

const createActor = (canisterId, options = {}) => {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  
    if (options.agent && options.agentOptions) {
      console.warn(
        "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
      );
    }
  
    // Fetch root key for certificate validation during development
    if (process.env.DFX_NETWORK !== "ic") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }
  
    // Creates an actor with using the candid interface and the HttpAgent
    return Actor.createActor(idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  };
  
const backend = canisterId ? createActor(canisterId) : undefined;

const VerifyTransaction = ({ hash }) => {
  

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const verifyTx = async () => {
        try {
          setLoading(true);
          const result = await backend.verify_transaction(hash);
          if (result) {
            setData(result);
            setError(null);
          } else {
            setError("Verification failed: No data received");
            setData(null);
          }
        } catch (err) {
          console.error("Verification error:", err);
          setError(err?.message || "An error occurred during verification");
          setData(null);
        } finally {
          setLoading(false);
        }
      };
  
      verifyTx();
    }, [hash]);
  
    if (loading) {
      return (
        <div className="verification-status">
          <p>Processing transaction verification...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="verification-error">
          <p>Error: {error}</p>
        </div>
      );
    }
  
    if (!data) {
      return (
        <div className="verification-status">
          <p>Waiting for transaction data...</p>
        </div>
      );
    }
  
    try {
      return (
        <div className="verification-success">
          Transaction(<b>{hash}</b>) with <b>{formatEther(data.amount)}</b>ETH from{" "}
          <b>{data.from}</b> is confirmed on-chain.
        </div>
      );
    } catch (displayError) {
      console.error("Display error:", displayError);
      return (
        <div className="verification-error">
          <p>Error displaying transaction details</p>
        </div>
      );
    }
}

export default VerifyTransaction