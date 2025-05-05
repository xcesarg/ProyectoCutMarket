// backend/src/routes/products.js
import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { pool } from '../db.js';

const router = Router();

/**
 * GET /products
 * Devuelve todos los productos con estado 'disponible'
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ProductoID AS id,
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

/**
 * POST /products
 * Crea un nuevo producto.
 * Requiere autenticación: extrae vendedor_id del token.
 */
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, descripcion, precio } = req.body;
  const vendedor_id = req.user.sub; // obtenemos el UsuarioID desde el token
  try {
    const [result] = await pool.query(
      `INSERT INTO Productos 
        (titulo, descripcion, precio, estado, vendedor_id)
       VALUES (?, ?, ?, 'pendiente', ?)`,
      [titulo, descripcion, precio, vendedor_id]
    );
    res.status(201).json({ productoId: result.insertId });
  } catch (err) {
    console.error('Error creando producto:', err);
    res.status(500).json({ message: 'Error interno al crear producto' });
  }
});

export default router;
