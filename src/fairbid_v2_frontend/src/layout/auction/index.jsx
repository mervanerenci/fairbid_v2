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
import { useBidModalContext } from '@contexts/bidModalContext';
import { useRef, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useForm } from 'react-hook-form';


// utils
import dayjs from 'dayjs';

// assets
import product from '@assets/home/hero/art4.webp';
import productZoom from '@assets/home/hero/art4_lg.webp';
import creator from '@assets/item/creator.webp';
import collection from '@assets/item/collection.webp';

// data placeholder
import itemz from '@db/itemz';

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

const AuctionDetails = ({ item }) => {


    const { openBidModal } = useBidModalContext();
    const { identity, principal, backendActor } = useAuth();

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
    const [isEth, setIsEth] = useState(false);
    const [contact, setContact] = useState(null);
    const [location, setLocation] = useState(null);
    const [isEnded, setIsEnded] = useState(false);
    const [winnerPrincipal, setWinnerPrincipal] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [currentBidDutch, setCurrentBidDutch] = useState(null);
    const [lowerAmount, setLowerAmount] = useState(null);


    const tabs = [
        { label: 'Bids', key: 'item-1', children: <BidsHistory data={item.bids} /> },
        // {label: 'History', key: 'item-2', children: <BidsHistory data={prevBids}/>},
        // {label: 'Details', key: 'item-3', children: <Table/>},
    ];

    const bidsStructure = {
        originator: '',
        time: '',
        price: '',
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
        if (remaining_time === 0) {
            setIsEnded(true);
        }
    }

    const getRemainingTimeDutch = async () => {
        const _id = parseInt(item.id);
        const remaining_time_nano = await backendActor.get_remaining_time_dutch(_id);
        const remaining_time = convertNanoToSeconds(remaining_time_nano);
        setRemainingTime(remaining_time);
        if (remaining_time === 0) {
            setIsEnded(true);
        }
    }

    const getRemainingTimeSb = async () => {
        const _id = parseInt(item.id);
        const remaining_time_nano = await backendActor.get_remaining_time_sb(_id);
        const remaining_time = convertNanoToSeconds(remaining_time_nano);
        setRemainingTime(remaining_time);
        if (remaining_time === 0) {
            setIsEnded(true);
        }
    }



    const getBids = async () => {
        const _id = parseInt(item.id);

        try {
            const _bids = await backendActor.get_all_bids(_id);
            setBids(_bids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    }

    const getBidsDutch = async () => {
        const _id = parseInt(item.id);
        try {
            const _bids = await backendActor.get_all_bids_by_dutch_auction_id(_id);
            setBids(_bids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    }

    const getBidsSb = async () => {
        const _id = parseInt(item.id);
        try {
            const _bids = await backendActor.get_all_sb_bids_by_auction_id(_id);
            setBids(_bids);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    }

    const getHighestBid = async () => {
        const _id = parseInt(item.id);
        const _highestBid = await backendActor.get_highest_bid_details(_id);
        console.log("AAA- Highest bid:", _highestBid);
        setHighestBid(_highestBid);
    }

    const getCurrentBidDutch = async () => {
        const _id = parseInt(item.id);
        const _currentBid = await backendActor.get_current_bid_dutch(_id);
        setHighestBid(_currentBid);
    }

    const getWinner = async () => {
        const _id = parseInt(item.id);
        const _winner = await backendActor.get_highest_bidder(_id);
        setWinnerPrincipal(_winner);
    }

    const getWinnerDutch = async () => {
        const _id = parseInt(item.id);
        const _winner = await backendActor.get_dutch_winner_by_auction_id(_id);
        setWinnerPrincipal(_winner);
    }

    const getWinnerSb = async () => {
        const _id = parseInt(item.id);
        const _winner = await backendActor.get_sb_winner_by_auction_id(_id);
        setWinnerPrincipal(_winner);
    }

    const fetchImage = async () => {
        const _id = parseInt(item.id);
        const image = await backendActor.get_item_image(_id);
        console.log("AAA- Image:", image);


        const blob = new Blob([image], { type: 'image/png' });
        let image_png = await convertToDataUrl(blob);


        setImageData(image_png);
    }




    const transferPrice = async () => {
        await backendActor.transfer_price(item.originator, highestBid);
    }

    // Log remaining time
    useEffect(() => {
        console.log(",,AAA- Auction type:", item.auctionType);

        if (item.auctionType === "english") {
            getRemainingTime();
            setInterval(getRemainingTime, 1000);

            getBids();
            setInterval(getBids, 12000);
        } else if (item.auctionType === "dutch") {
            getRemainingTimeDutch();
            setInterval(getRemainingTimeDutch, 1000);

            getBidsDutch();
            setInterval(getBidsDutch, 12000);
        } else {
            getRemainingTimeSb();
            setInterval(getRemainingTimeSb, 1000);

            getBidsSb();
            setInterval(getBidsSb, 12000);
        }

    }, [remainingTime]);


    // Get highest bid and winner when auction is ended
    useEffect(() => {
        if (item.auctionType === "english") {
            getHighestBid();
            getWinner();
        } else if (item.auctionType === "dutch") {
            getCurrentBidDutch();
            getWinnerDutch();
        } else {
            getWinnerSb();
        }

    }, [isEnded]);


    // Fetch all necessary details
    useEffect(() => {
        console.log("AAA- Auction item from auction_details:", item);
        console.log("AAA- Principal:", principal);

        const stringPrincipal = principal.toString();

        setType(item.auctionType);
        console.log("AAA- Auction type:", item.auctionType);

        const fetchDetails = async () => {
            const _id = parseInt(item.id);


            try {
                const _details = await backendActor.get_auction_details(_id);
                setDetails(_details[0]);
                console.log("AAAAAAA- Details:", _details[0]);

                const _bids = _details[0].bid_history;
                setBids(_bids);
                console.log("AAA- Bids:", _bids);
                console.log("AAA- Contact:", _details[0].contact);
                setContact(_details[0].contact);
                console.log("AAA- Location:", _details[0].location);
                setLocation(_details[0].location);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));
                console.log("AAA- Start price:", _startPrice[0]);

                // const remaining_time_nano = await backendActor.get_remaining_time(_id);
                // const remaining_time = convertNanoToSeconds(remaining_time_nano);
                // setRemainingTime(remaining_time);
                console.log("AAA-Calling Is Eth value and with Id:", _id);
                const _isEth = await backendActor.get_auction_is_eth(_id);
                console.log("AAA- Is Eth:", _isEth);
                setIsEth(_isEth);



            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }

        const fetchDetailsDutch = async () => {
            const _id = parseInt(item.id);

            try {
                const _details = await backendActor.get_dutch_auction_details(_id);
                setDetails(_details[0]);
                console.log("DDAAA- Details:", _details[0]);

                const _bids = _details[0].bid_history;
                setBids(_bids);
                console.log("DDAAA- Bids:", _bids);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));
                console.log("DDAAA- Start price:", _startPrice[0]);

                const _contact = details[0].contact;
                setContact(_contact);
                console.log("DDAAA- Contact:", _contact);

                const _location = details[0].location;
                setLocation(_location);
                console.log("DDAAA- Location:", _location);

                // const remaining_time_nano = await backendActor.get_remaining_time_dutch(_id);
                // const remaining_time = convertNanoToSeconds(remaining_time_nano);
                // setRemainingTime(remaining_time);

                const _isEth = await backendActor.get_dutch_auction_is_eth(_id);
                setIsEth(_isEth);
                console.log("DDAAA- Is Eth:", _isEth);
            } catch (error) {
                console.error("Error fetching dutch details:", error);
            }
        }

        const fetchDetailsSb = async () => {
            const _id = parseInt(item.id);
            try {
                const _details = await backendActor.get_sb_auction_details(_id);
                console.log("SBAAA- Details:", _details[0]);
                setDetails(_details[0]);

                const _bids = _details[0].bid_history;
                setBids(_bids);
                console.log("SBAAA- Bids:", _bids);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));
                console.log("SBAAA- Start price:", _startPrice[0]);

                const _contact = details[0].contact;
                setContact(_contact);
                console.log("SBAAA- Contact:", _contact);

                const _location = details[0].location;
                setLocation(_location);
                console.log("SBAAA- Location:", _location);

                const _isEth = await backendActor.get_sb_auction_is_eth(_id);
                setIsEth(_isEth);
                console.log("SBAAA- Is Eth:", _isEth);

            } catch (error) {
                console.error("Error fetching sealed bid details:", error);
            }
        }

        const fetchOriginatorUsername = async () => {
            try {
                console.log("AAA- Fetching originator username for:", item.originator);
                const originatorUsername = await backendActor.get_username_by_principal(item.originator);
                console.log("AAA- Originator username:", originatorUsername); // This will now show the actual string
                return originatorUsername;
            } catch (error) {
                console.error("Error fetching username:", error);
                return null;
            }
        }

        if (item.auctionType === "sealed-bid") {
            console.log("fetching sealed bid details");
            fetchDetailsSb();
        } else if (item.auctionType === "dutch") {
            console.log("fetching dutch auction details");
            fetchDetailsDutch();
        } else {
            console.log("fetching english auction details");
            fetchDetails();
        }

        // Call the async function
        fetchOriginatorUsername().then(username => {

            if (username) {
                console.log("AAA- Originator has a username:", username);
                setOriginatorUsername(username);
            }

            if (principal.toString() !== item.originator.toString()) {
                console.log("AAA- You are NOT the originator of this auction");
                console.log("AAA- Original item originator:", item.originator.toString());
                setIsOriginator(false);
            } else {
                console.log("AAA- You are the originator of this auction");
                console.log("AAA- Original item originator:", item.originator.toString());
                setIsOriginator(true);
            }

        });



    }, []);

    useEffect(() => {
        fetchImage();
        getQrCode(parseInt(item.id));

    }, []);





    const handleBidClick = () => {
        console.log("AAA- Opening bid modal for auction:", item.id);
        openBidModal(item.id, item.auctionType);
    }

    const handleTransferClick = () => {
        console.log("AAA- Transferring price for auction:", item.id);
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

    async function getQrCode(id) {

        let input = "http://127.0.0.1:4943/auction/" + id;

        // console.log("Getting data url with input: ", input);
        let qr_result;
        qr_result = await backendActor.get_qr_code(input);


        const blob = new Blob([qr_result], { type: 'image/png' });
        let dataUrl = await convertToDataUrl(blob);
        // console.log("Qr_Data_Url: ", dataUrl);

        setQrData(dataUrl);
    }

    // For converting blob to data url to get image
    function convertToDataUrl(blob) {
        return new Promise((resolve, _) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = function () {
                resolve(fileReader.result);
            }
        });
    }

    const QrCodeComponent = () => {
        return (
            <div className={styles.qr_container}>
                <h3 className={styles.qr_title}>Share Auction</h3>
                <div className={styles.qr_code}>
                    <img src={qrData} alt="QR Code" />
                    <p className={styles.qr_text}>Scan to view on mobile</p>
                </div>
            </div>
        )
    }

    const EnglishAuctionComponent = () => {
        return (
            <div>
                <div className={styles.main} id="item_main">
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {remainingTime === 0 ? (
                                <span className="h6">🚫 Auction Ended</span>
                            ) : (
                                <span className="h6">🔥 {remainingTime} seconds</span>
                            )}


                            <div>

                                {/* {remainingTime ? convertUnixToDateTime(Number(remainingTime)) : "Loading..."} */}
                            </div>
                            <h2 className={styles.title}>{item.title}</h2>
                            <div className={styles.bid}>
                                
                                    <div className="d-flex g-10">
                                        English Auction
                                    </div>
                                

                                







                                {/* <div className="d-flex g-10">
                                    On sale for <span className="text-light text-bold">100 ETH</span>
                                </div> */}



                                {isEth ? (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} ETH</span>
                                    </div>
                                ) : (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} USD</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            {/* <Like className={`${styles.btn} ${styles.like} btn btn--icon`} count={item.likes}/> */}
                            {/* <button className={`${styles.btn} btn btn--icon`} aria-label="Menu">
                                <i className="icon icon-ellipsis"/>
                            </button> */}
                        </div>
                    </div>
                    <p className={`${styles.main_text} text-sm`}>
                        {item.description}
                    </p>

                    {/* Contact and Location */}
                    <div className="d-flex g-10">
                        <span className="text-bold">Contact: {item.contact}</span>
                    </div>
                    <div className="d-flex g-10">
                        <span className="text-bold">Location: {item.location}</span>
                    </div>


                    <div className={styles.main_creator}>
                        <div className={`${styles.block} border-10`}>
                            {/* <Avatar src={creator} alt="@thadraid" size="sm" isVerified /> */}
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

                    {(remainingTime === 0 && (principal === winnerPrincipal || isOriginator)) && (
                        (isEth) ? (
                            <div>
                                <button className="btn btn--outline" onClick={handleTransferClick}>Transfer Price ({Number(highestBid)} ETH)</button>
                            </div>

                        ) : (
                            <div>
                                <h2>Buy Code</h2>
                                <p>{secretCode}</p>
                                <button style={{ background: "white", color: "black" }} onClick={getBuyCode} >Click to Reveal</button>

                            </div>
                        )
                    )}

                    {isOriginator ? (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                        </div>
                    ) : (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                            <div className={styles.buttons}>
                                {/* <GradientBtn tag="button" onClick={openBidModal}>Buy for 20 ETH</GradientBtn> */}
                                <button className="btn btn--outline" onClick={handleBidClick}>Place a bid</button>
                            </div>
                        </div>
                    )}
                    <QrCodeComponent />
                </div>
            </div>
        )
    }

    const DutchAuctionComponent = () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            reset
        } = useForm();

        const onLowerPrice = async (data) => {
            try {
                const _id = parseInt(item.id);
                await backendActor.lower_price(_id, Number(data.lowerAmount));
                console.log("Price lowered successfully to amount", Number(data.lowerAmount));
                // Refresh current price
                getCurrentBidDutch();
                reset(); // Clear form after successful submission
            } catch (error) {
                console.error("Error lowering price:", error);
                alert("Failed to lower price");
            }
        };

        const handleAcceptPrice = async () => {
            try {
                await backendActor.accept_price(item.id);
                console.log("AAA- Price accepted successfully");
            } catch (error) {
                console.error("Error accepting price:", error);
            }
        }

     

        return (
            <div>
                <div className={styles.main} id="item_main">
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {remainingTime === 0 ? (
                                <span className="h6">🚫 Auction Ended</span>
                            ) : (
                                <span className="h6">🔥 {remainingTime} seconds</span>
                            )}


                            <div>

                               
                            </div>
                            <h2 className={styles.title}>{item.title}</h2>
                            <div className={styles.bid}>
                                
                                    
                                

                                
                                    <div className="d-flex g-10">
                                        Dutch Auction
                                    </div>
                                

                               









                                {isEth ? (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} ETH</span>
                                    </div>
                                ) : (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} USD</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            
                        </div>
                    </div>
                    <p className={`${styles.main_text} text-sm`}>
                        {item.description}
                    </p>

                    {/* Contact and Location */}
                    <div className="d-flex g-10">
                        <span className="text-bold">Contact: {item.contact}</span>
                    </div>
                    <div className="d-flex g-10">
                        <span className="text-bold">Location: {item.location}</span>
                    </div>


                    <div className={styles.main_creator}>
                        <div className={`${styles.block} border-10`}>
                            {/* <Avatar src={creator} alt="@thadraid" size="sm" isVerified /> */}
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

                    {(remainingTime === 0 && (principal === winnerPrincipal || isOriginator)) && (
                        (isEth) ? (
                            <div>
                                <button className="btn btn--outline" onClick={handleTransferClick}>Transfer Price ({Number(highestBid)} ETH)</button>
                            </div>

                        ) : (
                            <div>
                                <h2>Buy Code</h2>
                                <p>{secretCode}</p>
                                <button style={{ background: "white", color: "black" }} onClick={getBuyCode} >Click to Reveal</button>

                            </div>
                        )
                    )}

                    {isOriginator ? (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                            {/* lower price button and input area */}
                            <div className={styles.price_lower_container}>
                                <form
                                    className={styles.price_lower_container}
                                    onSubmit={handleSubmit(onLowerPrice)}
                                >
                                    <div className={styles.price_lower_input}>
                                        <input
                                            type="number"
                                            placeholder="Amount to lower"
                                            step="any"
                                            {...register("lowerAmount", {
                                                required: "Amount is required",
                                                min: {
                                                    value: 0.000001,
                                                    message: "Amount must be greater than 0"
                                                },
                                                validate: value =>
                                                    Number(value) <= Number(highestBid) ||
                                                    "Amount cannot be greater than current price"
                                            })}
                                            className={`form-control ${errors.lowerAmount ? styles.error : ''}`}
                                        />
                                        <span>{isEth ? 'ETH' : 'USD'}</span>
                                    </div>
                                    {errors.lowerAmount && (
                                        <span className={styles.error_message}>
                                            {errors.lowerAmount.message}
                                        </span>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn--outline"
                                    >
                                        Lower Price
                                    </button>
                                </form>
                            </div>

                        </div>
                    ) : (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                            <div className={styles.buttons}>
                                {/* <GradientBtn tag="button" onClick={openBidModal}>Buy for 20 ETH</GradientBtn> */}
                                <button
                                    className="btn btn--gradient"
                                    onClick={handleAcceptPrice}
                                >
                                    Accept Current Price {isEth ? `(${Number(highestBid)} ETH)` : `($${Number(highestBid)})`}
                                </button>
                            </div>
                        </div>
                    )}
                    <QrCodeComponent />
                </div>
            </div>
        )
    }

    const SealedBidAuctionComponent = () => {
        return (
            <div>
                <div>
                <div className={styles.main} id="item_main">
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {remainingTime === 0 ? (
                                <span className="h6">🚫 Auction Ended</span>
                            ) : (
                                <span className="h6">🔥 {remainingTime} seconds</span>
                            )}


                            <div>

                                {/* {remainingTime ? convertUnixToDateTime(Number(remainingTime)) : "Loading..."} */}
                            </div>
                            <h2 className={styles.title}>{item.title}</h2>
                            <div className={styles.bid}>
                            
                                
                                    <div className="d-flex g-10">
                                        Sealed Bid Auction
                                    </div>
                                







                                {/* <div className="d-flex g-10">
                                    On sale for <span className="text-light text-bold">100 ETH</span>
                                </div> */}



                                {isEth ? (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} ETH</span>
                                    </div>
                                ) : (
                                    <div className="d-flex g-10">
                                        Starting price <span className="text-accent text-bold">{Number(item.startPrice)} USD</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            {/* <Like className={`${styles.btn} ${styles.like} btn btn--icon`} count={item.likes}/> */}
                            {/* <button className={`${styles.btn} btn btn--icon`} aria-label="Menu">
                                <i className="icon icon-ellipsis"/>
                            </button> */}
                        </div>
                    </div>
                    <p className={`${styles.main_text} text-sm`}>
                        {item.description}
                    </p>

                    {/* Contact and Location */}
                    <div className="d-flex g-10">
                        <span className="text-bold">Contact: {item.contact}</span>
                    </div>
                    <div className="d-flex g-10">
                        <span className="text-bold">Location: {item.location}</span>
                    </div>


                    <div className={styles.main_creator}>
                        <div className={`${styles.block} border-10`}>
                            {/* <Avatar src={creator} alt="@thadraid" size="sm" isVerified /> */}
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
                            <h2>Winner Bid: {isEth ? `${Number(highestBid)} ETH` : `$${Number(highestBid)}`}</h2>
                        </div>
                    )}

                    {(remainingTime === 0 && (principal === winnerPrincipal || isOriginator)) && (
                        (isEth) ? (
                            <div>
                                <button className="btn btn--outline" onClick={handleTransferClick}>Transfer Price ({Number(highestBid)} ETH)</button>
                            </div>

                        ) : (
                            <div>
                                <h2>Buy Code</h2>
                                <p>{secretCode}</p>
                                <button style={{ background: "white", color: "black" }} onClick={getBuyCode} >Click to Reveal</button>

                            </div>
                        )
                    )}

                    {isOriginator ? (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                        </div>
                    ) : (
                        <div className="main_tabs">
                            {/* <StyledTabs tabs={tabs} /> */}
                            <div className={styles.buttons}>
                                {/* <GradientBtn tag="button" onClick={openBidModal}>Buy for 20 ETH</GradientBtn> */}
                                <button className="btn btn--outline" onClick={handleBidClick}>Place a bid</button>
                            </div>
                        </div>
                    )}
                    <QrCodeComponent />
                </div>
            </div>
            </div>
        )
    }

    return (
        <section className={styles.details}>
            <div className={`${styles.details_container} container`}>
                <Sticky enabled={isSticky} top={60} bottomBoundary="#item_main">

                    {imageData ? (
                        <div className="media square border-10">
                            <ZoomViewer originalImg={imageData} zoomedImg={imageData} alt="Handmade Painting " />
                        </div>
                    ) : (
                        <div className="media square border-10">
                            <ZoomViewer originalImg={product} zoomedImg={productZoom} alt="Handmade Painting " />
                        </div>
                    )}
                </Sticky>

                {item.auctionType === "english" && (
                    <EnglishAuctionComponent />
                )}

                {item.auctionType === "dutch" && (
                    <DutchAuctionComponent />
                )}

                {item.auctionType === "sealed-bid" && (
                    <SealedBidAuctionComponent />
                )}

                <div className={styles.secondary_content}>
                    <div className={styles.main}>
                        <div className={styles.main_block}>
                            <div className="d-flex flex-column g-20">
                                <Questions id={item.id} isOriginator={isOriginator} />
                            </div>
                        </div>
                    </div>
                    
                </div>

                
            </div>

        </section>
    )
}

export default AuctionDetails