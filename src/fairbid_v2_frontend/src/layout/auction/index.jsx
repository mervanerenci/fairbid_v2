// styling
import styles from './style.module.scss';

// components
import ZoomViewer from '@components/ZoomViewer';
import StyledTabs from '@ui/StyledTabs';
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import Like from '@ui/Like';
import BidsHistory from '@components/BidsHistory';
import AskForm from '@components/AskForm';
import Countdown from 'react-countdown';
import Sticky from 'react-stickynode';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';
import {useRef, useEffect, useState} from 'react';
import {useWindowSize} from 'react-use';

// utils
import dayjs from 'dayjs';

// assets
import product from '@assets/home/hero/art4.webp';
import productZoom from '@assets/home/hero/art4_lg.webp';
import creator from '@assets/item/creator.webp';
import collection from '@assets/item/collection.webp';

// data placeholder
import itemz  from '@db/itemz';

import { useAuth } from '@contexts/useAuthClient';

import Questions from '@layout/auction/Questions';

const Table = () => {
    return (
        <table className={styles.table}>
            <tbody>
            <tr>
                <td className="text-bold text-accent">Owner</td>
                <td className="text-overflow">{itemz.details.owner}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Background</td>
                <td className="text-overflow">{itemz.details.background}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Blockchain</td>
                <td className="text-overflow">{itemz.details.blockchain}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Category</td>
                <td className="text-overflow">{itemz.details.category}</td>
            </tr>
            </tbody>
        </table>
    )
}

