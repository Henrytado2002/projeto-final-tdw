import { useState, useEffect, useRef } from 'react';

import '../index.css';
import './Header.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//icons
import { AiOutlineHome } from "react-icons/ai";
import { TbPokeball } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

function Header() {
    const menuRef = useRef(null);
    const user = useSelector((state) => state.user);

    const [logoutOn, setLogoutOn] = useState(false);
    
    const navigate=useNavigate(); 

    useEffect(()=>{
        console.log(logoutOn)
    },[logoutOn])

    useEffect(() => {
        const handleOutsideClick = (e) => {
            const checkbox = document.getElementById("menu-btn");
            if (menuRef.current && !menuRef.current.contains(e.target) && checkbox) {
                checkbox.checked = false;
            }
        };

        const handleScroll = () => {
            const menuCheckbox = document.getElementById("menu-btn");
            if (window.scrollY > 0 && menuCheckbox.checked) { 
                menuCheckbox.checked = false;
            }
        };

        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const pokedleWon = user.pokedleGamesWon ? user.pokedleGamesWon : "0"
    const memokemonWon = user.memokemonGamesWon ? user.memokemonGamesWon : "0"

    return (
        <header className="header" ref={menuRef}>
            {/* Menu Toggle */}
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="navicon"></span>
                <p className="menu-text">Menu</p>
            </label>
            
            {/* Menu */}
            <ul className="menu">
                
                <li><button  onClick={()=>navigate('/home')}><AiOutlineHome className='navicon' />Home  </button></li>
                <li><button  onClick={()=>navigate('/pokedle')}><TbPokeball className='navicon' />Pokedle </button></li>
                <li><button onClick={()=>navigate('/pokedle')}><LuBrain className='navicon'/>Memokemon </button></li>
                <li className='about-list-item' ><button ><IoInformationCircleOutline className='navicon'/>About</button></li>
                <li className='logout-list-item'><button className='nav-logout-button' onClick={()=>{setLogoutOn(true)}}><BiLogOut className='navicon'  />Logout</button></li>
            </ul>

            {logoutOn && (
                <div className='logout-verification'>
                    <div className='logout-verification-content'>
                        <p>Do you really want to Logout of your account?</p>
                        <button onClick={()=>{navigate('/')}}>Yes</button>
                        <button onClick={()=>{setLogoutOn(false)}}>No</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;