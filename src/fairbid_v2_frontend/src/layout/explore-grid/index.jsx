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
import {CATEGORIES, TYPE, STATUS, SORTING_OPTIONS, PRICE_RANGE} from '@constants/explore';

const ExploreGridContent = () => {
    const {
        sort,
        setSort,
        sortedItems,
        category,
        setCategory,
        status,
        setStatus,
        type,
        setType,
        priceRange,
        setPriceRange
    } = useExploreGridContext();
    const pagination = usePagination(sortedItems, 12);

    return (
        <div className="section mt-0">
            <div className="container d-flex flex-column g-30" ref={pagination.containerRef}>
                <div className={styles.sorting}>
                    <div className={styles.select}>
                        {/* <CustomSelect setSelected={setPriceRange}
                                      options={PRICE_RANGE}
                                      selected={priceRange}
                                      placeholder="Price range"/>
                        <CustomSelect setSelected={setCategory}
                                      options={CATEGORIES}
                                      selected={category}
                                      placeholder="Categories"/> */}
                        {/* <CustomSelect setSelected={setStatus}
                                      options={STATUS}
                                      selected={status}
                                      placeholder="Status"/> */}
                        {/* <CustomSelect setSelected={setType}
                                      options={TYPE}
                                      selected={type}
                                      placeholder="Type"/>
                        <CustomSelect setSelected={setSort}
                                      options={SORTING_OPTIONS}
                                      selected={sort}/> */}
                    </div>
                    <span>{pagination.showingOf()}</span>
                </div>
                <div>
                    {
                        sortedItems.length > 0 ?
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