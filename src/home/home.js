import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../navdrawer/Header';
import { useAuth } from '../context/authContext';
import './home.css'
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../firebase/auth';
import { setUser } from '../redux/userReducer';
import { useDispatch } from 'react-redux';

function Home() {
    const user = useSelector((state) => state.user);
    const { loading } = useAuth();
    const navigate = useNavigate();
    console.log(user.name)
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='home-wrapper'>
            <Header />
            <div className='home-container'>
                <div className='home-top-container'>
                    <img className='home-title-image' src='./PokeStop-1-31-2025.png'/>
                    <div>
                        <img className='pokeball' src='./Pokebola-pokeball-png-0.png'/>
                    </div>
                </div>
                <div className='home-bottom-container'>
                    <div className='home-button-container'>
                        <button className='home-button' onClick={()=>navigate('/pokedle')}><img className='home-pokedle-img' src='./pokedle.png'/></button>                        <button className='home-button'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;