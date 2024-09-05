// styling
import styled from 'styled-components/macro';

// components
import CircularProgress from '@mui/material/CircularProgress';
import {Fragment} from 'react';
import Fade from '@mui/material/Fade';

const ProgressWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, .5);
`;

const StyledCircularProgress = styled(CircularProgress)`
  width: 60px !important;
  height: 60px !important;
`;

const StyledProgress = ({visible, isOverlay, isRound, ...props}) => {
    const Wrapper = isOverlay ? ProgressWrapper : Fragment;
    const wrapperProps = isRound ? {style: {borderRadius: '50%'}} : {};

    return (
        <Fade in={visible} timeout={500}>
            <Wrapper {...wrapperProps}>
                <StyledCircularProgress className="text-accent" thickness={5} {...props} />
            </Wrapper>
        </Fade>
    )
}

export default StyledProgress