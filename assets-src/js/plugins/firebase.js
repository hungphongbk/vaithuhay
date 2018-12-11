import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: "website-for-brand.firebaseapp.com",
  databaseURL: "https://website-for-brand.firebaseio.com",
  projectId: "website-for-brand",
  storageBucket: "website-for-brand.appspot.com",
  messagingSenderId: "764771183033"
});

export default firebase;
