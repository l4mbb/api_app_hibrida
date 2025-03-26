import 'dotenv/config';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Lee las credenciales desde el archivo especificado en la variable de entorno
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const db = admin.firestore();

console.log('Firebase admin initialized');
console.log(`Service account loaded from: ${serviceAccountPath}`);

export { db };