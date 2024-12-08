// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import AuctionDetails from '@layout/auction';

import { useParams } from 'react-router-dom';
import { useExploreGridContext } from '@contexts/exploreGridContext';


const Auction = () => {
    const { id } = useParams();
    const { items, loading, endedItems } = useExploreGridContext();
    

    if (loading) {
        return <div>Loading...</div>;
    }

    // Add items check
    if (!items || items.length === 0 && !endedItems || endedItems.length === 0) {
        console.log("No items available", items, endedItems);
        return <div>No items available</div>;
    }

    const auction = items.find(item => item.id === id) || endedItems.find(item => item.id === id);
    console.log("Found auction:", auction, "for id:", id);

    if (!auction) {
        return <div>Auction not found</div>;
    }



    return (
        <>
            <Title title={auction.title} />
            <SimplePageHeader title={auction.title} />
            <main>
                <AuctionDetails item={auction} />
            </main>
        </>
    );
}

export default Auction