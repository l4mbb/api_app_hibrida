
import { db } from '../firebase.js';
import { Router } from 'express';



// ENDPOINTS CRUD
const router = Router();


// Ruta para validar la conexión a Firebase
router.get('/probarConect', async (req, res) => {
    try {
        const querySnapshot = await db.collection('usuarios').limit(1).get();

        if (!querySnapshot.empty) {
            return res.json({ success: true, message: 'Conexión a Firebase exitosa.' });
        } else {
            return res.json({ success: true, message: 'Conexión a Firebase exitosa, pero sin documentos.' });
        }
    } catch (error) {
        console.error('Error al conectar con Firebase:', error);
        res.status(500).json({ success: false, message: 'Error al conectar con Firebase' });
    }
});

// read del CRUD, haciendo prueba con firebase
router.get('/traerUsuarios', async (req, res) => {
    try {
        const querySnapshot = await db.collection('usuarios').get();
        if (querySnapshot.empty) {
            console.log('No se encuentran documentos');
            res.status(404).send('No se encuentran documentos');
            return;
        }


        const usuarios = querySnapshot.docs.map(doc => doc.data());
        console.log('Users:', usuarios);

        res.json(usuarios);
    } catch (error) {
        console.error('Error getting documents: ', error);
        res.status(500).send('Error getting products');
    }
});

// End point para agregar usuarios a la bd
router.post('/agregarUsuario', async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        if (!userName || !password || !email) {
            console.log(req.body.data);
            return res.status(400).send('Todos los campos son obligatorios');
        }
        await db.collection('productos').add({
            userName,
            password,
            email,
        });
        res.send('Usuario agregado');

    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error añadiendo usuario');
    }
});

// End point para traer la info de un usuario puntual
router.get("/traerInfoUsuario/:id", async (req, res) => {
    try {
        const doc = await db.collection("productos").doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        res.status(500).send('Error al obtener el usuario');
    }
});

// End point para eliminar un usuario por id
router.get("/eliminarUsuario/:id", async (req, res) => {
    try {
        await db.collection('productos').doc(req.params.id).delete();
        res.send('Usuario eliminado');
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
});

// End point para actualizar un usuario por id
router.post("/actualizarUsuario/:id", async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        if (!userName || !password || !email) {
            console.log(req.body);
            return res.status(400).send('Todos los campos son obligatorios');
        }
        await db.collection("productos").doc(req.params.id).set({
            userName,
            password,
            email,
        });
        res.send("Usuario actualizado");
    } catch (error) {
        console.error("Error al actualizar el documento:", error);
        res.status(500).send("Error al actualizar el usuario");
    }
});

// End points para el login y el registro

router.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validación de datos
        if (!userName || !email || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Verificar si el usuario ya existe
        const querySnapshot = await db.collection('usuarios').where('email', '==', email).get();
        if (!querySnapshot.empty) {
            return res.status(400).send('El usuario ya está registrado');
        }

        // Guardar el usuario en Firebase sin encriptar la contraseña
        await db.collection('usuarios').add({
            userName,
            email,
            password, // Contraseña sin encriptar
        });

        res.send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});


// login de la aplicación

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación de datos
        if (!email || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Buscar el usuario por email
        const querySnapshot = await db.collection('usuarios').where('email', '==', email).get();
        if (querySnapshot.empty) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Obtener los datos del usuario
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Comparar la contraseña directamente
        if (password !== userData.password) {
            return res.status(401).send('Contraseña incorrecta');
        }

        res.send('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});


export default router;
