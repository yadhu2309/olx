import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase"
import "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCp-gcNw57PoD7DxxPG3bX-YFPXt7icMj0",
    authDomain: "fir-1fb42.firebaseapp.com",
    projectId: "fir-1fb42",
    storageBucket: "fir-1fb42.appspot.com",
    messagingSenderId: "348384293711",
    appId: "1:348384293711:web:fa7fbccbf52a61c7f20b3a",
    measurementId: "G-JF1FWDDPGS"
  };
  export default firebase.initializeApp(firebaseConfig)