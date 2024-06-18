import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-8yZslixJ_Et0Swmac5UbM0s3V1tO0s8",
  authDomain: "course-60511.firebaseapp.com",
  projectId: "course-60511",
  storageBucket: "course-60511.appspot.com",
  messagingSenderId: "6483353894",
  appId: "1:6483353894:web:0725d879018875eebea1e7",
  measurementId: "G-EG8SSF935Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
