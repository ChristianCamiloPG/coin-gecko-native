// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
