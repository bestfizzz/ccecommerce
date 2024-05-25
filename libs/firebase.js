// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc76i4934BdDNEEhdw7UYSb4nwry82QsM",
  authDomain: "shop-384517.firebaseapp.com",
  databaseURL: "https://shop-384517-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shop-384517",
  storageBucket: "shop-384517.appspot.com",
  messagingSenderId: "589745405742",
  appId: "1:589745405742:web:2171084c58f70ebaa684bf"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase)