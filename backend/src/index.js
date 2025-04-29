// backend/src/index.js
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.listen(3000, () => console.log('API escuchando en http://localhost:3000'));
