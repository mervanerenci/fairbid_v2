// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Funds from '@layout/profile/Funds';
import TransferDetails from '@layout/transfer/TransferDetails';

const Transfer = () => {
    return (
        <>
            <Title title="Transfer"/>
            <SimplePageHeader title="Transfer"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <Funds />
                        <TransferDetails />
                    </div>
                    

                </div>
            </main>
        </>
    );
}

export default Transfer