import { site } from "@/data/site";

/**
 * URL pública do site, sem barra no final.
 * Ordem: `site.url` (src/data/site.ts) → domínio de produção da Vercel → localhost.
 * Usada no metadataBase (canonical, Open Graph), no sitemap e no robots.
 */
export function getSiteUrl(): string {
  if (site.url) return site.url.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
