import type { APIRoute } from 'astro';

export const prerender = false;

interface AgentMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, optionKey } = await request.json();

    // Respuestas guiadas de alta conversión preconfiguradas para v1
    // Desacopladas de forma que pueden ser reemplazadas por un LLM con API Key
    const presetResponses: Record<string, string> = {
      'quiero-web': '¡Genial! Desarrollamos desde landing pages de alta conversión (desde US$120) hasta sitios y sistemas web a medida. ¿Buscás validar una idea rápido o construir una plataforma más completa?',
      'quiero-automatizar': 'Excelente. Integramos herramientas (WhatsApp, CRMs, pasarelas de pago, bases de datos) y eliminamos tareas manuales repetitivas. ¿Qué proceso te gustaría automatizar hoy?',
      'quiero-ia': 'Implementamos agentes inteligentes para atención 24/7, calificación de leads y respuestas inmediatas sin alucinaciones. ¿Querés que el agente atienda en tu web o en WhatsApp?',
      'arreglar-web': 'Podemos auditar tu sitio actual, optimizar su velocidad de carga, corregir bugs de interfaz o migrarlo a tecnologías modernas como Astro o Next.js.',
      'hablar-humano': 'Podés conversar directamente conmigo por WhatsApp sin intermediarios haciendo clic en el botón de abajo. ¡Estaré encantado de evaluar tu proyecto!',
    };

    let reply = 'Entendido. Cuéntame un poco más sobre lo que necesitas o selecciona una de las opciones rápidas para ayudarte mejor.';

    if (optionKey && presetResponses[optionKey]) {
      reply = presetResponses[optionKey];
    } else if (message) {
      const lower = message.toLowerCase();
      if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
        reply = 'Nuestros desarrollos parten desde US$120 para Landing Pages y US$200 para Sitios Web. Cada proyecto es a medida del alcance. Podés usar nuestro formulario o cotizador para un número exacto.';
      } else if (lower.includes('tiempo') || lower.includes('demora') || lower.includes('plazo')) {
        reply = 'Una landing promedio toma de 3 a 7 días hábiles; un sitio web institucional de 1 a 2 semanas. Mantenemos entregas continuas para que pruebes los avances.';
      } else if (lower.includes('whatsapp') || lower.includes('contacto') || lower.includes('humano')) {
        reply = presetResponses['hablar-humano'];
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        reply,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Agent error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        reply: 'Disculpá, hubo una interrupción momentánea. Podés escribirme directo a WhatsApp.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
