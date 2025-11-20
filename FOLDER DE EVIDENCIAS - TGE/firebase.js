import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnF9jL8V9nZVStqycFKN7cOkoEFpJS1lA",
  authDomain: "tgep1-690a2.firebaseapp.com",
  projectId: "tgep1-690a2",
  storageBucket: "tgep1-690a2.firebasestorage.app",
  messagingSenderId: "846908552532",
  appId: "1:846908552532:web:cb1ceba0379e14d9d104c1",
  measurementId: "G-24L687YNL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);