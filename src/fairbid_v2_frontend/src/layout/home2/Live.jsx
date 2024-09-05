// components
import SectionHeader from '@components/SectionHeader';
import LinkWithArrow from '@ui/LinkWithArrow';
import ItemsGrid from '@components/ItemsGrid';

const Live = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="Live auctions 💥">
                    <LinkWithArrow href="/explore/live-auctions" text="Explore more" />
                </SectionHeader>
                <ItemsGrid variant="preview" />
            </div>
        </section>
    )
}

export default Live