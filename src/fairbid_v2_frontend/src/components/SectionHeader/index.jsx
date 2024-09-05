// styling
import styles from './style.module.scss';

// utils
import PropTypes from 'prop-types';

const SectionHeader = ({title, children}) => {
    return (
        <div className={styles.header}>
            <h3>{title}</h3>
            {children}
        </div>
    );
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}

export default SectionHeader