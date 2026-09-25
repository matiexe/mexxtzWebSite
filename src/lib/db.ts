import { createClient } from '@libsql/client';

// Determina la URL de la base de datos de manera resiliente:
// 1. Si existe TURSO_DATABASE_URL o DATABASE_URL, se conecta a la base en la nube.
// 2. Si está en Vercel sin base externa, escribe temporalmente en /tmp/leads.db (sistema de archivos de funciones serverless).
// 3. En local escribe en file:leads.db.
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.TURSO_DATABASE_URL) return process.env.TURSO_DATABASE_URL;
  if (process.env.VERCEL) return 'file:/tmp/leads.db';
  return 'file:leads.db';
};

const url = getDatabaseUrl();
const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
  url,
  authToken,
});

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;

  try {
    await db.execute(`
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
    await db.execute({
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
  } catch (err) {
    console.error('Error inserting lead to database:', err);
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
