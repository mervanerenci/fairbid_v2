import {createContext, useState, useContext, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

export const BidModalContext = createContext(undefined);

export const BidModalContextAPI = ({children}) => {
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const {lockScroll, unlockScroll} = useScrollLock();

    useEffect(() => {
        isBidModalOpen ? lockScroll() : unlockScroll();

        return () => {
            unlockScroll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBidModalOpen]);

    const openBidModal = () => setIsBidModalOpen(true);

    const closeBidModal = () => setIsBidModalOpen(false);

    return (
        <BidModalContext.Provider value={{isBidModalOpen, openBidModal, closeBidModal}}>
            {children}
        </BidModalContext.Provider>
    );
}

export const useBidModalContext = () => useContext(BidModalContext);