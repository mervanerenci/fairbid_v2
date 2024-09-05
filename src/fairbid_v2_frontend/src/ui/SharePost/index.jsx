// styling
import styles from './style.module.scss';

// utils
import {addZero} from '@utils/helpers';

const SharePost = ({shared = 0}) => {
    return (
        <button className={`${styles.button} text-xs`} aria-label="Share post">
            <i className={`${styles.icon} icon-reply text-accent`}/> ({addZero(shared)})
        </button>
    );
}

export default SharePost