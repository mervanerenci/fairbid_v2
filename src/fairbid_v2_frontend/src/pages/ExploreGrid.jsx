// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ExploreGridContent from '@layout/explore-grid';

// context
import {ExploreGridContextAPI} from '@contexts/exploreGridContext';
import {FilterContextAPI} from '@contexts/filterContext';

const ExploreGrid = () => {
    return (
        <>
            <Title title="Explore" />
            <SimplePageHeader title="Explore" />
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

export default ExploreGrid