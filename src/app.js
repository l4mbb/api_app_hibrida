import express from 'express';
import {db} from './firebase.js';
const app = express();
/*
app.get('/', async (req, res) => {
    
    const querySnapshot = await db.collection('productos').get();
    

    const productos = querySnapshot.docs.map(doc => doc.data());
    console.log('Productos:', productos);

    res.json(productos);
});
*/
