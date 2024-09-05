// utils
import {lazy} from 'react';

// styling
import styled from 'styled-components/macro';

// assets
import animation from '@assets/lottie/nodata.json';

// components
const Lottie = lazy(() => import('lottie-react'));
const Fade = lazy(() => import('@mui/material/Fade'));

const Wrapper = styled.div`
  .lottie {
    width: 50%;
    max-width: 240px;
    margin: 40px 0 20px;
  }
`;

const NothingFound = () => {
    return (
        <Fade in={true} timeout={1000}>
            <Wrapper className="d-flex flex-column align-items-center">
                <Lottie className="lottie" animationData={animation}/>
                <h4 className="title">Sorry, nothing found</h4>
            </Wrapper>
        </Fade>
    );
}

export default NothingFound