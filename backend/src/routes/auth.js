// backend/src/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { config } from 'dotenv';

config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Registro de nuevos usuarios
 * - Valida existencia previa
 * - Hashea contraseña
 * - Crea usuario con rol por defecto (2) y estado no verificado
 */
router.post('/register', async (req, res) => {
  const { correo, contrasena } = req.body;
  
  try {
    // Verifica si el correo ya está registrado
    const [rows] = await pool.query(
      'SELECT UsuarioID FROM Usuarios WHERE correo = ?', 
      [correo]
    );
    
    if (rows.length) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashea la contraseña con costo 12
    const hash = await bcrypt.hash(contrasena, 12);

    // Crea nuevo usuario en la base de datos
    await pool.query(
      `INSERT INTO Usuarios (correo, contrasena, rol_id, verificado)
       VALUES (?, ?, ?, ?)`,
      [correo, hash, 2, false]
    );
    
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

/**
 * Autenticación de usuarios
 * - Verifica credenciales
 * - Valida estado de verificación
 * - Genera token JWT válido por 4 horas
 */
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Obtiene usuario de la base de datos
    const [rows] = await pool.query(
      'SELECT UsuarioID, contrasena, verificado FROM Usuarios WHERE correo = ?', 
      [correo]
    );
    
    if (!rows.length) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
    
    const user = rows[0];
    
    // Verifica si el usuario está confirmado
    if (!user.verificado) {
      return res.status(403).json({ message: 'Debes verificar tu cuenta primero' });
    }

    // Compara contraseña hasheada
    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Genera token de acceso
    const token = jwt.sign({ sub: user.UsuarioID }, JWT_SECRET, { 
      expiresIn: '4h' 
    });
    
    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;