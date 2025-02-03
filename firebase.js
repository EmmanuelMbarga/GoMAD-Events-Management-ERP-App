// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe0Bo-2a_blhejLAUQyEerAo2B1Lnz8Uo",
  authDomain: "anjeagwe2025.firebaseapp.com",
  projectId: "anjeagwe2025",
  storageBucket: "anjeagwe2025.firebasestorage.app",
  messagingSenderId: "163576455424",
  appId: "1:163576455424:web:282a93e707fc454fe953e5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
