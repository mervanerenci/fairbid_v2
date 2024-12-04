// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import Confirmation from '../Confirmation';

// hooks
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';

// utils
import classNames from 'classnames';

// assets
import cover from '@assets/cover.webp';

// fairbid
import { ethers } from 'ethers';
import { fairbid_v2_backend } from "@declarations/fairbid_v2_backend";
import { idlFactory } from "@declarations/fairbid_v2_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import helperAbi from "../../../service/abi.json";
import { useState } from 'react';
import { useAuth } from '@contexts/useAuthClient';
import { useCredits } from "@contexts/useCredits";

// Mainnet canisterId
const canisterId = 'sultb-kyaaa-aaaal-arsfq-cai';
// Local canisterId
// const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

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

const DepositDetails = () => {
    const [amount, setAmount] = useState('');
    const [principal, setPrincipal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState(null);
    const { credits, fetchCredits } = useCredits();
    const { backendActor, isAuthenticated } = useAuth();

    useEffect(() => {
        fetchCredits();
    }, [fetchCredits]);



    const handleDeposit = async () => {
        if (!window.ethereum) {
            toast.error("Please install MetaMask!");
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            setIsLoading(true);
            setTxHash(null);
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
            setTxHash(tx.hash);
            toast.success('Deposit successful!');
            fetchCredits();
        } catch (err) {
            console.error("Error during deposit:", err);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchDepositPrincipal = async () => {
            try {
                const depositPrincipal = await backendActor.deposit_principal(canisterId);
                setPrincipal(depositPrincipal);
            } catch (err) {
                console.error('Error fetching deposit principal:', err);
                toast.error('Failed to fetch deposit details');
            }
        };

        fetchDepositPrincipal();
        fetchCredits();
    }, [backendActor, fetchCredits]);

    useEffect(() => {
        fetchCredits();
    }, []);

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.authPrompt}>
                    <h2>Authentication Required</h2>
                    <p>Please sign in to deposit credits</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.balanceCard}>
                <h3>Available Balance</h3>
                <div className={styles.balanceAmount}>
                    <span>{credits}</span>
                    <small>Credits (ETH)</small>
                </div>
            </div>

            <div className={styles.depositCard}>
                <h3>Deposit Credits</h3>
                <div className={styles.formGroup}>
                    <label>Amount (ETH)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={styles.input}
                        min="0"
                        step="0.01"
                    />
                </div>

                <GradientBtn
                    tag="button"
                    onClick={handleDeposit}
                    disabled={isLoading || !amount}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Processing...' : 'Deposit Credits'}
                </GradientBtn>

                {txHash && <Confirmation hash={txHash} />}
            </div>
        </div>
    );
}

export default DepositDetails;
