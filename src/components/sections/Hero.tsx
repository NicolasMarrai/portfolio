import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/data/site";
import { versionedAsset } from "@/lib/versioned-asset";
import { Reveal } from "@/components/site/Reveal";
import { linkButton } from "@/components/site/link-button";
import { cn } from "@/lib/utils";
import { HeroTerminal, type TerminalLine } from "./HeroTerminal";

/** Cantos de "mira" ao redor da foto. */
function Crosshair() {
  const corner = "absolute size-6 border-cyan";
  return (
    <>
      <span aria-hidden className={`${corner} -left-3 -top-3 border-l-2 border-t-2`} />
      <span aria-hidden className={`${corner} -right-3 -top-3 border-r-2 border-t-2`} />
      <span aria-hidden className={`${corner} -bottom-3 -left-3 border-b-2 border-l-2`} />
      <span aria-hidden className={`${corner} -bottom-3 -right-3 border-b-2 border-r-2`} />
    </>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const cvPath = locale === "en" ? site.cv.en || site.cv.pt : site.cv.pt;
  // ?v=<hash>: ao trocar o PDF, a URL muda e ninguém baixa a versão antiga do cache
  const cv = cvPath ? await versionedAsset(cvPath) : "";
  const terminal = t.raw("terminal") as TerminalLine[];
  const photo = site.photo ? await versionedAsset(site.photo) : "";

  return (
    <section id="top" className="px-4 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-md border border-lime/30 bg-lime/10 px-3 py-1.5 font-mono text-xs text-lime">
              <span className="size-1.5 rounded-full bg-lime" />
              {t("available")}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">{site.name}</h1>
            <p className="mt-3 text-xl text-fg-muted sm:text-2xl">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className={cn(linkButton({ variant: "solid", size: "lg" }), "group")}
              >
                {t("ctaProjects")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              {cv ? (
                <a
                  href={cv}
                  download="Nicolas Marrai - CV.pdf"
                  className={linkButton({ variant: "outline", size: "lg" })}
                >
                  <Download className="size-4" />
                  {t("cv")}
                </a>
              ) : (
                <a
                  href="#contact"
                  className={linkButton({ variant: "outline", size: "lg" })}
                >
                  {t("ctaContact")}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 max-w-xl">
              <HeroTerminal lines={terminal} title="nicolas@portfolio:~" />
            </div>
          </Reveal>

        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[18rem] sm:max-w-sm">
          <figure>
            <div className="relative aspect-[4/5]">
              <Crosshair />
              <div className="relative size-full overflow-hidden rounded-sm border border-line bg-surface">
                {photo ? (
                  // unoptimized: a URL tem ?v=<hash>, e o Next 16 só otimiza query string fixa (localPatterns.search)
                  <Image
                    src={photo}
                    alt={t("photoAlt")}
                    fill
                    preload
                    unoptimized
                    className="object-cover object-top"
                  />
                ) : (
                  <span
                    role="img"
                    aria-label={t("photoAlt")}
                    className="grid size-full place-items-center font-heading text-7xl font-semibold text-fg-muted"
                  >
                    NM
                  </span>
                )}
              </div>
            </div>
            <figcaption className="mt-6 text-center font-mono text-xs text-fg-muted">
              {t("role")}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
