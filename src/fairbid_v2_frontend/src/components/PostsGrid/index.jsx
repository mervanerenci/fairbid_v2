// styling
import styles from './style.module.scss';

// components
import PostsGridItem from '@components/PostsGrid/PostsGridItem';
import Pagination from '@ui/Pagination';

// hooks
import usePagination from '@hooks/usePagination';
import {useWindowSize} from 'react-use';

// data placeholder
import blog2 from '@db/blog2';

const PostsGrid = ({variant}) => {
    const {width} = useWindowSize();
    const perPage = width >= 768 && width < 1024 ? 8 : 9;
    const data = variant === 'preview' ? blog2.slice(0, 3) : blog2;
    const pagination = usePagination(data, perPage);
    const posts = pagination.currentItems();

    return (
        <>
            <div className={styles.grid} ref={pagination.containerRef}>
                {
                    posts.map((post, index) => (
                        <PostsGridItem key={post.id} post={post} index={index}/>
                    ))
                }
            </div>
            {
                variant !== 'preview' || posts.length > perPage ?
                    <Pagination pagination={pagination}/> : null
            }
        </>
    )
}

export default PostsGrid