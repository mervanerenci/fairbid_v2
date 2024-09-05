import {createContext, useState, useContext, useEffect, useRef} from 'react';
import useScrollLock from '@hooks/useScrollLock';
import {useLocation} from 'react-router-dom';

export const SidebarContext = createContext(undefined);

export const SidebarContextAPI = ({children}) => {
    const location = useLocation();
    const headerRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const {lockScroll, unlockScroll} = useScrollLock();

    useEffect(() => {
        isSidebarOpen ? lockScroll() : unlockScroll();

        return () => {
            unlockScroll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSidebarOpen]);

    const openSidebar = () => setIsSidebarOpen(true);

    const closeSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        closeSidebar();
    }, [location]);

    return (
        <SidebarContext.Provider value={{
            headerRef,
            isSidebarOpen,
            isHeaderFixed,
            openSidebar,
            closeSidebar,
            setIsHeaderFixed,
            setHeaderHeight,
            headerHeight
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebarContext = () => useContext(SidebarContext);
