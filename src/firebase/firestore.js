import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth } from "./firebase";

// Initialize Firestore
export const db = getFirestore();

export const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "noname",
        movies: [],
        createdAt: new Date(),
    };

    try {
        await setDoc(userRef, userData);
    } catch (error) {
        console.error("Error creating user document: ", error);
    }

    return userRef;
};

export const addMovieToUser = async (userId, movie) => {
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            movies: arrayUnion(movie)
        });
    } catch (error) {
        console.error("Error updating user document: ", error);
    }
};

export const removeMovieFromUser = async (userId, movie) => {
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            movies: arrayRemove(movie)
        });
    } catch (error) {
        console.error("Error updating user document: ", error);
    }
};