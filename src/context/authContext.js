import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserDocument } from '../firebase/firestore';
import { getDoc } from "firebase/firestore";
import { fetchUser } from '../redux/userActions';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                setUser(userAuth);
                dispatch(fetchUser(userAuth.uid));
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};