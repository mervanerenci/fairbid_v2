// styling
import styles from './style.module.scss';

const Wrapper = ({children}) => {
    return (
        <div className="section">
            <div className={`${styles.container} container`}>
                {children}
            </div>
        </div>
    );
}

export default Wrapper