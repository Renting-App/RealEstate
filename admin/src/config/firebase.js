// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7amKVTdohF9EC61_o0fK3mza456jDNq8",
  authDomain: "realestate-d8473.firebaseapp.com",
  projectId: "realestate-d8473",
  storageBucket: "realestate-d8473.appspot.com",
  messagingSenderId: "783684065926",
  appId: "1:783684065926:web:bfd62f8fde1a0acb06cf07",
  measurementId: "G-S5LCTG7TVD"
};

// Initialize Firebase

export const auth = firebase.auth();
export const firestore = firebase.firestore();