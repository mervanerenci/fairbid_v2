// styling
import styles from './style.module.scss';

// components
import ZoomViewer from '@components/ZoomViewer';
import StyledTabs from '@ui/StyledTabs';
import BidsHistory from '@components/BidsHistory';
import Sticky from 'react-stickynode';
import { toast } from 'react-toastify';
import NewAvatar from '@components/NewAvatar';
import Questions from '@layout/auction/Questions';

// hooks
import { useBidModalContext } from '@contexts/bidModalContext';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@contexts/useAuthClient';
import { useWindowSize } from 'react-use';
import { useForm } from 'react-hook-form';

// utils
import dayjs from 'dayjs';

// assets
import product from '@assets/home/hero/art4.webp';
import productZoom from '@assets/home/hero/art4_lg.webp';

// data placeholder
import itemz from '@db/itemz';





const AuctionDetails = ({ item }) => {


    const { openBidModal } = useBidModalContext();
    const { principal, backendActor, isAuthenticated } = useAuth();

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
    const [qrData, setQrData] = useState("");
    const [imageData, setImageData] = useState(null);
    const [currentBidDutch, setCurrentBidDutch] = useState(null);
    const [lowerAmount, setLowerAmount] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();




    const tabs = [
        { label: 'Bids', key: 'item-1', children: <BidsHistory data={item.bids} /> },
    ];

    const bidsStructure = {
        originator: '',
        time: '',
        price: '',
    }


    /////////// GETTERS AND SETTERS START ///////////

    const getBuyCode = async () => {

        try {
            const _id = parseInt(item.id);
            await backendActor.assign_buy_code(_id);
            console.log("Buy code assigned");
            const code = await backendActor.get_buy_code(_id);
            const secret = Number(code);
            setSecretCode(secret);
        } catch (error) {
            console.error("Error getting buy code:", error);
            toast.error("Failed to get buy code");
        }

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



    const getHighestBid = async () => {
        const _id = parseInt(item.id);
        const _highestBid = await backendActor.get_highest_bid_details(_id);

        setHighestBid(_highestBid);
    }

    const getLastElementOfBids = async () => {
        const bids_array = item.bids;

        const last_element = bids_array[bids_array.length - 1];

        setHighestBid(last_element);
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

    /////////// GETTERS AND SETTERS END ///////////




    /////////// FETCHERS START ///////////

    const fetchImage = async () => {
        const _id = parseInt(item.id);
        const image = await backendActor.get_item_image(_id);



        const blob = new Blob([image], { type: 'image/png' });
        let image_png = await convertToDataUrl(blob);


        setImageData(image_png);
    }


    /////////// FETCHERS END ///////////



    /////////// HANDLERS START ///////////
    const transferPrice = async () => {
        await backendActor.transfer_price(item.originator, highestBid);
    }

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

    const handleBidClick = useCallback(() => {

        openBidModal(item.id, item.auctionType);
    }, [item.id, item.auctionType, openBidModal]);

    const handleTransferClick = useCallback(() => {
        console.log("AAA- Transferring price for auction:", item.id);
    }, [item.id]);

    /////////// HANDLERS END ///////////



    /////////// USE EFFECTS START ///////////

    // Log remaining time
    useEffect(() => {
        let timeInterval;
        // let bidsInterval;


        const updateTime = async () => {  // Make this function async
            try {
                if (item.auctionType === "english") {
                    await getRemainingTime();  // Await the promise
                } else if (item.auctionType === "dutch") {
                    await getRemainingTimeDutch();  // Await the promise
                } else {
                    await getRemainingTimeSb();  // Await the promise
                }
            } catch (error) {
                console.error("Error updating time:", error);
            }
        };

       

        updateTime();
        

        timeInterval = setInterval(updateTime, 1000);
        // bidsInterval = setInterval(updateBids, 12000);
        return () => {
            clearInterval(timeInterval);
            // clearInterval(bidsInterval);
        };

    }, [item.auctionType]);



    // Get highest bid and winner when auction is ended
    useEffect(() => {
        if (item.auctionType === "english") {
            getHighestBid();
            getWinner();
        } else if (item.auctionType === "dutch") {
            getCurrentBidDutch();
            getWinnerDutch();
        } else {
            getLastElementOfBids();
            getWinnerSb();
        }

    }, [isEnded]);


    // Fetch all necessary details
    useEffect(() => {

        const stringPrincipal = principal.toString();
        setType(item.auctionType);

        const fetchDetails = async () => {
            const _id = parseInt(item.id);
            try {
                const _details = await backendActor.get_auction_details(_id);
                setDetails(_details[0]);

                const _bids = _details[0].bid_history;

                setBids(_bids);
                setContact(_details[0].contact);
                setLocation(_details[0].location);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));


            

                const _isEth = await backendActor.get_auction_is_eth(_id);
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


                const _bids = _details[0].bid_history;
                setBids(_bids);


                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));

                const _contact = details[0].contact;
                setContact(_contact);

                const _location = details[0].location;
                setLocation(_location);


                const _isEth = await backendActor.get_dutch_auction_is_eth(_id);
                setIsEth(_isEth);

            } catch (error) {
                console.error("Error fetching dutch details:", error);
            }
        }

        const fetchDetailsSb = async () => {
            const _id = parseInt(item.id);
            try {
                const _details = await backendActor.get_sb_auction_details(_id);

                setDetails(_details[0]);

                const _bids = _details[0].bid_history;
                setBids(_bids);

                const _startPrice = _details[0].starting_price;
                setStartPrice(Number(_startPrice[0]));


                const _contact = details[0].contact;
                setContact(_contact);

                const _location = details[0].location;
                setLocation(_location);

                const _isEth = await backendActor.get_sb_auction_is_eth(_id);
                setIsEth(_isEth);


            } catch (error) {
                console.error("Error fetching sealed bid details:", error);
            }
        }

        const fetchOriginatorUsername = async () => {
            try {

                const originatorUsername = await backendActor.get_username_by_principal(item.originator);

                return originatorUsername;
            } catch (error) {
                console.error("Error fetching username:", error);
                return null;
            }
        }

        if (item.auctionType === "sealed-bid") {

            fetchDetailsSb();
        } else if (item.auctionType === "dutch") {

            fetchDetailsDutch();
        } else {

            fetchDetails();
        }

        getQrCode(parseInt(item.id));

        // Call the async function
        fetchOriginatorUsername().then(username => {

            if (username) {

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

    useEffect(() => {
        fetchImage();
        getQrCode(parseInt(item.id));

    }, []);

    useEffect(() => {
        console.log("qrData state updated:", qrData);
    }, [qrData]);



    /////////// USE EFFECTS END ///////////



    /////////// HELPER FUNCTIONS START ///////////

    // For calculating remaining time
    function convertNanoToSeconds(nanoSeconds) {

        return Math.floor(nanoSeconds / 1000000000);

    }

    function convertUnixToDateTime(unixTime) {

        const date = new Date(unixTime / 1000000);
        const timeString = date.toLocaleString();

        return timeString;

    }

    async function getQrCode(id) {

        try {
            let input = "https://2umgr-waaaa-aaaal-artta-cai.icp0.io/#/auction/" + id;
            console.log("Getting data url with input: ", input);

            const qr_result = await backendActor.get_qr_code(input);
            const blob = new Blob([qr_result], { type: 'image/png' });
            const dataUrl = await convertToDataUrl(blob);

            console.log("Qr_Data_Url before setState: ", dataUrl);
            setQrData(dataUrl);
            console.log("State updated with QR data");
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
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

    /////////// HELPER FUNCTIONS END ///////////


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

    const EnglishAuctionComponent = useMemo(() =>
    (
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
                                English Auction
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

                {isOriginator || isAuthenticated == false ? (
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs} />
                    </div>
                ) : (
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs} />
                        <div className={styles.buttons}>
                           
                            <button className="btn btn--outline" onClick={handleBidClick}>Place a bid</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    ), [remainingTime, highestBid, bids, isEnded, secretCode]);

    const DutchAuctionComponent = useMemo(() =>


    (
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
                       
                        {originatorUsername ? (
                            <NewAvatar src={originatorUsername} alt="" size="sm" isVerified />
                        ) : (
                            <></>
                        )}
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
                            
                            <button
                                className="btn btn--gradient"
                                onClick={handleAcceptPrice}
                            >
                                Accept Current Price {isEth ? `(${Number(highestBid)} ETH)` : `($${Number(highestBid)})`}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    ), [remainingTime, highestBid, bids, isEnded, secretCode]);

    const SealedBidAuctionComponent = useMemo(() =>
    (
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

                                
                            </div>
                            <h2 className={styles.title}>{item.title}</h2>
                            <div className={styles.bid}>


                                <div className="d-flex g-10">
                                    Sealed Bid Auction
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
                           
                            {originatorUsername ? (
                                <NewAvatar src={originatorUsername} alt="" size="sm" isVerified />
                            ) : (
                                <></>
                            )}
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

                    {isOriginator || isAuthenticated == false ? (
                        <div className="main_tabs">
                            <StyledTabs tabs={tabs} />
                        </div>
                    ) : (
                        <div className="main_tabs">
                            
                            <div className={styles.buttons}>
                                
                                <button className="btn btn--outline" onClick={handleBidClick}>Place a bid</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    ), [remainingTime, highestBid, bids, isEnded, secretCode]);

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

                {item.auctionType === "english" && EnglishAuctionComponent}

                {item.auctionType === "dutch" && DutchAuctionComponent}

                {item.auctionType === "sealed-bid" && SealedBidAuctionComponent}

                <div className={styles.secondary_content}>
                    <div className={styles.main}>
                        <div className={styles.main_block}>
                            <div className="d-flex flex-column g-20">
                                <Questions id={item.id} isOriginator={isOriginator} />
                            </div>
                        </div>
                    </div>

                </div>

                <QrCodeComponent />


            </div>

        </section>
    )
}

export default AuctionDetails