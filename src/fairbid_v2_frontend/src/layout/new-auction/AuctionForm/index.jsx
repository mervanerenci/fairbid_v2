// styling
import styles from './style.module.scss';

// components
import GradientBtn from '@ui/GradientBtn';
import Map from '@layout/new-auction/Map';
import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';
import Checkbox from '@ui/Checkbox';
import CustomSelect from '@ui/CustomSelect';
// hooks
import { useForm } from 'react-hook-form';
import { useAuth } from '@contexts/useAuthClient';
import { useNavigate } from 'react-router-dom';

// utils
import classNames from 'classnames';

// assets
import map from '@assets/map.webp';
import { Upload } from '@mui/icons-material';
import UploadImage from '@layout/new-auction/UploadImage';
import { useState } from 'react';




const AuctionForm = () => {
    
    const MAP_KEY = process.env.REACT_APP_PUBLIC_MAP_KEY;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { backendActor } = useAuth();
    const navigate = useNavigate();




    const AUCTION_OPTIONS = [
        { value: 'english', label: 'English Auction' },
        { value: 'dutch', label: 'Dutch Auction' },
        { value: 'sealed-bid', label: 'Sealed Bid Auction' },

    ];

    const DURATION_OPTS = [
        { value: 'minutes', label: 'Minutes' },
        { value: 'days', label: 'Days' },


    ];

    const [type, setType] = useState("english");
    const [duration, setDuration] = useState("minutes");
    const [image, setImage] = useState(Uint8Array.of());
    const [saving, setSaving] = useState(false);
    const [listOnSite, setListOnSite] = useState(true);
    const [whitelist, setWhitelist] = useState(false);
    const [isEth, setIsEth] = useState(false);

    const concatUint8Arrays = (left, right) => {
        let temporary = [];
        for (let element of left) {
            temporary.push(element);
        }
        for (let element of right) {
            temporary.push(element);
        }
        return Uint8Array.from(temporary);
    }

    const changeFile = async (file) => {
        let data = Uint8Array.of();
        if (file != null) {
            const stream = await file.stream();
            const reader = stream.getReader();
            while (true) {
                const part = await reader.read();
                const chunk = part.value;
                if (chunk == null) {
                    break;
                }
                data = concatUint8Arrays(data, chunk);
            }
        }
        setImage(data);
    }

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            const item = {
                title: data.name,
                description: data.message,
            };

            const duration = parseInt(data.subject);
            const startingPrice = parseInt(data.startingPrice);
            console.log("type", type);
            console.log("type value", type.value);

            console.log("Creating auction:", {
                item,
                startingPrice,
                duration: duration,
                contact: data.contact,
                location: data.location,
                image,
                listOnSite,
                whitelist,
                isEth
            });

            console.log("type: ", type);
            console.log("type value: ", type.value);

            if (type || type.value === "english") {

                console.log("english auction");
                
                await backendActor.new_auction(
                    item,
                    startingPrice,
                    duration,
                    data.contact,
                    data.location,
                    image,
                    whitelist,
                    listOnSite,
                    isEth
                );
                toast.success("Auction created successfully!");
                navigate("/explore-page");
                
            } else if (type || type.value === "dutch") {
                console.log("dutch auction");
                await backendActor.new_dutch_auction(
                    item,
                    startingPrice,
                    duration,
                    data.contact,
                    data.location,
                    image,
                    whitelist,
                    listOnSite,
                    isEth
                );
                toast.success("Auction created successfully!");
                navigate("/explore-page");
            
            } else if (type || type.value === "sealed-bid") {
                console.log("sealed bid auction");
                await backendActor.new_sb_auction(
                    item,
                    startingPrice,
                    duration,
                    data.contact,
                    data.location,
                    image,
                    whitelist,
                    listOnSite,
                    isEth
                );
                toast.success("Auction created successfully!");
                navigate("/explore-page");
            } else {
                console.error("Invalid auction type");
            }

            
        } catch (error) {
            console.error("Error creating auction:", error);
            toast.error("Failed to create auction");
        } finally {
            setSaving(false);
        }
    }



    return (
        <div className={`${styles.container} bg-secondary border-10`}>
            <div className={styles.main}>
                <h3>New Auction</h3>
                <form className={styles.main_form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.group}>

                        <input className={classNames('field field--outline', { 'field--error': errors.name })}
                            type="text"
                            placeholder="Item Title"
                            {...register('name', { required: true })} />
                        <Checkbox id={"isEth"}
                            defaultChecked={false}
                            onChange={(e) => setIsEth(e.target.checked)}
                        />
                        <input className={classNames('field field--outline', { 'field--error': errors.name })}
                            type="text"
                            placeholder="Starting Price"
                            {...register('startingPrice', { required: true })} />
                        <input className={classNames('field field--outline', { 'field--error': errors.name })}
                            type="text"
                            placeholder="Location"
                            {...register('location', { required: true })} />
                        <input className={classNames('field field--outline', { 'field--error': errors.email })}
                            type="text"
                            placeholder="Contact"
                            // , pattern: /^\S+@\S+$/i 
                            {...register('contact', { required: true})} />
                        <input className={classNames('field field--outline', { 'field--error': errors.subject })}
                            type="text"
                            placeholder="Duration"
                            {...register('subject', { required: true })} />
                        <CustomSelect setSelected={setDuration}
                            options={DURATION_OPTS}
                            selected={duration}
                            placeholder="Minutes" />


                    </div>


                    <CustomSelect setSelected={setType}
                        options={AUCTION_OPTIONS}
                        selected={AUCTION_OPTIONS.find(option => option.value === type)}
                        placeholder="Auction Type" />
                        
                    <ul className="sidebar_list">

                        <li className="sidebar_list-item">
                            <Checkbox id={"list"}
                                defaultChecked={true}
                                onChange={(e) => setListOnSite(e.target.checked)}
                            />
                            <label htmlFor={"list"}>List On Site</label>
                        </li>


                        <li className="sidebar_list-item">
                            <Checkbox id={"whitelist"}
                                defaultChecked={false}
                                onChange={(e) => setWhitelist(e.target.checked)}
                            />
                            <label htmlFor={"whitelist"}>Add Whitelist</label>
                        </li>

                    </ul>

                    <div className={styles.upload_section}>
                        <input 
                            type="file" 
                            accept='.png'
                            onChange={(e) => changeFile(e.target.files?.[0])}
                            className={styles.file_input}
                        />
                    </div>

                    <textarea className={classNames('field field--outline', { 'field--error': errors.message })}
                        placeholder="Enter item description"
                        {...register('message', { required: true })} />
                    <GradientBtn className={styles.btn} tag="button" type="submit" disabled={saving}>{saving ? "Creating..." : "Create"}</GradientBtn>
                </form>
            </div>
            <div className={`${styles.map} border-10`}>
                <UploadImage />
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