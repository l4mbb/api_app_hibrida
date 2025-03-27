import express from 'express';
import './firebase.js';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Obtener el equivalente de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: '*',  // Solo permite Ionic
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// Permitir solicitudes desde cualquier origen
app.use(cors({
    origin: 'http://localhost:8100/',  // Solo permite Ionic
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));



// Inicializar el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});