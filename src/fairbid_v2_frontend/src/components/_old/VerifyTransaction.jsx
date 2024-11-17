import { useEffect, useState } from "react"

import { formatEther } from "viem"
import { fairbid_v2_backend } from "../declarations/fairbid_v2_backend";
import { idlFactory, CreateActorOptions } from "../declarations/fairbid_v2_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useAuth } from "../contexts/useAuthClient";

console.log("Imported backend:", fairbid_v2_backend);
const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

// const createActor = (canisterId, options = {}) => {
//   const agent = options.agent || new HttpAgent({ ...options.agentOptions });

//   if (options.agent && options.agentOptions) {
//     console.warn(
//       "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
//     );
//   }

//   // Fetch root key for certificate validation during development
//   if (process.env.DFX_NETWORK !== "ic") {
//     agent.fetchRootKey().catch((err) => {
//       console.warn(
//         "Unable to fetch root key. Check to ensure that your local replica is running"
//       );
//       console.error(err);
//     });
//   }

//   // Creates an actor with using the candid interface and the HttpAgent
//   return Actor.createActor(idlFactory, {
//     agent,
//     canisterId,
//     ...options.actorOptions,
//   });
// };

// const backend = canisterId ? createActor(canisterId) : undefined;



const VerifyTransaction = ({ hash }) => {


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [creditsAdded, setCreditsAdded] = useState(false);
  const [whoami1, setWhoami1] = useState(null);

  const { backendActor } = useAuth();

  const verifyTx = async () => {
    try {
      console.log('Starting verifyTx function...'); // Add initial log
      setLoading(true);

      const result = await backendActor.verify_transaction(hash);
      console.log('Transaction verification result:', result); // Log the result

      const whoami1 = await backendActor.whoami();
      console.log('Whoami check 1:', whoami1); // More descriptive log

      if (result) {
        setData(result);
        setError(null);
        setWhoami1(whoami1);
        console.log('Data set successfully:', result); // Log successful data set
      } else {
        setError("Verification failed: No data received");
        setData(null);
        console.log('No result received'); // Log failure
      }

      if (!creditsAdded && result) { // Add result check
        let amount = Number(result.amount.toString());
        console.log('Processing amount:', amount); // Log amount

        let whoami = await backendActor.whoami();
        console.log('Whoami before adding credits:', whoami);

        const addCreditsResult = await backendActor.add_credits(amount, hash);
        console.log('Credits added result:', addCreditsResult); // Log credits result

        setCreditsAdded(true);
      }
    } catch (err) {
      console.log('Error in verifyTx:', err); // More visible error log
      setError(err?.message || "An error occurred during verification");
      setData(null);
    } finally {
      let whoami2 = await backendActor.whoami();
      console.log('Final whoami check:', whoami2);
      setLoading(false);
    }
  };



  useEffect(() => {

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
        Ey Bro! Transaction(<b>{hash}</b>) with <b>{formatEther(data.amount)}</b>ETH from{" "}
        <b>{data.from}</b> is confirmed on-chain.
        {creditsAdded && (
          <p className="credits-added">
            ✓ Credits have been added to your account using this principal: <b>{whoami1.toString()}</b>
          </p>
        )}
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