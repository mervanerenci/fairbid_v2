// styling
import styles from './style.module.scss';

// hooks
import {useFilterContext} from '@contexts/filterContext';

// utils
import classNames from 'classnames';

const ResetFilters = ({text = 'Reset'}) => {
    const {resetFilters, filters} = useFilterContext();

    return (
        <button className={classNames(styles.button, {[styles.visible]: filters.length > 0})} onClick={resetFilters}>
            {text}
        </button>
    );
}

export default ResetFilters