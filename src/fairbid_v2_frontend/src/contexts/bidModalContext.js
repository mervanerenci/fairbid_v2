import {createContext, useState, useContext, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

export const BidModalContext = createContext(undefined);

export const BidModalContextAPI = ({children}) => {
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const {lockScroll, unlockScroll} = useScrollLock();
    const [currentAuctionId, setCurrentAuctionId] = useState(null);
    const [currentAuctionType, setCurrentAuctionType] = useState(null);

    useEffect(() => {
        isBidModalOpen ? lockScroll() : unlockScroll();

        return () => {
            unlockScroll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBidModalOpen]);

    const openBidModal = (id, type) => {
        console.log("Opening bid modal for auction:", id);
        setCurrentAuctionId(id);
        setCurrentAuctionType(type);
        setIsBidModalOpen(true);
    };

    const setId = (id) => {
        setCurrentAuctionId(id);
    };

    const closeBidModal = () => {
        setCurrentAuctionId(null);
        setCurrentAuctionType(null);
        setIsBidModalOpen(false);
    };

    // useEffect(() => {
    //     console.log("Bid Modal Context state:", {
    //         isBidModalOpen,
    //         currentAuctionId,
    //         currentAuctionType
    //     });
    // }, [isBidModalOpen, currentAuctionId, currentAuctionType]);

    return (
        <BidModalContext.Provider value={{isBidModalOpen, openBidModal, closeBidModal, currentAuctionId, setId, currentAuctionType}}>
            {children}
        </BidModalContext.Provider>
    );
}

export const useBidModalContext = () => useContext(BidModalContext);