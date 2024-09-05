// styling
import styles from './style.module.scss';

// components
import GradientBtn from '@ui/GradientBtn';
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// hooks
import {useForm} from 'react-hook-form';
import {useState} from 'react';

// utils
import classNames from 'classnames';
import dayjs from 'dayjs';

// assets
import img1 from '@assets/home/sellers/10.webp';
import img2 from '@assets/avatar.webp';
import img3 from '@assets/home/sellers/2.webp';

const Questions = () => {
    const [comments, setComments] = useState([
        // {
        //     name: 'Barbara',
        //     avatar: img1,
        //     date: new Date(2022, 4, 5, 8, 40),
        //     message: `Convallis tellus id interdum velit laoreet id donec. Vitae elementum curabitur vitae nunc sed
        //      velit dignissim sodales. Ultrices gravida dictum fusce ut placerat orci.`
        // },
        {
            name: 'Brenda',
            avatar: img2,
            date: new Date(2022, 4, 6, 9, 2),
            message: `Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.`,
            // isReply: true
        }
    ]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = (data) => {
        setComments([...comments, {
            name: data.name,
            avatar: img3,
            date: dayjs(),
            message: data.message
        }]);
        reset();
    };

    return (
        <div className={`${styles.container} post-section`}>
            <section className={styles.section}>
                <h3>{comments.length} question{comments.length !== 1 ? 's' : ''}</h3>
                <div className="d-flex flex-column g-20">
                    {
                        comments.map((comment, index) => (
                            <Spring className={styles.comment_wrapper} key={index} index={index}>
                                <div className={styles.comment} data-reply={comment.isReply}>
                                    <div className={`${styles.comment_media} border-10 square`}>
                                        <LazyImage src={comment.avatar} alt={comment.name}/>
                                    </div>
                                    <div className={styles.comment_main}>
                                        <div className="d-flex flex-column g-5">
                                            <span className="text-bold text-light">{comment.name}</span>
                                            <div className="d-flex g-25 text-sm">
                                            <span className={`${styles.date} text-bold text-overflow`}>
                                                {dayjs(comment.date).format('MMMM DD, YYYY [at] h:mm a')}
                                            </span>
                                                <span className={styles.divider}/>
                                                <button className={`${styles.reply} text-bold`}>Reply</button>
                                            </div>
                                        </div>
                                        <p className="text-sm">
                                            {comment.message}
                                        </p>
                                    </div>
                                </div>
                            </Spring>
                        ))
                    }
                </div>
            </section>
            <section className={styles.section}>
                <h3>Ask a question</h3>
                <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className={styles.group}>
                        <input className={classNames('field field--outline', {'field--error': errors.name})}
                               type="text"
                               placeholder="Full name"
                               {...register('name', {required: true})} />
                        <input className={classNames('field field--outline', {'field--error': errors.email})}
                               type="text"
                               placeholder="Email"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                    </div> */}
                    <textarea className={classNames('field field--outline', {'field--error': errors.message})}
                              placeholder="Enter your question"
                              {...register('message', {required: true})} />
                    <GradientBtn className={styles.btn} tag="button" type="submit">Send</GradientBtn>
                </form>
            </section>
        </div>
    )
}

export default Questions