import { getFirestore, doc, setDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";

export const db = getFirestore();

export const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "noname",
        createdAt: new Date().toISOString(), // Use ISO string format
        pokedleGamesWon: 0,
        pokedleGuesses: [],
        memokemonGamesWon: 0,
    };

    try {
        await setDoc(userRef, userData);
    } catch (error) {
        console.error("Error creating user document: ", error);
    }

    return userRef;
};

export const incrementPokedleGamesWon = async (userId) => {
    if (!userId) return;

    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            pokedleGamesWon: increment(1),
        });
    } catch (error) {
        console.error("Error incrementing pokedleGamesWon: ", error);
    }
};

export const submitGuesses = async (userId, guesses) => {
    if (!userId) return;

    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            pokedleGuesses: arrayUnion(guesses.length),
        });
    } catch (error) {
        console.error("Error submitting guesses: ", error);
    }
};