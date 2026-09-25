import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().trim().email('Por favor ingresá un email válido'),
  whatsapp: z.string().trim().min(6, 'Por favor ingresá un número de WhatsApp o teléfono válido'),
  service_type: z.string().trim().min(1, 'Por favor seleccioná un servicio de la lista'),
  project_details: z.string().trim().min(10, 'Por favor contanos brevemente sobre tu proyecto (mínimo 10 caracteres)'),
  budget_range: z.string().trim().min(1, 'Por favor seleccioná un rango de presupuesto aproximado'),
  urgency: z.string().trim().min(1, 'Por favor seleccioná la urgencia o tiempo estimado'),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Cálculo heurístico de calificación de lead para priorizar clientes
export function calculateLeadScore(data: LeadInput): number {
  let score = 50;

  const budget = data.budget_range;
  if (budget.includes('1000') && budget.includes('Más')) score += 30;
  else if (budget.includes('500') && budget.includes('1000')) score += 20;
  else if (budget.includes('250') && budget.includes('500')) score += 10;
  else if (budget.includes('Menos')) score -= 10;

  const urg = data.urgency.toLowerCase();
  if (urg.includes('antes') || urg.includes('posible')) score += 15;
  else if (urg.includes('1') && urg.includes('semanas')) score += 10;

  if (data.project_details.length > 50) score += 10;

  return Math.min(100, Math.max(10, score));
}
