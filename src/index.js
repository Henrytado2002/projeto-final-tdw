import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App';
import Login from './authentication/login';
import Otherpage from './otherpage';

import './index.css';

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

  <RouterProvider router={router} />



);

