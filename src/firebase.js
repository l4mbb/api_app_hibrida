import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el equivalente de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo firebase.json
const serviceAccountPath = path.join(__dirname,'..', 'firebase.json');

// Lee y parsea el archivo firebase.json
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Inicializa la aplicación de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL, // Asegúrate de que firebase.json tenga este campo
});

const db = admin.firestore();

console.log('Firebase admin initialized');

export { db };