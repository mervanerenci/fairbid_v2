// components
import {animated, useSpring} from '@react-spring/web';

// hooks
import {useInView} from 'react-intersection-observer';

// utils
import PropTypes from 'prop-types';

const Spring = ({children, index = 1, className, type = 'slide', delay, ...props}) => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const common = {
        config: {duration: 300, mass: 1, tension: 300, friction: 30},
        delay: props.delay ? props.delay : 100 * index,
    }

    const slide = useSpring({
        from: {transform: 'translateY(40px)', opacity: 0},
        to: {transform: inView ? 'translateY(0px)' : 'translateY(40px)', opacity: inView ? 1 : 0},
        ...common,
        ...props
    });

    const fade = useSpring({
        from: {opacity: 0},
        to: {opacity: inView ? 1 : 0},
        ...common,
        ...props
    });

    const grow = useSpring({
        from: {transform: 'scale(0.4)'},
        to: {transform: inView ? 'scale(1)' : 'scale(0.4)'},
        ...common,
        ...props
    });

    const spring = {
        slide,
        fade,
        grow
    }

    return (
        <animated.div className={className ? className : ''} style={spring[type]} ref={ref}>
            {children}
        </animated.div>
    )
}

Spring.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number,
    className: PropTypes.string,
    type: PropTypes.oneOf(['slide', 'fade', 'grow']),
    delay: PropTypes.number
}

export default Spring