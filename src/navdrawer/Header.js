import { useEffect, useRef } from 'react';

import '../index.css';
import './Header.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const menuRef = useRef(null);
    const user = useSelector((state) => state.user);
    const navigate=useNavigate(); 

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
                <li><button href="#" onClick={()=>navigate('/home')}>Home</button></li>
                <li><button href="#" onClick={()=>navigate('/pokedle')}>Pokedle</button></li>
                <li><button href="#">Option2</button></li>
                <li><button href="#">Option3</button></li>
                <li className='profile'><button href="#">logout</button></li>
            </ul>
        </header>
    );
}

export default Header;