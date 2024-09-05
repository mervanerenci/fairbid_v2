export const SlidePrev = ({swiper, className}) => {
    return (
        <button className={`navigator navigator--prev ${className ? className : ''}`}
                onClick={() => swiper.slidePrev()}
                aria-label="Previous slide">
            <i className="icon icon-angle-left"/>
        </button>
    )
}

export const SlideNext = ({swiper, className}) => {
    return (
        <button className={`navigator navigator--next ${className ? className : ''}`}
                onClick={() => swiper.slideNext()}
                aria-label="Next slide">
            <i className="icon icon-angle-right"/>
        </button>
    )
}

const SwiperNav = ({swiper}) => {
    return (
        <div className="d-flex g-25">
            <SlidePrev swiper={swiper}/>
            <SlideNext swiper={swiper}/>
        </div>
    )
}

export default SwiperNav