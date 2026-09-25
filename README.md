# 🚀 mexxtz.dev — Sitio Web Oficial & Estudio Tecnológico

Sitio web oficial de **mexxtz.dev**: estudio tecnológico boutique especializado en desarrollo web a medida, automatizaciones e inteligencia artificial orientada a resultados.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Astro 5+](https://astro.build) con adaptador oficial `@astrojs/vercel`
- **UI Islands**: [React 19](https://react.dev) para componentes interactivos de alta fidelidad
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com) + micro-glows y paleta Obsidian Dark
- **Base de Datos**: [LibSQL / SQLite](https://github.com/tursodatabase/libsql-client-ts) (local `leads.db` en desarrollo, y compatible con [Turso](https://turso.tech) en Vercel)
- **Validación**: [Zod](https://zod.dev)
- **Iconografía**: [Lucide React](https://lucide.dev)

---

## 🎨 Identidad Visual & UX

Combinación híbrida de dos conceptos de alta ingeniería:
1. **The High-Tech Engineering Workbench**: Hero interactivo con editor de código, pipeline streaming del agente IA y telemetría de producción.
2. **The Modular Blueprint System**: Cotizador técnico interactivo que permite sumar módulos (Agente IA, Automatización WhatsApp, Pasarela de Pagos) calculando presupuestos estimados en tiempo real.

---

## 📁 Estructura del Código

```text
src/
├── components/
│   ├── islands/                     # Islas interactivas React
│   │   ├── HeroWorkbench.tsx        # Editor interactivo y simulador de agente
│   │   ├── LeadQualificationForm.tsx# Formulario calificador con persistencia en BD
│   │   ├── InteractivePricingEstimator.tsx # Cotizador modular Blueprint
│   │   ├── ChatAgentWidget.tsx      # Asistente IA flotante con opciones y WhatsApp
│   │   └── FaqAccordion.tsx         # Acordeón accesible para las 8 FAQs
│   ├── layout/
│   │   ├── Navbar.astro             # Sticky con contraste dinámico y menú mobile
│   │   └── Footer.astro             # Redes, copyright 2026 y enlaces
│   └── sections/
│       ├── Hero.astro               # Headline con foco en "resultados."
│       ├── Services.astro           # 5 tarjetas con precios orientativos
│       ├── Process.astro            # Proceso 01-05 con circuito conector
│       ├── Projects.astro           # TU-RIFA y EL PODIO RGL (casos reales)
│       ├── AiSolutions.astro        # Diagrama de flujo de conversión
│       ├── PricingSection.astro     # Planes transparentes "Desde..."
│       ├── FaqSection.astro         # Preguntas frecuentes
│       └── FinalCta.astro           # Cierre persuasivo y formulario
├── config/
│   └── site.ts                      # Metadatos, WhatsApp, redes, proyectos y precios
├── lib/
│   ├── db.ts                        # Conexión SQLite/LibSQL y tabla de leads (con fallback Vercel)
│   └── validation.ts                # Validación Zod y cálculo de lead score
└── pages/
    ├── index.astro                  # Landing page completa
    ├── api/
    │   ├── leads.ts                 # Endpoint POST para validar y guardar leads
    │   └── agent.ts                 # Endpoint desacoplado para el asistente IA
    ├── robots.txt.ts                # SEO robots.txt dinámico
    └── sitemap.xml.ts               # Sitemap dinámico
```

---

## 🚀 Inicio Rápido Local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```
La aplicación iniciará en `http://localhost:4321`.

### 3. Compilar para producción
```bash
npm run build
```

---

## ☁️ Despliegue en Vercel

El proyecto ya está preconfigurado con el adaptador oficial `@astrojs/vercel`.

### Opción 1: Conectar con GitHub (Recomendada)
1. Creá un repositorio en GitHub (ej. `mexxtzSitioWeb`).
2. Hacé push de este código:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. Ingresá a [vercel.com](https://vercel.com) e importá el repositorio.
4. Vercel detectará **Astro** automáticamente. Hacé clic en **Deploy**.

### Opción 2: Despliegue directo con Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🗄️ Persistencia de Leads en Producción (Turso / LibSQL)

En desarrollo local, el sitio guarda automáticamente en el archivo `leads.db`. 

Dado que en Vercel las funciones Serverless tienen sistema de archivos efímero, podés conectar una base de datos SQLite en la nube gratuita con **Turso** en 2 minutos:
1. Registrate gratis en [turso.tech](https://turso.tech).
2. Creá una base de datos (por ejemplo `mexxtz-leads`).
3. Obtené la URL y el token.
4. En Vercel (`Project Settings > Environment Variables`), agregá:
   - `TURSO_DATABASE_URL` = `libsql://mexxtz-leads-tuusuario.turso.io`
   - `TURSO_AUTH_TOKEN` = `tu-token-aqui`

*(Opcional: Si querés que cada lead te envíe un mensaje a Discord o Slack, agregá la variable `LEADS_WEBHOOK_URL`).*

---

## ⚙️ Configuración de Contacto y Redes

Toda la información de contacto, número de WhatsApp y enlaces a perfiles está centralizada en:
👉 `src/config/site.ts`
