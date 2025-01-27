import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtyA0zfzCQiFUVvWfIOdIR1Z6WZMQp54Q",
  authDomain: "movie-list-tdw.firebaseapp.com",
  projectId: "movie-list-tdw",
  storageBucket: "movie-list-tdw.firebasestorage.app",
  messagingSenderId: "436669540677",
  appId: "1:436669540677:web:cdff6952450533effe762c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };