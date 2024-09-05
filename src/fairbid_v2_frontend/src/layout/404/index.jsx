// styling
import styles from './style.module.scss';

// components
import Ticker from '@components/Ticker';
import GradientBtn from '@ui/GradientBtn';
import LazyImage from '@components/LazyImage';

// assets
import media from '@assets/404/media.svg';
import bg from '@assets/404/bg.svg';

const Text = () => {
    return (
        <>
            <i className="icon icon-dot text-gradient" />
            404
            <i className="icon icon-dot text-gradient" />
            404
            <i className="icon icon-dot text-gradient" />
            404
            <i className="icon icon-dot text-gradient" />
            404
            <i className="icon icon-dot text-gradient" />
            404
        </>
    );
}

const NotFoundContent = () => {
    return (
        <section>
            <div className="container">
                <div className={`${styles.wrapper} d-flex bg-secondary border-10`}>
                    <LazyImage className={styles.wrapper_bg} src={bg} alt="media" effect="opacity" />
                    <div className={styles.main}>
                        <h2>Page not found!</h2>
                        <p className={styles.main_text}>
                            Sorry! The page you were looking for could not be found.
                            Try searching for it or browse through our website.
                        </p>
                        <GradientBtn className={styles.main_btn} href="/">
                            Go back to home
                        </GradientBtn>
                    </div>
                    <div className={styles.media}>
                        <LazyImage src={media} alt="404" />
                    </div>
                </div>
            </div>
            <Ticker text={<Text />} isErrorPage />
        </section>
    );
}

export default NotFoundContent