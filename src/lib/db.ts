import { createClient } from '@libsql/client';

// En desarrollo usa el archivo local leads.db
// En producción puede conectarse a Turso simplemente agregando TURSO_DATABASE_URL y TURSO_AUTH_TOKEN
const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL || 'file:leads.db';
const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
  url,
  authToken,
});

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;

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

  return lead;
}
