// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDonQINhPGv0QvUtdnsAOsDX9A1U_ZVAx8",
  authDomain: "g-commers.firebaseapp.com",
  projectId: "g-commers",
  databaseURL: "https://g-commers-default-rtdb.firebaseio.com/",
  storageBucket: "g-commers.firebasestorage.app",
  messagingSenderId: "997848805944",
  appId: "1:997848805944:web:5b2659a5e9f33997b5eccd",
  measurementId: "G-T4TK6Q6BXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);