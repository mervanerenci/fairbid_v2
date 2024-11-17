import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from './style.module.scss';
import VerifyTransaction from "../VerifyTransaction";
const Confirmation = ({ hash }) => {
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (!hash) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const tx = await provider.waitForTransaction(hash, 1);

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
    return `https://etherscan.io/tx/${txHash}`;
  };

  return (
    <div className={styles.confirmationContainer}>
      {transactionStatus === "pending" && (
        <div className={styles.loadingMessage}>
          Waiting for confirmation...
        </div>
      )}
      {transactionStatus === "success" && (
        <div>
            <VerifyTransaction hash={hash} />
        </div>
      )}
      {transactionStatus === "failed" && (
        <div className={styles.errorMessage}>
          Transaction failed. Please check 
          <a 
            href={getEtherscanLink(hash)} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.etherscanLink}
          >
            Etherscan
          </a> 
          for more details.
        </div>
      )}
      {transactionStatus === "error" && (
        <div className={styles.errorMessage}>
          Error checking transaction: {error}
        </div>
      )}
    </div>
  );
};

export default Confirmation;