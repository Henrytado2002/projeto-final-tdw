import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleRegisterClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setShowRegister(!showRegister);
            setIsTransitioning(false);
        }, 500); // Match the duration of the overlay animation
    };

    return (
        <div className='login-page'>
            <div className="login-container">
                <div className="login-form-container">
                    <h2>{showRegister ? 'Register' : 'Login'}</h2>
                    <div className={isTransitioning ? 'login-overlay fade-in' : 'login-overlay fade-out'}></div>
                    {!showRegister && (
                        <div className='login-form'>
                            <input className='login-input' type="email" placeholder="Email" />
                            <input className='login-input' type="password" placeholder="Password" />
                            <button className='login-form-submit'>Login</button>
                            <input className='placeholder-input' type="password" placeholder="Password" />
                        </div>
                    )}
                    {showRegister && (
                        <div className='login-form'>
                            <input className='login-input' type="text" placeholder="Username" />
                            <input className='login-input' type="password" placeholder="Password" />
                            <input className='login-input' type="password" placeholder="Confirm Password" />
                            <button className='login-form-submit'>Register</button>
                        </div>
                    )}
                    <div className='login-link-container'>
                        <a className='login-register-first-text'>{ !showRegister? "not registered yet? ":"" }</a>
                        <a className='login-register-link' onClick={handleRegisterClick}>
                            {showRegister ? 'Back to Login' : "Create an account"}
                        </a> 
                        <a></a>  
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;