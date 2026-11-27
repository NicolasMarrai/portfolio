import type { AppLocale } from "@/i18n/routing";

/** Texto nos dois idiomas. Todo conteúdo em src/data usa esse formato. */
export type Localized = Record<AppLocale, string>;

export function pick(text: Localized, locale: string): string {
  return text[locale as AppLocale] ?? text.pt;
}
