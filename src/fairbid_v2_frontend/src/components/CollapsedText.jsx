// components
import Truncate from 'react-truncate';

// hooks
import {useState, useEffect} from 'react';

// utils
import PropTypes from 'prop-types';

const CollapsedText = ({text, lines = 2, className, withButton = false, width}) => {
    const [truncated, setTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);

    const handleExpand = e => {
        e.preventDefault();
        setExpanded(true);
    }

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return (
        <span className={className ? className : ''}>
           {
               mounted && (
                   <Truncate
                       lines={!expanded && lines}
                       ellipsis={(
                           <span>... {
                               withButton &&
                               <button className="text-divider" onClick={handleExpand}>Read more</button>}
                    </span>
                       )}
                       onTruncate={() => setTruncated(!truncated)}
                       width={width}
                   >
                       {text}
                   </Truncate>
               )
           }
        </span>
    )
}

CollapsedText.propTypes = {
    text: PropTypes.string.isRequired,
    lines: PropTypes.number,
    className: PropTypes.string,
    withButton: PropTypes.bool,
    width: PropTypes.number.isRequired
}

export default CollapsedText