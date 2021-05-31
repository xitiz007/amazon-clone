import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCVwaLHabduBGHdFWkTqzBWgaCSxrcSMB0",
  authDomain: "clone-6f65f.firebaseapp.com",
  projectId: "clone-6f65f",
  storageBucket: "clone-6f65f.appspot.com",
  messagingSenderId: "908984895126",
  appId: "1:908984895126:web:3658ccad26a275831424b7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
