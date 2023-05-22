import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDnOZPy5b95x8iGewcWJS0_f8ocVALgMWE",
  authDomain: "pravo-za-vse-db.firebaseapp.com",
  projectId: "pravo-za-vse-db",
  storageBucket: "pravo-za-vse-db.appspot.com",
  messagingSenderId: "987323567303",
  appId: "1:987323567303:web:f98fa586c0e916806482e2",
  measurementId: "G-XHXQ517BMC"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseAuthGoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const fileStorage = getStorage(app);
