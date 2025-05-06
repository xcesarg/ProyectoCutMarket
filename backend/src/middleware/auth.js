// backend/src/middleware/auth.js
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config(); // Carga configuración de entorno desde .env

// Verificación crítica para seguridad JWT
if (!process.env.JWT_SECRET) {
  console.error('FATAL: La variable de entorno JWT_SECRET no está definida.');
  process.exit(1);
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Validación de cabecera de autorización Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Formato de token inválido. Se requiere: Bearer <token>' 
    });
  }

  const token = authHeader.split(' ')[1]; // Extrae token de cabecera

  // Verificación asíncrona de token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error('Error en verificación JWT:', err);
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Adjunta datos de usuario decodificados al request
    req.user = {
      sub: payload.sub, // Subject estándar JWT para ID de usuario
      ...payload
    };

    next(); // Pasa control al siguiente middleware
  });
};

export default authMiddleware;