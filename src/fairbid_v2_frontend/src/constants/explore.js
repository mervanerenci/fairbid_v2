import CryptoIcon from '@ui/CryptoIcon';

const CryptoOption = ({icon, name}) => {
    return (
        <div className="d-flex align-items-center g-20">
            <CryptoIcon crypto={icon}/>
            <div className="crypto-option__name">{name}</div>
        </div>
    )
}

export const SORTING_OPTIONS = [
    {value: 'default', label: 'Default sorting'},
    {value: 'price-asc', label: 'Lowest Price'},
    {value: 'price-desc', label: 'Highest Price'},
    {value: 'likes-asc', label: 'Most Liked'},
    {value: 'likes-desc', label: 'Least Liked'},
];

export const CRYPTO_CURRENCIES = [
    {value: 'eth', label: <CryptoOption icon="eth" name="Ethereum"/>},
    {value: 'imx', label: <CryptoOption icon="imx" name="Immutable X"/>},
];

export const CATEGORIES = [
    {value: 'art', label: 'Art', },
    {value: 'collectibles', label: 'Collectibles'},
    {value: 'domain', label: 'Domain names'},
    {value: 'music', label: 'Music'},
    {value: 'photo', label: 'Photography'},
    {value: 'sports', label: 'Sports'},
    {value: 'trading', label: 'Trading cards'},
    {value: 'utility', label: 'Utility'},
    {value: 'virtual', label: 'Virtual worlds'}
];

export const STATUS = [
    {value: 'now', label: 'Live'},
    {value: 'new', label: 'Upcoming'},
];

export const TYPE = [
    {value: 'img', label: 'Image'},
    {value: 'video', label: 'Video'},
    {value: '3d', label: '3D'},
];

export const PRICE_RANGE = [
    {value: 'all', label: 'All'},
    {value: '0-0.1', label: '0 - 0.1 ETH'},
    {value: '0.1-1', label: '0.1 - 1 ETH'},
    {value: '1-10', label: '1 - 10 ETH'},
    {value: '10-100', label: '10 - 100 ETH'},
    {value: '100+', label: '100+ ETH', },
];