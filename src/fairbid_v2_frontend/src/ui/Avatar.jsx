// components
import LazyImage from '@components/LazyImage';

// utils
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {memo} from 'react';

// assets
import verified from '@assets/icons/verified.svg';

const Avatar = ({src, alt, size, isVerified, className}) => {
    return (
        <div className={classNames('avatar-wrapper', size, className)}>
            <LazyImage className="avatar" src={src} alt={alt}/>
            {
                isVerified &&
                <LazyImage className="verified" src={verified} alt="verified" effect="opacity"/>
            }
        </div>
    )
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['xs', 'sm', 'md']),
    isVerified: PropTypes.bool
}

export default memo(Avatar);