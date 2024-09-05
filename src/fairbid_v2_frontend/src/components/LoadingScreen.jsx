// components
import Fade from '@mui/material/Fade';
import Lottie from 'lottie-react';

// utils
import {memo} from 'react';

// assets
import preloader from '@assets/lottie/preloader.json';

const LoadingScreen = ({visible}) => {
    return (
        <Fade in={visible} timeout={300}>
            <div className="loading-screen">
                <Lottie className="lottie" animationData={preloader} />
            </div>
        </Fade>
    );
}

export default memo(LoadingScreen);