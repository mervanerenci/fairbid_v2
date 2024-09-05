import {createContext, useState, useContext} from 'react';

import all_items from '@db/all_items';
import {SORTING_OPTIONS} from '@constants/explore';

export const ExploreGridContext = createContext(undefined);

export const ExploreGridContextAPI = ({children}) => {
    const items = all_items;
    const [sort, setSort] = useState(SORTING_OPTIONS[0]);
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(null);
    const [type, setType] = useState(null);
    const [priceRange, setPriceRange] = useState(null);

    const filteredItems = items.filter(item => {
        return (
            (category ? item.categories.includes(category.value) : true) &&
            (status ? item.statuses.includes(status.value) : true) &&
            (type ? item.type === type.value : true) &&
            (
                priceRange ?
                    (
                        priceRange.value === 'all' ?
                            true :
                            priceRange.value === '100+' ?
                                item.price >= 100 :
                                item.price >= priceRange.value.split('-')[0] && item.price <= priceRange.value.split('-')[1]
                    ) :
                    true
            ))
    });

    const sortedItems = filteredItems.sort((a, b) => {
        if (sort.value === 'default') {
            return a.id - b.id;
        } else if (sort.value === 'price-asc') {
            return a.price - b.price;
        } else if (sort.value === 'price-desc') {
            return b.price - a.price;
        } else if (sort.value === 'likes-asc') {
            return b.likes - a.likes;
        } else if (sort.value === 'likes-desc') {
            return a.likes - b.likes;
        }
    });

    return (
        <ExploreGridContext.Provider value={{
            sortedItems,
            sort,
            setSort,
            category,
            setCategory,
            status,
            setStatus,
            type,
            setType,
            priceRange,
            setPriceRange
        }}>
            {children}
        </ExploreGridContext.Provider>
    );
}

export const useExploreGridContext = () => useContext(ExploreGridContext);
