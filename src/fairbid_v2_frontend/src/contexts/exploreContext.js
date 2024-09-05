import {createContext, useState, useContext} from 'react';
import all_items from '@db/all_items';
import {SORTING_OPTIONS, CRYPTO_CURRENCIES} from '@constants/explore';

export const ExploreContext = createContext(undefined);

export const ExploreContextAPI = ({children}) => {
    const items = all_items;
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [itemType, setItemType] = useState('');
    const [priceRange, setPriceRange] = useState({min: '', max: ''});
    const [sort, setSort] = useState(SORTING_OPTIONS[0]);
    const [cryptoCurrency, setCryptoCurrency] = useState(CRYPTO_CURRENCIES[0]);
    const [applyPriceFilter, setApplyPriceFilter] = useState(false);

    const setChecked = (type, value) => {
        switch (type) {
            case 'categories':
                categories.includes(value) ? setCategories(categories.filter(c => c !== value)) : setCategories([...categories, value]);
                break;
            case 'statuses':
                statuses.includes(value) ? setStatuses(statuses.filter(s => s !== value)) : setStatuses([...statuses, value]);
                break;
            case 'types':
                value === itemType ? setItemType('') : setItemType(value);
                break;
            default:
                break;
        }
    }

    const filteredItems = items.filter(item => {
        return (
            (categories.length === 0 || (item.categories && item.categories.some(category => categories.includes(category)))) &&
            (statuses.length === 0 || (item.statuses && item.statuses.some(status => statuses.includes(status)))) &&
            (itemType === '' || itemType === item.type) &&
            (applyPriceFilter ? item.price >= priceRange.min && item.price <= priceRange.max : true)
        );
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
        <ExploreContext.Provider value={{
            items,
            categories,
            setCategories,
            statuses,
            setStatuses,
            itemType,
            setItemType,
            priceRange,
            setPriceRange,
            sortedItems,
            sort,
            setSort,
            setChecked,
            cryptoCurrency,
            setCryptoCurrency,
            applyPriceFilter,
            setApplyPriceFilter
        }}>
            {children}
        </ExploreContext.Provider>
    );
}

export const useExploreContext = () => useContext(ExploreContext);
