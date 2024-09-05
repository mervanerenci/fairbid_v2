// utils
import {lazy} from 'react';

// components
import Title from '@components/Title';
import Hero from '@layout/home2/Hero';
const Live = lazy(() => import('@layout/home2/Live'));
const Upcoming = lazy(() => import('@layout/home2/Upcoming'));
const FeaturedCollections = lazy(() => import('@layout/home2/FeaturedCollections'));
const Features = lazy(() => import('@components/Features'));
const TopAuthors = lazy(() => import('@layout/home2/TopAuthors'));
const CTA = lazy(() => import('@components/CTA'));
const Brands = lazy(() => import('@layout/home2/Brands'));

const ExplorePage = () => {
    return (
        <>
            <Title title="Explore Page"/>
            <main>
                <Hero/>
                <Live/>
                <Upcoming/>
                {/* <FeaturedCollections/>
                <Features/>
                <TopAuthors/> */}
                <CTA/>
                {/* <Brands/> */}
            </main>
        </>
    )
}

export default ExplorePage