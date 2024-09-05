import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ExploreGridContent from '@layout/explore-grid';

// context
import {ExploreGridContextAPI} from '@contexts/exploreGridContext';
import {FilterContextAPI} from '@contexts/filterContext';

const UpcomingAuctions = () => {
    return (
        <>
            <Title title="Upcoming Auctions" />
            <SimplePageHeader title="Upcoming Auctions" />
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

export default UpcomingAuctions