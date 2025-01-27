import React, { useEffect, useState } from 'react';
import './login.css';

import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../context/authContext';
import isEmail from 'validator/lib/isEmail';
import { Navigate } from 'react-router-dom';
import { createUserDocument } from '../firebase/firestore'; // Import Firestore function

const Login = () => {

    //authentication
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');

    function sendErrorMessage() {
        alert(errorMessage);
    }

    function doInputVerifications(){ //returns false if there are errors
        if (email === '' || password === '') {
            setErrorMessage('All fields must not be empty');
            return false;
        }
        if (isEmail(email) === false){
            setErrorMessage('Email is not valid');
            return false;
        }
        return true;
    }

    async function handleLogin(){
        if(!doInputVerifications()){
            sendErrorMessage();
            return;
        }
        await doSignInWithEmailAndPassword(email, password);
    }

    async function handleRegister(){
        if(!doInputVerifications()){
            sendErrorMessage();
            return;
        }
        if (name === '' || confirmPassword === ''){
            setErrorMessage('All fields must not be empty');
            sendErrorMessage();
            return;
        }
        if (password !== confirmPassword){
            setErrorMessage('Passwords do not match');
            sendErrorMessage();
            return;
        }
        
        const userCredential = await doCreateUserWithEmailAndPassword(email, password);
        await createUserDocument(userCredential.user.uid, { email, name }); // Create Firestore document
    }

    //effects
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
                            <input className='login-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <button className='login-form-submit' onClick={handleLogin}>Login</button>
                            <input className='placeholder-input' />
                            <input className='placeholder-input' />
                        </div>
                    )}
                    {showRegister && (
                        <div className='login-form'>
                            <input className='login-input' type="text" placeholder="Username" onChange={(e) => setName(e.target.value)}/>
                            <input className='login-input' type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input className='login-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <input className='login-input' type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <button className='login-form-submit' onClick={handleRegister}>Register</button>
                        </div>
                    )}
                    <div className='login-link-container'>
                        <p href='' className='login-register-first-text'>{ !showRegister? "Not registered yet? ":"" }</p>
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