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

// utils
import classNames from 'classnames';

// assets
import cover from '@assets/cover.webp';

const ProfileDetails2 = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {file, setFile, handleFile, loading} = useFileReader();
    const { backendActor, principal } = useAuth();
    const inputRef = useRef(null);
    const [user, setUser] = useState('');
    const [credits, setCredits] = useState(0);
    const triggerInput = () => inputRef.current?.click();

    const setPlaceholder = () => setFile(cover);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = () => {
        setPlaceholder();
        toast.info('Cover photo was successfully deleted.');
    };

    const onSubmit = async (data) => {
        // change username
        try {
            await backendActor.set_username(data.username);
            toast.success('Profile details updated successfully!');
            // Refresh username after update
            const newUsername = await backendActor.get_username();
            setUser(newUsername || '');
        } catch (error) {
            console.error('Error updating username:', error);
            toast.error('Failed to update profile details');
        }
    }

    useEffect(() => {
        setPlaceholder();
        // Fix promise handling
        const fetchUserData = async () => {
            try {
                const username = await backendActor.get_username();
                console.log(username);
                setUser(username || '');

                const credits = await backendActor.get_credit_balance();

                console.log(Number(credits));
                setCredits(Number(credits) || 0);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser('');
                setCredits(0);
            }
        };

        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <h3 className={styles.title}>Profile Details</h3>
                
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Principal ID</h4>
                    <div className={styles.principalId}>
                        <span className={styles.idText}>{principal.toString()}</span>
                        <button 
                            className={styles.copyButton}
                            onClick={() => {
                                navigator.clipboard.writeText(principal.toString());
                                toast.success('Principal ID copied to clipboard!');
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Username</h4>
                    {user ? (
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{user}</span>
                            {/* <GradientBtn 
                                tag="button" 
                                onClick={() => setUser('')}
                                className={styles.editButton}
                            >
                                Edit
                            </GradientBtn> */}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    className={errors.username ? styles.errorInput : ''}
                                    {...register('username', { 
                                        required: 'Username is required',
                                        minLength: { 
                                            value: 3, 
                                            message: 'Username must be at least 3 characters' 
                                        }
                                    })}
                                />
                                {errors.username && (
                                    <span className={styles.errorText}>
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>
                            <GradientBtn tag="button" type="submit">
                                Set Username
                            </GradientBtn>
                        </form>
                    )}
                </div>

                

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Credits Balance</h4>
                    <div className={styles.balanceInfo}>
                        <div className={styles.balance}>
                            <span className={styles.amount}>{credits}</span>
                            <span className={styles.currency}>Credits (ETH)</span>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionHistory />
        </div>
    );
};

export default ProfileDetails2;