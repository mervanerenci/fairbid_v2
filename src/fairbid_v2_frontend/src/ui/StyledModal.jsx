// styling
import styled from 'styled-components/macro';

// components
import Modal from '@mui/material/Modal';
import Grow from '@mui/material/Grow';

// hooks
import {useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

// utils
import PropTypes from 'prop-types';

const ModalWrapper = styled(Modal)`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000 !important;

  .MuiBackdrop-root {
    background: rgba(1, 1, 1, .6);
  }

  .content {
    padding: 30px 20px;
    position: relative;
    flex: 1;
    max-width: 1000px;
    overflow: visible;
    
    .search-form {
      margin: 10px 0;
    }

    .icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      color: var(--divider);
      transition: all var(--transition);
      cursor: pointer;

      &:hover {
        color: var(--text-light);
      }
    }
  }

  &.video-container .content {
    iframe {
      aspect-ratio: 16 / 9;
    }

    .icon-close {
      top: -10px;
      right: -10px;
      background: var(--accent);
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 14px;
      will-change: transform;

      &:hover {
        transform: scale(1.1);
        color: var(--bg-primary);
      }
    }
  }

  @media screen and (min-width: 414px) {
    .content {
      padding: 40px 30px;

      .icon {
        top: 20px;
        right: 20px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      padding: 50px 40px;
    }
  }
`;

const StyledModal = ({children, ...props}) => {
    const {lockScroll, unlockScroll} = useScrollLock();

    useEffect(() => {
        props.open ? lockScroll() : unlockScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    return (
        <ModalWrapper {...props} closeAfterTransition>
            <Grow in={props.open} timeout={300}>
                <div className="content bg-tertiary border-10">
                    <i className="icon icon-xmark icon-close" onClick={props.onClose}/>
                    {children}
                </div>
            </Grow>
        </ModalWrapper>
    );
}

StyledModal.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default StyledModal