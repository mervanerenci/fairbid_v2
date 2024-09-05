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

// utils
import classNames from 'classnames';

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
    const {isBidModalOpen, closeBidModal} = useBidModalContext();
    const [bid, setBid] = useState(0);
    const {control, handleSubmit, formState: {errors}, reset} = useForm();

    const handleClose = () => {
        closeBidModal();
        setBid(minBid);
    }

    const handleBid = () => {
        toast.success('Bid placed successfully');
        reset();
        handleClose();
    }

    const getTotal = () => {
        return bid !== 0 ? (+bid + fee).toFixed(2) : (minBid + fee).toFixed(2);
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
                <GradientBtn tag="button" onClick={handleSubmit(handleBid)}>Place a bid</GradientBtn>
                <button className="btn btn--outline" onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </StyledBidModal>
    )
}

export default BidModal