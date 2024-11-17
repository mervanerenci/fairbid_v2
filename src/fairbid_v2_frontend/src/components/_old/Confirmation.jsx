import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VerifyTransaction from "./VerifyTransaction";
const Confirmation = ({ hash }) => {
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (!hash) return;

      try {
        // Connect to the Ethereum network
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Wait for the transaction to be mined
        const tx = await provider.waitForTransaction(hash, 5);

        if (tx.status === 1) {
          setTransactionStatus("success");
        } else {
          setTransactionStatus("failed");
        }
      } catch (err) {
        console.error("Error checking transaction status:", err);
        setError(err.message);
        setTransactionStatus("error");
      }
    };

    checkTransactionStatus();
  }, [hash]);

  const getEtherscanLink = (txHash) => {
    // Replace with the appropriate network URL (e.g., mainnet, goerli, etc.)
    return `https://etherscan.io/tx/${txHash}`;
  };

  return (
    <div className="confirmation-container">
      {transactionStatus === "pending" && (
        <div className="loading-message">
          Waiting for confirmation...
        </div>
      )}
      {transactionStatus === "success" && (
        <div>
        <VerifyTransaction hash={hash} />
        </div>
      )}
      {transactionStatus === "failed" && (
        <div className="error-message">
          Transaction failed. Please check Etherscan for more details.
        </div>
      )}
      {transactionStatus === "error" && (
        <div className="error-message">
          Error checking transaction: {error}
        </div>
      )}
    </div>
  );
};

export default Confirmation;