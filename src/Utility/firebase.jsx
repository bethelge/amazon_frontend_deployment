
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsegdiDUNeKPlVAphaQl5M5gBc-k35Ix0",
  authDomain: "clone-b213e.firebaseapp.com",
  projectId: "clone-b213e",
  storageBucket: "clone-b213e.firebasestorage.app",
  messagingSenderId: "826520871204",
  appId: "1:826520871204:web:790763f763a4fe5bbbd3b1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();