import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tudo, exceto /api, /_next, /_vercel e arquivos com extensão (favicon.ico, curriculo.pdf...)
  matcher: "/((?!api|trpc|_next|_vercel|.*\..*).*)",
};
