// components
import Avatar from '@ui/Avatar';
import Spring from '@components/Spring';
import img12 from '@assets/item/12.webp';

// utils
import dayjs from 'dayjs';
import { useState } from 'react';

import { useAuth } from '@contexts/useAuthClient';

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const BidsHistory = ({ data  }) => {

    const [bidderUsername, setBidderUsername] = useState(null);
    const { backendActor } = useAuth();
    const getBidderUsername = async (bidderPrincipal) => {
        try {
            const principalString = bidderPrincipal.toString();
            console.log("BidderPrincipal String:", principalString);
            const username = await backendActor.get_username_by_principal(bidderPrincipal);
            console.log("Bidder Username:", username);
            setBidderUsername(username);
        } catch (error) {
            console.error("Error fetching username:", error);
            return null;
        }
    }
    
    if (!Array.isArray(data)) {
        console.error("BidsHistory component received non-array data:", data);
        return <div>No bids available</div>;
    }
    return (
        <div className="d-flex flex-column g-20">
            {
                data.map((bid, index) => {
                    getBidderUsername(bid.originator);
                    return (
                    <Spring key={bid.id} index={index}>
                        <div className="d-flex align-items-center g-15">
                            {bidderUsername === null ? (
                                <>
                                    <Avatar src={img12} isVerified={true} alt={bid.originator.toString()}
                                        size="sm" />
                                    <div className="text-sm">
                                        <p className="text-overflow">


                                            <span className="text-accent text-bold">{bid.price} ETH</span>


                                            by <span className="text-light text-bold">{bid.originator.toString()}</span>
                                        </p>
                                        <span className="text-xs">{dayjs(dayjs().subtract(10, 'minutes')).fromNow()}</span>
                                    </div>
                                </>
                            )
                                : (
                                    <>
                                        <Avatar src={img12} isVerified={true} alt={bidderUsername}
                                            size="sm" />
                                        <div className="text-sm">
                                            <p className="text-overflow">


                                                <span className="text-accent text-bold">{bid.price} ETH</span>


                                                by <span className="text-light text-bold">{bidderUsername}</span>
                                            </p>
                                            <span className="text-xs">{dayjs(bid.date).fromNow()}</span>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </Spring>
                    )
                })
            }
        </div>
    )
}

export default BidsHistory