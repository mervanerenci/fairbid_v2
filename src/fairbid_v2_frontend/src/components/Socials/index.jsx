// styling
import styles from './style.module.scss';

// constants
import {PROFILE_SOCIAL_LINKS} from '@constants/links';

const Socials = ({className}) => {
    return (
        <div className={`${className || ''} d-flex g-20`}>
            {
                PROFILE_SOCIAL_LINKS.map(link => {
                    return (
                        <a className={styles.link}
                           key={link.url}
                           href={link.url}
                           target="_blank"
                           rel="noreferrer noopener"
                           aria-label={link.name}>
                            <i className={`icon icon-${link.icon} ${link.icon === 'facebook' ? styles.facebook : ''}`}/>
                        </a>
                    )
                })
            }
        </div>
    );
}

export default Socials