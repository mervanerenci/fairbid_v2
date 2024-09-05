// styling
import styles from './style.module.scss';

// components
import Spring from '@components/Spring';

const Features = () => {
    const data = [
        {icon: 'shield', title: 'High security assets transfer'},
        {icon: 'headset', title: '24/7 live support with Skype & Email'},
        {icon: 'trophy', title: 'Top class NFT products'},
        {icon: 'rocket', title: 'Regular training & seller courses'}
    ];

    return (
        <div className="section">
            <div className="container">
                <div className={styles.grid}>
                    {
                        data.map((item, index) => (
                            <Spring key={index} index={index}>
                                <div className={`${styles.grid_item} border-hover bg-primary`}>
                                    <div className={styles.content}>
                                        <div
                                            className={`${styles.icon} ${styles[item.icon]}`}>
                                            <i className={`icon-${item.icon}`}/>
                                        </div>
                                        <div className="feature_content">
                                            <h5>{item.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Spring>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Features