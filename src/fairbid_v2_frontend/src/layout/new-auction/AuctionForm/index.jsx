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
    const { backendActor, isAuthenticated } = useAuth();
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
    const [previewImage, setPreviewImage] = useState(null);

    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduledTime, setScheduledTime] = useState(null);

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

    // Convert scheduled date to UNIX timestamp
    const convertToUnixTimestamp = (date) => {
        return Math.floor(new Date(scheduledTime).getTime() / 1000);
    }

    const convertToSeconds = (value) => {
        if (duration === "minutes" || duration.value === "minutes" ) {
            return value * 60;
        } else if (duration === "days" || duration.value === "days") {
            return value * 24 * 60 * 60;
        }
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.authPrompt}>
                    <h2>Authentication Required</h2>
                    <p>Please sign in to create an auction</p>
                    <GradientBtn tag="link" to="/login">Sign In</GradientBtn>
                </div>
            </div>
        );
    }

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            const item = {
                title: data.name,
                description: data.message,
            };

            const durationInt = parseInt(data.subject);
            console.log("durationInt", durationInt);
            const _duration = convertToSeconds(durationInt);
            console.log("converted duration", _duration);

            const startingPrice = parseInt(data.startingPrice);

            const unixTimestamp = isScheduled ? convertToUnixTimestamp(scheduledTime) : null;
            console.log("unixTimestamp", unixTimestamp);

            console.log("Creating auction:", {
                item,
                startingPrice,
                duration: _duration,
                contact: data.contact,
                location: data.location,
                image,
                listOnSite,
                whitelist,
                isEth
            });

            if (isScheduled) {
                console.log("creating scheduled auction");
                return;
            }


            if (type === "english" || type.value === "english") {

                console.log("creating english auction");

                await backendActor.new_auction(
                    item,
                    startingPrice,
                    _duration,
                    data.contact,
                    data.location,
                    image,
                    whitelist,
                    listOnSite,
                    isEth
                );
                toast.success("Auction created successfully!");
                navigate("/explore-page");

            } else if (type === "dutch" || type.value === "dutch") {
                console.log("creating dutch auction");
                await backendActor.new_dutch_auction(
                    item,
                    startingPrice,
                    _duration,
                    data.contact,
                    data.location,
                    image,
                    whitelist,
                    listOnSite,
                    isEth
                );
                toast.success("Auction created successfully!");
                navigate("/explore-page");

            } else if (type === "sealed-bid" || type.value === "sealed-bid") {
                console.log("creating sealed bid auction");
                await backendActor.new_sb_auction(
                    item,
                    startingPrice,
                    _duration,
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
        <div className={styles.container}>
            <div className={styles.formSection}>
                <h2 className={styles.title}>Create New Auction</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Item Title</label>
                            <input
                                type="text"
                                placeholder="Enter item title"
                                className={errors.name ? styles.errorInput : ''}
                                {...register('name', { required: 'Title is required' })}
                            />
                            {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Starting Price</label>
                            <div className={styles.priceInput}>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className={errors.startingPrice ? styles.errorInput : ''}
                                    {...register('startingPrice', { required: 'Starting price is required' })}
                                />
                                <div className={styles.ethToggle}>
                                    <Checkbox
                                        id="isEth"
                                        checked={isEth}
                                        onChange={(e) => setIsEth(e.target.checked)}
                                    />
                                    <label htmlFor="isEth">ETH</label>
                                </div>
                            </div>
                            {errors.startingPrice && <span className={styles.errorText}>{errors.startingPrice.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                className={errors.location ? styles.errorInput : ''}
                                {...register('location', { required: 'Location is required' })}
                            />
                            {errors.location && <span className={styles.errorText}>{errors.location.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Contact</label>
                            <input
                                type="text"
                                placeholder="Enter contact information"
                                className={errors.contact ? styles.errorInput : ''}
                                {...register('contact', { required: 'Contact is required' })}
                            />
                            {errors.contact && <span className={styles.errorText}>{errors.contact.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Duration</label>
                            <div className={styles.durationGroup}>
                                <input
                                    type="number"
                                    placeholder="Enter duration"
                                    className={errors.subject ? styles.errorInput : ''}
                                    {...register('subject', { required: 'Duration is required' })}
                                />
                                <CustomSelect
                                    setSelected={setDuration}
                                    options={DURATION_OPTS}
                                    selected={duration}
                                    placeholder="Duration Type"
                                />
                            </div>
                            {errors.subject && <span className={styles.errorText}>{errors.subject.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Auction Type</label>
                            <CustomSelect
                                setSelected={setType}
                                options={AUCTION_OPTIONS}
                                selected={AUCTION_OPTIONS.find(option => option.value === type)}
                                placeholder="Select Auction Type"
                            />
                        </div>
                    </div>

                    <div className={styles.uploadSection}>
                        <label>Item Image</label>
                        <div className={styles.imageUpload}>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => changeFile(e.target.files?.[0])}
                                className={styles.fileInput}
                            />
                            {previewImage && (
                                <div className={styles.preview}>
                                    <img src={previewImage} alt="Preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            placeholder="Enter item description"
                            className={errors.message ? styles.errorInput : ''}
                            {...register('message', { required: 'Description is required' })}
                        />
                        {errors.message && <span className={styles.errorText}>{errors.message.message}</span>}
                    </div>

                    <div className={styles.options}>
                        <div className={styles.optionItem}>
                            <Checkbox
                                id="listOnSite"
                                checked={listOnSite}
                                onChange={(e) => setListOnSite(e.target.checked)}
                            />
                            <label htmlFor="listOnSite">List On Site</label>
                        </div>

                        <div className={styles.optionItem}>
                            <Checkbox
                                id="whitelist"
                                checked={whitelist}
                                onChange={(e) => setWhitelist(e.target.checked)}
                            />
                            <label htmlFor="whitelist">Enable Whitelist</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.scheduleToggle}>
                            <Checkbox
                                id="isScheduled"
                                checked={isScheduled}
                                onChange={(e) => setIsScheduled(e.target.checked)}
                            />
                            <label htmlFor="isScheduled">Schedule Auction</label>
                        </div>

                        {isScheduled && (
                            <input
                                type="datetime-local"
                                className={styles.dateTimePicker}
                                onChange={(e) => setScheduledTime(e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                            />
                        )}
                    </div>

                    <GradientBtn
                        className={styles.submitBtn}
                        tag="button"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Creating..." : "Create Auction"}
                    </GradientBtn>
                </form>
            </div>
        </div>
    );
}

export default AuctionForm;