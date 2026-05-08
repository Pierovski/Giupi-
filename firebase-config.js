// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPmqGx16QGTABPxZXnem1RCtJbBOMhRVo",
  authDomain: "giupi-app-b4dcf.firebaseapp.com",
  projectId: "giupi-app-b4dcf",
  storageBucket: "giupi-app-b4dcf.firebasestorage.app",
  messagingSenderId: "808595553543",
  appId: "1:808595553543:web:e07d9b920cc6d3799599a2"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos (Firestore)
export const db = getFirestore(app);