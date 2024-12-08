// GA
import ReactGA from 'react-ga4';

// styling
import './style.scss';

// libs styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'react-toastify/dist/ReactToastify.css';

// utils
import { lazy, Suspense } from 'react';
import { preventDefault } from '@utils/helpers';

// hooks
import { useEffect } from 'react';

// context
import { BidModalContextAPI } from '@contexts/bidModalContext';
import { SidebarContextAPI } from '@contexts/sidebarContext';
import { AuthAPI } from '@contexts/authContext';
import { QuestionContextAPI } from '@contexts/questionContext';
import { ExploreGridContextAPI } from '@contexts/exploreGridContext';
// components
import LoadingScreen from '@components/LoadingScreen';
import AppLayout from '@components/AppLayout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@components/ScrollToTop';

// import { config } from "./service/config"
// import { WagmiConfig } from "wagmi"

import { createPublicClient, http, createClient } from "viem"
import { createConfig, WagmiConfig } from "wagmi"
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { metaMask } from 'wagmi/connectors'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const config = createConfig({
    chains: [sepolia],
    connectors: [injected()],
    client({ chain }) {
        return createClient({ chain, transport: http() })
    }
})

// pages
const Home = lazy(() => import('@pages/Home'));
const ExplorePage = lazy(() => import('@pages/ExplorePage'));

const Auction = lazy(() => import('@pages/Auction'));
const AuctionPage = lazy(() => import('@pages/AuctionPage'));

const Profile = lazy(() => import('@pages/Profile'));




const PageNotFound = lazy(() => import('@pages/PageNotFound'));
const LiveAuctions = lazy(() => import('@pages/LiveAuctions'));
const UpcomingAuctions = lazy(() => import('@pages/UpcomingAuctions'));
const NewAuction = lazy(() => import('@pages/NewAuction'));
const SellerProfile = lazy(() => import('@pages/SellerProfile'));
const Deposit = lazy(() => import('@pages/Deposit'));
const Withdraw = lazy(() => import('@pages/Withdraw'));
const Transfer = lazy(() => import('@pages/Transfer'));
const HowToFairbid = lazy(() => import('@pages/HowToFairbid'));
// Create a react-query client
const queryClient = new QueryClient()


const App = () => {
    useEffect(() => {
        preventDefault();
    }, []);

    const gaKey = process.env.REACT_APP_PUBLIC_GA;
    gaKey && ReactGA.initialize(gaKey);

    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <AuthAPI>
                    <ExploreGridContextAPI>
                        <BidModalContextAPI>
                            <QuestionContextAPI>
                            <SidebarContextAPI>
                                <ScrollToTop />
                                <AppLayout>
                                    <Suspense fallback={<LoadingScreen visible />}>

                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/explore-page" element={<ExplorePage />} />

                                            <Route path="/explore/live-auctions" element={<LiveAuctions />} />
                                            <Route path="/explore/upcoming-auctions" element={<UpcomingAuctions />} />
                                            <Route path="/auction/:id" element={<AuctionPage />} />

                                            <Route path="/profile" element={<Profile />} />

                                            <Route path="/new-auction" element={<NewAuction />} />
                                            <Route path="*" element={<PageNotFound />} />
                                            <Route path="/seller-profile" element={<SellerProfile />} />
                                            <Route path="/deposit" element={<Deposit />} />
                                            <Route path="/withdraw" element={<Withdraw />} />
                                            <Route path="/transfer" element={<Transfer />} />
                                            <Route path="/how-to-fairbid" element={<HowToFairbid />} />
                                        </Routes>

                                    </Suspense>
                                </AppLayout>
                            </SidebarContextAPI>
                            </QuestionContextAPI>
                        </BidModalContextAPI>
                    </ExploreGridContextAPI>
                </AuthAPI>
            </QueryClientProvider>
        </WagmiConfig>
    )
}

export default App
