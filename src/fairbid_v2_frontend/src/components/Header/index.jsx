// styled components
import { HeaderWrapper } from './style';

// components
import Logo from '@components/Logo';
import GradientBtn from '@ui/GradientBtn';
import SearchForm from '@ui/SearchForm';
import { NavLink } from 'react-router-dom';
import StyledModal from '@ui/StyledModal';
import Vertical from './MenuList/Vertical';
import Horizontal from './MenuList/Horizontal';
import React from 'react';
import { FaBars, FaSearch, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import Wallet from '@components/Wallet';

// hooks
import { useWindowSize } from 'react-use';
import { useState, useEffect } from 'react';
import { useSidebarContext } from '@contexts/sidebarContext';
import { useAuth } from '@contexts/useAuthClient';

// utils
import { memo } from 'react';

// constants
import { HEADER_LINKS } from '@constants/links';

// auth
import { AuthClient } from "@dfinity/auth-client";
import { fairbid_v2_backend, idlFactory, CreateActorOptions } from "../../declarations/fairbid_v2_backend";
import { toast } from 'react-toastify';
import { Account } from '@components/account';
import { WalletOptions } from '@components/WalletOpt';
import { useAccount } from 'wagmi'
import { Actor, HttpAgent } from "@dfinity/agent";


const placeholder = 'Search items, collection or user';



const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

const createActor = (canisterId, options = {}) => {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });

    if (options.agent && options.agentOptions) {
        console.warn(
            "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
        );
    }

    // Fetch root key for certificate validation during development
    if (process.env.DFX_NETWORK !== "ic") {
        agent.fetchRootKey().catch((err) => {
            console.warn(
                "Unable to fetch root key. Check to ensure that your local replica is running"
            );
            console.error(err);
        });
    }

    // Creates an actor with using the candid interface and the HttpAgent
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
        ...options.actorOptions,
    });
};

const backend = canisterId ? createActor(canisterId) : undefined;

function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
}

const MenuTrigger = ({ handler }) => {
    return (
        <button className="btn" onClick={handler} aria-label="Menu">
            <FaBars />
        </button>
    )
}






const SignInButton = () => {
    
    const { login, isAuthenticated } = useAuth();

    return (
        <>
                <GradientBtn
                    onClick={login}
                // disabled={isLoading}
                >
                    Sign In
                </GradientBtn>
        </>
    );
};

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <>

            <button
                className="btn"
                aria-label="Logout"
                onClick={logout}
                style={{ alignSelf: 'center' }}
            >
                <FaSignOutAlt />
            </button>

        </>
    );
};

const CompactHeaderContent = ({ sidebarHandler, modal, modalHandler }) => {

    const { isAuthenticated } = useAuth();
    return (
        <div className="d-flex g-10">
            {/* <button className="btn btn--icon" onClick={() => modalHandler(true)} aria-label="Search">
                <i className="icon icon-search-regular"/>
            </button> */}
            {/* <SignInButton /> */}

            {isAuthenticated ? <LogoutButton /> : <SignInButton />}



            {/* <NavLink className="btn btn--icon" to="/connect-wallet" aria-label="Connect wallet">
                <FaWallet />
            </NavLink> */}
            <MenuTrigger handler={sidebarHandler} />
            <StyledModal open={modal} onClose={() => modalHandler(false)}>
                <SearchForm className="field--outline" placeholder={placeholder} />
            </StyledModal>

        </div>
    )
}

const TabletHeaderContent = ({ width, handler }) => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="main-wrapper d-flex align-items-center justify-content-end">
            {/* <div className="form-wrapper">
                <SearchForm className="search" placeholder={placeholder}/>
            </div> */}
            {/* <GradientBtn >
                Sign In
            </GradientBtn> */}
            {isAuthenticated ? <LogoutButton /> : <SignInButton />}
            <div className="d-flex g-20">
                {width < 1440 && <MenuTrigger handler={handler} />}
                {/* <LogoutButton/> */}
            </div>
        </div>
    )
}

const DesktopHeaderContent = ({ isLogged }) => {
    return (
        <div className="main-wrapper d-flex justify-content-between">
            <div className="form-wrapper">
                {/* <SearchForm className="search" placeholder={placeholder}/> */}
            </div>
            <div className="d-flex g-20">
                <Horizontal links={HEADER_LINKS} />
                <ConnectWallet />
            </div>
        </div>
    )
}

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { openSidebar, headerRef, setIsHeaderFixed, setHeaderHeight } = useSidebarContext();
    const { width } = useWindowSize();
    const [principal, setPrincipal] = useState(undefined);

    useEffect(() => {
        const header = document.querySelector('.headroom-wrapper');
        const headerHeight = header.offsetHeight || 0;

        if (document.documentElement && header) {
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            setHeaderHeight(headerHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    const getHeaderContent = () => {
        switch (true) {
            case width < 768:
                return <CompactHeaderContent sidebarHandler={openSidebar} modal={modalOpen} modalHandler={setModalOpen} />;
            case width < 1440:
                return <TabletHeaderContent width={width} handler={openSidebar} />;
            default:
                return <DesktopHeaderContent />;
        }
    }

    return (
        <HeaderWrapper ref={headerRef} onPin={() => setIsHeaderFixed(true)} onUnpin={() => setIsHeaderFixed(false)}>
            <header>
                <div className="container d-flex align-items-center">
                    <Logo />
                    {getHeaderContent()}
                    {
                        width < 1440 && <Vertical links={HEADER_LINKS} />
                    }
                </div>
            </header>
        </HeaderWrapper>
    );
}

export default memo(Header);