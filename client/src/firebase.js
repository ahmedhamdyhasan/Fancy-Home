// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyBGV_h2EOF9HqTh3g4arFIM9yTp0SRLEqE" ,
  authDomain: "fancy-home-7a996.firebaseapp.com",
  projectId: "fancy-home-7a996",
  storageBucket: "fancy-home-7a996.appspot.com",
  messagingSenderId: "395534296490",
  appId: "1:395534296490:web:adba3fa257e23e64f1f7d3",
  measurementId: "G-HFZDXSDQEG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




// import.meta.env.VITE_FIREBASE_API_KEY