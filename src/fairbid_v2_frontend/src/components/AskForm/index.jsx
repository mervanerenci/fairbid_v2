// styling
import styles from './style.module.scss';

// components
import {toast} from 'react-toastify';

// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

const AskForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = () => {
        toast.info('Thank you for subscribing!');
        reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={classNames('field bg-tertiary border-10 text-bold', {'field--error': errors.email})}
                   type="text"
                   placeholder="Write here..."
                   {...register('email', {required: true})} />
            <button type="submit" aria-label="Ask to seller">
                <i className="icon icon-arrow-right"/>
            </button>
        </form>
    )
}

export default AskForm