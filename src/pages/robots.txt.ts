import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = () => {
  const robots = `
User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.domain}/sitemap.xml
`.trim();

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
