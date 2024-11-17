import React from "react"
import { ethers } from 'ethers';
import { fairbid_v2_backend } from "../declarations/fairbid_v2_backend";
import { idlFactory, CreateActorOptions } from "../declarations/fairbid_v2_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useEffect, useState } from "react"
import helperAbi from "../service/abi.json"
import { parseEther } from "viem"
import { useContractWrite } from "wagmi"
import Confirmation from "./Confirmation"


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

const Deposito = () => {

  const [amount, setAmount] = useState(0)
  const [principal, setPrincipal] = useState(0);
  const [error, setError] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null); // New state for transaction hash

  
  useEffect(() => {
    const fetchDepositPrincipal = async () => {

      try {
        console.log("Backend in useEffect:", backend);

        if (!backend) {
          throw new Error("fairbid_v2_backend is not defined in the imported module");
        }
        let deposito = await backend.deposit_principal(canisterId);
        setPrincipal(deposito);
        console.log("Deposit principal:", deposito);
      } catch (err) {
        console.error('Error fetching deposit principal:', err);
        setError(`Failed to fetch deposit principal: ${err.message}`);
      }


    };
    fetchDepositPrincipal();
  }, []);

  const handleDeposit = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }

    try {
      setIsLoading(true);
      setTxHash(null); // Reset txHash before new transaction
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        "0xb44B5e756A894775FC32EDdf3314Bb1B1944dC34",
        helperAbi,
        signer
      );

      const tx = await contract.deposit(principal, {
        value: ethers.parseEther(amount.toString())
      });

      await tx.wait();
      console.log("Transaction completed:", tx.hash);
      setTxHash(tx.hash); // Set the transaction hash
    } catch (err) {
      console.error("Error during deposit:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const changeHandler = (e) => {
    let newAmount = e.target.valueAsNumber
    if (Number.isNaN(newAmount) || newAmount < 0) newAmount = 0
    setAmount(newAmount)
  }



  if (error) {
    return <div>Error: {error}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else if (txHash) {
    return <Confirmation hash={txHash} />
  } else {
    return (
      <div>
        <input type="number" value={amount} onChange={changeHandler} />
        <button onClick={handleDeposit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Deposit'}
        </button>
      </div>
    )
  }
}

export default Deposito
