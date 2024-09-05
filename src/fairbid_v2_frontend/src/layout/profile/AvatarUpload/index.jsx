// styling
import styles from './style.module.scss';

// components
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import {toast} from 'react-toastify';

// hooks
import {useRef} from 'react';
import useFileReader from '@hooks/useFileReader';

// assets
import avatar from '@assets/avatar.webp';
import placeholder from '@assets/avatar_placeholder.webp';

const AvatarUpload = () => {
    const {file, setFile, handleFile, loading} = useFileReader();
    const inputRef = useRef(null);

    const triggerInput = () => inputRef.current?.click();

    const handleDelete = () => {
        setFile(placeholder);
        toast.info('Your profile picture was successfully deleted.');
    }

    return (
        <div className={`${styles.wrapper} bg-secondary border-10`}>
            <div className={styles.content}>
                <div className={styles.content_avatar}>
                    <Avatar className={styles.container} src={file ? file : avatar} alt="avatar"/>
                    {loading && <StyledProgress visible isOverlay isRound />}
                </div>
                <div className="d-flex flex-column g-20">
                    <GradientBtn tag="button" onClick={triggerInput}>Upload photo</GradientBtn>
                    <button className="btn btn--outline" onClick={handleDelete} disabled={file === placeholder}>
                        Delete
                    </button>
                </div>
                <input type="file" ref={inputRef} onChange={handleFile} hidden/>
            </div>
        </div>
    )
}

export default AvatarUpload