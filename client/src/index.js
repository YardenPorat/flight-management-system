import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './auth/auth-provider';
import App from './app';
import './index.css';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);
