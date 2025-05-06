// backend/src/routes/products.js
import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { pool } from '../db.js';

const router = Router();

/**
 * Obtiene listado de productos disponibles
 * - Filtra por estado 'disponible'
 * - Devuelve campos básicos del producto
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
    console.error('Error obteniendo productos:', err);
    res.status(500).json({ message: 'Error al recuperar productos' });
  }
});

/**
 * Crea un nuevo producto
 * - Requiere autenticación JWT
 * - Asigna automáticamente:
 *   * Estado 'pendiente'
 *   * ID del vendedor (desde token JWT)
 */
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, descripcion, precio } = req.body;
  const vendedor_id = req.user.sub; // Extrae ID de usuario del token
  
  try {
    const [result] = await pool.query(
      `INSERT INTO Productos 
        (titulo, descripcion, precio, estado, vendedor_id)
       VALUES (?, ?, ?, 'pendiente', ?)`,
      [titulo, descripcion, precio, vendedor_id]
    );
    
    // Devuelve ID del nuevo producto
    res.status(201).json({ productoId: result.insertId });
  } catch (err) {
    console.error('Error creando producto:', err);
    res.status(500).json({ message: 'Error al registrar producto' });
  }
});

export default router;