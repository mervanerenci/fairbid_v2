import {createContext, useState, useContext, useEffect} from 'react';
import { AuthClient } from "@dfinity/auth-client";

const AuthContext = createContext(undefined);

export const AuthAPI = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [authClient, setAuthClient] = useState(null);

    useEffect(() => {
        // Initialize auth client
        AuthClient.create().then(async (client) => {
            setAuthClient(client);
            
            // Check if user is already authenticated
            const isAuthenticated = await client.isAuthenticated();
            setIsLogged(isAuthenticated);
        });
    }, []);

    // Update localStorage when auth state changes
    useEffect(() => {
        if (isLogged) {
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            localStorage.removeItem('isAuthenticated');
        }
    }, [isLogged]);

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, authClient}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);