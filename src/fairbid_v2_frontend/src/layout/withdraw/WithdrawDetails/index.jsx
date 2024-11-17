// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import {toast} from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';

// hooks
import {useRef, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';
import { useAuth } from '@contexts/useAuthClient';
import { useCredits } from '@contexts/useCredits';
// utils
import classNames from 'classnames';

// assets
import cover from '@assets/cover.webp';

const WithdrawDetails = () => {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { credits, fetchCredits } = useCredits();
    const { backendActor } = useAuth();

    useEffect(() => {
        fetchCredits();
    }, [fetchCredits]);

    const handleWithdraw = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (parseFloat(amount) > credits) {
            toast.error("Insufficient balance");
            return;
        }

        try {
            setIsLoading(true);
            await backendActor.withdraw_credit(parseFloat(amount));
            toast.success('Withdrawal successful!');
            setAmount('');
            fetchCredits();
        } catch (err) {
            console.error("Error during withdrawal:", err);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

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
                <h3>Withdraw Credits</h3>
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
        </div>
    );
}

export default WithdrawDetails;