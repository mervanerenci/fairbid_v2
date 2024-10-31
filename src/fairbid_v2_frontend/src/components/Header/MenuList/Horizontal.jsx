// styled components
import {NavLink, NavLinkWrapper, Dropdown, UserLink} from './style';

// components
import Tooltip from '@mui/material/Tooltip';
import {NavLink as Link} from 'react-router-dom';
import {Fragment} from 'react';
import GradientBtn from '@ui/GradientBtn';

// hooks
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

// utils
import classNames from 'classnames';
import {memo} from 'react';

import React from 'react';
import { FaBars, FaSearch, FaWallet, FaSignOutAlt } from 'react-icons/fa';


// auth
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../../../declarations/fairbid_v2_backend/index";
import {useAuth} from '@contexts/authContext';

const SignInButton = () => {
    const { isLogged, setIsLogged } = useAuth();
    const [authClient, setAuthClient] = useState(null);
  
    useEffect(() => {
      AuthClient.create().then(setAuthClient);
    }, []);
  
    const handleLogin = async () => {
      if (!authClient) return;
  
      const identity = await authClient.login({
        identityProvider: process.env.DFX_NETWORK === "ic"
        ? `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`
        : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
        onSuccess: () => {
          setIsLogged(true);
          const actor = createActor(canisterId, {
            agentOptions: {
              identity: authClient.getIdentity(),
            },
          });
          // You can now use this actor to make authenticated calls to your backend
        },
      });
    };
  
    return (
      <>
        {!isLogged ? (
          <GradientBtn onClick={handleLogin}> 
            Sign In
          </GradientBtn>
        ) : (
          <LogoutButton />
        )}
      </>
    );
};

  const LogoutButton = () => {
    const {isLogged, setIsLogged} = useAuth();

    return (
        <>
            {
                isLogged ? (
                    <button className="btn "
                            aria-label="Logout"
                            onClick={() => setIsLogged(!isLogged)}
                            style={{alignSelf: 'center'}}>
                        <FaSignOutAlt />
                    </button>
                ) : null
            }
        </>
    )
}

const DropdownItem = ({title, children}) => {
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

const Horizontal = ({links}) => {
    const location = useLocation();

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
                                              className={classNames('link', {'active': location.pathname === link.url})}>
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
                                    className={classNames('main-link', {'active': location.pathname === item.url})}>
                                    {item.name}
                                </NavLink>
                            </Link>
                            :
                            (
                                item.name !== 'Account' ?
                                    <div key={`menu-${item.name}`} style={{height: '100%'}}>
                                        <DropdownItem title={<DropdownMenu/>}>
                                            {
                                                mainLink ?
                                                    <Link to={mainLink.url}>
                                                        <NavLink
                                                            className={classNames('main-link', {'active': location.pathname === mainLink.url})}>
                                                            {mainLink.name} <i className="icon icon-angle-down"/>
                                                        </NavLink>
                                                    </Link>
                                                    :
                                                    <NavLink
                                                        className={classNames('main-link', {'active': location.pathname === item.url})}>
                                                        {item.name} <i className="icon icon-angle-down"/>
                                                    </NavLink>
                                            }
                                        </DropdownItem>
                                    </div>
                                    :
                                    <Fragment key="wrapper">
                                        <SignInButton/>
                                        <DropdownItem title={<DropdownMenu/>}>
                                            <UserLink>
                                                <i className="icon icon-user"/>
                                            </UserLink>
                                        </DropdownItem>
                                    </Fragment>
                            )
                    )
                })
            }
        </div>
    )
}

export default memo(Horizontal);