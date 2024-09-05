// components
import SectionHeader from '@components/SectionHeader';
import LinkWithArrow from '@ui/LinkWithArrow';
import ItemsGrid from '@components/ItemsGrid';

const Upcoming = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="Upcoming auctions 🔥">
                    <LinkWithArrow href="/explore/upcoming-auctions" text="Explore more" />
                </SectionHeader>
                <ItemsGrid variant="preview" />
            </div>
        </section>
    )
}

export default Upcoming