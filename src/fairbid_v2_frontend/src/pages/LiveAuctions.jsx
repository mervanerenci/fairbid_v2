// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ExploreGridContent from '@layout/explore-grid';

// context
import {ExploreGridContextAPI} from '@contexts/exploreGridContext';
import {FilterContextAPI} from '@contexts/filterContext';

const LiveAuctions = () => {
    return (
        <>
            <Title title="Live Auctions" />
            <SimplePageHeader title="Live Auctions" />
            <main>
                <ExploreGridContextAPI>
                    <FilterContextAPI>
                        <ExploreGridContent />
                    </FilterContextAPI>
                </ExploreGridContextAPI>
            </main>
        </>
    )
}

export default LiveAuctions