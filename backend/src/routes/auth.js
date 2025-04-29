// backend/src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = Router();
const JWT_SECRET = 'tu_clave_secreta';      // guárdala en .env

// Registro
router.post('/register', async (req, res) => {
  const { correo, contrasena, nombre, apellido } = req.body;
  try {
    // 1) Validar que no exista
    const [rows] = await pool.query(
      'SELECT UsuarioID FROM Usuarios WHERE correo = ?', [correo]
    );
    if (rows.length) return res.status(400).json({ message: 'Usuario ya existe' });

    // 2) Hashear contraseña
    const hash = await bcrypt.hash(contrasena, 12);

    // 3) Insertar
    await pool.query(
      `INSERT INTO Usuarios (correo, contrasena, rol_id, verificado)
       VALUES (?, ?, ?, ?)`,
      [correo, hash, 2, false]
    );
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    // 1) Buscar usuario
    const [rows] = await pool.query(
      'SELECT UsuarioID, contrasena, verificado FROM Usuarios WHERE correo = ?', [correo]
    );
    if (!rows.length) return res.status(401).json({ message: 'Credenciales inválidas' });
    const user = rows[0];
    if (!user.verificado) return res.status(403).json({ message: 'Usuario no verificado' });

    // 2) Comparar hash
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    // 3) Generar JWT
    const token = jwt.sign({ sub: user.UsuarioID }, JWT_SECRET, { expiresIn: '4h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

export default router;
