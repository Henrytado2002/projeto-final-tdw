import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './Login/login';
import Home from './home/home';
import Pokedle from './pokedle/pokedle';
import About from './about/about';
import Memokemon from './memokemon/memokemon';

import './index.css';
import { AuthProvider } from './firebase/context/authContext';


//######## ROUTING ##########

const router = createBrowserRouter([{
  path: '/',
  element: <Login/> 
},{
  path: '/home',
  element: <Home/>
},{
  path: '/pokedle',
  element: <Pokedle/>
},{
  path: '/about',
  element: <About/>
},{
  path: '/memokemon',
  element: <Memokemon/>
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
</Provider>,




);

