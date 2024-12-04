// styling
import styles from './style.module.scss';

// components
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import {toast} from 'react-toastify';
import NewAvatar from '@components/NewAvatar';
// hooks
import {useRef} from 'react';
import useFileReader from '@hooks/useFileReader';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useAuth} from '@contexts/useAuthClient';

// assets
import avatar from '@assets/avatar.webp';
import placeholder from '@assets/avatar_placeholder.webp';

const Funds = () => {
    const {file, setFile, handleFile, loading} = useFileReader();
    const inputRef = useRef(null);

    const { backendActor, principal, isAuthenticated } = useAuth();
    const [username, setUsername] = useState(null);

    const getUsername = async () => {
        const username = await backendActor.get_username_by_principal(principal);
        setUsername(username);
    }

    // const triggerInput = () => inputRef.current?.click();

    // const handleDelete = () => {
    //     setFile(placeholder);
    //     toast.info('Your profile picture was successfully deleted.');
    // }

    useEffect(() => {
        getUsername();
    }, []);

    if (!isAuthenticated) {
        return (
            <div className={`${styles.wrapper} bg-secondary border-10`}>
                
            </div>
        );
    }

    return (
        <div className={`${styles.wrapper} bg-secondary border-10`}>
            <div className={styles.content}>
                <div className={styles.content_avatar}>
                {username ? (
                    <>
                        <NewAvatar username={username} size={180} className={styles.container} />
                        <span className={styles.username}>@{username}</span>
                    </>
                    ) : (
                        <Avatar className={styles.container} src={file ? file : avatar} alt="avatar"/>
                    )}
                    {loading && <StyledProgress visible isOverlay isRound />}
                </div>
                <div className="d-flex flex-column g-20">
                    <GradientBtn tag="button" href="/deposit" >
                        <NavLink to="/deposit">Deposit</NavLink>
                    </GradientBtn>
                    <button className="btn btn--outline" href="/withdraw"  disabled={file === placeholder}>
                        <NavLink to="/withdraw">Withdraw</NavLink>
                    </button>
                    <button className="btn btn--outline" href="/transfer"  disabled={file === placeholder}>
                        <NavLink to="/transfer">Transfer</NavLink>
                    </button>
                </div>
                {/* <input type="file" ref={inputRef} onChange={handleFile} hidden/> */}
            </div>
        </div>
    )
}

export default Funds