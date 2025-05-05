// backend/src/middleware/auth.js
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Carga las variables de entorno del .env
config();

// Comprueba que la variable JWT_SECRET esté definida
if (!process.env.JWT_SECRET) {
  console.error('FATAL: La variable de entorno JWT_SECRET no está definida.');
  process.exit(1);
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Verifica que venga la cabecera y que use el esquema Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Token no proporcionado o formato inválido (se requiere "Bearer <token>")' });
  }

  const token = authHeader.split(' ')[1]; // Extrae la parte del token

  // Verifica y decodifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error('Error verificando token JWT:', err);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    // Añade los datos decodificados al request
    // Aquí asumimos que en el payload tienes la propiedad 'sub' con el userId
    req.user = {
      sub: payload.sub,
      ...payload
    };

    next();
  });
};

export default authMiddleware;
