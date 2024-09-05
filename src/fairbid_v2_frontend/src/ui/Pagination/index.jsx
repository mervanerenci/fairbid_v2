// styling
import styles from './style.module.scss';

// utils
import classNames from 'classnames';

const Pagination = ({pagination}) => {
    const total = pagination.maxPage;

    return (
        <div className={styles.wrapper}>
            <button className="btn btn--outline text-sm"
                    onClick={pagination.prev}
                    disabled={pagination.currentPage <= 0}
                    aria-label="Previous page">
                prev
            </button>
            <div className="d-flex g-10">
                {
                    [...Array(total)].map((_, i) => {
                        return (
                            <button
                                className={classNames(`${styles.btn} btn btn--outline text-sm`, {'active': i === pagination.currentPage})}
                                key={i}
                                onClick={() => pagination.goToPage(i)}
                                data-pagination
                                disabled={pagination.currentPage === i}
                                aria-label={`Page ${i + 1}`}>
                                {i + 1}
                            </button>
                        );
                    })
                }
            </div>
            <button className="btn btn--outline text-sm"
                    onClick={pagination.next}
                    disabled={pagination.currentPage + 1 === pagination.maxPage}
                    aria-label="Next page">
                next
            </button>
        </div>
    )
}

export default Pagination