import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "./firestore"; // Import Firestore database
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

export const doCreateUserWithEmailAndPassword = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name
  });

  // Create a user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name: name, // Ensure the name is passed correctly
  });

  return user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
  return auth.signOut();
};