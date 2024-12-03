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
    const [endedItems, setEndedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auctionType, setAuctionType] = useState("all");
    const [originator, setOriginator] = useState();


    const { backendActor } = useAuth();

    useEffect(() => {

        if (!backendActor) {
            console.log("Waiting for backendActor to be initialized...");
            return;
        }
        const fetchAllAuctions = async () => {
            try {
                // Fetch all types of auctions in parallel
                const [englishAuctions, dutchAuctions, sbAuctions] = await Promise.all([
                    backendActor.get_active_auctions(),
                    backendActor.get_active_dutch_auctions(),
                    backendActor.get_active_sb_auctions()
                ]);

                const [endedEnglishAuctions, endedDutchAuctions, endedSbAuctions] = await Promise.all([
                    backendActor.get_ended_auctions(),
                    backendActor.get_ended_dutch_auctions(),
                    backendActor.get_ended_sb_auctions()
                ]);

                // Transform auction data with type information
                const transformAuction = async (auction, auctionType) => {
                    let imageUrl = img7;
                    let highestBid = 0;
                    let _originator;
                    let _isEth = false;
                    let _location;
                    let _contact;
                    let _startPrice;
                    let _bids;
                    

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
                   
                    // const creator = await backendActor.get_auction_originator(auction.id);

                    try {
                        if (auctionType === 'english') {
                            let _details = await backendActor.get_auction_details(auction.id);
                            _location = _details[0].location;
                            _contact = _details[0].contact;
                            _bids = _details[0].bid_history;
                            _startPrice = Number(_details[0].starting_price[0]);
                        } else if (auctionType === 'dutch') {
                            let _details = await backendActor.get_dutch_auction_details(auction.id);
                            _location = _details[0].location;
                            _contact = _details[0].contact;
                            _bids = _details[0].bid_history;
                            _startPrice = Number(_details[0].starting_price[0]);
                        } else if (auctionType === 'sealed-bid') {
                            let _details = await backendActor.get_sb_auction_details(auction.id);
                            _location = _details[0].location;
                            _contact = _details[0].contact;
                            _bids = _details[0].bid_history;
                            _startPrice = Number(_details[0].starting_price[0]);
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch auction details for ${auctionType} auction ${auction.id}:`, error);
                    }

                    try {
                        if (auctionType === 'english') {
                            _isEth = await backendActor.get_auction_is_eth(auction.id);
                        } else if (auctionType === 'dutch') {
                            _isEth = await backendActor.get_dutch_auction_is_eth(auction.id);
                        } else if (auctionType === 'sealed-bid') {
                            _isEth = await backendActor.get_sb_auction_is_eth(auction.id);
                        }

                        // Don't set the originator here, just return it with the auction data
                    } catch (error) {
                        console.warn(`Failed to fetch isEth for ${auctionType} auction ${auction.id}:`, error);
                    }



                    return {
                        id: auction.id.toString(),
                        title: auction.item.title || 'Untitled Auction',
                        description: auction.item.description || '',
                        price: highestBid,
                        image: imageUrl,
                        startPrice: _startPrice,
                        auctionType, // Add auction type to distinguish between different types
                        originator: _originator[0],
                        location: _location,
                        contact: _contact,
                        bids: _bids,
                        isEth: _isEth
                    };
                };

                const transformedEnglish = await Promise.all(englishAuctions.map(a => transformAuction(a, 'english')));
                const transformedDutch = await Promise.all(dutchAuctions.map(a => transformAuction(a, 'dutch')));
                const transformedSb = await Promise.all(sbAuctions.map(a => transformAuction(a, 'sealed-bid')));
                const transformedEndedEnglish = await Promise.all(endedEnglishAuctions.map(a => transformAuction(a, 'english')));
                const transformedEndedDutch = await Promise.all(endedDutchAuctions.map(a => transformAuction(a, 'dutch')));
                const transformedEndedSb = await Promise.all(endedSbAuctions.map(a => transformAuction(a, 'sealed-bid')));
                // Combine all auctions
                const allAuctions = [...transformedEnglish, ...transformedDutch, ...transformedSb];
                const allEndedAuctions = [...transformedEndedEnglish, ...transformedEndedDutch, ...transformedEndedSb];

                setAllItems(allAuctions);
                setEndedItems(allEndedAuctions);
               
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
            setAuctionType,
            endedItems
        }}>
            {children}
        </ExploreGridContext.Provider>
    );
}

export const useExploreGridContext = () => useContext(ExploreGridContext);
