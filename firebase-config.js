// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPmqGx16QGTABPxZXnem1RCtJbBOMhRVo",
  projectId: "giupi-630e4",
  storageBucket: "giupi-630e4.firebasestorage.app",
  messagingSenderId: "1000387161",
  appId: "1:1000387161:web:6513476f498c894235e165"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos (Firestore)
export const db = getFirestore(app);