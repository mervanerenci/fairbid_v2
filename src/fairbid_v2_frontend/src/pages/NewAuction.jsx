// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import AuctionForm from '@layout/new-auction/AuctionForm';


const NewAuction = () => {
    return (
        <>
            <Title title="New Auction"/>
            <PageHeader title="Create"/>
            <main>
                <section>
                    <div className="container">
                        <AuctionForm/>
                        {/* <ContactsInfo/> */}
                    </div>
                </section>
            </main>
        </>
    )
}

export default NewAuction