// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; // Import getFirestore function from firebase/firestore

const firebaseConfig = {
  apiKey: "AIzaSyCXDVsD5miXOo90chEaMVF8RNKJVgnA9wI",
  authDomain: "weatherapp-56c62.firebaseapp.com",
  projectId: "weatherapp-56c62",
  storageBucket: "weatherapp-56c62.appspot.com",
  messagingSenderId: "698320089542",
  appId: "1:698320089542:web:f0f2aba932e7f005c702c7",
  measurementId: "G-XJRXHLYBMN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a Firestore instance
const db = getFirestore(app); // Initialize Firestore using getFirestore function

export { db }; // Export Firestore instance to use it in other parts of your application
