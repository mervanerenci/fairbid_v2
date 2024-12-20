// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Funds from '@layout/profile/Funds';
import ProfileDetails from '@layout/profile/ProfileDetails';
import ProfileItems from '@layout/profile/ProfileItems';
import { useEffect } from 'react';

const Profile = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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