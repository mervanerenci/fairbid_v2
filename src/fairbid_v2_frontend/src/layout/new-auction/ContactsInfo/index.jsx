// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// assets
import headset from '@assets//icons/headset.svg';
import envelope from '@assets//icons/envelope.svg';
import location from '@assets//icons/location.svg';

const ContactsInfo = () => {
    const data = [
        {
            icon: headset,
            title: 'Contact phone number',
            type: 'phone',
            values: ['+1-777-333-4255', '+1-245-555-2268'],
        },
        {
            icon: envelope,
            title: 'Our email address',
            type: 'email',
            values: ['example@admin.com', 'nftland@info.com']
        },
        {
            icon: location,
            title: 'Our location',
            type: 'text',
            values: ['2464 Royal Ln. Mesa, New Jersey 45463', '6391 Elgin St. Celina, Delaware 10299']
        }
    ];

    return (
        <div className={styles.wrapper}>
            {
                data.map((item, index) => (
                    <Spring key={index} index={index}>
                        <div className={`${styles.item} bg-secondary border-10`}>
                            <div className={styles.item_content}>
                                <LazyImage className={styles.icon} src={item.icon} alt="icon" effect="opacity"/>
                                <h5 className={styles.title}>{item.title}</h5>
                                <div className="d-flex flex-column g-5 text-bold" key={index}>
                                    {
                                        item.values.map((value, index) => (
                                            item.type === 'phone' ? (
                                                <a key={`${item.type}-${index}`} href={`tel:${value}`}>{value}</a>
                                            ) : item.type === 'email' ? (
                                                <a key={`${item.type}-${index}`} href={`mailto:${value}`}>{value}</a>
                                            ) : (
                                                <span key={`${item.type}-${index}`}>{value}</span>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </Spring>
                ))
            }
        </div>
    )
}

export default ContactsInfo