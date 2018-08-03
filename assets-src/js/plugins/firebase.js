import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: "hungphongbk-1812.firebaseapp.com",
  databaseURL: "https://hungphongbk-1812.firebaseio.com",
  projectId: "hungphongbk-1812",
  storageBucket: "hungphongbk-1812.appspot.com",
  messagingSenderId: "1926697148"
});

export default firebase;
