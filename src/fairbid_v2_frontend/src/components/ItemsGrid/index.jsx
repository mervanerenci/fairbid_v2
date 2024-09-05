// styling
import styles from './style.module.scss';

// components
import ItemsGridItem from './ItemsGridItem';

// data placeholder
import all_items from '@db/all_items';

const ItemsGrid = ({variant, items = all_items, isPrivate = false, className}) => {
    const data = variant === 'preview' ? items.slice(0, 8) : items;

    return (
        <div className={`${styles.grid} ${className ? className : ''} items-grid`} id="items">
            {
                data.map((item, index) => (
                    <ItemsGridItem key={item.id} item={item} index={index} isPrivate={isPrivate} />
                ))
            }
        </div>
    )
}

export default ItemsGrid