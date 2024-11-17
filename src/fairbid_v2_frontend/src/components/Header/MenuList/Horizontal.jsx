// styled components
import { NavLink, NavLinkWrapper, Dropdown, UserLink } from './style';

// components
import Tooltip from '@mui/material/Tooltip';
import { NavLink as Link } from 'react-router-dom';
import { Fragment } from 'react';
import GradientBtn from '@ui/GradientBtn';

// hooks
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// utils
import classNames from 'classnames';
import { memo } from 'react';

import React from 'react';
import { FaBars, FaSearch, FaWallet, FaSignOutAlt } from 'react-icons/fa';


// auth
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../../../declarations/fairbid_v2_backend/index";
import { useAuth } from '@contexts/useAuthClient';

import { FaAngleDown, FaUser } from 'react-icons/fa';

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

            <button className="btn "
                aria-label="Logout"
                onClick={logout}

                style={{ alignSelf: 'center' }}>
                <FaSignOutAlt />
            </button>


        </>
    )
}

const DropdownItem = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <Tooltip title={title}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            PopperProps={{
                sx: {
                    zIndex: 99999,
                    '& .MuiTooltip-tooltip': {
                        backgroundColor: 'transparent',
                        padding: 0,
                        marginTop: '0 !important',
                    }
                }
            }}
            placement="bottom">
            <NavLinkWrapper>
                {children}
            </NavLinkWrapper>
        </Tooltip>
    )
}

const Horizontal = ({ links }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    return (
        <div className="d-flex align-items-center justify-content-end g-25 flex-1">
            {
                links.map(item => {
                    const mainLink = item.links && item.links.find(link => link.isMain);
                    const DropdownMenu = () => {
                        return (
                            <Dropdown className="d-flex flex-column">
                                {
                                    item.links.map(link => (
                                        !link.isMain &&
                                        <Link key={`menu-${link.name}`}
                                            to={link.url}
                                            className={classNames('link', { 'active': location.pathname === link.url })}>
                                            {link.name}
                                        </Link>
                                    ))
                                }
                            </Dropdown>
                        )
                    }

                    return (
                        item.isSingle ?
                            <Link key={`menu-${item.name}`} to={item.url}>
                                <NavLink
                                    className={classNames('main-link', { 'active': location.pathname === item.url })}>
                                    {item.name}
                                </NavLink>
                            </Link>
                            :
                            (
                                item.name !== 'Account' ?
                                    <div key={`menu-${item.name}`} style={{ height: '100%' }}>
                                        <DropdownItem title={<DropdownMenu />}>
                                            {
                                                mainLink ?
                                                    <Link to={mainLink.url}>
                                                        <NavLink
                                                            className={classNames('main-link', { 'active': location.pathname === mainLink.url })}>
                                                            {mainLink.name} <FaAngleDown />
                                                        </NavLink>
                                                    </Link>
                                                    :
                                                    <NavLink
                                                        className={classNames('main-link', { 'active': location.pathname === item.url })}>
                                                        {item.name} <FaAngleDown />
                                                    </NavLink>
                                            }
                                        </DropdownItem>
                                    </div>
                                    :
                                    <Fragment key="wrapper">
                                        {isAuthenticated ? <LogoutButton /> : <SignInButton />}
                                        {isAuthenticated ? 
                                        <DropdownItem title={<DropdownMenu />}>
                                            <UserLink>
                                                <FaUser />
                                                </UserLink>
                                            </DropdownItem>
                                            : null
                                        }
                                    </Fragment>
                            )
                    )
                })
            }
        </div>
    )
}

export default memo(Horizontal);


// const [authClient, setAuthClient] = useState(null);

    // useEffect(() => {
    //   AuthClient.create().then(setAuthClient);
    // }, []);

    // const handleLogin = async () => {
    //   if (!authClient) return;

    //   const identity = await authClient.login({
    //     identityProvider: process.env.DFX_NETWORK === "ic"
    //     ? `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`
    //     : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
    //     onSuccess: () => {

    //       const actor = createActor(canisterId, {
    //         agentOptions: {
    //           identity: authClient.getIdentity(),
    //         },
    //       });
    //       // You can now use this actor to make authenticated calls to your backend
    //     },
    //   });