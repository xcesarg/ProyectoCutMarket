// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken'; // Para verificar el token JWT
import { config } from 'dotenv'; // Si usas variables de entorno para el JWT secret
config(); // Para cargar el archivo .env

const authMiddleware = (req, res, next) => {
  // Obtén el token del encabezado Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // `Bearer <token>`

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado, se requiere token de autenticación' });
  }

  // Verifica el token usando jwt.verify
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Si el token es válido, coloca los datos del usuario en el request
    req.user = decoded; // Aquí guardamos los datos decodificados del token
    next(); // Continúa con la ejecución de la siguiente función (el controlador)
  });
};

export default authMiddleware;
