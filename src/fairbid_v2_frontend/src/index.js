import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  {HashRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import '@fonts/icomoon/icomoon.woff';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <ToastContainer theme="dark" autoClose={3000} />
        <App/>
    </HashRouter>
);
