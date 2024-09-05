// components
import {toast} from 'react-toastify';

// hooks
import {useState} from 'react';

const useFileReader = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
            toast.error('File type not supported.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = () => {
            toast.error('Something went wrong. Please try again.');
        }
        reader.onloadstart = () => setLoading(true);
        reader.onloadend = () => {
            setFile(reader.result);
            setLoading(false);
        };
    }

    return {file, setFile, handleFile, loading};
}

export default useFileReader