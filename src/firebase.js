// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjt9LPKaqwQ2y9JmZ1_XK-evQ60sf4o7U",
  authDomain: "kastilyosabucal-website.firebaseapp.com",
  projectId: "kastilyosabucal-website",
  storageBucket: "kastilyosabucal-website.firebasestorage.app",
  messagingSenderId: "273932022578",
  appId: "1:273932022578:web:846ad7f4f1498c02849d2b",
  measurementId: "G-9RY1D9L13T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };