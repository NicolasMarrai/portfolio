import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** /robots.txt: libera tudo e aponta para o sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
