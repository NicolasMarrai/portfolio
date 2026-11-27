import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

/** /sitemap.xml: uma entrada por idioma, com os links alternativos (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}`]));

  return routing.locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
