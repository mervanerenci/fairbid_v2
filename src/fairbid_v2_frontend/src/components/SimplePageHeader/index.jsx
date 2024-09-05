// styling
import styles from './style.module.scss';

// components
import Breadcrumbs from '@ui/BreadcrumbsNav';

const SimplePageHeader = ({title}) => {
    return (
        <header className={styles.header}>
            <div className="container d-flex flex-column g-10">
                <h2 className={styles.header_title}>{title}</h2>
                <Breadcrumbs/>
            </div>
        </header>
    );
}

export default SimplePageHeader