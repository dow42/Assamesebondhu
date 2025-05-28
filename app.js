// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgCrl78GwcFLpJ6pRDAvrVYkXkgcLHSkI",
  authDomain: "assamchat-29eef.firebaseapp.com",
  projectId: "assamchat-29eef",
  storageBucket: "assamchat-29eef.appspot.com",
  messagingSenderId: "686012350709",
  appId: "1:686012350709:web:1ea7f5f0444a1a402a85bc",
  measurementId: "G-GDPW28JVTF"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
