import 'dotenv/config';
import admin from 'firebase-admin';

// Lee las credenciales desde la variable de entorno
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const db = admin.firestore();

console.log('Firebase admin initialized');

export { db };