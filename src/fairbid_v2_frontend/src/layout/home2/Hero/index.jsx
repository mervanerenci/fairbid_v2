// styling
import styles from './style.module.scss';

// components
import {NavLink} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination} from 'swiper';
import {SlidePrev, SlideNext} from '@ui/SwiperNav';

// hooks
import {useState} from 'react';

// assets
import img1 from '@assets/home2/hero/1.webp';
import img2 from '@assets/home2/hero/2.webp';
import img3 from '@assets/home2/hero/3.webp';
import img4 from '@assets/home2/hero/4.webp';
import img5 from '@assets/home2/hero/5.webp';
import img6 from '@assets/home2/hero/6.webp';

const Hero = () => {
    const [swiper, setSwiper] = useState(null);

    const items = [
        {
            title: 'Abstract figures',
            author: 'fershonorm',
            img: img1,
        },
        {
            title: 'Black balaclava',
            author: 'veresarrisal',
            img: img2,
        },
        {
            title: 'Colored dreams',
            author: 'sheeliani',
            img: img3,
        },
        {
            title: 'Into the fire',
            author: 'fershonorm',
            img: img4,
        },
        {
            title: 'Green Dino',
            author: 'marcoguglie',
            img: img5,
        },
        {
            title: 'All eyes on you',
            author: 'berserkirr',
            img: img6,
        }
    ];

    return (
        <div className={styles.hero}>
            <div className={`${styles.hero_container} container`}>
                <Swiper onSwiper={setSwiper}
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView="auto"
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1440: {
                                slidesPerView: 3,
                            }
                        }}
                        navigation={{
                            prevEl: '.navigator--prev',
                            nextEl: '.navigator--next',
                        }}
                        pagination={{
                            clickable: true,
                            horizontalClass: styles.hero_pagination,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={1500}
                        loop={true}>
                    {
                        items.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${styles.slide} bg-secondary border-hover`}>
                                    <div className={`${styles.slide_media} border-10 shadow-overlay`}>
                                        <img src={item.img} alt={item.title}/>
                                    </div>
                                    <div className={styles.slide_main}>
                                        <NavLink className="link-hover h3" to="/explore/item">
                                            {item.title}
                                        </NavLink>
                                        <NavLink className="text-bold text-light text-sm link-hover" to="/author">
                                            @{item.author}
                                        </NavLink>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className={styles.hero_nav}>
                    <SlidePrev className={styles.prev} swiper={swiper}/>
                    <SlideNext className={styles.next} swiper={swiper}/>
                </div>
            </div>
        </div>
    )
}

export default Hero