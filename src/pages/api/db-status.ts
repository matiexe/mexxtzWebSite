import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
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

  const reqUrl = new URL(request.url);
  const providedSecret =
    reqUrl.searchParams.get('secret') ||
    reqUrl.searchParams.get('key') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  const adminSecret = process.env.ADMIN_SECRET;
  // Si no se definió ADMIN_SECRET, como fallback se acepta los últimos 8 caracteres del token de Turso
  const validSecret = adminSecret || (token ? token.slice(-8) : null);
  const isAuthenticated = !!(validSecret && providedSecret && providedSecret === validSecret);

  try {
    const client = getDb();
    await client.execute('SELECT 1 as connected;');

    // 1. Si NO está autenticado, responde un chequeo de salud seguro sin filtrar datos personales
    if (!isAuthenticated) {
      if (providedSecret) {
        return new Response(
          JSON.stringify({ success: false, message: 'Acceso no autorizado. Clave incorrecta.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(
          {
            status: 'healthy',
            database: 'connected',
            timestamp: new Date().toISOString(),
            note: 'Para ver métricas detalladas y registros, autentícate con ?secret=tu_clave.',
          },
          null,
          2
        ),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. SI ESTÁ AUTENTICADO: Diagnóstico completo y métricas de leads
    const isVercel = !!process.env.VERCEL;
    const tableInfo = await client.execute('PRAGMA table_info(leads);');
    const tableExists = tableInfo.rows.length > 0;
    let totalLeads = 0;
    let recentLeads: any[] = [];

    if (tableExists) {
      const countResult = await client.execute('SELECT count(*) as total FROM leads;');
      totalLeads = (countResult.rows[0]?.total as number) ?? 0;

      const latestLeads = await client.execute(
        'SELECT id, name, email, whatsapp, service_type, budget_range, lead_score, created_at FROM leads ORDER BY created_at DESC LIMIT 5;'
      );
      recentLeads = latestLeads.rows;
    }

    return new Response(
      JSON.stringify(
        {
          success: true,
          authenticated: true,
          timestamp: new Date().toISOString(),
          diagnostics: {
            isVercel,
            databaseTarget: url ? (url.startsWith('file:') ? 'sqlite_local' : 'turso_cloud') : 'fallback_vercel_tmp',
            tursoUrlConfigured: !!url,
            tursoUrlMasked: url ? (url.startsWith('file:') ? url : url.substring(0, 20) + '...turso.io') : 'NO_CONFIGURADA',
            connection: 'OK',
            tableExists,
            columns: tableInfo.rows.map((row: any) => ({ name: row.name, type: row.type })),
            totalLeads,
            recentLeads,
          },
        },
        null,
        2
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify(
        {
          status: 'error',
          database: 'disconnected',
          errorMessage: error.message,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
