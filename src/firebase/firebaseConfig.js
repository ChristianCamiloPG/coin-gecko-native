import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIDl1TUCjpw1EN43XCL40rE0kQ-E2Hu2I",
  authDomain: "coingecko-a9da9.firebaseapp.com",
  projectId: "coingecko-a9da9",
  storageBucket: "coingecko-a9da9.appspot.com",
  messagingSenderId: "75840006135",
  appId: "1:75840006135:web:9bb3fb1410521c0f3930f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Aquí se agrega Firestore
