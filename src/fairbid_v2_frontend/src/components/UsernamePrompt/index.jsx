import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/useAuthClient';
import { toast } from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';
import styles from './style.module.scss';

const UsernamePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { backendActor } = useAuth();

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const username = await backendActor.get_username();
        if (!username) {
          setShowPrompt(true);
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }
    };

    checkUsername();
  }, [backendActor]);

  const handleClose = () => {
    setShowPrompt(false);
    toast.info('You can set your username later in your profile page');
  };

  if (!showPrompt) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Welcome to FairBid!</h2>
        <p>Set up your username to get started with the full experience.</p>
        <div className={styles.buttons}>
          <GradientBtn tag="link" to="/profile">Set Username</GradientBtn>
          <button className="btn btn--outline" onClick={handleClose}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernamePrompt;