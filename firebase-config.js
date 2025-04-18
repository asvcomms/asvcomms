// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0VCn8OkSc-y8T5mJFhf-dP_lG8JyOq_g",
  authDomain: "asv-comms.firebaseapp.com",
  projectId: "asv-comms",
  storageBucket: "asv-comms.appspot.com",
  messagingSenderId: "96571461160",
  appId: "1:96571461160:web:04b5311b12f5eaaea76f1d",
  measurementId: "G-WBVBZQSH3H"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

