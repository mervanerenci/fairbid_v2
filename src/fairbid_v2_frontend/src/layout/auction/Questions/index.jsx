// styling
import styles from './style.module.scss';

// components
import GradientBtn from '@ui/GradientBtn';
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// hooks
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

// utils
import classNames from 'classnames';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

// assets
import img1 from '@assets/home/sellers/10.webp';
import img2 from '@assets/avatar.webp';
import img3 from '@assets/home/sellers/2.webp';

// context
import { useAuth } from '@contexts/useAuthClient';
import { useQuestionContext } from '@contexts/questionContext';

const Questions = ({ id, isOriginator }) => {
    const { backendActor, principal } = useAuth();
    const { auctionId } = useQuestionContext();
    const name = 'Barbara';
    const [usernames, setUsernames] = useState({});
    const [comments, setComments] = useState([
        {
            question: 'What is the minimum bid?',
            answer: `The minimum bid is $100.`,
            isPrivate: false,
            originator: '0x1234567890123456789012345678901234567890'
            // isReply: true
        }
    ]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [replyingTo, setReplyingTo] = useState(null);
    const [isPrivateReply, setIsPrivateReply] = useState(false);


    const handleReplyClick = (index) => {
        setReplyingTo(replyingTo === index ? null : index);
    };





    useEffect(() => {

        const fetchUsername = async (originator) => {
            try {

                const stringOriginator = originator.toString();
                const username = await backendActor.get_username_by_principal(originator);

                if (username) {
                    setUsernames(prev => ({
                        ...prev,
                        [originator]: username.toString()
                    }));
                }

            } catch (error) {
                console.error(`Error fetching username for ${originator}:`, error);
            }
        };


        const fetchQuestions = async () => {
            const idNumber = parseInt(id);
            const questions = await backendActor.get_questions(idNumber);
            setComments(questions);
            console.log("Questions:", questions);

            // Fetch usernames for all new originators
            questions.forEach(question => {
                // console.log("Question originator:", question.originator);
                // console.log("Question originator string:", question.originator.toString());

                const principal = question.originator
                const stringOriginator = question.originator.toString();
                if (!usernames[stringOriginator]) {
                    fetchUsername(principal);
                }
            });
        };


        fetchQuestions();
        // setInterval(fetchQuestions, 10000);
    }, []);

    const formatDisplayName = (originator) => {
        if (usernames[originator]) return usernames[originator].toString();

        // If it's a long address, truncate it
        // console.log("Originator:", originator);
        const originatorString = originator.toString();
        if (originatorString?.length > 10) {
            return `${originatorString.slice(0, 6)}...${originatorString.slice(-4)}`;
        }

        return originatorString;
    };

    const canSeeQuestion = (question) => {
        const userPrincipal = principal?.toString();
        const isQuestionAsker = question.originator?.toString() === userPrincipal;
        console.log("QQQ Question originator:", question.originator);
        console.log("QQQ User principal:", userPrincipal);
        console.log("QQQ Is question asker:", isQuestionAsker);
        console.log("QQQ Question answer:", question.answer);
        console.log("QQQ Question is private:", question.is_private);

        // If question is not private or has no answer, check visibility rules
        if (!question.answer || !question.is_private) {
            return isOriginator || isQuestionAsker;
        }

        // For private answered questions
        return isOriginator || isQuestionAsker;
    };


    const onSubmit = async (data) => {
        if (!backendActor || !id) {
            toast.error("Unable to submit question at this time");
            console.log("Unable to submit question at this time");
        }

        try {
            console.log("Asking question:", data.message);
            console.log("Auction ID:", id);

            const idValue = parseInt(id);
            await backendActor.ask_question(idValue, data.message);



            toast.success("Question submitted successfully");
            reset();
        } catch (error) {
            console.error("Error submitting question:", error);
            toast.error("Failed to submit question");
        }
    };

    const onReply = async (data) => {
        if (!backendActor || !id) {
            toast.error("Unable to answer question at this time");

        }

        try {
            console.log("Answering question:", data.message);
            console.log("Auction ID:", id);

            const idValue = parseInt(id);
            if (isPrivateReply) {
                await backendActor.answer_question_private(idValue, data.message);
            } else {
                await backendActor.answer_question(idValue, data.message);
            }



            toast.success("Answer submitted successfully");
            reset();
        } catch (error) {
            console.error("Error submitting answer:", error);
            toast.error("Failed to submit answer");
        }
    };

    return (
        <div className={`${styles.container} post-section`}>
            <section className={styles.section}>
                <h3>Questions</h3>
                <div className="d-flex flex-column g-20">
                    {
                        comments
                            .filter(comment => canSeeQuestion(comment))
                        .map((comment, index) => (

                                <Spring className={styles.comment_wrapper} key={index} index={index}>
                                    <div className={styles.comment} data-reply={comment.isReply}>
                                        <div className={`${styles.comment_media} border-10 square`}>
                                            <LazyImage src={img3} alt={formatDisplayName(comment.originator)} />
                                        </div>
                                        <div className={styles.comment_main}>
                                            <div className="d-flex flex-column g-5">
                                                <span className="text-bold text-light">{formatDisplayName(comment.originator)}</span>
                                                <div className="d-flex g-25 text-sm">
                                                    <span className={`${styles.date} text-bold text-overflow`}>
                                                        {dayjs(comment.date).format('MMMM DD, YYYY [at] h:mm a')}
                                                    </span>
                                                    <span className={styles.divider} />
                                                    {/* Only show reply button for originator */}
                                                {isOriginator && !comment.answer && (
                                                    <button 
                                                        className={`${styles.reply} text-bold`}
                                                        onClick={() => handleReplyClick(index)}
                                                    >
                                                        Reply
                                                    </button>
                                                )}
                                                </div>
                                            </div>
                                            <p className="text-sm">
                                                {comment.question}
                                            </p>

                                            {comment.answer && (
                                                <div className={styles.answer}>
                                                    <p className="text-sm">
                                                        <strong>Answer: </strong>{comment.answer}
                                                    </p>
                                                    {comment.isPrivate && (
                                                        <span className={styles.privateTag}>Private</span>
                                                    )}
                                                </div>
                                            )}

                                            {replyingTo === index && (
                                                <form className="d-flex flex-column g-20 mt-3" onSubmit={handleSubmit(onReply)}>
                                                    <textarea
                                                        className={classNames('field field--outline', { 'field--error': errors.message })}
                                                        placeholder="Write your reply..."
                                                        {...register('message', { required: true })}
                                                    />
                                                    <div className={styles.replyOptions}>
                                                    <label className={styles.privateCheckbox}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isPrivateReply}
                                                            onChange={(e) => setIsPrivateReply(e.target.checked)}
                                                        />
                                                        Private
                                                    </label>
                                                </div>
                                                    <div className="d-flex g-10">
                                                        <GradientBtn className={styles.btn} tag="button" type="submit">Reply</GradientBtn>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={() => {
                                                                setReplyingTo(null);
                                                                setIsPrivateReply(false);
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            )}


                                        </div>
                                    </div>
                                </Spring>
                            ))
                    }
                </div>
            </section>
            {isOriginator ? (
                <></>
            ) : (
                <>
                    <section className={styles.section}>
                        <h3>Ask a question</h3>
                        <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>

                            <textarea className={classNames('field field--outline', { 'field--error': errors.message })}
                                placeholder="Enter your question"
                                {...register('message', { required: true })} />
                            <GradientBtn className={styles.btn} tag="button" type="submit">Send</GradientBtn>
                        </form>
                    </section>
                </>
            )}
        </div>
    )
}

export default Questions