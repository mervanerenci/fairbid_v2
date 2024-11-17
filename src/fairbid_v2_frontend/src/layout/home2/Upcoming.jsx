// components
import SectionHeader from '@components/SectionHeader';
import LinkWithArrow from '@ui/LinkWithArrow';
import ItemsGrid from '@components/ItemsGrid';

import { useExploreUpcomingContext } from '@contexts/exploreUpcomingContext';

const Upcoming = () => {
    const { items } = useExploreUpcomingContext();
    return (
        <section>
            <div className="container">
                <SectionHeader title="Upcoming auctions 🔥">
                    <LinkWithArrow href="/explore/upcoming-auctions" text="Explore more" />
                </SectionHeader>
                <ItemsGrid variant="preview" items={items} />
            </div>
        </section>
    )
}

export default Upcoming