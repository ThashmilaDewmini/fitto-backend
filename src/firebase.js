// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage,uploadBytesResumable, getDownloadURL } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ZwSSNBAGg6fb4r7QbjhLlj1VEpdmtrc",
  authDomain: "fitto-b076b.firebaseapp.com",
  projectId: "fitto-b076b",
  storageBucket: "fitto-b076b.appspot.com",
  messagingSenderId: "1084985612292",
  appId: "1:1084985612292:web:1df16c6a48109afe27fd51",
  measurementId: "G-XTEXQZ9NQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to handle user registration
const handleUserRegistration = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Registration successful, user data is available in userCredential.user
  } catch (error) {
    // Handle registration errors
  }
};

//Initialize Firebase Authentication and get a reference to the service.
export const auth = getAuth(app);
export {db, storage, uploadBytesResumable, getDownloadURL, handleUserRegistration};