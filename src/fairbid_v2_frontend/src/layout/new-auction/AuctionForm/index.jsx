// styling
import styles from './style.module.scss';

// components
import GradientBtn from '@ui/GradientBtn';
import Map from '@layout/new-auction/Map';
import LazyImage from '@components/LazyImage';
import {toast} from 'react-toastify';
import Checkbox from '@ui/Checkbox';
import CustomSelect from '@ui/CustomSelect';
// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

// assets
import map from '@assets/map.webp';
import { Upload } from '@mui/icons-material';
import UploadImage from '@layout/new-auction/UploadImage';
import { useState } from 'react';

const AuctionForm = () => {
    const MAP_KEY = process.env.REACT_APP_PUBLIC_MAP_KEY;
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const onSubmit = (data) => {
        toast.info(`Your message: "${data.message}" has been sent successfully`);
        reset();
    }

    const AUCTION_OPTIONS = [
        {value: 'english', label: 'English Auction'},
        {value: 'dutch', label: 'Dutch Auction'},
        {value: 'sealed-bid', label: 'Sealed Bid Auction'},

    ];

    const DURATION_OPTS = [
        {value: 'minutes', label: 'Minutes'},
        {value: 'days', label: 'Days'},
        

    ];

    const [type, setType] = useState("english");
    const [duration, setDuration] = useState("minutes");

    return (
        <div className={`${styles.container} bg-secondary border-10`}>
            <div className={styles.main}>
                <h3>New Auction</h3>
                <form className={styles.main_form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.group}>
                        
                        <input className={classNames('field field--outline', {'field--error': errors.name})}
                               type="text"
                               placeholder="Item name"
                               {...register('name', {required: true})}/>
                               <input className={classNames('field field--outline', {'field--error': errors.name})}
                               type="text"
                               placeholder="Starting Price"
                               {...register('name', {required: true})}/>
                               <input className={classNames('field field--outline', {'field--error': errors.name})}
                               type="text"
                               placeholder="Location"
                               {...register('name', {required: true})}/>
                                <input className={classNames('field field--outline', {'field--error': errors.email})}
                               type="text"
                               placeholder="Contact"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                               <input className={classNames('field field--outline', {'field--error': errors.subject})}
                           type="text"
                           placeholder="Duration"
                           {...register('subject', {required: true})}/>
                               <CustomSelect setSelected={setDuration}
                                      options={DURATION_OPTS}
                                      selected={duration}
                                      placeholder="Minutes"/>
                    </div>
                    

                        <CustomSelect setSelected={setType}
                                      options={AUCTION_OPTIONS}
                                      selected={type}
                                      placeholder="Auction Type"/>
                    <ul className="sidebar_list">
                        
                        <li className="sidebar_list-item">
                            <Checkbox id={"list"}
                                defaultChecked={true}
                            />
                            <label htmlFor={"list"}>List On Site</label>
                        </li>
                        <li className="sidebar_list-item">
                            <Checkbox id={"whitelist"}
                            />
                            <label htmlFor={"whitelist"}>Add Whitelist</label>
                        </li>
                    </ul>
                    <textarea className={classNames('field field--outline', {'field--error': errors.message})}
                              placeholder="Enter item description"
                              {...register('message', {required: true})}/>
                    <GradientBtn className={styles.btn} tag="button" type="submit">Create</GradientBtn>
                </form>
            </div>
            <div className={`${styles.map} border-10`}>
                <UploadImage/>
                {/* {
                    MAP_KEY ?
                        <Map/>
                        :
                        <LazyImage className={`${styles.img} border-10`} src={map} alt="map"/>
                } */}
            </div>
        </div>
    )
}

export default AuctionForm