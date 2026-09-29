import { createClient } from '@libsql/client';

try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // .env no existe
}

const url =
  process.env.TURSO_DATABASE_URL ||
  process.env.DATABASE_URL ||
  'file:leads.db';

const authToken =
  process.env.TURSO_AUTH_TOKEN ||
  process.env.DATABASE_AUTH_TOKEN;

console.log('\n📊 Consultando base de datos de leads...');
console.log(`📍 Origen: ${url.startsWith('file:') ? 'SQLite Local (' + url + ')' : 'Turso Cloud (' + url.substring(0, 30) + '...)'}\n`);

try {
  const client = createClient({ url, authToken });
  const result = await client.execute('SELECT id, name, email, whatsapp, service_type, budget_range, lead_score, created_at FROM leads ORDER BY created_at DESC;');

  if (result.rows.length === 0) {
    console.log('ℹ️ No hay leads registrados aún en la base de datos.');
  } else {
    console.log(`✅ Total de leads encontrados: ${result.rows.length}\n`);
    console.table(result.rows);
  }
} catch (err) {
  console.error('❌ Error consultando la base de datos:', err.message);
  process.exit(1);
}
