import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import { LinesBackground } from "@/components/site/LinesBackground";
import "../globals.css";

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("meta");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      locale: locale === "pt" ? "pt_BR" : "en_US",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      className={`${heading.variable} ${body.variable} ${code.variable}`}
    >
      <body className="min-h-dvh">
        <LinesBackground />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
