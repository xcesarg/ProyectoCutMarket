// backend/src/index.js
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';

// Configuración inicial de la aplicación Express
const app = express();

// Middlewares esenciales
app.use(cors());          // Habilita CORS para todas las rutas
app.use(express.json());  // Permite el parsing de JSON en las requests

// Configuración de rutas
app.use('/products', productsRouter);  // Rutas para gestión de productos
app.use('/auth', authRouter);          // Rutas de autenticación

// Inicia el servidor en el puerto 3000
app.listen(3000, () => console.log('API escuchando en http://localhost:3000'));