// backend/src/db.js
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fuky7uL9vH',
  database: 'cutmarket',
  timezone: 'America/Mexico_City', // ← Añade esto

  waitForConnections: true,
  connectionLimit: 10
});
