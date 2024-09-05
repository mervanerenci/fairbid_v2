// styles
import styles from './style.module.scss';

// components
import {NavLink} from 'react-router-dom';
import LazyImage from '@components/LazyImage';

// utils
import {memo} from 'react';

// assets
import logo from '@assets/xchain.svg';

const AuthorTag = ({avatar = logo, name = 'Xchain', ...props}) => {
    return (
        <div className={`${styles.container} d-flex align-items-center g-10 bg-secondary`} {...props}>
            <LazyImage className={styles.avatar} src={avatar} alt={name}/>
            <NavLink to="/author">{name === 'Xchain' ? name : `@${name}`}</NavLink>
        </div>
    )
}

export default memo(AuthorTag);