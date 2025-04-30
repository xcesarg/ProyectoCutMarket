//backend/src/routes/products.js
import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET /products → devuelve todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ProductoID AS id,
             titulo,
             descripcion,
             precio,
             estado,
             creado_en
      FROM Productos
      WHERE estado = 'disponible'
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error interno al obtener productos' });
  }
});

export default router;
