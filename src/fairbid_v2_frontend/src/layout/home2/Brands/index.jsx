// styling
import styles from './style.module.scss';

// components
import Marquee from 'react-fast-marquee';

// hooks
import {useWindowSize} from 'react-use';

// assets
import brand1 from '@assets/brands/1.svg';
import brand2 from '@assets/brands/2.svg';
import brand3 from '@assets/brands/3.svg';
import brand4 from '@assets/brands/4.svg';
import brand5 from '@assets/brands/5.svg';
import brand6 from '@assets/brands/6.svg';

const Brands = () => {
    const {width} = useWindowSize();

    const data = [
        {brand: 'Company 1', image: brand1},
        {brand: 'Company 2', image: brand2},
        {brand: 'Company 3', image: brand3},
        {brand: 'Company 4', image: brand4},
        {brand: 'Company 5', image: brand5},
        {brand: 'Company 6', image: brand6},
    ];

    const drawBrands = () => {
        return data.map(item => (
            <img key={item.brand} src={item.image} alt={item.brand} />
        ))
    }

    return (
        <div className="section">
            <div className="container">
                <div className={`${styles.brands} border-10`}>
                    {
                        width < 1170 ?
                            <Marquee gradient={false}>{drawBrands()}</Marquee>
                            :
                            <div className="d-flex justify-content-between">{drawBrands()}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Brands