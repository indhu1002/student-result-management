// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-rGocDrITAzWuFdp6BUjrxcoG9dIdqpk",
  authDomain: "student-result-management1.firebaseapp.com",
  databaseURL: "https://student-result-management1-default-rtdb.firebaseio.com",
  projectId: "student-result-management1",
  storageBucket: "student-result-management1.firebasestorage.app",
  messagingSenderId: "507795213530",
  appId: "1:507795213530:web:16acf4ea03f47cf09ae9e3"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
