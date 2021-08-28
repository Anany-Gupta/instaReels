import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC-tbOyrtLwvPKOY47EdkwWLOSRPxUVO10",
    authDomain: "instagram-reels-aeedb.firebaseapp.com",
    projectId: "instagram-reels-aeedb",
    storageBucket: "instagram-reels-aeedb.appspot.com",
    messagingSenderId: "838249211859",
    appId: "1:838249211859:web:ca547b52e0a8d1d7f37126"
  };
let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;