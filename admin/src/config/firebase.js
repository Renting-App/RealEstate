import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyA7amKVTdohF9EC61_o0fK3mza456jDNq8",
  authDomain: "realestate-d8473.firebaseapp.com",
  projectId: "realestate-d8473",
  storageBucket: "realestate-d8473.appspot.com",
  messagingSenderId: "783684065926",
  appId: "1:783684065926:web:bfd62f8fde1a0acb06cf07",
  measurementId: "G-S5LCTG7TVD"
};

const app = initializeApp(firebaseConfig);

const firestore=getFirestore(app)
const auth=getAuth(app)

export {firestore,auth}