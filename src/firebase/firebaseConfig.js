import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdqc7_pe6SqItmMHPhJzusxvcm41DV06Y",
  authDomain: "project11-9eae1.firebaseapp.com",
  projectId: "project11-9eae1",
  storageBucket: "project11-9eae1.appspot.com",
  messagingSenderId: "628696822926",
  appId: "628696822926:web:3a913f9237d4ca7bb985df"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
