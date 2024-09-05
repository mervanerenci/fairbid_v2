// styling
import styles from './style.module.scss';

// components
import AuthorTag from '@ui/AuthorTag';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, Thumbs} from 'swiper';
import Spring from '@components/Spring';

// hooks
import {useState} from 'react';

// utils
import {addZero} from '@utils/helpers';

const CollectionItem = ({item, index, isPrivate = false}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <Spring index={index}>
            <div className={`${styles.wrapper} border-hover bg-primary`}>
                <div className={styles.wrapper_content}>
                    <h4>{item.title}</h4>
                    <h6 className={styles.qty}>{addZero(item.qty)} NFT</h6>
                    <AuthorTag avatar={item.author.avatar}
                               name={item.author.nickname}
                               style={{pointerEvents: isPrivate ? 'none' : 'auto'}}/>
                </div>
                <div className={`${styles.media} shadow-overlay border-10`}>
                    <div>
                        <Swiper className={styles.media_cover}
                                modules={[EffectFade, Thumbs, Autoplay]}
                                effect="fade"
                                fadeEffect={{crossFade: true}}
                                loop={true}
                                speed={1500}
                                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                autoplay={{delay: 3000}}>
                            {
                                item.media.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={media.full} alt={item.title}/>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <Swiper className={styles.media_thumbs}
                                onSwiper={setThumbsSwiper}
                                modules={[Thumbs]}
                                spaceBetween={10}
                                slidesPerView="auto"
                                breakpoints={{
                                    0: {
                                        slidesPerView: 3
                                    }
                                }}
                                loop={true}
                                speed={1500}>
                            {
                                item.media.map((media, index) => (
                                    <SwiperSlide className={`${styles.slide} square border-10`} key={index}>
                                        <img src={media.thumbnail} alt={item.title}/>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </Spring>
    )
}

export default CollectionItem