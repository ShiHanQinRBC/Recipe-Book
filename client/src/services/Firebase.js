import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//const serviceAccount = require("./service-account.json");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Aw-2H2je215Z7Ce_vUfcKEKrbc9UqFo",
  authDomain: "baking-app-4135e.firebaseapp.com",
  databaseURL: "https://baking-app-4135e.firebaseio.com",
  projectId: "baking-app-4135e",
  storageBucket: "baking-app-4135e.appspot.com",
  messagingSenderId: "712073260509",
  appId: "1:712073260509:web:1d4ec12f03121e1491da34",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const provider = new firebase.auth.FacebookAuthProvider();
//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then(function (result) {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         var token = result.credential.accessToken;
//         console.log(token);
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//       })
//       .catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//       });

//export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
