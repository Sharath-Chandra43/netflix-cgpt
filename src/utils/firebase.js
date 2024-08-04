// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCAmL0Pr3-I8wl7hjHtMAqrIBE8lpdqBA",
  authDomain: "netflix-cgpt-85e2b.firebaseapp.com",
  projectId: "netflix-cgpt-85e2b",
  storageBucket: "netflix-cgpt-85e2b.appspot.com",
  messagingSenderId: "225677741930",
  appId: "1:225677741930:web:1aa9438b0561095cb61f13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app);

export const auth=getAuth()

