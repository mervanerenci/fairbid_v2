// styling
import styles from './style.module.scss';

// components
import SectionHeader from '@components/SectionHeader';
import AuthorTag from '@ui/AuthorTag';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper';
import CollapsedText from '@components/CollapsedText';
import SwiperNav from '@ui/SwiperNav';
import {NavLink} from 'react-router-dom';

// hooks
import {useState} from 'react';
import useMeasure from 'react-use-measure';

// data placeholder
import drops from '@db/drops';

const NotableDrops = () => {
    const [swiper, setSwiper] = useState(null);
    const [ref, {width}] = useMeasure();

    return (
        <section className={styles.drops}>
            <div className="container">
                <SectionHeader title="Notable Drops">
                    <SwiperNav swiper={swiper}/>
                </SectionHeader>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    className={styles.slider}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView="auto"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                    autoplay={{
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    speed={1700}
                    onSwiper={setSwiper}
                    pagination={{
                        clickable: true,
                        horizontalClass: styles.slider_pagination,
                    }}>
                    {
                        drops.map((drop, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${styles.drops_item} border-hover bg-primary`}>
                                    <div className={`${styles.media} border-10 shadow-overlay`}>
                                        <img src={drop.cover} alt={drop.title}/>
                                    </div>
                                    <div className={styles.main}>
                                        <span className="label-tag accent">{drop.tag}</span>
                                        <div ref={ref}>
                                            <NavLink className="text-overflow link-hover h5" to="/explore/item">
                                                {drop.title}
                                            </NavLink>
                                            <p className={styles.main_text}>
                                                <CollapsedText text={drop.text} width={width}/>
                                            </p>
                                            <AuthorTag name={drop.author.nickname} avatar={drop.author.avatar}/>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default NotableDrops