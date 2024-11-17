import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  {HashRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import '@fonts/icomoon/icomoon.woff';
import {InternetIdentityProvider} from 'ic-use-internet-identity';
import { AuthProvider } from '@contexts/useAuthClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <HashRouter>
        {/* <InternetIdentityProvider> */}
        <AuthProvider>
            <ToastContainer theme="dark" autoClose={3000} />
            <App/>
        {/* </InternetIdentityProvider> */}
        </AuthProvider>
    </HashRouter>
);
