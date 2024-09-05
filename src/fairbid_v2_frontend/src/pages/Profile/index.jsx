// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Funds from '@layout/profile/Funds';
import ProfileDetails from '@layout/profile/ProfileDetails';
import ProfileItems from '@layout/profile/ProfileItems';

const Profile = () => {
    return (
        <>
            <Title title="Profile"/>
            <SimplePageHeader title="Profile"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <Funds />
                        <ProfileDetails />
                    </div>
                    <ProfileItems />

                </div>
            </main>
        </>
    );
}

export default Profile