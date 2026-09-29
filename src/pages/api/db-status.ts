import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.DATABASE_URL ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.TURSO_DATABASE_URL) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.DATABASE_URL);

  const token =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.DATABASE_AUTH_TOKEN ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.TURSO_AUTH_TOKEN) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.DATABASE_AUTH_TOKEN);

  const isVercel = !!process.env.VERCEL;

  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    isVercel,
    tursoUrlConfigured: !!url,
    tursoUrlMasked: url ? (url.startsWith('file:') ? url : url.substring(0, 20) + '...turso.io') : 'NO_CONFIGURADA',
    tursoTokenConfigured: !!token,
    tursoTokenLength: token ? token.length : 0,
    databaseTarget: url ? (url.startsWith('file:') ? 'sqlite_local' : 'turso_cloud') : (isVercel ? 'fallback_vercel_tmp' : 'sqlite_local'),
  };

  try {
    const client = getDb();

    // 1. Probar conectividad básica
    const ping = await client.execute('SELECT 1 as connected;');
    diagnostics.connection = 'OK';
    diagnostics.ping = ping.rows;

    // 2. Verificar estructura de la tabla leads
    const tableInfo = await client.execute('PRAGMA table_info(leads);');
    diagnostics.tableExists = tableInfo.rows.length > 0;
    diagnostics.columns = tableInfo.rows.map((row: any) => ({
      name: row.name,
      type: row.type,
      notnull: row.notnull,
      pk: row.pk,
    }));

    // 3. Contar registros
    if (diagnostics.tableExists) {
      const countResult = await client.execute('SELECT count(*) as total FROM leads;');
      diagnostics.totalLeads = countResult.rows[0]?.total ?? 0;

      // Obtener los últimos 3 leads
      const latestLeads = await client.execute('SELECT id, name, email, whatsapp, service_type, created_at FROM leads ORDER BY created_at DESC LIMIT 3;');
      diagnostics.recentLeads = latestLeads.rows;
    }

    return new Response(JSON.stringify({ success: true, diagnostics }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    diagnostics.connection = 'FAILED';
    diagnostics.errorMessage = error.message;
    diagnostics.errorStack = error.stack;

    return new Response(
      JSON.stringify(
        {
          success: false,
          error: 'Error conectando a la base de datos',
          diagnostics,
          recommendation: !url
            ? 'Debes agregar TURSO_DATABASE_URL y TURSO_AUTH_TOKEN en las variables de entorno de Vercel y hacer un REDEPLOY.'
            : 'Verifica que el TURSO_AUTH_TOKEN no haya expirado y que la URL comience con libsql:// o https://.',
        },
        null,
        2
      ),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
