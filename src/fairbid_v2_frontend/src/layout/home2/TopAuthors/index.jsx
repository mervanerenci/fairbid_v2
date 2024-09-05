// styling
import styles from './style.module.scss';

// components
import SectionHeader from '@components/SectionHeader';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper';
import Avatar from '@ui/Avatar';
import {NavLink} from 'react-router-dom';
import SwiperNav from '@ui/SwiperNav';

// hooks
import {useState} from 'react';

// assets
import cover1 from '@assets/home2/top/cover1.webp';
import cover2 from '@assets/home2/top/cover2.webp';
import cover3 from '@assets/home2/top/cover3.webp';
import cover4 from '@assets/home2/top/cover4.webp';
import cover5 from '@assets/home2/top/cover5.webp';
import cover6 from '@assets/home2/top/cover6.webp';
import avatar1 from '@assets/home2/top/avatar1.webp';
import avatar2 from '@assets/home2/top/avatar2.webp';
import avatar3 from '@assets/home2/top/avatar3.webp';
import avatar4 from '@assets/home2/top/avatar4.webp';
import avatar5 from '@assets/home2/top/avatar5.webp';
import avatar6 from '@assets/home2/top/avatar6.webp';

const TopAuthors = () => {
    const [swiper, setSwiper] = useState(null);

    const authors = [
        {
            cover: cover1,
            nickname: 'sontonielaki',
            avatar: avatar1,
            eth: 236.88,
        },
        {
            cover: cover2,
            nickname: 'ilanashemi',
            avatar: avatar2,
            eth: 90.67,
        },
        {
            cover: cover3,
            nickname: 'ventuniconeymon',
            avatar: avatar3,
            eth: 112.43,
        },
        {
            cover: cover4,
            nickname: 'frida2bell',
            avatar: avatar4,
            eth: 182.49,
        },
        {
            cover: cover5,
            nickname: 'salvadorcortez',
            avatar: avatar5,
            eth: 471.91,
        },
        {
            cover: cover6,
            nickname: 'sunn1e',
            avatar: avatar6,
            eth: 88.24,
        }
    ];

    return (
        <section>
            <div className="container">
                <SectionHeader title="Top authors 🔥">
                    <SwiperNav swiper={swiper} />
                </SectionHeader>
                <Swiper onSwiper={setSwiper}
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView="auto"
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={1500}
                        navigation={{
                            prevEl: '.navigator--prev',
                            nextEl: '.navigator--next'
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2
                            },
                            992: {
                                slidesPerView: 3
                            }
                        }}>
                    {
                        authors.map((author, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${styles.slide} bg-secondary border-hover`}>
                                    <div className={`${styles.slide_media} border-10`}>
                                        <img src={author.cover} alt="cover"/>
                                    </div>
                                    <div className={styles.slide_main}>
                                        <Avatar src={author.avatar} alt="avatar" size="md"/>
                                        <div className="d-flex flex-column g-5">
                                            <NavLink className="main_link h6" to="/author">
                                                @{author.nickname}
                                            </NavLink>
                                            <span className="text-sm text-bold text-accent">{author.eth} ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default TopAuthors

