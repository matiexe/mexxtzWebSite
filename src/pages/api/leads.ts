import type { APIRoute } from 'astro';
import { leadSchema, calculateLeadScore } from '../../lib/validation';
import { saveLead } from '../../lib/db';
import crypto from 'node:crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: result.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const score = calculateLeadScore(result.data);
    const id = `lead_${crypto.randomUUID()}`;

    const lead = {
      id,
      ...result.data,
      lead_score: score,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    await saveLead(lead);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Solicitud recibida correctamente. Nos comunicaremos a la brevedad.',
        leadId: id,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente o contactanos por WhatsApp.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
