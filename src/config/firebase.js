// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCUdKNJRiFNvjS6FmzKs5_cy7thaz9j6I",
  authDomain: "kelurahan-cilodong.firebaseapp.com",
  projectId: "kelurahan-cilodong",
  storageBucket: "kelurahan-cilodong.appspot.com",
  messagingSenderId: "565399024044",
  appId: "1:565399024044:web:c1e18db3f96fcf979e8a09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const database = getDatabase(app);
