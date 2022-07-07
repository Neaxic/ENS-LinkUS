// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkJG1lzKLRR3MCOtcZK9VYl_jqUzC_dRo",
  authDomain: "linkus-filestorage.firebaseapp.com",
  projectId: "linkus-filestorage",
  storageBucket: "linkus-filestorage.appspot.com",
  messagingSenderId: "409978977247",
  appId: "1:409978977247:web:1c8efe81430b7d006ba26a",
  measurementId: "G-JM3GBVH0YG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)