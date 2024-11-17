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
        <div className={`${styles.wrapper} border-10`}>
            {/* <div className={`${styles.cover} border-10`}>
                <LazyImage className={styles.cover_bg} src={file ? file : cover} alt="cover"/>
                <span className={styles.cover_overlay}>
                    
                </span>
                {loading && <StyledProgress visible isOverlay />}
            </div> */}
            <div className="d-flex flex-column g-20">
                {user ? (
                    <>
                    <h5 >Username</h5>
                    <div className={styles.balance}>
                        <span className="text-bold">{user} </span>
                    </div>
                    </>
                ) : (
                    <>
                    <h5 >Username</h5>
                <form className="d-flex flex-column g-40" onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-column g-20">
                        <div className={styles.group}>
                            <input type="file" ref={inputRef} onChange={handleFile} hidden/>
                            <input className={classNames('field field--outline', {'field--error': errors.firstName})}
                                   type="text"
                                   defaultValue={user}
                                   placeholder="Username"
                                   {...register('username', {required: true})}/>
                            
                        </div>
                        
                    </div>
                    <div className={styles.buttons}>
                        <GradientBtn tag="button" type="submit">Set username</GradientBtn>
                        {/* <button className="btn btn--outline">Preview</button> */}
                    </div>
                </form>
                    </>
                )}
                <h5 >Credits Balance</h5>
                <div className={styles.balance}>
                    <span className="text-bold">{credits} </span>
                    <span className="text-light">Credits(ETH)</span>
                    {/* <GradientBtn className={styles.btn} tag="button">Deposit</GradientBtn>        
                    <button className="btn btn--outline">
                        Withdraw
                    </button> */}

                    

                    


                    

                </div>


            </div>
        </div>
    )
}

export default ProfileDetails2