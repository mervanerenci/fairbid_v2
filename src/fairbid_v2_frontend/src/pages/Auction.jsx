// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import AuctionDetails from '@layout/auction';

const Auction = () => {
    return (
        <>
            <Title title="Auction details" />
            <SimplePageHeader title="Auction details" />
            <main>
                <AuctionDetails />
            </main>
        </>
    );
}

export default Auction