// styled components
import { StyledAuthorItems, CollectionsGrid } from './style';

import styles from './style.module.scss';

// components
import StyledTabs from '@ui/StyledTabs';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import CollectionItem from '@components/CollectionItem';
import SectionHeader from '@components/SectionHeader';


// hooks
import usePagination from '@hooks/usePagination';

// data placeholder
import author from '@db/author';

const SingleItems = ({ content }) => {
    const pagination = usePagination(content, 12);

    return (
        <div className="tab-content" ref={pagination.containerRef}>
            <ItemsGrid items={pagination.currentItems()} isPrivate />
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

const Collections = ({ content }) => {
    const pagination = usePagination(content, 6);

    return (
        <div className="tab-content" ref={pagination.containerRef}>
            <CollectionsGrid>
                {
                    pagination.currentItems().map((item, index) => (
                        <CollectionItem item={item} index={index} key={index} isPrivate />
                    ))
                }
            </CollectionsGrid>
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

const ProfileItems = () => {
    const likedItems = author.creations.filter(item => item.isLiked);

    const tabs = [
        { label: `English (${author.creations.length})`, key: 'item-1', children: <SingleItems content={author.creations} /> },
        { label: `Dutch (${author.creations.length})`, key: 'item-2', children: <SingleItems content={author.creations} /> },
        { label: `Sealed-Bid (${likedItems.length})`, key: 'item-3', children: <SingleItems content={likedItems} /> }
    ];

    return (


        <StyledAuthorItems>
            <div className="container">


                <StyledTabs tabs={tabs} />
            </div>


        </StyledAuthorItems>

    )
}

export default ProfileItems