// utils
import {lazy} from 'react';

// components
import Title from '@components/Title';
import Hero from '@layout/home/Hero';
const NotableDrops = lazy(() => import('@layout/home/NotableDrops'));
const BestSellers = lazy(() => import('@layout/home/BestSellers'));
const Browse = lazy(() => import('@layout/home/Browse'));
const CreateAndSell = lazy(() => import('@layout/home/CreateAndSell'));
const Presentation = lazy(() => import('@layout/home/Presentation'));
const Blog = lazy(() => import('@layout/home/Blog'));

const Home = () => {
    return (
        <>
            <Title title="Home"/>
            <main>
                <Hero/>
                {/* <NotableDrops/>
                <BestSellers/>
                <Browse/> */}
                <CreateAndSell/>
                {/* <Presentation/>
                <Blog/> */}
            </main>
        </>
    )
}

export default Home