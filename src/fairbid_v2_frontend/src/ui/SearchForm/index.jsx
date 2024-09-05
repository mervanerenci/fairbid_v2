// styling
import styles from './style.module.scss';

// hooks
import {useState} from 'react';

const SearchForm = ({placeholder = 'Search', className, handler}) => {
    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.target.value);
        handler && handler(e.target.value);
    }

    const handleReset = () => {
        setValue('');
        handler && handler('');
    }

    return (
        <form className={`${styles.form} search-form field bg-tertiary ${className || ''}`}>
            <input className="text-overflow"
                   type="text"
                   placeholder={placeholder}
                   onChange={handleChange}/>
            <button className={`${value.length !== 0 ? 'visible' : ''}`}
                    type="reset"
                    aria-label="Reset form"
                    onClick={handleReset}>
                <i className="icon icon-xmark"/>
            </button>
            <button type="submit" aria-label="Search">
                <i className="icon icon-search"/>
            </button>
        </form>
    )
}

export default SearchForm