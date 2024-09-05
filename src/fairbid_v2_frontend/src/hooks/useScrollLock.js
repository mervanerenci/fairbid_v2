import {useState, useEffect} from 'react';

const useScrollLock = () => {
    const [documentElement, setDocumentElement] = useState(null);

    useEffect(() => {
        setDocumentElement(document.documentElement);
    }, []);

    const lockScroll = () => {
        if (documentElement) {
            documentElement.classList.add('no-scroll');
        }
    }

    const unlockScroll = () => {
        if (documentElement) {
            documentElement.classList.remove('no-scroll');
        }
    }

    return {lockScroll, unlockScroll};
}

export default useScrollLock