const firebaseConfig = {
  apiKey: "AIzaSyACd8mFNrfrKa9vZJQihXC8S8iHanFYBzk",
  authDomain: "lab8-jsi.firebaseapp.com",
  projectId: "lab8-jsi",
  storageBucket: "lab8-jsi.appspot.com",
  messagingSenderId: "722976204050",
  appId: "1:722976204050:web:7f2ed200cea5e95f83bfcb",
  measurementId: "G-18QWGC0CQ7",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
