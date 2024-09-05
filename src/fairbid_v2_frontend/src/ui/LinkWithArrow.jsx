// components
import {NavLink} from 'react-router-dom';

// utils
import {memo} from 'react';
import PropTypes from 'prop-types';

const LinkWithArrow = ({href, text}) => {
    return (
        <NavLink className="link-arrow" to={href}>
            {text} <i className="icon icon-arrow-right text-accent"/>
        </NavLink>
    )
}

LinkWithArrow.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default memo(LinkWithArrow);