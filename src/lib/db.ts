import { createClient, type Client } from '@libsql/client';

let _client: Client | null = null;
let isInitialized = false;

function getDatabaseConfig(): { url: string; authToken?: string } {
  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.DATABASE_URL ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env
      ? (import.meta as any).env.TURSO_DATABASE_URL || (import.meta as any).env.DATABASE_URL
      : undefined);

  const authToken =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.DATABASE_AUTH_TOKEN ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env
      ? (import.meta as any).env.TURSO_AUTH_TOKEN || (import.meta as any).env.DATABASE_AUTH_TOKEN
      : undefined);

  if (url) {
    return { url, authToken };
  }

  // Si está en entorno Vercel sin Turso configurado, usa SQLite en /tmp (efímero)
  if (process.env.VERCEL) {
    return { url: 'file:/tmp/leads.db' };
  }

  // Por defecto en local usa archivo leads.db
  return { url: 'file:leads.db' };
}

export function getDb(): Client {
  if (!_client) {
    const config = getDatabaseConfig();
    _client = createClient(config);
  }
  return _client;
}

// Proxy para compatibilidad hacia atrás
export const db = new Proxy({} as Client, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});

export async function initDb() {
  if (isInitialized) return;

  try {
    const client = getDb();
    await client.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        service_type TEXT NOT NULL,
        project_details TEXT NOT NULL,
        budget_range TEXT NOT NULL,
        urgency TEXT NOT NULL,
        lead_score INTEGER DEFAULT 50,
        status TEXT DEFAULT 'new',
        created_at TEXT NOT NULL
      );
    `);
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing leads table:', error);
  }
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  service_type: string;
  project_details: string;
  budget_range: string;
  urgency: string;
  lead_score?: number;
  status?: string;
  created_at: string;
}

export async function saveLead(lead: LeadRecord) {
  await initDb();

  const query = `
    INSERT INTO leads (
      id, name, email, whatsapp, service_type, project_details, budget_range, urgency, lead_score, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const client = getDb();
    await client.execute({
      sql: query,
      args: [
        lead.id,
        lead.name,
        lead.email,
        lead.whatsapp,
        lead.service_type,
        lead.project_details,
        lead.budget_range,
        lead.urgency,
        lead.lead_score ?? 50,
        lead.status ?? 'new',
        lead.created_at,
      ],
    });
    console.log(`[DB SUCCESS] Lead ${lead.id} guardado correctamente.`);
  } catch (err: any) {
    console.error('[DB ERROR] Error al insertar lead en la base de datos:', err);
    throw new Error(`Error en base de datos: ${err.message}`);
  }

  // Notificación opcional por webhook (Discord / Telegram / Slack) si está configurado en Vercel
  if (process.env.LEADS_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEADS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚀 **Nuevo Lead en mexxtz.dev**\n👤 **Nombre:** ${lead.name}\n📧 **Email:** ${lead.email}\n📱 **WhatsApp:** ${lead.whatsapp}\n🛠️ **Servicio:** ${lead.service_type}\n💰 **Presupuesto:** ${lead.budget_range}\n⏱️ **Urgencia:** ${lead.urgency}\n⭐ **Score:** ${lead.lead_score}/100\n📝 **Detalle:** ${lead.project_details}`,
        }),
      });
    } catch (webhookErr) {
      console.error('Error sending webhook notification:', webhookErr);
    }
  }

  return lead;
}
