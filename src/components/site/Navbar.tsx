"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site, SECTION_IDS } from "@/data/site";
import { cn } from "@/lib/utils";
import { SocialIcons } from "./SocialLinks";

function LanguageSwitch({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <div role="group" aria-label={t("language")} className="flex items-center font-mono text-xs">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? <span aria-hidden className="px-1 text-fg-muted">/</span> : null}
          <Link
            href="/"
            locale={l}
            onClick={onNavigate}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "rounded px-1.5 py-1 uppercase transition-colors",
              l === locale ? "text-cyan" : "text-fg-muted hover:text-fg",
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-cyan focus:px-3 focus:py-2 focus:text-bg"
      >
        {t("skip")}
      </a>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" className="font-heading text-lg font-semibold tracking-tight text-fg">
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {SECTION_IDS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
              >
                {t(s)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SocialIcons className="hidden md:flex" />
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            className="grid size-9 place-items-center rounded-md text-fg hover:bg-surface lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line px-4 pb-5 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {SECTION_IDS.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-line py-3 text-lg"
                >
                  <span aria-hidden className="font-mono text-sm text-cyan">
                    &gt;
                  </span>
                  {t(s)}
                </a>
              </li>
            ))}
          </ul>
          <SocialIcons className="mt-4 md:hidden" />
        </div>
      ) : null}
    </header>
  );
}
