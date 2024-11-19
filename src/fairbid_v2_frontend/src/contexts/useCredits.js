import { useState, useCallback } from 'react';
import { useAuth } from '@contexts/useAuthClient';

export const useCredits = () => {
  const [credits, setCredits] = useState(0);
  const [creditHistory, setCreditHistory] = useState([]);
  const { backendActor } = useAuth();

  const fetchCredits = useCallback(async () => {
    try {
      const creditsInWei = await backendActor.get_credit_balance();
      const credits = Number(creditsInWei) / 1e18;
      setCredits(credits || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  }, [backendActor]);

  const fetchCreditHistory = useCallback(async () => {
    try {
      const history = await backendActor.get_credit_history();
      console.log('---tx-history---', history);
      setCreditHistory(history);
    } catch (error) {
      console.error('Error fetching credit history:', error);
    }
  }, [backendActor]);

  return { credits, fetchCredits, fetchCreditHistory, creditHistory };
};