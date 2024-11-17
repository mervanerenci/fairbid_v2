

import Auction from './Auction';
import {ExploreGridContextAPI} from '@contexts/exploreGridContext';


const AuctionPage = () => {

    return (
        <ExploreGridContextAPI>
            <Auction  />
        </ExploreGridContextAPI>
    );
}

export default AuctionPage
