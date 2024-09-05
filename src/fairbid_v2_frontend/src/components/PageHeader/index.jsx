// styling
import styles from './style.module.scss';

// components
import Breadcrumbs from '@ui/BreadcrumbsNav';
import LazyImage from '@components/LazyImage';

// assets
import abstract from '@assets/header_abstract.svg';
import right from '@assets/header_right.webp';
import left from '@assets/header_left.webp';

const PageHeader = ({title}) => {
    return (
        <header className={styles.header}>
            <div className={styles.header_media}>
                <LazyImage src={left} alt="media"/>
            </div>
            <div className={`${styles.header_main} bg-secondary border-10`}>
                <div className={styles.content}>
                    <h1>{title}</h1>
                    <Breadcrumbs/>
                </div>
                <LazyImage className={styles.media} src={abstract} alt="media" effect="opacity"/>
            </div>
            <div className={styles.header_media}>
                <LazyImage src={right} alt="media"/>
            </div>
        </header>
    )
}

export default PageHeader