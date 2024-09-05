// utils
import PropTypes from 'prop-types';
import {memo} from 'react';

const Checkbox = ({id, onChange, ...props}) => {
    return (
        <div className="checkbox">
            <input id={id} type="checkbox" onChange={onChange} {...props}/>
            <label className="d-flex align-items-center justify-content-center" htmlFor={id}>
                <i className="icon icon-check-solid"/>
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default memo(Checkbox);