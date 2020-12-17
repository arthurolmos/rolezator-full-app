import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk8_f_bpDK1EREUIiTzQ3n1Hm-kHqO6E8",
  authDomain: "rolezator-app.firebaseapp.com",
  databaseURL: "https://rolezator-app.firebaseio.com",
  projectId: "rolezator-app",
  storageBucket: "rolezator-app.appspot.com",
  messagingSenderId: "160665924571",
  appId: "1:160665924571:web:808721f255658112ac6dfe",
  measurementId: "G-TDZHT3L365",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();
