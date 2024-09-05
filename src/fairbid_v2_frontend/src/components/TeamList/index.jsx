// styling
import styles from './style.module.scss';

// components
import TeamListItem from './TeamListItem';

// data placeholder
import team from '@db/team';

const TeamList = ({variant}) => {
    const data = variant === 'preview' ? team.slice(0, 4) : team;

    return (
        <ul className={styles.list}>
            {
                data.map((item, index) => (
                    <TeamListItem key={index} data={item} index={index}/>
                ))
            }
        </ul>
    );
}

export default TeamList