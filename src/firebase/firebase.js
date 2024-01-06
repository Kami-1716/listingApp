// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAagamSP0MrEJ1NmXKpIzBwjLmPHPnO4qQ",
  authDomain: "mock-mart-react.firebaseapp.com",
  projectId: "mock-mart-react",
  storageBucket: "mock-mart-react.appspot.com",
  messagingSenderId: "1095046804856",
  appId: "1:1095046804856:web:d2e858f7a07edb0fca448d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);