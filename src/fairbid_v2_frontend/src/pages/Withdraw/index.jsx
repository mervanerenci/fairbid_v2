// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Funds from '@layout/profile/Funds';
import ProfileDetails2 from '@layout/profile/ProfileDetails';
import ProfileItems from '@layout/profile/ProfileItems';
import WithdrawDetails from '@layout/withdraw/WithdrawDetails';


const Withdraw = () => {
    return (
        <>
            <Title title="Withdraw"/>
            <SimplePageHeader title="Withdraw"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <Funds />
                        <WithdrawDetails />
                    </div>
                    
                </div>
            </main>
        </>
    );
}

export default Withdraw