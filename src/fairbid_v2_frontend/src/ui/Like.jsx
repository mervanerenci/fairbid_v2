// hooks
import {useState} from 'react';

// utils
import classNames from 'classnames';
import {formatNumber} from '@utils/helpers';
import {memo} from 'react';

const Like = ({count,...props}) => {
    const [isLiked, setIsLiked] = useState(props['isLiked']);
    const [likes, setLikes] = useState(count);

    const handleLike = () => {
        setIsLiked(!isLiked);
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    }

    return (
        <button className={`like-button ${props.className || ''}`}
                    onClick={handleLike}
                    aria-label={isLiked ? 'Unlike' : 'Like'}>
            <span className="wrapper">
                <i className="icon icon-heart-o"/>
                <i className={classNames('icon icon-heart', {'visible': isLiked})}/>
            </span>
            {formatNumber(likes)}
        </button>
    )
}

export default memo(Like);