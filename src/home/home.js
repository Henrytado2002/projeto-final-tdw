import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../navdrawer/Header';
import { useAuth } from '../context/authContext';
import './home.css'
import '../index.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const user = useSelector((state) => state.user);
    const { loading } = useAuth();
    const navigate = useNavigate();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("logged in as: ",user.name)

    return (
        <div className='home-wrapper'>
            <Header />
            <div className='home-container'>
                <div className='home-top-container'>
                    <img className='home-title-image' src='./Pokeplay.png'/>
                    <div>
                        <img className='pokeball' src='./Pokebola-pokeball-png-0.png'/>
                    </div>
                </div>
                <div className='home-bottom-container'>
                    <div className='home-button-container'>
                        <button className='home-button' onClick={()=>navigate('/pokedle')}><img className='home-button-img' src='./pokedle.png'/></button>                        
                        <button className='home-button' onClick={()=>navigate('/memokemon')}><img className='home-button-img' src='./memokemon.png'/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;