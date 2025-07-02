import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const readTopLevelCollections = async () => {
  try {
    const snapshot = await get(ref(db)); // get root
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Top-level keys:", Object.keys(data)); // ← shows the 'collections'
    } else {
      console.log("Database is empty.");
    }
  } catch (error) {
    console.error("Error reading root:", error);
  }
};

readTopLevelCollections();
