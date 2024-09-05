// utils
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {memo} from 'react';

const Metadata = ({date, read, comments, isShort = false, className}) => {
    return (
        <div className={`${className ? className : ''} metadata d-flex align-items-center g-10 text-xs text-bold text-overflow}`}
             style={{color: 'var(--meta)'}}>
            <span className="date">{dayjs(date).format('MMM DD, YYYY')}</span>
            <i className="icon icon-dot text-accent" style={{fontSize: '3px'}}/>
            <span className="read">{read} min read</span>
            {
                !isShort && (
                    <>
                        <i className="icon icon-dot text-accent" style={{fontSize: '3px'}}/>
                        <span className="comments text-overflow">{comments} comment{comments !== 1 ? 's' : ''}</span>
                    </>
                )
            }
        </div>
    );
}

Metadata.propTypes = {
    date: PropTypes.object.isRequired,
    read: PropTypes.number.isRequired,
    comments: PropTypes.number,
    isShort: PropTypes.bool,
    className: PropTypes.string
}

export default memo(Metadata);