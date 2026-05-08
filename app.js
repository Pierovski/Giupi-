import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPmqGx16QGTABPxZXnem1RCtJbBOMhRVo",
  authDomain: "giupi-app-b4dcf.firebaseapp.com",
  projectId: "giupi-app-b4dcf",
  storageBucket: "giupi-app-b4dcf.firebasestorage.app",
  messagingSenderId: "808595553543",
  appId: "1:808595553543:web:e07d9b920cc6d3799599a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Compresión de imagen para ahorrar espacio gratuito
function comprimirFoto(archivo) {
    return new Promise((resolve) => {
        const lector = new FileReader();
        lector.readAsDataURL(archivo);
        lector.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) {
                    height *= (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
    });
}

// Guardar con categoría
window.guardarCita = async function(idCita, estrellas, nota, archivoFoto, categoria) {
    try {
        let fotoTexto = archivoFoto ? await comprimirFoto(archivoFoto) : "";
        await addDoc(collection(db, "citas_logradas"), {
            idCita, estrellas, nota, 
            foto: fotoTexto,
            categoria: categoria || "general",
            fecha: serverTimestamp(),
            autor: "Piero"
        });
        alert("¡Recuerdo guardado!");
        window.location.href = `categoria.html?cat=${categoria}`;
    } catch (error) {
        console.error(error);
        alert("Error al guardar");
    }
};

// Obtener filtrado por categoría
window.obtenerCitas = async function(cat) {
    try {
        let q = query(collection(db, "citas_logradas"), orderBy("fecha", "desc"));
        if (cat && cat !== 'todas') {
            q = query(collection(db, "citas_logradas"), where("categoria", "==", cat), orderBy("fecha", "desc"));
        }
        const snap = await getDocs(q);
        return snap.docs.map(doc => doc.data());
    } catch (error) {
        console.error(error);
        return [];
    }
};
