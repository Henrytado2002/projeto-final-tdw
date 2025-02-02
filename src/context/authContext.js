import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUser } from '../redux/userActions';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                setUser(userAuth);
                await dispatch(fetchUser(userAuth.uid));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    const registerUser = async (email, password, name) => {
        setLoading(true);
        try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password, name);
            // Handle user registration logic here
        } catch (error) {
            console.error("Error registering user: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);