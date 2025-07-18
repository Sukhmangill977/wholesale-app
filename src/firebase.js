// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCKzx3YGejc_RRdMn0p2kdmI75CT3FDolI",
  authDomain: "wholesaler-b809b.firebaseapp.com",
  projectId: "wholesaler-b809b",
storageBucket: "wholesaler-b809b.appspot.com",  // ✅ corrected this line
  messagingSenderId: "716006757674",
  appId: "1:716006757674:web:2a9d31f445c1817e67fa53",
  measurementId: "G-T85065VDWJ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Cloud Storage

// Export everything needed
export { auth, db, storage };
