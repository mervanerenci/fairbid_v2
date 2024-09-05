// styling
import styles from './style.module.scss';

// components
import {NavLink} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, EffectFade, Autoplay} from 'swiper';
import GradientBtn from '@ui/GradientBtn';
import Avatar from '@ui/Avatar';
import AnimatedText from 'react-animated-text-content';
import Spring from '@components/Spring';

// assets
import video from '@assets/home/hero/particles.mp4';

// data placeholder
import hero from '@db/hero'

const Hero = () => {
    return (
        <section className={styles.hero}>
            <video src={video}
                   className={styles.video}
                   autoPlay loop muted disablePictureInPicture playsInline controls={false} />
            <div className={`${styles.hero_container} container`}>
                <div className={`${styles.media} bg-secondary border-hover`}>
                    <Swiper className={styles.media_slider}
                            loop={true}
                            modules={[Pagination, EffectFade, Autoplay]}
                            effect="fade"
                            fadeEffect={{crossFade: true}}
                            slidesPerView="auto"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                }
                            }}
                            autoplay={{
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            speed={1300}
                            pagination={{
                                clickable: true,
                                horizontalClass: styles.pagination
                            }}>
                        {
                            hero.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                   <div className="d-flex flex-column g-30">
                                       <div>
                                           <img className="border-10" src={item.image} alt={item.title} />
                                       </div>
                                       <div className="d-flex flex-column g-5">
                                           <NavLink className="h4 link-hover" to="/explore/item" >
                                               {item.title}
                                           </NavLink>
                                           <div className="d-flex align-items-center g-10">
                                               <Avatar src={item.author.avatar}
                                                       isVerified={item.author.isVerified}
                                                       alt={item.author.name}
                                                       size="xs"/>
                                               <NavLink className="text-sm text-light text-bold link-hover" to="/author">
                                                   @{item.author.name}
                                               </NavLink>
                                           </div>
                                       </div>
                                   </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className={styles.main}>
                    <AnimatedText
                        type="words"
                        animationType="throw"
                        duration={0.5}
                        tag="h1"
                        includeWhiteSpaces>
                        Unlock Effortless On-Chain Auctions
                    </AnimatedText>
                    <Spring delay={600}>
                        <p className={styles.main_text}>
                        Join Fairbid, the decentralized marketplace where you can discover, bid, and win exclusive items.  <br/>
                        Enjoy seamless, gas-free ETH transactions and transparent, cross-chain auctions, all in one place.
                        </p>
                    </Spring>
                    <div className={styles.main_buttons}>
                        <Spring delay={800}>
                            <GradientBtn href="/explore-page">Explore</GradientBtn>
                        </Spring>
                        <Spring delay={1000}>
                            <NavLink className="btn btn--outline" to="/login">Create</NavLink>
                        </Spring>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero