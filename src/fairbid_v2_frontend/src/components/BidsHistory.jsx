// components
import Avatar from '@ui/Avatar';
import Spring from '@components/Spring';
import img12 from '@assets/item/12.webp';

// utils
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import { useAuth } from '@contexts/useAuthClient';
import NewAvatar from '@components/NewAvatar';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const BidsHistory = ({ data  }) => {
    const [usernames, setUsernames] = useState({});
    

    const [bidderUsername, setBidderUsername] = useState(null);
    const { backendActor } = useAuth();
    
    const getBidderUsername = async (bidderPrincipal) => {
        try {
            const principalString = bidderPrincipal.toString();
           
            const username = await backendActor.get_username_by_principal(bidderPrincipal);
           
            setBidderUsername(username);
        } catch (error) {
            console.error("Error fetching username:", error);
            return null;
        }
    }


    function convertUnixToDateTime(unixTime) {
        const time = Number(unixTime);
        const date = new Date(time / 1000000);
        const timeString = date.toLocaleString();
   
        return timeString;

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
                    // <Spring key={bid.id} index={index}>
                        <div key={bid.id} className="d-flex align-items-center g-15">

                            
                            {bidderUsername === null ? (
                                <>
                                    <Avatar src={img12} isVerified={true} alt={bid.originator.toString()}
                                        size="sm" />
                                    <div className="text-sm">
                                        <p className="text-overflow">


                                            <span className="text-accent text-bold">{Number(bid.price).toFixed(2)} </span>


                                            by <span className="text-light text-bold">{bid.originator.toString()}</span>
                                        </p>
                                        <span className="text-xs">{convertUnixToDateTime(bid.time)}</span>
                                    </div>
                                </>
                            )
                                : (
                                    <>
                                        <NewAvatar username={bidderUsername} size={40} />
                                        <div className="text-sm">
                                            <p className="text-overflow">


                                                <span className="text-accent text-bold">{Number(bid.price).toFixed(2)} </span>


                                                by <span className="text-light text-bold">{bidderUsername}</span>
                                            </p>
                                            <span className="text-xs">{convertUnixToDateTime(bid.date)}</span>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    // </Spring>
                    )
                })
            }
        </div>
    )
}

export default BidsHistory