import { db } from '../config/db.js';

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() AS created_at');
    console.log('✅ Conexão com MySQL funcionando:', rows);
  } catch (error) {
    console.error('❌ Erro ao conectar no MySQL:', error);
  }
}

testConnection();
