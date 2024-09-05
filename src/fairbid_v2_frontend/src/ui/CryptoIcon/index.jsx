// styling
import styles from './style.module.scss';

// assets
import eth from '@assets/icons/eth.svg';
import imx from '@assets/icons/imx.svg';

const CryptoIcon = ({crypto}) => {
    const icons = [
        {icon: eth, name: 'eth', label: 'Ethereum'},
        {icon: imx, name: 'imx', label: 'ImmutableX'},
    ];

    const icon = icons.find((i) => i.name === crypto);

    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={icon.icon} alt={icon.label} />
        </div>
    );
}

export default CryptoIcon