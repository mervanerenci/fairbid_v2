// styling
import styles from './style.module.scss';

// components
import SectionHeader from '@components/SectionHeader';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper';
import SwiperNav from '@ui/SwiperNav';
import {NavLink} from 'react-router-dom';

// hooks
import {useState} from 'react';
import {useWindowSize} from 'react-use';

// data placeholder
import browse from '@db/browse';

const Browse = () => {
    const [swiper, setSwiper] = useState(null);
    const {width} = useWindowSize();

    return (
        <section>
            <div className="container">
                <SectionHeader title="Browse by category">
                    <SwiperNav swiper={swiper} />
                </SectionHeader>
            </div>
            <div className={`${styles.wrapper} container`}
                 style={{marginLeft: width < 1600 ? 'auto' : 'calc((100% - 1400px) / 2)'}}>
                <Swiper onSwiper={setSwiper}
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        speed={1500}
                        spaceBetween={20}
                        loop={true}
                        loopedSlides={4}
                        slidesPerView="auto"
                        breakpoints={{
                            0: {
                                slidesPerView: 1
                            },
                            640: {
                                slidesPerView: 2
                            },
                            1170: {
                                slidesPerView: 3
                            },
                            1600: {
                                slidesPerView: 5
                            }
                        }}>
                    {
                        browse.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${styles.slide} border-hover bg-primary`}>
                                    <div className={styles.slide_grid}>
                                        {
                                            item.assets.map(asset => (
                                                <img className="border-10" key={asset.title} src={asset.image} alt={asset.title} />
                                            ))
                                        }
                                    </div>
                                    <NavLink className="slide_title link-hover h5" to="/explore">{item.title}</NavLink>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Browse