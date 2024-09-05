import {createContext, useState, useContext, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

export const FilterContext = createContext(undefined);

export const FilterContextAPI = ({children}) => {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {lockScroll, unlockScroll} = useScrollLock();

    const setQuery = (query) => {
        setSearch(query);
    }

    const changeFilters = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(f => f !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    }

    const resetFilters = () => setFilters([]);

    const filterData = (data, selector) => {
        return data.filter(item => {
            const isSearch = item[selector].toLowerCase().includes(search.toLowerCase()) || search === '';
            const isCategory = filters.length === 0 || item.categories.some(category => filters.includes(category));

            return isSearch && isCategory;
        });
    }

    const openSidebar = () => setIsSidebarOpen(true);

    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        isSidebarOpen ? lockScroll() : unlockScroll();

        window.addEventListener('resize', () => {
            unlockScroll();
        });

        return () => {
            unlockScroll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSidebarOpen]);

    return (
        <FilterContext.Provider value={{
            search,
            filters,
            filterData,
            isSidebarOpen,
            setQuery,
            changeFilters,
            resetFilters,
            openSidebar,
            closeSidebar
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () => useContext(FilterContext);