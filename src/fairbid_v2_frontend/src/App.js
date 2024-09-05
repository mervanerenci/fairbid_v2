// GA
import ReactGA from 'react-ga4';

// styling
import './style.scss';

// libs styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'react-toastify/dist/ReactToastify.css';

// utils
import {lazy, Suspense} from 'react';
import {preventDefault} from '@utils/helpers';

// hooks
import {useEffect} from 'react';

// context
import {BidModalContextAPI} from '@contexts/bidModalContext';
import {SidebarContextAPI} from '@contexts/sidebarContext';
import {AuthAPI} from '@contexts/authContext';

// components
import LoadingScreen from '@components/LoadingScreen';
import AppLayout from '@components/AppLayout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@components/ScrollToTop';

// pages
const Home = lazy(() => import('@pages/Home'));
const ExplorePage = lazy(() => import('@pages/ExplorePage'));
// const Explore = lazy(() => import('@pages/Explore'));
// const ExploreGrid = lazy(() => import('@pages/ExploreGrid'));
const Auction = lazy(() => import('@pages/Auction'));
// const Author = lazy(() => import('@pages/Author'));
const Profile = lazy(() => import('@pages/Profile'));
// const FAQ = lazy(() => import('@pages/FAQ'));
// const Ranking = lazy(() => import('@pages/Ranking'));
// const Activity = lazy(() => import('@pages/Activity'));
// const ConnectWallet = lazy(() => import('@pages/ConnectWallet'));
// const Login = lazy(() => import('@pages/Login'));
// const About = lazy(() => import('@pages/About'));
// const Team = lazy(() => import('@pages/Team'));
// const BlogSidebar = lazy(() => import('@pages/BlogSidebar'));
// const BlogGrid = lazy(() => import('@pages/BlogGrid'));
// const Post = lazy(() => import('@pages/Post'));

const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const LiveAuctions = lazy(() => import('@pages/LiveAuctions'));
const UpcomingAuctions = lazy(() => import('@pages/UpcomingAuctions'));
const NewAuction = lazy(() => import('@pages/NewAuction'));
const SellerProfile = lazy(() => import('@pages/SellerProfile'));
const Deposit = lazy(() => import('@pages/Deposit'));
const Withdraw = lazy(() => import('@pages/Withdraw')); 

const App = () => {
    useEffect(() => {
        preventDefault();
    }, []);

    const gaKey = process.env.REACT_APP_PUBLIC_GA;
    gaKey && ReactGA.initialize(gaKey);

    return (
        <AuthAPI>
            <BidModalContextAPI>
                <SidebarContextAPI>
                    <ScrollToTop/>
                    <AppLayout>
                        <Suspense fallback={<LoadingScreen visible/>}>
                        
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/explore-page" element={<ExplorePage/>}/>
                                
                                <Route path="/explore/live-auctions" element={<LiveAuctions/>}/>
                                <Route path="/explore/upcoming-auctions" element={<UpcomingAuctions/>}/>
                                <Route path="/explore/item" element={<Auction/>}/>
                                
                                <Route path="/profile" element={<Profile/>}/>
                                
                                <Route path="/new-auction" element={<NewAuction/>}/>
                                <Route path="*" element={<PageNotFound/>}/>
                                <Route path="/seller-profile" element={<SellerProfile/>}/>
                                <Route path="/deposit" element={<Deposit/>}/>
                                <Route path="/withdraw" element={<Withdraw/>}/>
                            </Routes>
                        
                        </Suspense>
                    </AppLayout>
                </SidebarContextAPI>
            </BidModalContextAPI>
        </AuthAPI>
    )
}

export default App