const AuctionDetails = ({item}) => {
    
    
    const {openBidModal} = useBidModalContext();
    const {identity, principal, backendActor} = useAuth();
    const activeBids = itemz.bids.filter(itemz => itemz.active), prevBids = itemz.bids.filter(itemz => !itemz.active);
    const date = useRef(dayjs().add(7, 'days').toDate());
    const isSticky = useWindowSize().width >= 768;
    const [originatorUsername, setOriginatorUsername] = useState(null);
    const [isOriginator, setIsOriginator] = useState(false);
    const [details, setDetails] = useState(null);
    const [bids, setBids] = useState([]);
    const [startPrice, setStartPrice] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [secretCode, setSecretCode] = useState(null);
    const [type, setType] = useState("english");
    const tabs = [
        {label: 'Bids', key: 'item-1', children: <BidsHistory data={bids} originatorUsername={originatorUsername}/>},
        // {label: 'History', key: 'item-2', children: <BidsHistory data={prevBids}/>},
        // {label: 'Details', key: 'item-3', children: <Table/>},
    ];

    const bidsStructure = {
        originator: '',
        time: '',
        price: '',
    }

    // For calculating remaining time
    function convertNanoToSeconds(nanoSeconds) {

        return Math.floor(nanoSeconds / 1000000000);

    }

    function convertUnixToDateTime(unixTime) {

        const date = new Date(unixTime / 1000000);
        const timeString = date.toLocaleString();
        console.log("Time string: ", timeString);
        return timeString;

    }


    const getBuyCode = async () => {

        const _id = parseInt(item.id);
        await backendActor.assign_buy_code(_id);
        console.log("Buy code assigned");
        const code = await backendActor.get_buy_code(_id);
        const secret = Number(code);
        // console.log("Buy Code: ", secret);
        setSecretCode(secret);

    }


    const getRemainingTime = async () => {
        const _id = parseInt(item.id);
        const remaining_time_nano = await backendActor.get_remaining_time(_id);
        const remaining_time = convertNanoToSeconds(remaining_time_nano);
        setRemainingTime(remaining_time);
    }
    // Log remaining time
    useEffect(() => {
        console.log("Remaining time:", remainingTime);
        getRemainingTime();
        setInterval(getRemainingTime, 1000);
        
    }, [remainingTime]);
    

    useEffect(() => {
        console.log("Auction item from auction_details:", item);
        console.log("Principal:", principal);

        const stringPrincipal = principal.toString();

        setType(item.auctionType);

        const fetchDetails = async () => {
            const _id = parseInt(item.id);
            try {   
                const _details = await backendActor.get_auction_details(_id);
                setDetails(_details[0]);
                console.log("Details:", _details[0]);

                const _bids = _details[0].bid_history;
                setBids(Number(_bids));
                console.log("Bids:", _bids);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0])    );
                console.log("Start price:", _startPrice[0]);

                const remaining_time_nano = await backendActor.get_remaining_time(_id);
                const remaining_time = convertNanoToSeconds(remaining_time_nano);
                setRemainingTime(remaining_time);


            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }

        const fetchOriginatorUsername = async () => {
            try {
                console.log("Fetching originator username for:", item.originator);
                const originatorUsername = await backendActor.get_username_by_principal(item.originator);
                console.log("Originator username:", originatorUsername); // This will now show the actual string
                return originatorUsername;
            } catch (error) {
                console.error("Error fetching username:", error);
                return null;
            }
        }

        fetchDetails();
        // Call the async function
        fetchOriginatorUsername().then(username => {

            if (username) {
                console.log("Originator has a username:", username);
                setOriginatorUsername(username);
            }

            if (principal.toString() !== item.originator.toString()) {
                console.log("You are NOT the originator of this auction");
                console.log("Original item originator:", item.originator.toString());
                setIsOriginator(false);
            } else {
                console.log("You are the originator of this auction");
                console.log("Original item originator:", item.originator.toString());
                setIsOriginator(true);
            }

        });
        

        
    }, []);

    const handleBidClick = () => {
        console.log("Opening bid modal for auction:", item.id);
        openBidModal(item.id);
    }

    return (
        <section className={styles.details}>
            <div className={`${styles.details_container} container`}>
                <Sticky enabled={isSticky} top={60} bottomBoundary="#item_main">
                    <div className="media square border-10">
                        <ZoomViewer originalImg={product} zoomedImg={productZoom} alt="Handmade Painting "/>
                    </div>
                </Sticky>
                <div className={styles.main} id="item_main">
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            
                            <span className="h6">🔥 {remainingTime} seconds</span>
                                       
                            <div>
                                
                                {/* {remainingTime ? convertUnixToDateTime(Number(remainingTime)) : "Loading..."} */}
                            </div>           
                            <h2 className={styles.title}>{item.title}</h2>
                            <div className={styles.bid}>
                                {type === "english" && (
                                    <div className="d-flex g-10">
                                        English Auction
                                    </div>
                                )}

                                {type === "dutch" && (
                                    <div className="d-flex g-10">
                                        Dutch Auction
                                    </div>
                                )}

                                {type === "sealed-bid" && (
                                    <div className="d-flex g-10">
                                        Sealed Bid Auction
                                    </div>
                                )}







                                {/* <div className="d-flex g-10">
                                    On sale for <span className="text-light text-bold">100 ETH</span>
                                </div> */}




                                <div className="d-flex g-10">
                                    Starting price <span className="text-accent text-bold">{startPrice} USD</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            {/* <Like className={`${styles.btn} ${styles.like} btn btn--icon`} count={item.likes}/> */}
                            <button className={`${styles.btn} btn btn--icon`} aria-label="Menu">
                                <i className="icon icon-ellipsis"/>
                            </button>
                        </div>
                    </div>
                    <p className={`${styles.main_text} text-sm`}>
                        {item.description}
                    </p>
                    <div className={styles.main_creator}>
                        <div className={`${styles.block} border-10`}>
                            <Avatar src={creator} alt="@thadraid" size="sm" isVerified/>
                            <div className={styles.block_details}>
                                <span className="text-xs">
                                    <span className="text-bold">Creator: </span>
                                    
                                </span>

                                {originatorUsername ? (
                                    <span className="text-sm text-bold text-light">{originatorUsername}</span>
                                ) : (
                                    <span className="text-sm text-bold text-light">{item.originator.toString()}</span>
                                )}


                                
                            </div>
                        </div>
                        
                    </div>

                    {remainingTime === 0 && (
                        <div>
                            <h2>Buy Code</h2>
                            <p>{secretCode}</p>
                            <button style={{ background: "white", color: "black" }} onClick={getBuyCode} >Click to Reveal</button>
    
                        </div>
                    )}
                    
                    {isOriginator ? (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs}/>
                        </div>
                    ) : (
                        <div className="main_tabs">
                        <StyledTabs tabs={tabs}/>
                        <div className={styles.buttons}>
                            {/* <GradientBtn tag="button" onClick={openBidModal}>Buy for 20 ETH</GradientBtn> */}
                            <button className="btn btn--outline" onClick={handleBidClick}>Place a bid</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.main}>
                    <div className={styles.main_block}>
                        <div className="d-flex flex-column g-20">
                            <Questions id={item.id} isOriginator={isOriginator} />
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default AuctionDetails