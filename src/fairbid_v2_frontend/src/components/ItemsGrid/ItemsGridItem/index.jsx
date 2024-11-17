// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import {NavLink} from 'react-router-dom';
import Countdown from 'react-countdown';
import Avatar from '@ui/Avatar';
import Like from '@ui/Like';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';

const ItemsGridItem = ({item, index}) => {
    const {id, title, price, image} = item;
    const {openBidModal} = useBidModalContext();

    return (
        <Spring index={index}>
            <div className={`${styles.wrapper} border-hover bg-primary`}>
                {/* <div className="author d-flex align-items-center g-10">
                    <Avatar src={author.avatar} alt={author.nickname} size="xs" isVerified={author.isVerified} />
                    <NavLink className="text-sm text-bold text-light link-hover link-hover--invert"
                          to="/author"
                          style={{pointerEvents: isPrivate ? 'none' : 'auto'}}>
                        @{author.nickname}
                    </NavLink>
                </div> */}
                <div className={`${styles.media} square border-10`}>
                    <LazyImage src={image} alt={title} />
                </div>
                <div className={styles.main}>
                    <div className="d-flex align-items-center justify-content-between g-10">
                        <NavLink className="h6 text-overflow link-hover" to={`/auction/${id}`}>
                            {title}
                        </NavLink>
                        <button aria-label="Menu">
                            <i className="icon icon-ellipsis"></i>
                        </button>
                    </div>
                    <div className={`${styles.main_price} text-sm text-bold`}>
                        <div className="d-flex g-10">
                            <span>{price} ETH</span>
                            {/* <span className="text-light">{available}/{qty}</span> */}
                        </div>
                        {/* {
                            // !isPrivate &&
                            <Countdown date={dayjs(hot).valueOf()}
                                       renderer={({days, hours, minutes}) => {
                                           return <span className="text-sm text-light" >
                                               🔥 {days}d {hours}h {minutes}m
                                           </span>;
                                       }}/>
                        } */}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className={`${styles.main_btn} text-accent text-sm link-hover link-hover--invert`}
                                onClick={openBidModal}>
                            { 'Place a bid'}
                        </button>
                        {/* <Like count={likes} isLiked={isLiked}/> */}
                    </div>
                </div>
            </div>
        </Spring>
    )
}

export default ItemsGridItem