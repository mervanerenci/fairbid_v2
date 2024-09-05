// styling
import styles from './style.module.scss';

// components
import CustomSelect from '@ui/CustomSelect';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import StickyFilterBar from '@ui/StickyFilterBar';
import NothingFound from '@components/NothingFound';

// constants
import {SORTING_OPTIONS} from '@constants/explore';

// hooks
import {useWindowSize} from 'react-use';
import usePagination from '@hooks/usePagination';
import {useExploreContext} from '@contexts/exploreContext';

const Items = () => {
    const {sortedItems, sort, setSort} = useExploreContext();
    const pagination = usePagination(sortedItems, 12);
    const isTablet = useWindowSize().width < 1024;

    return (
        <div className="d-flex flex-column g-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between g-10" ref={pagination.containerRef}>
                {isTablet && <StickyFilterBar bottom="#items"/>}
                <span className="text-sm">{pagination.showingOf()}</span>
                <CustomSelect options={SORTING_OPTIONS} selected={sort} setSelected={setSort} variant="minimal" />
            </div>
            <div>
                {
                    sortedItems.length > 0 ?
                        <ItemsGrid className={styles.grid} items={pagination.currentItems()} />
                        :
                        <NothingFound />
                }
                {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
            </div>
        </div>
    )
}

export default Items