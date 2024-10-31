// components
import {NavLink} from 'react-router-dom';

// utils
import {memo} from 'react';
import PropTypes from 'prop-types';

import { FaArrowRight } from 'react-icons/fa';

const LinkWithArrow = ({href, text}) => {
    return (
        <NavLink className="link-arrow" to={href}>
            {text} <FaArrowRight className="text-accent" />
        </NavLink>
    )
}

LinkWithArrow.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default memo(LinkWithArrow);