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
import {useRef} from 'react';
import {useWindowSize} from 'react-use';

// utils
import dayjs from 'dayjs';

// assets
import product from '@assets/home/hero/art4.webp';
import productZoom from '@assets/home/hero/art4_lg.webp';
import creator from '@assets/item/creator.webp';
import collection from '@assets/item/collection.webp';

// data placeholder
import item from '@db/item';

import Questions from '@layout/auction/Questions';

const Table = () => {
    return (
        <table className={styles.table}>
            <tbody>
            <tr>
                <td className="text-bold text-accent">Owner</td>
                <td className="text-overflow">{item.details.owner}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Background</td>
                <td className="text-overflow">{item.details.background}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Blockchain</td>
                <td className="text-overflow">{item.details.blockchain}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Category</td>
                <td className="text-overflow">{item.details.category}</td>
            </tr>
            </tbody>
        </table>
    )
}

const AuctionDetails = () => {
    const {openBidModal} = useBidModalContext();
    const activeBids = item.bids.filter(item => item.active), prevBids = item.bids.filter(item => !item.active);
    const date = useRef(dayjs().add(7, 'days').toDate());
    const isSticky = useWindowSize().width >= 768;

    const tabs = [
        {label: 'Bids', key: 'item-1', children: <BidsHistory data={activeBids} active/>},
        // {label: 'History', key: 'item-2', children: <BidsHistory data={prevBids}/>},
        // {label: 'Details', key: 'item-3', children: <Table/>},
    ];

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
                            <Countdown date={date.current}
                                       renderer={({days, hours, minutes, seconds}) => {
                                           return <span className="h6">🔥 {days}d {hours}h {minutes}m {seconds}s</span>;
                                       }}/>
                            <h2 className={styles.title}>Handmade Painting</h2>
                            <div className={styles.bid}>
                                {/* <div className="d-flex g-10">
                                    On sale for <span className="text-light text-bold">100 ETH</span>
                                </div> */}
                                <div className="d-flex g-10">
                                    Highest bid <span className="text-accent text-bold">2 ETH</span>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className={styles.main_creator}>
                        <div className={`${styles.block} border-10`}>
                            <Avatar src={creator} alt="@thadraid" size="sm" isVerified/>
                            <div className={styles.block_details}>
                                <span className="text-xs">
                                    <span className="text-bold">Creator: </span>
                                    
                                </span>
                                <span className="text-sm text-bold text-light">@thadraid</span>
                            </div>
                        </div>
                        {/* <div className={`${styles.block} border-10`}>
                            <Avatar src={collection} alt="3D Collections" size="sm"/>
                            <div className={styles.block_details}>
                                <span className="text-xs text-bold">Collection</span>
                                <span className="text-sm text-bold text-light text-overflow">3D Collections</span>
                            </div>
                        </div> */}
                    </div>
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs}/>
                        <div className={styles.buttons}>
                            {/* <GradientBtn tag="button" onClick={openBidModal}>Buy for 20 ETH</GradientBtn> */}
                            <button className="btn btn--outline" onClick={openBidModal}>Place a bid</button>
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.main_block}>
                        <div className="d-flex flex-column g-20">
                            <Questions/>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default AuctionDetails