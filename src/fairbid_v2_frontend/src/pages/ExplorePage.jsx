// utils
import { lazy } from 'react';

// components
import Title from '@components/Title';
import Hero from '@layout/home2/Hero';

import { ExploreGridContextAPI } from '@contexts/exploreGridContext';
import { ExploreUpcomingContextAPI } from '@contexts/exploreUpcomingContext';

const Live = lazy(() => import('@layout/home2/Live'));
const Upcoming = lazy(() => import('@layout/home2/Upcoming'));
const CTA = lazy(() => import('@components/CTA'));


const ExplorePage = () => {
    return (
        <ExploreGridContextAPI>
            <ExploreUpcomingContextAPI>
                <Title title="Explore Page" />
                <main>
                    <Hero />
                    <Live />
                    <Upcoming />
                    <CTA />
                </main>
            </ExploreUpcomingContextAPI>
        </ExploreGridContextAPI>
    )
}

export default ExplorePage