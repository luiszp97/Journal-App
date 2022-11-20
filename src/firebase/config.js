// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD0uXmJRRkSpYa4iiaogJ9xty2w3T_BS70",
  authDomain: "journal-app-6e83a.firebaseapp.com",
  projectId: "journal-app-6e83a",
  storageBucket: "journal-app-6e83a.appspot.com",
  messagingSenderId: "515692952702",
  appId: "1:515692952702:web:e6f7d62b89103b16e72c2f"
};

// Initialize Firebase

export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );