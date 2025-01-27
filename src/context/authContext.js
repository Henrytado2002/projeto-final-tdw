import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserDocument } from '../firebase/firestore';
import { getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserDocument(userAuth);
                const userSnapshot = await getDoc(userRef);
                setUser({
                    uid: userSnapshot.id,
                    ...userSnapshot.data(),
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};