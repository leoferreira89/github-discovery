// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbfhrPX5a_iB-gjGZWOYNs97ota7YPkZQ",
  authDomain: "github-discovery-auth.firebaseapp.com",
  projectId: "github-discovery-auth",
  storageBucket: "github-discovery-auth.appspot.com",
  messagingSenderId: "1078203258132",
  appId: "1:1078203258132:web:5ac8df0e0023fb94f99e01",
  measurementId: "G-FMTGHHXSSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize firebase Authentication
export const auth = getAuth(app);
