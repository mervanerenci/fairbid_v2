// styling
import styles from './style.module.scss';

// components
import Avatar from '@ui/Avatar';
import Socials from '@components/Socials';
import Spring from '@components/Spring';

// hooks
import {useWindowSize} from 'react-use';

const TeamListItem = ({data, index}) => {
    const isHorizontal = useWindowSize().width >= 768;
    const {name, position, avatar, bio} = data;

    return (
        <Spring index={index}>
            <div className={`${styles.wrapper} border-hover bg-primary ${isHorizontal ? 'border-hover--horizontal' : ''}`}>
                <Avatar className={styles.avatar} src={avatar} alt={name} />
                <div className={styles.main}>
                    <div className="d-flex flex-column g-10">
                        <h5>{name}</h5>
                        <span className="text-accent text-sm">{position}</span>
                        <p className={`${styles.main_bio} text-sm`}>{bio}</p>
                    </div>
                    <Socials />
                </div>
            </div>
        </Spring>
    );
}

export default TeamListItem