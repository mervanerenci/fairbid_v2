// styling
import styles from './style.module.scss';

// components
import { toast } from 'react-toastify';

// hooks
import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/useAuthClient';
import { formatDistanceToNow } from 'date-fns';
import { useCredits } from '@contexts/useCredits';

const TransactionType = {
    DEPOSIT: 'Deposit',
    WITHDRAW: 'Withdrawal',
    TRANSFER: 'Transfer'
};

const TransactionHistory = () => {
    const { creditHistory, isLoading, fetchCreditHistory } = useCredits();
    const { backendActor, principal } = useAuth();

    function convertUnixToDateTime(unixTime) {
        const time = Number(unixTime);
        const date = new Date(time / 1000000);
        const timeString = date.toLocaleString();
   
        return timeString;

    }
    
    // useEffect(() => {
    //     console.log('Full Credit History:', creditHistory);
    //     if (creditHistory && creditHistory.length > 0) {
    //         // console.log('First Transaction:', creditHistory[0]);
    //         // console.log('Transaction Type:', creditHistory[0].transaction_type);
    //         // console.log('Transaction Amount:', creditHistory[0].amount);
    //         // console.log('Transaction Timestamp:', creditHistory[0].timestamp);
    //         // console.log('Transaction From:', creditHistory[0].from);
    //         // console.log('Transaction To:', creditHistory[0].to);
            
            
    //     }
    // }, [creditHistory]);

    useEffect(() => {   
        fetchCreditHistory();
        
    }, [fetchCreditHistory, principal]);

    const getTransactionIcon = (type) => {
        if ('Deposit' in type) return '↓';
        if ('Withdrawal' in type) return '↑';
        if ('Transfer' in type) return '↔';
        return '•';
    };

    const getTransactionColor = (type, isReceiver = false) => {
        if ('Deposit' in type) return styles.positive;
        if ('Withdrawal' in type) return styles.negative;
        if ('Transfer' in type) return isReceiver ? styles.positive : styles.negative;
        return '';
    };

    const getTransactionType = (type) => {
        if ('Deposit' in type) return 'Deposit';
        if ('Withdrawal' in type) return 'Withdrawal';
        if ('Transfer' in type) return 'Transfer';
        return 'Unknown';
    };


    const formatTransactionAmount = (tx) => {
        const isReceiver = 'Transfer' in tx.transaction_type && tx.to.toString() === principal.toString();
        const prefix = isReceiver || 'Deposit' in tx.transaction_type ? '+ ' : '- ';
        const amountInEth = Number(tx.amount) / 1e18;
        return `${prefix}${amountInEth.toFixed(6)} Credits`;
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(Number(timestamp));
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    Loading transaction history...
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Transaction History</h3>
            
            {!creditHistory || creditHistory.length === 0 ? (
                <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📝</span>
                    <p>No transactions found</p>
                </div>
            ) : (
                <div className={styles.transactionList}>
                    {creditHistory.map((tx, index) => {
                        const isReceiver = 'Transfer' in tx.transaction_type && tx.to.toString() === principal.toString();
                        
                        return (
                            <div key={index} className={styles.transactionItem}>
                                <div className={styles.iconWrapper}>
                                    <span className={`${styles.icon} ${getTransactionColor(tx.transaction_type, isReceiver)}`}>
                                        {getTransactionIcon(tx.transaction_type)}
                                    </span>
                                </div>
                                
                                <div className={styles.details}>
                                    <div className={styles.mainInfo}>
                                        <span className={styles.type}>
                                            {getTransactionType(tx.transaction_type)}
                                        </span>
                                        <span className={`${styles.amount} ${getTransactionColor(tx.transaction_type, isReceiver)}`}>
                                            {formatTransactionAmount(tx)}
                                        </span>
                                    </div>
                                    
                                    <div className={styles.subInfo}>
                                        <span className={styles.timestamp}>
                                            {convertUnixToDateTime(tx.timestamp)}
                                        </span>
                                        {tx.from && (
                                            <span className={styles.from}>
                                                From: <span className={styles.address}>{tx.from.toString()}</span>
                                            </span>
                                        )}
                                        {tx.to && (
                                            <span className={styles.to}>
                                                To: <span className={styles.address}>{tx.to.toString()}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;

