import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, push, ref } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // ✅ Add this
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize both Firestore and Realtime DB
const realtimeDB = getDatabase(app);
const firestoreDB = getFirestore(app); // ✅ this is for addDoc(), etc.

export const auth = getAuth(app);
export const db = firestoreDB; // ✅ use this in Firestore components
export const rtdb = realtimeDB; // optional: for Realtime DB
export { ref, push, app};
