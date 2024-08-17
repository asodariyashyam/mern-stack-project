// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-9772a.firebaseapp.com",
  projectId: "mern-stack-9772a",
  storageBucket: "mern-stack-9772a.appspot.com",
  messagingSenderId: "576948979974",
  appId: "1:576948979974:web:37846004229a4212157687"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);