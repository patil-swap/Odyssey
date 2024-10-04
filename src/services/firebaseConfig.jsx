// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB31exghmUq0HUf6tKVTsrzV3zQ86t42OA",
  authDomain: "react-app-list.firebaseapp.com",
  projectId: "react-app-list",
  storageBucket: "react-app-list.appspot.com",
  messagingSenderId: "476335084674",
  appId: "1:476335084674:web:d62b119be718d44be3d09b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
