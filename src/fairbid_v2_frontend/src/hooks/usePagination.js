import {useState, useRef, useEffect} from 'react';

const usePagination = (data, itemsPerPage = 10) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const maxPage = Math.ceil(data.length / itemsPerPage);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        containerRef.current.scrollIntoView({behavior: 'smooth'});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const currentItems = () => {
        const begin = (currentPage) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    };

    useEffect(() => {
        if (currentPage > maxPage - 1) {
            setCurrentPage(maxPage - 1);
        } else if (currentPage < 0 && maxPage > 0) {
            setCurrentPage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItems()]);

    const next = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };

    const prev = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
    };

    const goToPage = (page) => {
        const pageNumber = Math.max(0, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    const showingOf = () => {
        const begin = (currentPage) * itemsPerPage;
        const end = data.length > itemsPerPage ? begin + itemsPerPage : data.length;
        return data.length > 0 ? `Showing ${begin + 1}-${end} of ${data.length} results` : '';
    }

    return { next, prev, goToPage, showingOf, currentItems, currentPage, maxPage, containerRef };
}

export default usePagination