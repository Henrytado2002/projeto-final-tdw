import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//icons
import { AiOutlineHome } from "react-icons/ai";
import { TbPokeball } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

import '../index.css';
import './Header.css';

function Header() {
    const menuRef = useRef(null);
    const [logoutOn, setLogoutOn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (e) => { //if user clicks outside the navdrawer, it closes
            const checkbox = document.getElementById("menu-btn");
            if (menuRef.current && !menuRef.current.contains(e.target) && checkbox) {
                checkbox.checked = false;
            }
        };

        const handleScroll = () => {//if user scrolls on Y-axis, navdrawer closes
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

    return (
        <header className="header" ref={menuRef}>
            {/* Menu Toggle */}
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="navicon"></span>
                <p className="menu-text">Menu</p>
            </label>

            {/* Menu */}
            <ul className="menu">

                <li><button onClick={() => navigate('/home')}><AiOutlineHome className='navicon' />Home  </button></li>
                <li><button onClick={() => navigate('/pokedle')}><TbPokeball className='navicon' />Pokedle </button></li>
                <li><button onClick={() => navigate('/memokemon')}><LuBrain className='navicon' />Memokemon </button></li>
                <li className='about-list-item' ><button onClick={() => { navigate('/about') }} ><IoInformationCircleOutline className='navicon' />About</button></li>
                <li className='logout-list-item'><button className='nav-logout-button' onClick={() => { setLogoutOn(true) }}><BiLogOut className='navicon' />Logout</button></li>
            </ul>

            {logoutOn && (
                <div className='logout-verification'>
                    <div className='logout-verification-content'>
                        <p>Do you really want to Logout of your account?</p>
                        <button onClick={() => { navigate('/') }}>Yes</button>
                        <button onClick={() => { setLogoutOn(false) }}>No</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;