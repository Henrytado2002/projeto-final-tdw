import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App';
import Login from './Login/login';
import Otherpage from './otherpage';

import './index.css';
import { AuthProvider } from './context/authContext';

//######## ROUTING ##########

const router = createBrowserRouter([{
  path: '/',
  element: <Login/> 
},{
  path: '/otherpage',
  element: <Otherpage/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>




);

