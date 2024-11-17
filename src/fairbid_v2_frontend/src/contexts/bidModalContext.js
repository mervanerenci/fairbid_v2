import {createContext, useState, useContext, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

export const BidModalContext = createContext(undefined);

export const BidModalContextAPI = ({children}) => {
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const {lockScroll, unlockScroll} = useScrollLock();
    const [currentAuctionId, setCurrentAuctionId] = useState(null)

    useEffect(() => {
        isBidModalOpen ? lockScroll() : unlockScroll();

        return () => {
            unlockScroll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBidModalOpen]);

    const openBidModal = (id) => {
        console.log("Opening bid modal for auction:", id);
        setCurrentAuctionId(id);
        setIsBidModalOpen(true);
    };

    const setId = (id) => {
        setCurrentAuctionId(id);
    };

    const closeBidModal = () => {
        setCurrentAuctionId(null);
        setIsBidModalOpen(false);
    };

    useEffect(() => {
        console.log("Bid Modal Context state:", {
            isBidModalOpen,
            currentAuctionId
        });
    }, [isBidModalOpen, currentAuctionId]);

    return (
        <BidModalContext.Provider value={{isBidModalOpen, openBidModal, closeBidModal, currentAuctionId, setId}}>
            {children}
        </BidModalContext.Provider>
    );
}

export const useBidModalContext = () => useContext(BidModalContext);