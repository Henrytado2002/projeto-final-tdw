import React, { useState, useEffect } from 'react';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import './login.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer';
import { fetchUser } from '../redux/userActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage);
        }
    }, [errorMessage]);

    function doInputVerifications() { //returns false if there are errors
        if (email === '' || password === '') {
            setErrorMessage('All fields must not be empty');
            return false;
        }
        if (!isEmail(email)) {
            setErrorMessage('Email is not valid');
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
            setErrorMessage(error.message);
            return;
        }
    }

    async function handleRegister() {
        if (!doInputVerifications()) {
            return;
        }
        if (name === '' || confirmPassword === '') {
            setErrorMessage('All fields must not be empty');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            await doCreateUserWithEmailAndPassword(email, password, name);
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            dispatch(fetchUser(user.uid)); // Fetch and set user data in Redux store
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message);
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
                            <button className='login-form-submit' onClick={() => { navigate('/home') }}>go to home</button>
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
                        <p href='' className='login-register-first-text'>{!showRegister ? "Not registered yet? " : ""}</p>
                        <button href='' className='login-register-link' onClick={handleRegisterLinkClick}>
                            {showRegister ? 'Back to Login' : "Create an account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;