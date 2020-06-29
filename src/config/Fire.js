import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrBaMVtN6sYrBERxh9KELVy_9zLJecUs0",
  authDomain: "login-signup-form-b5e3d.firebaseapp.com",
  databaseURL: "https://login-signup-form-b5e3d.firebaseio.com",
  projectId: "login-signup-form-b5e3d",
  storageBucket: "login-signup-form-b5e3d.appspot.com",
  messagingSenderId: "40496700976",
  appId: "1:40496700976:web:7165f7f2691675d1f357f5",
  measurementId: "G-255D7CT8YV",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
