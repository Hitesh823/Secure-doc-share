// Firebase Configuration
const firebaseConfig = {
   apiKey: "AIzaSyBvxecjvyQjovy4F6ukjZEEUuQ-66gOKxk",
  authDomain: "doc-share-e18f2.firebaseapp.com",
  projectId: "doc-share-e18f2",
  storageBucket: "doc-share-e18f2.firebasestorage.app",
  messagingSenderId: "74142549097",
  appId: "1:74142549097:web:7c2d539d1d57a7c03ccef8",
  measurementId: "G-62Y7ESVRLW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };