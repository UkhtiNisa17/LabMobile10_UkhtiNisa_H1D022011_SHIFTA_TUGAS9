// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKmwNAknYbWGvSoRYwSjTyb55R3OdQHlI",

  authDomain: "vue-firebase-e34be.firebaseapp.com",

  projectId: "vue-firebase-e34be",

  storageBucket: "vue-firebase-e34be.firebasestorage.app",

  messagingSenderId: "78155114300",

  appId: "1:78155114300:web:abb45f7a1c328b3f8e6039",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
