// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import {NavLink} from 'react-router-dom';
import Metadata from '@ui/Metadata';
import CollapsedText from '@components/CollapsedText';
import AuthorTag from '@ui/AuthorTag';
import Spring from '@components/Spring';

// hooks
import useMeasure from 'react-use-measure';

const PostsGridItem = ({post, index}) => {
    const {title, img, read, date, comments} = post;
    const [ref, {width}] = useMeasure();

    return (
       <Spring index={index}>
           <div className={`${styles.wrapper} border-10`}>
               <div className={`${styles.media} shadow-overlay`}>
                   <LazyImage className={styles.media_img} src={img} alt={title}/>
               </div>
               <div className={styles.main}>
                   <AuthorTag/>
                   <div className="d-flex flex-column g-10" ref={ref}>
                       <Metadata date={date} read={read} comments={comments}/>
                       <NavLink className={`${styles.main_title} h5`} to="/post">
                           <CollapsedText text={title} width={width}/>
                       </NavLink>
                   </div>
               </div>
           </div>
         </Spring>
    );
}

export default PostsGridItem