export const SITE_CONFIG = {
  name: 'mexxtz.dev',
  domain: 'https://mexxtz.dev',
  description: 'Desarrollo web a medida, automatización de procesos e inteligencia artificial para empresas y emprendedores.',
  tagline: 'Ideas · Código · Resultados',
  headline: 'Convertimos tus ideas en productos digitales que generan resultados.',
  subheadline: 'Desarrollo web, automatización e inteligencia artificial para empresas y emprendedores que quieren crecer.',
  author: 'mexxtz',
  social: {
    github: 'https://github.com/mexxtz',
    linkedin: 'https://linkedin.com/in/mexxtz',
    instagram: 'https://instagram.com/mexxtz.dev',
    email: 'contacto@mexxtz.dev',
    whatsappNumber: '+5491100000000', // Modificable con tu número oficial
    whatsappDefaultMessage: 'Hola mexxtz.dev, me gustaría consultar por un desarrollo para mi proyecto.',
  },
  valueProps: [
    { text: 'Entrega rápida y continua', icon: 'zap' },
    { text: 'Código limpio y escalable', icon: 'code-2' },
    { text: 'Soporte técnico real', icon: 'shield-check' },
  ],
  navLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Soluciones IA', href: '#ia' },
    { label: 'Precios', href: '#precios' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

export const SERVICES = [
  {
    id: 'web-dev',
    code: 'MOD-01',
    title: 'DESARROLLO WEB',
    description: 'Sitios institucionales, tiendas y sistemas web personalizados de alto rendimiento.',
    startingPrice: 'Desde US$200',
    priceValue: 200,
    accent: 'cyan',
    features: ['Arquitectura modular', 'Optimización SEO & Core Web Vitals', 'Stack moderno (Astro/Next/React)', 'Panel autoadministrable'],
  },
  {
    id: 'landing',
    code: 'MOD-02',
    title: 'LANDING PAGES',
    description: 'Páginas enfocadas en convertir visitantes en clientes potenciales con copy persuasivo.',
    startingPrice: 'Desde US$120',
    priceValue: 120,
    accent: 'blue',
    features: ['Enfoque 100% en conversión', 'Diseño ultra-responsive', 'Integración directa con WhatsApp/CRM', 'Carga sub-segundo'],
  },
  {
    id: 'automation',
    code: 'MOD-03',
    title: 'AUTOMATIZACIÓN',
    description: 'Conectamos tus herramientas y automatizamos procesos repetitivos para ahorrar horas de trabajo.',
    startingPrice: 'Desde US$80',
    priceValue: 80,
    accent: 'violet',
    features: ['Webhooks & APIs custom', 'Sincronización de bases de datos', 'Notificaciones automáticas', 'Reducción de errores humanos'],
  },
  {
    id: 'ai-solutions',
    code: 'MOD-04',
    title: 'IA PARA NEGOCIOS',
    description: 'Agentes inteligentes para atender, calificar y hacer seguimiento de clientes las 24 horas.',
    startingPrice: 'Desde US$150',
    priceValue: 150,
    accent: 'cyan',
    features: ['Calificación de leads 24/7', 'Integración WhatsApp / Web', 'Respuestas contextualizadas sin alucinaciones', 'Handoff humano transparente'],
  },
  {
    id: 'maintenance',
    code: 'MOD-05',
    title: 'SOPORTE Y MANTENIMIENTO',
    description: 'Tu sitio siempre seguro, actualizado, monitoreado y funcionando sin interrupciones.',
    startingPrice: 'Desde US$30/mes',
    priceValue: 30,
    accent: 'emerald',
    features: ['Backups periódicos', 'Monitoreo de uptime y latencia', 'Actualizaciones de seguridad', 'Horas mensuales para mejoras'],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    code: 'STEP_DISCOVERY',
    title: 'Consulta',
    description: 'Nos contás qué necesitás a través del formulario o chat interactivo para entender tu objetivo.',
  },
  {
    step: '02',
    code: 'STEP_ANALYSIS',
    title: 'Análisis',
    description: 'Entendemos el problema de raíz, evaluamos la arquitectura técnica y definimos la mejor solución.',
  },
  {
    step: '03',
    code: 'STEP_PROPOSAL',
    title: 'Propuesta',
    description: 'Te enviamos un presupuesto transparente, alcance delimitado y un plan de trabajo claro.',
  },
  {
    step: '04',
    code: 'STEP_BUILD',
    title: 'Desarrollo',
    description: 'Construimos con código limpio, realizamos pruebas continuas y mantenemos informado al cliente.',
  },
  {
    step: '05',
    code: 'STEP_DEPLOY',
    title: 'Entrega',
    description: 'Finalizamos el despliegue, capacitamos al equipo y dejamos todo funcionando en producción.',
  },
];

export const REAL_PROJECTS = [
  {
    id: 'tu-rifa',
    code: 'PRJ-01',
    name: 'TU-RIFA',
    category: 'Web App & FinTech Ligero',
    tagline: 'Plataforma web para generación, gestión y cobro de rifas digitales.',
    description: 'Sistema integral orientado a la venta y administración de números de rifa en tiempo real, con checkout automatizado, validación de pagos y panel de control para organizadores.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'MercadoPago API'],
    metrics: ['Gestión de miles de números concurrentes', 'Validación anti-colisiones', 'Arquitectura desacoplada'],
    liveUrl: '#',
    status: 'Producción / Activo',
    accentColor: '#06b6d4',
  },
  {
    id: 'el-podio-rgl',
    code: 'PRJ-02',
    name: 'EL PODIO RGL',
    category: 'Sistema de Rankings & Pujas',
    tagline: 'Sistema de rankings y pujas para proyectos y emprendimientos.',
    description: 'Plataforma dinámica de competencia y visualización en vivo donde proyectos y emprendedores compiten por visibilidad mediante un sistema de posiciones, estadísticas y pujas en tiempo real.',
    technologies: ['Laravel', 'MySQL', 'Livewire / React', 'WebSockets', 'Tailwind CSS'],
    metrics: ['Actualizaciones en tiempo real sin recarga', 'Seguridad en transacciones', 'Dashboard de analytics'],
    liveUrl: '#',
    status: 'Producción / Activo',
    accentColor: '#8b5cf6',
  },
];

export const AI_SOLUTIONS = {
  headline: 'Tu negocio también puede trabajar con IA.',
  description: 'Implementamos agentes inteligentes capaces de atender consultas, calificar potenciales clientes, responder preguntas frecuentes y automatizar tareas repetitivas.',
  workflow: [
    { step: 1, label: 'VISITANTE', desc: 'Llega con una consulta o necesidad específica' },
    { step: 2, label: 'AGENTE IA', desc: 'Responde de inmediato con contexto real de tu negocio' },
    { step: 3, label: 'CALIFICACIÓN', desc: 'Evalúa presupuesto, urgencia y tipo de requerimiento' },
    { step: 4, label: 'PRESUPUESTO', desc: 'Presenta un rango orientativo o deriva el caso' },
    { step: 5, label: 'CLIENTE', desc: 'Lead listo para cerrar con todos sus datos ordenados' },
  ],
  agents: [
    {
      title: 'Agente de Atención',
      badge: 'Atención 24/7',
      description: 'Resuelve inquietudes frecuentes al instante sin hacer esperar a nadie.',
    },
    {
      title: 'Agente de Ventas',
      badge: 'Conversión',
      description: 'Identifica el servicio ideal para el prospecto y recopila datos para la propuesta.',
    },
    {
      title: 'Agente de Soporte',
      badge: 'Técnico',
      description: 'Diagnostica problemas técnicos recurrentes y guía en la resolución.',
    },
    {
      title: 'Agente de Seguimiento',
      badge: 'Automatización',
      description: 'Envía recordatorios, estados de pedido y reconecta con leads inactivos.',
    },
  ],
};

export const PRICING_TIERS = [
  {
    id: 'landing',
    code: 'TIER-01',
    name: 'LANDING PAGE',
    price: 'US$120',
    subtitle: 'Ideal para validar ideas, promocionar servicios o capturar leads.',
    features: [
      'Diseño 100% responsive',
      'Formulario de contacto funcional',
      'Botón directo a WhatsApp',
      'Integración básica con analíticas',
      'SEO on-page esencial',
      'Carga ultrarrápida (< 1s)',
    ],
    highlight: false,
    cta: 'Solicitar Landing',
  },
  {
    id: 'sitio-web',
    code: 'TIER-02',
    name: 'SITIO WEB',
    price: 'US$200–300',
    subtitle: 'Para empresas y profesionales que buscan autoridad y presencia sólida.',
    features: [
      'Hasta 5 secciones personalizadas',
      'Diseño exclusivo a medida',
      'Formularios avanzados',
      'Integración WhatsApp & Google Maps',
      'Optimización SEO completa',
      'Configuración de dominio y hosting',
    ],
    highlight: false,
    cta: 'Solicitar Sitio Web',
  },
  {
    id: 'profesional',
    code: 'TIER-03',
    name: 'SITIO WEB PROFESIONAL',
    price: 'US$350–500',
    subtitle: 'Máxima performance, panel de autogestión y funcionalidades dinámicas.',
    features: [
      'Todo lo del plan Sitio Web',
      'Panel de administración a medida',
      'Integración de APIs y webhooks',
      'Google Analytics 4 & Meta Pixel',
      'Funcionalidades interactivas avanzadas',
      'Soporte post-entrega por 30 días',
    ],
    highlight: true,
    badge: 'MÁS RECOMENDADO',
    cta: 'Solicitar Profesional',
  },
  {
    id: 'sistema',
    code: 'TIER-04',
    name: 'SISTEMA WEB',
    price: 'Desde US$500',
    subtitle: 'Plataformas SaaS, paneles de control complejos y arquitecturas a medida.',
    features: [
      'Gestión de usuarios y roles de acceso',
      'Base de datos estructurada y optimizada',
      'Integraciones con pasarelas de pago y APIs',
      'Panel administrativo completo y dashboards',
      'Arquitectura escalable en la nube',
      'Auditoría de seguridad y testing',
    ],
    highlight: false,
    cta: 'Cotizar Sistema',
  },
];

export const FAQ_ITEMS = [
  {
    question: '¿Cuánto demora desarrollar una web?',
    answer: 'Una landing page suele completarse en 3 a 7 días hábiles. Un sitio web institucional promedio toma entre 1 y 2 semanas, mientras que un sistema web complejo depende del alcance acordado (habitualmente de 3 a 6 semanas). Mantenemos entregas continuas para que veas el progreso real desde el primer día.',
  },
  {
    question: '¿Trabajan con clientes de Argentina?',
    answer: 'Sí. Aceptamos pagos en moneda local (Transferencia bancaria / MercadoPago) con cotización transparente, facilitando la contratación sin fricciones impositivas.',
  },
  {
    question: '¿Trabajan con clientes del exterior?',
    answer: 'Absolutamente. Trabajamos con clientes de toda Latinoamérica, Norteamérica y Europa. Recibimos pagos mediante transferencias internacionales, USDT/Cripto, Stripe o PayPal.',
  },
  {
    question: '¿Puedo contratar solamente mantenimiento?',
    answer: 'Sí. Ofrecemos planes de soporte continuo mensual (desde US$30/mes) que cubren actualizaciones de seguridad, backups periódicos, monitoreo de caídas y horas dedicadas para ajustes o nuevas funciones.',
  },
  {
    question: '¿Pueden modificar una web existente?',
    answer: 'Sí. Realizamos auditorías previas de código para evaluar si conviene optimizar el código actual, corregir errores y lentitud, o migrarlo a una tecnología más moderna y mantenible.',
  },
  {
    question: '¿Implementan inteligencia artificial?',
    answer: 'Sí. Desarrollamos desde agentes de atención y calificación de leads por WhatsApp o web hasta automatizaciones con modelos LLM para procesar documentos, redactar reportes o clasificar datos automáticamente.',
  },
  {
    question: '¿Puedo solicitar una solución personalizada?',
    answer: 'Totalmente. No nos limitamos a soluciones estándar: si tu negocio tiene un flujo de trabajo particular, creamos el software, la API o la integración que resuelva exactamente ese cuello de botella.',
  },
  {
    question: '¿El dominio y hosting están incluidos?',
    answer: 'Te asesoramos paso a paso para que el dominio y el hosting queden 100% a tu nombre (para que nunca dependas de una agencia para acceder a tus activos). La configuración técnica y el despliegue están siempre incluidos en nuestros proyectos.',
  },
];
