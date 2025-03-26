import express from 'express';
import './firebase.js';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el equivalente de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// Inicializar el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});