// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import GradientBtn from '@ui/GradientBtn';
import YouTube from 'react-youtube';
import StyledModal from '@ui/StyledModal';

// utils
import PropTypes from 'prop-types';

// hooks
import {useState} from 'react';

const Video = ({cover, id = '5_Blq9W9cT8'}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={`${styles.container} video-container border-10`}>
            <LazyImage className={styles.img} src={cover} alt="Video cover" />
            <GradientBtn className="btn--play" tag="button" onClick={() =>  setModalOpen(true)} aria-label="Play video">
                <i className="icon icon-play-solid" />
            </GradientBtn>
            <StyledModal open={modalOpen} onClose={() => setModalOpen(false)} classes={{root: 'video-container'}}>
                <YouTube className="border-10"
                         videoId={id}
                         opts={{playerVars: {autoplay: 1, mute: 1}}}
                         onEnd={() => setModalOpen(false)} />
            </StyledModal>
        </div>
    )
}

Video.propTypes = {
    cover: PropTypes.string.isRequired,
    id: PropTypes.string
}

export default Video