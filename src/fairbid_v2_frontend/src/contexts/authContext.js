import {createContext, useState, useContext, useEffect} from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const AuthContext = createContext(undefined);

export const AuthAPI  = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [authClient, setAuthClient] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        // Initialize auth client
        AuthClient.create().then(async (client) => {
            setAuthClient(client);
            
            // Check if user is already authenticated
            const isAuthenticated = await client.isAuthenticated();
            setIsLogged(isAuthenticated);

            if (isAuthenticated) {
                const currentIdentity = client.getIdentity();
                setIdentity(currentIdentity);

                // Create and set agent with authenticated identity
                const newAgent = new HttpAgent({ 
                    identity: currentIdentity,
                    host: process.env.DFX_NETWORK === "ic" 
                    ? "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943"
                    : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
                });

                if (process.env.DFX_NETWORK !== "ic") {
                    await newAgent.fetchRootKey();
                }

                setAgent(newAgent);
            }
        });
    }, []);

    // Update agent when identity changes
    useEffect(() => {
        const updateAgent = async () => {
            if (identity) {
                const newAgent = new HttpAgent({ 
                    identity,
                    host: process.env.DFX_NETWORK === "ic" 
                    ? "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943"
                    : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
                });

                if (process.env.DFX_NETWORK !== "ic") {
                    await newAgent.fetchRootKey();
                }

                setAgent(newAgent);
            }
        };

        updateAgent();
    }, [identity]);

    // Update localStorage when auth state changes
    useEffect(() => {
        if (isLogged) {
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            localStorage.removeItem('isAuthenticated');
            setIdentity(null);
            setAgent(null);
        }
    }, [isLogged]);

    return (
        <AuthContext.Provider value={{
            isLogged, 
            setIsLogged, 
            authClient, 
            identity,
            setIdentity,
            agent
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};