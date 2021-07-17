import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyBZjJBdPvBl96IoFuIdKT7ng2CiH_4EMlk",
    authDomain: "e-wallet-3bebb.firebaseapp.com",
    projectId: "e-wallet-3bebb",
    storageBucket: "e-wallet-3bebb.appspot.com",
    messagingSenderId: "895414061139",
    appId: "1:895414061139:web:44b01f466d8df24cbf1ea6",
    measurementId: "G-NX5SX6HWX7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth()

const db = firebase.firestore()

export {
  auth,
  db
}
