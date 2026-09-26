import { createClient } from '@libsql/client';

try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // .env no existe o está vacío
}

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

console.log('\n🔍 Probando conexión con base de datos Turso...');
console.log('📍 URL:', url ? url : '❌ No definida (TURSO_DATABASE_URL)');
console.log('🔑 Token:', authToken ? `✅ Configurado (${authToken.substring(0, 12)}...)` : '❌ No definido (TURSO_AUTH_TOKEN)');

if (!url || !authToken) {
  console.log('\n💡 Pasos para configurar Turso:');
  console.log('1. Crea tu cuenta gratuita en https://turso.tech');
  console.log('2. Crea una base de datos (ej. "mexxtz-leads").');
  console.log('3. Copia la URL (libsql://...) y crea un token de autenticación.');
  console.log('4. Agrégalos a tu archivo .env local o en Vercel Settings -> Environment Variables.\n');
  process.exit(1);
}

try {
  const client = createClient({ url, authToken });
  const result = await client.execute('SELECT 1 as test_connection;');
  console.log('\n🚀 ¡Conexión con Turso verificada con éxito!');
  console.log('📊 Respuesta:', result.rows);
} catch (err) {
  console.error('\n❌ Error conectando a Turso:', err.message);
  process.exit(1);
}
