import { getFirestore, doc, setDoc} from "firebase/firestore";


// Initialize Firestore
export const db = getFirestore();

export const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "noname",
        createdAt: new Date(),
    };

    try {
        await setDoc(userRef, userData);
    } catch (error) {
        console.error("Error creating user document: ", error);
    }

    return userRef;
};

