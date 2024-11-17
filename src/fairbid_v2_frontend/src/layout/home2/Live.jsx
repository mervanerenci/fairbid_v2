// components
import SectionHeader from '@components/SectionHeader';
import LinkWithArrow from '@ui/LinkWithArrow';
import ItemsGrid from '@components/ItemsGrid';
import { useExploreGridContext } from '@contexts/exploreGridContext';


const  Live =  () => {
    const { items } =   useExploreGridContext();
    return (
        <section>
            
                <div className="container">
                    <SectionHeader title="Live auctions 💥">
                        <LinkWithArrow href="/explore/live-auctions" text="Explore more" />
                    </SectionHeader>

                    <ItemsGrid items={items} variant="preview" />

                </div>
           
        </section>
    )
}

export default Live