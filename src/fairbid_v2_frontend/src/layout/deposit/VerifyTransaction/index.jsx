import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { fairbid_v2_backend } from "@declarations/fairbid_v2_backend";
import { idlFactory } from "@declarations/fairbid_v2_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import styles from './style.module.scss';
import { useAuth } from "@contexts/useAuthClient";
import { useCredits } from "@contexts/useCredits";

const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

const createActor = (canisterId, options = {}) => {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });
    
    if (process.env.DFX_NETWORK !== "ic") {
        agent.fetchRootKey().catch((err) => {
            console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
            console.error(err);
        });
    }
    
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
    const [creditsAdded, setCreditsAdded] = useState(false);
    const { backendActor } = useAuth();
    const { fetchCredits } = useCredits();
    useEffect(() => {
        const verifyTx = async () => {
            try {
                setLoading(true);
                const result = await backendActor.verify_transaction(hash);
                if (result) {
                    setData(result);
                    setError(null);

                    if (!creditsAdded) {
                        let amount = Number(result.amount.toString());
                        await backendActor.add_credits(amount, hash);
                        setCreditsAdded(true);
                        // Update credits after successful addition
                        await fetchCredits();
                    }
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

        if (hash) {
            verifyTx();
        }
    }, [hash, backendActor, creditsAdded, fetchCredits]);

    if (loading) {
        return (
            <div className={styles.verificationStatus}>
                <p>Processing transaction verification...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.verificationError}>
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.verificationStatus}>
                <p>Waiting for transaction data...</p>
            </div>
        );
    }

    try {
        return (
            <div className={styles.verificationSuccess}>
                <p>
                    Transaction(<b>{hash}</b>) with <b>{formatEther(data.amount)}</b>ETH from{" "}
                    <b>{data.from}</b> is confirmed on-chain.
                </p>
                {creditsAdded && (
                    <p className={styles.creditsAdded}>
                        ✓ Credits have been added to your account
                    </p>
                )}
            </div>
        );
    } catch (displayError) {
        console.error("Display error:", displayError);
        return (
            <div className={styles.verificationError}>
                <p>Error displaying transaction details</p>
            </div>
        );
    }
};

export default VerifyTransaction;