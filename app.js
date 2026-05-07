import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqTSfh1jANA3uAR7SNExOSXDmFJLS637U",
  authDomain: "giupi-app.firebaseapp.com",
  projectId: "giupi-app",
  storageBucket: "giupi-app.firebasestorage.app",
  messagingSenderId: "744722050677",
  appId: "1:744722050677:web:2c9d14a75cd940f21c123c"
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
