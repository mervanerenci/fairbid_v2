import { useCredits } from '@contexts/useCredits';
import styles from './style.module.scss';
import { useEffect } from 'react';

const CreditsBalance = () => {
  const { credits, fetchCredits } = useCredits();

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return (
    <div className={styles.balanceContainer}>
      <div className={styles.balanceWrapper}>
        <span className={styles.balanceAmount}>{credits}</span>
        <span className={styles.balanceCurrency}>Credits</span>
      </div>
    </div>
  );
};

export default CreditsBalance;