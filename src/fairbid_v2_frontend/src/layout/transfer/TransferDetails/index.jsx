// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import TransactionHistory from '@components/TransactionHistory';
// hooks
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';
import { useAuth } from '@contexts/useAuthClient';
import { Principal } from '@dfinity/principal';
import { useCredits } from '@contexts/useCredits';

// utils
import classNames from 'classnames';

// assets
import cover from '@assets/cover.webp';

const TransferDetails = () => {
    // const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { credits, fetchCredits } = useCredits();
    const { backendActor, principal, isAuthenticated } = useAuth();

    const [who, setWho] = useState("username");
    const [to, setTo] = useState("");
    const [toPrincipal, setToPrincipal] = useState("");
    const [amount, setAmount] = useState(0);




    const handleSubmit = async () => {



        try {
            let _principal;
            if (who === 'username') {
                _principal = await backendActor.get_principal_by_username(to);
                console.log("principal of given username ->: ", _principal);


            } else {

                _principal = Principal.fromText(to);


            }
            console.log("++ Transfering with amount: ", Number(amount));
            console.log("++ Transfering to: ", _principal);
            const weiAmount = Number(amount) * 1e18;
            await backendActor.transfer_credit(_principal, Number(weiAmount));


            toast.success(Number(amount) + ' amount transfer to ' + to + 'is successful!');
            // reset(); // Reset form after successful transfer
            fetchCredits(); // Refresh credits balance
        } catch (error) {
            toast.error('Transfer failed. Please check the recipient details and try again.');
        }
    }

    useEffect(() => {
        fetchCredits();
    }, []);

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.authPrompt}>
                    <h2>Authentication Required</h2>
                    <p>Please sign in to transfer credits</p>
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

            <div className={styles.transferCard}>
                <h3>Send Credits</h3>

                <div className={styles.formGroup}>
                    <label>Recipient Type</label>
                    <select
                        // className={errors.who ? styles.errorInput : ''}
                        value={who}
                        onChange={(e) => setWho(e.target.value)}
                    >
                        <option value="username">Username</option>
                        <option value="principal">Principal ID</option>
                    </select>
                    {/* {errors.who && <span className={styles.errorText}>{errors.who.message}</span>} */}
                </div>

                <div className={styles.formGroup}>
                    <label>Recipient</label>
                    <input
                        type="text"
                        placeholder="Enter recipient details"
                        // className={errors.to ? styles.errorInput : ''}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}

                    />
                    {/* {errors.to && <span className={styles.errorText}>{errors.to.message}</span>} */}
                </div>

                <div className={styles.formGroup}>
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        // className={errors.amount ? styles.errorInput : ''}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}

                    />
                    {/* {errors.amount && <span className={styles.errorText}>{errors.amount.message}</span>} */}
                </div>

                <GradientBtn
                    tag="button"
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                // disabled={Object.keys(errors).length > 0}
                >
                    Transfer Credits
                </GradientBtn>

            </div>

            <TransactionHistory />
        </div>
    );
}

export default TransferDetails;