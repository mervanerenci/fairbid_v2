// styling
import styles from './style.module.scss';

// components
// import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
// import StyledProgress from '@ui/StyledProgress';

// hooks
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';
import { useAuth } from '@contexts/useAuthClient';
import { useCredits } from '@contexts/useCredits';
// utils
import classNames from 'classnames';

// assets
// import cover from '@assets/cover.webp';
// import { ethers } from 'ethers';
const WithdrawDetails = () => {
    const [amount, setAmount] = useState('');
    const [approveAmount, setApproveAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const { credits, fetchCredits } = useCredits();
    const { backendActor, isAuthenticated } = useAuth();
    // const [isCheckingBalance, setIsCheckingBalance] = useState(false);
    // const [ledgerBalance, setLedgerBalance] = useState(null);
    const [ethAddress, setEthAddress] = useState('');
    useEffect(() => {
        fetchCredits();
    }, []);



    // const handleCheckBalance = async () => {
    //     try {
    //         setIsCheckingBalance(true);
    //         const balance = await backendActor.balance();
    //         console.log('Ledger balance:', balance);
    //         setLedgerBalance(balance);
    //     } catch (err) {
    //         console.error("Error checking balance:", err);
    //         toast.error("Failed to check balance");
    //     } finally {
    //         setIsCheckingBalance(false);
    //     }
    // };



    const handleApprove = async () => {
        if (!approveAmount || parseFloat(approveAmount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            setIsApproving(true);
            const valueWei = window.BigInt(Math.floor(parseFloat(approveAmount) * 10 ** 18).toString());
            await backendActor.approve(valueWei);
            toast.success('Approval successful!');
            setApproveAmount('');
        } catch (err) {
            console.error("Error during approval:", err);
            toast.error(err.message);
        } finally {
            setIsApproving(false);
        }
    };

    const handleWithdraw = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!ethAddress || !/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
            toast.error("Please enter a valid ETH address");
            return;
        }

        if (parseFloat(amount) > credits) {
            toast.error("Insufficient balance");
            return;
        }

        try {
            setIsLoading(true);
            let result;
            const valueWei = window.BigInt(Math.floor(parseFloat(amount) * 10 ** 18).toString());

            result = await backendActor.withdraw(valueWei, ethAddress);
            console.log('Raw withdrawal result:', result);
            console.log('result.Ok:', result.Ok);


            if (result.Ok) {
                await backendActor.decrease_credits(valueWei);
                console.log('Credits decreased successfully');
                toast.success('Withdrawal successful!');


            }

            if (result.Err) {
                console.error('Withdrawal error:', result.Err);
                toast.error(result.Err);
            }

            

            //     // Handling different error cases
            //     // if ('AmountTooLow' in result.err) {
            //     //     toast.error(`Amount too low. Minimum withdrawal: ${result.err.AmountTooLow.min_withdrawal_amount.toString()}`);
            //     // } else if ('InsufficientFunds' in result.err) {
            //     //     toast.error(`Insufficient funds. Current balance: ${result.err.InsufficientFunds.balance.toString()}`);
            //     // } else if ('InsufficientAllowance' in result.err) {
            //     //     toast.error(`Insufficient allowance: ${result.err.InsufficientAllowance.allowance.toString()}`);
            //     // } else if ('TemporarilyUnavailable' in result.err) {
            //     //     toast.error(`Temporarily unavailable: ${result.err.TemporarilyUnavailable}`);
            //     // }
            
            setAmount('');
            fetchCredits();
        } catch (err) {
            console.error("Error during withdrawal:", err);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.authPrompt}>
                    <h2>Authentication Required</h2>
                    <p>Please sign in to withdraw credits</p>
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

            <div className={styles.withdrawCard}>
                <h3>Approve Withdrawal</h3>
                <div className={styles.formGroup}>
                    <label>Amount to Approve</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={approveAmount}
                        onChange={(e) => setApproveAmount(e.target.value)}
                        className={styles.input}
                        min="0"
                        step="0.01"
                    />
                </div>

                <GradientBtn
                    tag="button"
                    onClick={handleApprove}
                    disabled={isApproving || !approveAmount}
                    className={styles.submitButton}
                >
                    {isApproving ? 'Processing...' : 'Approve'}
                </GradientBtn>
            </div>

            <div className={styles.withdrawCard}>
                <h3>Withdraw Credits</h3>
                <div className={styles.formGroup}>
                    <label>ETH Address</label>
                    <input
                        type="text"
                        placeholder="0x..."
                        value={ethAddress}
                        onChange={(e) => setEthAddress(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={styles.input}
                        min="0"
                        max={credits}
                        step="0.01"
                    />
                </div>

                <GradientBtn
                    tag="button"
                    onClick={handleWithdraw}
                    disabled={isLoading || !amount || parseFloat(amount) > credits}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Processing...' : 'Withdraw Credits'}
                </GradientBtn>
            </div>

            {/* <div className={styles.ledgerBalance}>
                <GradientBtn
                    tag="button"
                    onClick={handleCheckBalance}
                    disabled={isCheckingBalance}
                    className={styles.checkButton}
                >
                    {isCheckingBalance ? 'Checking...' : 'Check Ledger Balance'}
                </GradientBtn>
                {ledgerBalance !== null && (
                    <div className={styles.ledgerBalanceAmount}>
                        <span>Ledger Balance:</span>
                        <span>{Number(ledgerBalance)} wei</span>
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default WithdrawDetails;