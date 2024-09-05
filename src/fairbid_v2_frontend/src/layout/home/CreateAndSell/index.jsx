// styling
import styles from './style.module.scss';

// components
import Ticker from '@components/Ticker';
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// assets
import wallet from '@assets/icons/wallet.svg';
import folder from '@assets/icons/folder.svg';
import cloud from '@assets/icons/cloud.svg';
import tags from '@assets/icons/tags.svg';

const CreateAndSell = () => {
    const data = [
        {
            icon: wallet,
            title: 'Sign In with Internet Identity',
            text: 'Easily get started with secure, on-chain transactions.'
        },
        {
            icon: folder,
            title: 'Create Your Auction',
            text: 'Choose your auction format, set the rules, and launch it with just a few clicks.'
        },
        {
            icon: cloud,
            title: 'Invite Buyers',
            text: 'Share a link or QR code to invite buyers to your auction.'
        },
        {
            icon: tags,
            title: 'Sell with No Fees',
            text: 'List your items for auction and enjoy fee-free, gas-free ETH payments.'
        }
    ];

    return (
        <div>
            <Ticker text="Buy & sell with 0 fees" />
            <div className="container" style={{marginTop: "10rem" , marginBottom: "20rem"  }} >
                <div className={styles.list}>
                    {
                        data.map((item, index) => (
                            <Spring className={styles.list_item} key={index} index={index}>
                                <LazyImage className={styles.img} src={item.icon} alt={item.title} effect="opacity" />
                                <h5 className={styles.title}>{item.title}</h5>
                                <p className={styles.text}>{item.text}</p>
                            </Spring>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateAndSell