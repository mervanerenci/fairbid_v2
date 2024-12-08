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
import {useExploreGridContext} from '@contexts/exploreGridContext';

import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const minBid = 0, fee = 0.10;
    const {isBidModalOpen, closeBidModal, currentAuctionId, currentAuctionType} = useBidModalContext();
    const [bid, setBid] = useState(0);
    const {control, handleSubmit, formState: {errors}, reset} = useForm();

    const { backendActor } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { refreshItems } = useExploreGridContext();

    
    const handleClose = () => {
        closeBidModal();
        setBid(minBid);
    }

    const handleBid = async (data) => {
        if (!currentAuctionId || !backendActor) {
            toast.error('Unable to place bid at this time');
            return;
        }

       
        if (currentAuctionType === "english") {
            console.log("English Auction");
            setIsSubmitting(true);
            try {
                // Convert bid to proper format if needed
                const bidValue = parseInt(data.bid);
               
                const bidAmount = bidValue;
                const auction_id = parseInt(currentAuctionId);
                await backendActor.make_bid(auction_id, bidAmount); 
                refreshItems();
                toast.success('Bid placed successfully');
                
                setTimeout(() => {
                    window.location.href = window.location.href;
                }, 1000); // Small delay to ensure the toast is visible
                handleClose();
                
                


            } catch (error) {
                console.error("Error placing bid:", error);
                toast.error(error.message || 'Failed to place bid');
            } finally {
                setIsSubmitting(false);
            }
        } else if (currentAuctionType === "sealed-bid") {
            
            setIsSubmitting(true);
            try {
                const bidValue = parseInt(data.bid);
              
                const bidAmount = bidValue;
                const auction_id = parseInt(currentAuctionId);
                await backendActor.make_bid_sb(auction_id, bidAmount);
                refreshItems();
                toast.success('Bid placed successfully');
                handleClose();

                window.location.reload();
            } catch (error) {
                console.error("Error placing bid:", error);
                toast.error(error.message || 'Failed to place bid');
            } finally {
                setIsSubmitting(false);
            }
        }

        setTimeout(() => {
            window.location.href = window.location.href;
        }, 1000); // Small delay to ensure the toast is visible
        setTimeout(() => {
            window.location.reload(true);
        }, 1100);

        
    }

    const getTotal = () => {
        return bid !== 0 ? (+bid).toFixed(3) : (minBid + fee).toFixed(3);
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
                                        placeholder={`${minBid} `}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        suffix=" "
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
                {/* <p className="row d-flex justify-content-between">
                    You must bid at least: <span className="text-bold text-light">{minBid.toFixed(2)} ETH</span>
                </p> */}
                <p className="row d-flex justify-content-between">
                    Total bid amount:
                    <span className="text-bold text-light">
                            {getTotal()} 
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