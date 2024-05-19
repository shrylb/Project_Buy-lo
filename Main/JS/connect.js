import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { GoogleAuthProvider, browserSessionPersistence, getAuth, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9qifivcFXhoiUeoJUd4T-7jYVSDNgxKo",
    authDomain: "project-buy-lo.firebaseapp.com",
    projectId: "project-buy-lo",
    storageBucket: "project-buy-lo.appspot.com",
    messagingSenderId: "487347098058",
    appId: "1:487347098058:web:09f80b7c831edb9b677f33",
    measurementId: "G-F6KT20MS0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);



//exports the database and the app for other js files to import and use
export { db, app, auth, browserSessionPersistence, GoogleAuthProvider, signInWithPopup, storage, onAuthStateChanged };



