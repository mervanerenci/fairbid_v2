// styling
import styles from './style.module.scss';

// hooks
import {useState} from 'react';

// utils
import PropTypes from 'prop-types';

const ZoomViewer = ({originalImg, zoomedImg, alt}) => {
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

    const handleMouseMove = e => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setBackgroundPosition(`${x}% ${y < 100 ? y : 100}%`);
    }

    return (
        <figure className={styles.container}
                onMouseMove={handleMouseMove}
                style={{backgroundPosition: backgroundPosition, backgroundImage: `url(${zoomedImg})`}}>
            <img className={styles.img} src={originalImg} alt={alt}/>
        </figure>
    )
}

ZoomViewer.propTypes = {
    originalImg: PropTypes.string.isRequired,
    zoomedImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default ZoomViewer