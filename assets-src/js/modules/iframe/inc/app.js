import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";
import registerSW from "service-worker-loader!../local-sw.js";
// import 'service-worker-loader!../local-sw-analytics.js'

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: "hungphongbk-1812.firebaseapp.com",
  databaseURL: "https://hungphongbk-1812.firebaseio.com",
  projectId: "hungphongbk-1812",
  storageBucket: "hungphongbk-1812.appspot.com",
  messagingSenderId: "1926697148"
});

const message = firebase.messaging();

export default new Promise(resolve => {
  if ("serviceWorker" in navigator) {
    registerSW({ scope: "/" }).then(registration => {
      message.useServiceWorker(registration);
      resolve(message);
    });
  }
});
