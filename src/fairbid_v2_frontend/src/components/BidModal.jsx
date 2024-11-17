// styling
import styled from 'styled-components/macro';

// components
import StyledModal from '@ui/StyledModal';
import GradientBtn from '@ui/GradientBtn';
import {NumericFormat} from 'react-number-format';
import {toast} from 'react-toastify';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useEffect} from 'react';

// utils
import classNames from 'classnames';

// context

import {useAuth} from "@contexts/useAuthClient"

const StyledBidModal = styled(StyledModal)`
  .content {
    max-width: 500px;

    &_header {
      text-align: center;
    }

    &_main {
      margin: 30px 0;
      gap: 10px;

      .row {
        flex-direction: column;
      }
    }
  }

  @media screen and (min-width: 414px) {
    .content_main .row {
      flex-direction: row;
    }
  }
`;

const BidModal = () => {
    const minBid = 3.08, fee = 0.10;
    const {isBidModalOpen, closeBidModal, currentAuctionId} = useBidModalContext();
    const [bid, setBid] = useState(0);
    const {control, handleSubmit, formState: {errors}, reset} = useForm();

    const { backendActor } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("Current Auction ID:", currentAuctionId);
        console.log("Backend Actor:", backendActor);
    }, [currentAuctionId, backendActor]);

    const handleClose = () => {
        closeBidModal();
        setBid(minBid);
    }

    const handleBid = async (data) => {
        if (!currentAuctionId || !backendActor) {
            toast.error('Unable to place bid at this time');
            return;
        }

        setIsSubmitting(true);
        try {
            // Convert bid to proper format if needed
            const bidValue = parseInt(data.bid);
            console.log("Bid Value:", bidValue);
            const bidAmount = bidValue;
            const auction_id = parseInt(currentAuctionId);
            await backendActor.make_bid(auction_id, bidAmount);
            toast.success('Bid placed successfully');
            handleClose();
        } catch (error) {
            console.error("Error placing bid:", error);
            toast.error(error.message || 'Failed to place bid');
        } finally {
            setIsSubmitting(false);
        }
    }

    const getTotal = () => {
        return bid !== 0 ? (+bid).toFixed(2) : (minBid + fee).toFixed(2);
    }

    return (
        <StyledBidModal open={isBidModalOpen} onClose={handleClose}>
            <div className="content_header d-flex flex-column g-30">
                <div className="d-flex flex-column g-10">
                    <h4>Place a bid</h4>
                    {/* <p>You purchase a product </p> */}
                </div>
                <form className="d-flex">
                    <Controller control={control}
                                name="bid"
                                rules={{required: true, min: minBid}}
                                defaultValue=""
                                render={({field}) => (
                                    <NumericFormat
                                        className={classNames('field field--outline flex-1', {'field--error': errors.bid})}
                                        placeholder={`${minBid} ETH`}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        suffix=" ETH"
                                        name={field.name}
                                        onValueChange={({value}) => {
                                            setBid(+value);
                                            field.onChange(+value);
                                        }}
                                    />
                                )}/>
                </form>
            </div>
            <div className="content_main d-flex flex-column">
                <p className="row d-flex justify-content-between">
                    You must bid at least: <span className="text-bold text-light">{minBid.toFixed(2)} ETH</span>
                </p>
                <p className="row d-flex justify-content-between">
                    Total bid amount:
                    <span className="text-bold text-light">
                            {getTotal()} ETH
                        </span>
                </p>
            </div>
            <div className="content_footer d-flex flex-column g-20">
                <GradientBtn 
                    tag="button" 
                    onClick={handleSubmit(handleBid)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Placing bid...' : 'Place a bid'}
                </GradientBtn>
                <button 
                    className="btn btn--outline" 
                    onClick={handleClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </StyledBidModal>
    )
}

export default BidModal