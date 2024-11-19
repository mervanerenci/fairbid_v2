// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import {toast} from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import TransactionHistory from '@components/TransactionHistory';
// hooks
import {useRef, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';
import { useAuth } from '@contexts/useAuthClient';
import { Principal } from '@dfinity/principal';
import { useCredits } from '@contexts/useCredits';

// utils
import classNames from 'classnames';

// assets
import cover from '@assets/cover.webp';

const TransferDetails = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { credits, fetchCredits } = useCredits();
    const { backendActor, principal } = useAuth();

    

    const onSubmit = async (data) => {
        try {
            if (data.who === 'username') {
                const principal = await backendActor.get_principal_by_username(data.to);
                data.to = principal;
                console.log("++ Transfering using given username: ", data.to);
                
            } else {
                
                data.to = Principal.fromText(data.to);
                console.log("++ Transfering using given principal: ", data.to);

            }
            
            console.log("++ Transfering with amount: ", Number(data.amount));
            console.log("++ Transfering to: ", data.to);
            const weiAmount = Number(data.amount) * 1e18;
            await backendActor.transfer_credit(data.to, weiAmount);

            
            toast.success('Transfer successful!');
            reset(); // Reset form after successful transfer
            fetchCredits(); // Refresh credits balance
        } catch (error) {
            toast.error('Transfer failed. Please check the recipient details and try again.');
        }
    }

    useEffect(() => {
        fetchCredits();
    }, []);

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label>Recipient Type</label>
                        <select 
                            className={errors.who ? styles.errorInput : ''}
                            {...register('who', { required: 'Please select recipient type' })}
                        >
                            <option value="username">Username</option>
                            <option value="principal">Principal ID</option>
                        </select>
                        {errors.who && <span className={styles.errorText}>{errors.who.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Recipient</label>
                        <input
                            type="text"
                            placeholder="Enter recipient details"
                            className={errors.to ? styles.errorInput : ''}
                            {...register('to', { 
                                required: 'Recipient is required',
                                minLength: { value: 3, message: 'Minimum 3 characters' }
                            })}
                        />
                        {errors.to && <span className={styles.errorText}>{errors.to.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Amount</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className={errors.amount ? styles.errorInput : ''}
                            {...register('amount', { 
                                required: 'Amount is required',
                                min: { value: 0.01, message: 'Minimum amount is 0.01' },
                                max: { value: credits, message: 'Insufficient balance' }
                            })}
                        />
                        {errors.amount && <span className={styles.errorText}>{errors.amount.message}</span>}
                    </div>

                    <GradientBtn 
                        tag="button" 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={Object.keys(errors).length > 0}
                    >
                        Transfer Credits
                    </GradientBtn>
                </form>
            </div>

            <TransactionHistory />
        </div>
    );
}

export default TransferDetails;