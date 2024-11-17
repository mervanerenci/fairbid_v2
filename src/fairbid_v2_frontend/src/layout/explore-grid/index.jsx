// styling
import styles from './style.module.scss';

// components
import CustomSelect from '@ui/CustomSelect';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import NothingFound from '@components/NothingFound';

// hooks
import usePagination from '@hooks/usePagination';
import {useExploreGridContext} from '@contexts/exploreGridContext';

// constants

const AUCTION_TYPES = [
    {label: 'All', value: 'all'},
    {label: 'English', value: 'english'},
    {label: 'Dutch', value: 'dutch'},
    {label: 'Sealed-bid', value: 'sealed-bid'},
];

const TYPE_OPTIONS = [
    { label: 'All', value: 'all' },
    { label: 'English', value: 'english' },
    { label: 'Dutch', value: 'dutch' },
    { label: 'Sealed-bid', value: 'sealed-bid' }
];


const ExploreGridContent = () => {
    const {
        
        items,
        auctionType,
        setAuctionType,
        loading
        
    } = useExploreGridContext();
    const pagination = usePagination(items, 12);

    

    const handleTypeChange = (option) => {
        console.log("Selected type:", option.value); // Debug log
        setAuctionType(option.value);
    };

    return (
        <div className="section mt-0">
            <div className="container d-flex flex-column g-30" ref={pagination.containerRef}>
                <div className={styles.sorting}>
                    <div className={styles.select}>
                          <CustomSelect setSelected={handleTypeChange}
                                      options={TYPE_OPTIONS}
                                      selected={TYPE_OPTIONS.find(option => option.value === auctionType)}
                                      placeholder="Auction Type"/>
                    </div>
                    <span>{pagination.showingOf()}</span>
                </div>
                <div>
                    {
                        items.length > 0 ?
                            <ItemsGrid items={pagination.currentItems()}/>
                            :
                            <NothingFound/>
                    }
                    {pagination.maxPage > 1 && <Pagination pagination={pagination}/>}
                </div>
            </div>
        </div>
    )
}

export default ExploreGridContent