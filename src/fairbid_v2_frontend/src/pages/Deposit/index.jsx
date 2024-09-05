// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Funds from '@layout/profile/Funds';
import DepositDetails from '@layout/deposit/DepositDetails';

const Deposit = () => {
    return (
        <>
            <Title title="Deposit"/>
            <SimplePageHeader title="Deposit"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <Funds />
                        <DepositDetails />
                    </div>
                    

                </div>
            </main>
        </>
    );
}

export default Deposit