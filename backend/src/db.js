// backend/src/db.js
import mysql from 'mysql2/promise';

// Configuración del pool de conexiones MySQL
export const pool = mysql.createPool({
  host: 'localhost',         // Servidor de base de datos
  user: 'root',             // Usuario con privilegios
  password: 'Fuky7uL9vH',   // Credencial de acceso (debería ser variable de entorno)
  database: 'cutmarket',    // Nombre de la base de datos
  timezone: 'America/Mexico_City', // Zona horaria para fechas

  // Configuración del pool
  waitForConnections: true,  // Espera si no hay conexiones disponibles
  connectionLimit: 10       // Máximo de conexiones simultáneas
});