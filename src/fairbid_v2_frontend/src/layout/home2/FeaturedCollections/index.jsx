// styling
import styles from './style.module.scss';

// components
import SectionHeader from '@components/SectionHeader';
import LinkWithArrow from '@ui/LinkWithArrow';
import CollectionItem from '@components/CollectionItem';

// data placeholder
import featured from '@db/featured';

const FeaturedCollections = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="New Collections ⚡">
                    <LinkWithArrow href="/explore" text="View all collections"/>
                </SectionHeader>
                <div className={styles.grid}>
                    {
                        featured.map((item, index) => (
                            <CollectionItem item={item} index={index} key={index}/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedCollections