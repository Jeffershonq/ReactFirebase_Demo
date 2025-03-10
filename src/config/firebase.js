import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCeRHZrOGSzQp_g-SAWviHeGjPluEhE_gE",
  authDomain: "demoapp-fbb8b.firebaseapp.com",
  projectId: "demoapp-fbb8b",
  storageBucket: "demoapp-fbb8b.firebasestorage.app",
  messagingSenderId: "263790832497",
  appId: "1:263790832497:web:a0c52e943849fd4d6024d0",
  measurementId: "G-2CV9MPGGJX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);