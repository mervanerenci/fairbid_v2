// styled components
import { StyledAuthorItems, CollectionsGrid } from './style';

import styles from './style.module.scss';

// components
import StyledTabs from '@ui/StyledTabs';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import CollectionItem from '@components/CollectionItem';
import SectionHeader from '@components/SectionHeader';


// hooks
import usePagination from '@hooks/usePagination';
import {useState, useEffect} from 'react';
import {useAuth} from '@contexts/useAuthClient';

// data placeholder
import author from '@db/author';

// assets
import img7 from '@assets/products/7.webp';



const SingleItems = ({ content }) => {
    const pagination = usePagination(content, 12);

    return (
        <div className="tab-content" ref={pagination.containerRef}>
            <ItemsGrid items={pagination.currentItems()} isPrivate />
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

const Collections = ({ content }) => {
    const pagination = usePagination(content, 6);

    return (
        <div className="tab-content" ref={pagination.containerRef}>
            <CollectionsGrid>
                {
                    pagination.currentItems().map((item, index) => (
                        <CollectionItem item={item} index={index} key={index} isPrivate />
                    ))
                }
            </CollectionsGrid>
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

const ProfileItems = () => {
    const likedItems = author.creations.filter(item => item.isLiked);
    const {backendActor} = useAuth();
    const [englishAuctions, setEnglishAuctions] = useState([]);
    const [dutchAuctions, setDutchAuctions] = useState([]);
    const [sbAuctions, setSbAuctions] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getEnglishAuctions = async () => {
        const auctions = await backendActor.get_all_auctions_by_originator();
        const transformedEnglish = await Promise.all(auctions.map(a => transformAuction(a, 'english')));
        setEnglishAuctions(transformedEnglish);
    }

    const getDutchAuctions = async () => {
        const auctions = await backendActor.get_all_dutch_auctions_by_originator();
        const transformedDutch = await Promise.all(auctions.map(a => transformAuction(a, 'dutch')));
        setDutchAuctions(transformedDutch);
    }

    const getSbAuctions = async () => {
        const auctions = await backendActor.get_all_sb_auctions_by_originator();
        const transformedSb = await Promise.all(auctions.map(a => transformAuction(a, 'sb')));
        setSbAuctions(transformedSb);
    }


    const transformAuction = async (auction, auctionType) => {
        let imageUrl = img7;
        let highestBid = 0;

        try {
            const image = await backendActor.get_item_image(auction.id);
            if (image && image.length > 0) {
                imageUrl = URL.createObjectURL(new Blob([image.buffer], { type: 'image/jpeg' }));
            }
        } catch (error) {
            console.warn(`Failed to fetch image for ${auctionType} auction ${auction.id}:`, error);
        }

        // Only fetch bid details for English 
        if (auctionType == 'english') {
            try {
                const bidDetails = await backendActor.get_highest_bid_details(auction.id);
                if (bidDetails) {
                    highestBid = bidDetails.price;
                }
            } catch (error) {
                console.warn(`Failed to fetch bid details for ${auctionType} auction ${auction.id}:`, error);
            }
        }

        // const creator = await backendActor.get_auction_originator(auction.id);
        
        return {
            id: auction.id.toString(),
            title: auction.item.title || 'Untitled Auction',
            description: auction.item.description || '',
            price: highestBid,
            image: imageUrl,
            startPrice: auction.item.starting_price || 0,
            auctionType // Add auction type to distinguish between different types
        };
    };

    

    useEffect(() => {
        getEnglishAuctions();
        getDutchAuctions();
        getSbAuctions();
    }, [backendActor]);
    

    const tabs = [
        { label: `English (${englishAuctions.length})`, key: 'item-1', children: <SingleItems content={englishAuctions} /> },
        { label: `Dutch (${dutchAuctions.length})`, key: 'item-2', children: <SingleItems content={dutchAuctions} /> },
        { label: `Sealed-Bid (${sbAuctions.length})`, key: 'item-3', children: <SingleItems content={sbAuctions} /> }
    ];

    return (


        <StyledAuthorItems>
            <div className="container">


                <StyledTabs tabs={tabs} />
            </div>


        </StyledAuthorItems>

    )
}

export default ProfileItems