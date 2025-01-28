import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './Login/login';
import Home from './home/home';

import './index.css';
import { AuthProvider } from './context/authContext';


//######## ROUTING ##########

const router = createBrowserRouter([{
  path: '/',
  element: <Login/> 
},{
  path: '/home',
  element: <Home/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
</Provider>,




);

