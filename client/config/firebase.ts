// Import the functions you need from the SDKs you need
import * as firebaseAuth from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
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

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth =getAuth(app)
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app)
export {app,auth,firestore};