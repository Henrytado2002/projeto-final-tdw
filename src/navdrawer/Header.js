import { useEffect, useRef } from 'react';
import './Header.css';
import { useSelector } from 'react-redux';

function Header() {
    const menuRef = useRef(null);
    const user = useSelector((state) => state.user);

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
                <li><a href="#">Option1</a></li>
                <li><a href="#">Option2</a></li>
                <li><a href="#">Option3</a></li>
                <li className='profile'><a href="#">logout</a></li>
            </ul>
        </header>
    );
}

export default Header;