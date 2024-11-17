import { createContext, useState, useContext, useEffect, useMemo } from 'react';

import all_items from '@db/all_items';
import { SORTING_OPTIONS } from '@constants/explore';
import img7 from '@assets/products/7.webp';

// useAuthClient
import { useAuth } from "@contexts/useAuthClient"

export const ExploreGridContext = createContext(undefined);

// Add this constant at the top
export const AUCTION_TYPES = {
    ALL: 'all',
    ENGLISH: 'english',
    DUTCH: 'dutch',
    SEALED_BID: 'sealed-bid'
};

export const ExploreGridContextAPI = ({ children }) => {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auctionType, setAuctionType] = useState("all");
    const [originator, setOriginator] = useState();


    const { backendActor } = useAuth();

    useEffect(() => {
        const fetchAllAuctions = async () => {
            try {
                // Fetch all types of auctions in parallel
                const [englishAuctions, dutchAuctions, sbAuctions] = await Promise.all([
                    backendActor.get_active_auctions(),
                    backendActor.get_active_dutch_auctions(),
                    backendActor.get_active_sb_auctions()
                ]);

                // Transform auction data with type information
                const transformAuction = async (auction, auctionType) => {
                    let imageUrl = img7;
                    let highestBid = 0;
                    let _originator;

                    try {
                        const image = await backendActor.get_item_image(auction.id);
                        if (image && image.length > 0) {
                            imageUrl = URL.createObjectURL(new Blob([image.buffer], { type: 'image/jpeg' }));
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch image for ${auctionType} auction ${auction.id}:`, error);
                    }

                    // Get originator based on auction type
                    try {
                        if (auctionType === 'english') {
                            _originator = await backendActor.get_auction_originator(auction.id);
                        } else if (auctionType === 'dutch') {
                            _originator = await backendActor.get_dutch_auction_originator(auction.id);
                        } else if (auctionType === 'sealed-bid') {
                            _originator = await backendActor.get_sb_auction_originator(auction.id);
                        }

                        // Don't set the originator here, just return it with the auction data
                    } catch (error) {
                        console.warn(`Failed to fetch originator for ${auctionType} auction ${auction.id}:`, error);
                    }
                    console.log("__Originator:", _originator[0]);
                    // const creator = await backendActor.get_auction_originator(auction.id);

                    return {
                        id: auction.id.toString(),
                        title: auction.item.title || 'Untitled Auction',
                        description: auction.item.description || '',
                        price: highestBid,
                        image: imageUrl,
                        startPrice: auction.item.starting_price || 0,
                        auctionType, // Add auction type to distinguish between different types
                        originator: _originator[0]
                    };
                };

                const transformedEnglish = await Promise.all(englishAuctions.map(a => transformAuction(a, 'english')));
                const transformedDutch = await Promise.all(dutchAuctions.map(a => transformAuction(a, 'dutch')));
                const transformedSb = await Promise.all(sbAuctions.map(a => transformAuction(a, 'sealed-bid')));

                // Combine all auctions
                const allAuctions = [...transformedEnglish, ...transformedDutch, ...transformedSb];

                setAllItems(allAuctions);
                console.log("All auctions set:", allAuctions);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllAuctions();
    }, []);

    //filter helpers

    // Use useMemo for filtered items
    const items = useMemo(() => {
        // console.log("Filtering items. Type:", auctionType); // Debug log
        // console.log("All items:", allItems); // Debug log
        let filtered;
        switch (auctionType) {
            case AUCTION_TYPES.ALL:
                filtered = allItems;

                break;
            case "english":
                filtered = allItems.filter(item => item.auctionType === 'english');

                break;
            case "dutch":
                filtered = allItems.filter(item => item.auctionType === 'dutch');

                break;
            case "sealed-bid":
                filtered = allItems.filter(item => item.auctionType === 'sealed-bid');

                break;
            default:
                filtered = allItems;
        }

        // console.log("Filtered items:", filtered); // Debug log
        return filtered;
    }, [auctionType, allItems]);



    return (
        <ExploreGridContext.Provider value={{
            items,
            loading,
            auctionType,
            setAuctionType
        }}>
            {children}
        </ExploreGridContext.Provider>
    );
}

export const useExploreGridContext = () => useContext(ExploreGridContext);
