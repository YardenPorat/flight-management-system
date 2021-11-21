import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/auth-provider';

import './index.css';
import App from './App';
import Login from './components/Login';
import Search from './components/Search';

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById('root')
);
