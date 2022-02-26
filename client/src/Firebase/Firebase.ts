import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDNx8y0FqZlbKohfh7w2srzRUUHCCy5p7s",
//     authDomain: "ecommerce-backend-d2cf4.firebaseapp.com",
//     projectId: "ecommerce-backend-d2cf4",
//     storageBucket: "ecommerce-backend-d2cf4.appspot.com",
//     messagingSenderId: "286706650191",
//     appId: "1:286706650191:web:e7ccb7b5a980bc421aee3a",
//     measurementId: "G-976YKHRJKX"
// };

const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

export const firestore = getFirestore(app);

