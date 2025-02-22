import React, { useState, useEffect } from 'react';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import './login.css';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/userActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    function doInputVerifications() { //returns false if there are errors
        if (email === '' || password === '') {
            alert('All fields must not be empty');
            
            return false;
        }
        if (!isEmail(email)) {
            alert('Email is not valid');
            
            return false;
        }
        return true;
    }

    async function handleLogin() {
        if (!doInputVerifications()) {
            return;
        }
        try {
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            dispatch(fetchUser(user.uid)); // Fetch and set user data in Redux store
            navigate('/home');
        } catch (error) {
            alert(error.message);
            return;
        }
    }

    async function handleRegister() {
        if (!doInputVerifications()) {
            return;
        }
        if (name === '' || confirmPassword === '') {
            alert('All fields must not be empty');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await doCreateUserWithEmailAndPassword(email, password, name);
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            dispatch(fetchUser(user.uid)); // Fetch and set user data in Redux store
            alert('Account created successfully! Please, LogIn with your account');
            handleRegisterLinkClick();
        } catch (error) {
            alert(error.message);
        }
    }

    const [showRegister, setShowRegister] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleRegisterLinkClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setShowRegister(!showRegister);
            setIsTransitioning(false);
        }, 500); //duration of the overlay animation
    };

    return (
        <div className='login-page'>
            <img className='login-title' src='./pokeplay.png' />
            <div className="login-container">

                <div className="login-form-container">
                    <h2>{showRegister ? 'Register' : 'Login'}</h2>
                    <div className={isTransitioning ? 'login-overlay fade-in' : 'login-overlay fade-out'}></div>
                    {!showRegister && (
                        <div className='login-form'>
                            <input className='login-input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input className='login-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <button className='login-form-submit' onClick={handleLogin}>Login</button>
                            <input className='placeholder-input' />
                            <input className='placeholder-input' />
                            <input className='placeholder-input' />
                        </div>
                    )}
                    {showRegister && (
                        <div className='login-form'>
                            <input className='login-input' type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
                            <input className='login-input' type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input className='login-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <input className='login-input' type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button className='login-form-submit' onClick={handleRegister}>Register</button>
                        </div>
                    )}
                    <div className='login-link-container'>
                        <p className='login-register-first-text'>{!showRegister ? "Not registered yet? " : ""}</p>
                        <button className='login-register-link' onClick={handleRegisterLinkClick}>
                            {showRegister ? 'Back to Login' : "Create an account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;