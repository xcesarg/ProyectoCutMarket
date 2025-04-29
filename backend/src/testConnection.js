import { pool } from './db.js';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a MySQL');
    
    const [rows] = await connection.query('SELECT NOW() AS hora_actual');
    const horaUTC = new Date(rows[0].hora_actual);
    const horaLocal = horaUTC.toLocaleString('es-MX', { 
      timeZone: 'America/Mexico_City', // Cambia según tu zona
      hour12: true 
    });
    
    console.log('⏰ Hora local:', horaLocal); // Mostrará "12:53 AM"
    
    connection.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();