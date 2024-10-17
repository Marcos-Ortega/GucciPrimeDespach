// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsoIDg9J7nZ_TAFS65bFeHIa0AEiDrYCk",
  authDomain: "gucciprimedespach.firebaseapp.com",
  projectId: "gucciprimedespach",
  storageBucket: "gucciprimedespach.appspot.com",
  messagingSenderId: "912418528970",
  appId: "1:912418528970:web:b7f354dcd989352de39e33",
  measurementId: "G-GRCX6PGZP3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase