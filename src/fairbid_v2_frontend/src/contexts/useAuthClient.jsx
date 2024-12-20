import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createActor } from "../declarations/fairbid_v2_backend";

const AuthContext = createContext();
// Mainnet canisterId
const canisterId = 'sultb-kyaaa-aaaal-arsfq-cai';
// Local canisterId
// const canisterId = 'bw4dl-smaaa-aaaaa-qaacq-cai';

export const getIdentityProvider = () => {
  let idpProvider;
  // Safeguard against server rendering
  if (typeof window !== "undefined") {
    // const isLocal = process.env.DFX_NETWORK !== "ic";
    // // Safari does not support localhost subdomains
    // const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // if (isLocal ) {
    //   // idpProvider = `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`;
    //   idpProvider = `https://identity.ic0.app`;
    //   console.log('isLocal && isSafari', idpProvider);
    // } else {
    //   idpProvider = `https://identity.ic0.app`;
    //   console.log('mainnet', idpProvider);
    // }

    idpProvider = `https://identity.ic0.app`;
    //   console.log('mainnet', idpProvider);
  }
  return idpProvider;
};

export const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: getIdentityProvider(),
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
    console.log('AuthClient', AuthClient);
  }, []);

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
    console.log('isAuthenticated', isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);
    // console.log('identity', identity);
    const principal = identity.getPrincipal();
    setPrincipal(principal);
    

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setBackendActor(actor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    backendActor,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);