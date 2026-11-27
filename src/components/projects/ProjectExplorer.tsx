"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Gauge, Globe, GraduationCap, Newspaper, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project, ProjectIcon } from "@/data/projects";
import { GithubIcon } from "@/components/site/Icons";
import { linkButton } from "@/components/site/link-button";
import { cn } from "@/lib/utils";
import { ProjectDetails } from "./ProjectDetails";
import { statusColor, type ProjectCardData } from "./types";

type Filter = "all" | Project["group"];

const FILTERS: Filter[] = ["all", "software", "hardware"];

const icons: Record<ProjectIcon, typeof Globe> = {
  globe: Globe,
  graduation: GraduationCap,
  qr: QrCode,
  gauge: Gauge,
};

/** Filtros (Todos / Software / Hardware) + grade de cards animada. */
export function ProjectExplorer({ cards }: { cards: ProjectCardData[] }) {
  const t = useTranslations("projects");
  const h = useTranslations("hardware");
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();

  const matches = (c: ProjectCardData, f: Filter) => f === "all" || c.group === f;
  const visible = cards.filter((c) => matches(c, filter));

  return (
    <div>
      <div role="group" aria-label={t("filter.label")} className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-md border px-3.5 text-sm transition-colors",
              filter === f
                ? "border-cyan bg-cyan/10 text-cyan"
                : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {t(`filter.${f}`)}
            <span className="font-mono text-xs opacity-70">{cards.filter((c) => matches(c, f)).length}</span>
          </button>
        ))}
      </div>

      {filter === "hardware" ? <p className="mb-8 max-w-2xl text-fg-muted">{h("intro")}</p> : null}

      <motion.ul layout={!reduce} className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((c, i) => {
            // Com quantidade ímpar, o primeiro card ocupa a linha inteira e os outros ficam em pares.
            const featured = i === 0 && visible.length % 2 === 1;
            return (
              <motion.li
                key={c.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(featured && "md:col-span-2")}
              >
                <ProjectCard card={c} featured={featured} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

/**
 * Fundo das imagens dos cards: linhas horizontais finas (como o fundo do site)
 * e cantos de mira (como a foto do hero). Também é um container de tamanho,
 * para os filhos se ajustarem por container query (cqw/cqh e @sm/@md).
 */
function Backdrop({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("relative size-full overflow-hidden", className)}
      style={{
        containerType: "size",
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 27px, var(--line) 27px 28px)",
      }}
    >
      <span aria-hidden className="absolute top-2.5 left-2.5 size-3 border-t border-l border-cyan" />
      <span aria-hidden className="absolute top-2.5 right-2.5 size-3 border-t border-r border-cyan" />
      <span aria-hidden className="absolute bottom-2.5 left-2.5 size-3 border-b border-l border-cyan" />
      <span aria-hidden className="absolute right-2.5 bottom-2.5 size-3 border-r border-b border-cyan" />
      {children}
    </div>
  );
}

/**
 * Imagem do projeto emoldurada: uma janela 16:9 no centro do fundo de linhas.
 * Com `url`, ganha uma barra de navegador (para sites no ar).
 * O tamanho usa cqw/cqh, então a janela cabe inteira em qualquer formato de card,
 * inclusive no destaque, que é mais alto que 16:9.
 */
function ProjectFrame({ src, alt, url }: { src: string; alt: string; url?: string }) {
  return (
    <Backdrop className="flex items-center justify-center">
      <div
        className="flex flex-col overflow-hidden rounded-md border border-line bg-surface shadow-[0_14px_30px_-14px_rgb(15_23_42/0.45)]"
        style={{ width: "min(84cqw, calc(76cqh * 16 / 9))", aspectRatio: "16 / 9" }}
      >
        {url ? (
          <div className="flex h-[9%] shrink-0 items-center gap-[0.6cqw] border-b border-line bg-bg px-[1.5cqw]">
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden className="size-[1.1cqw] min-h-1 min-w-1 rounded-full bg-line-strong" />
            ))}
            <span className="mx-auto truncate rounded-full bg-surface-2 px-[2cqw] font-mono text-[max(0.5rem,1.6cqw)] leading-relaxed text-fg-muted">
              {url}
            </span>
          </div>
        ) : null}
        <div className="relative flex-1">
          {/* unoptimized: a URL tem ?v=<hash>, e o Next 16 só otimiza query string fixa (localPatterns.search) */}
          <Image src={src} alt={alt} fill unoptimized className="object-cover object-top" />
        </div>
      </div>
    </Backdrop>
  );
}

/**
 * Capa desenhada para projetos sem imagem: rótulo em mono, frase e título em
 * Space Grotesk e o fluxo do projeto, sobre o mesmo fundo das imagens.
 */
function ProjectCover({
  title,
  cover,
  Icon,
}: {
  title: string;
  cover: NonNullable<ProjectCardData["cover"]>;
  Icon: typeof Globe;
}) {
  return (
    <Backdrop
      role="img"
      aria-label={`${cover.kicker}: ${cover.headline}: ${title}`}
      className="flex flex-col justify-between p-6 @md:p-8"
    >
      <Icon
        aria-hidden
        strokeWidth={1}
        className="absolute top-1/2 right-6 hidden size-20 @sm:block -translate-y-1/2 text-cyan/15 @md:right-10 @md:size-32"
      />

      <p className="relative font-mono text-[0.7rem] tracking-wide text-cyan @md:text-xs">{cover.kicker}</p>

      <div className="relative max-w-[78%] @md:max-w-[68%]">
        <p className="font-heading text-base leading-snug font-medium text-fg @sm:text-lg @md:text-2xl">
          {cover.headline}
        </p>
        <p className="mt-1 font-heading text-xl font-semibold text-cyan @sm:text-2xl @md:text-3xl">{title}</p>
      </div>

      {cover.flow?.length ? (
        <ol className="relative hidden flex-wrap items-center gap-1.5 font-mono text-[0.68rem] text-fg-muted @sm:flex">
          {cover.flow.map((step, i, all) => (
            // A seta vem depois do passo: se o fluxo quebrar de linha, ela não fica sozinha no início
            <li key={step} className="flex items-center gap-1.5">
              <span className="rounded border border-line bg-surface px-1.5 py-0.5">{step}</span>
              {i < all.length - 1 ? (
                <span aria-hidden className="text-cyan">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <span />
      )}
    </Backdrop>
  );
}

function ProjectCard({ card: c, featured = false }: { card: ProjectCardData; featured?: boolean }) {
  const t = useTranslations("projects");
  const Icon = icons[c.icon];

  return (
    <article className={cn("panel panel-hover flex h-full flex-col overflow-hidden", featured && "md:flex-row")}>
      <div
        className={cn(
          "relative aspect-[16/9] border-b border-line bg-surface-2",
          // Destaque: imagem à esquerda, texto à direita
          featured && "md:aspect-auto md:w-[58%] md:shrink-0 md:border-r md:border-b-0",
        )}
      >
        {c.image && c.frame ? (
          <ProjectFrame src={c.image} alt={c.title} url={c.frame.url} />
        ) : c.image ? (
          // unoptimized: a URL tem ?v=<hash>, e o Next 16 só otimiza query string fixa (localPatterns.search)
          <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />
        ) : c.cover ? (
          <ProjectCover title={c.title} cover={c.cover} Icon={Icon} />
        ) : (
          // Placeholder até existir public/projects/<id>.png
          <div className="flex size-full flex-col items-center justify-center gap-3">
            <Icon aria-hidden className="size-9 text-cyan" strokeWidth={1.5} />
            <span className="font-mono text-sm text-fg-muted">{c.title}</span>
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-7")}>
        <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
          <span aria-hidden className={cn("size-1.5 rounded-full", statusColor[c.status])} />
          {t(`status.${c.status}`)}
        </p>
        <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
        <p className="mt-1 text-sm text-cyan">{c.context}</p>
        <p className="mt-3 leading-relaxed text-fg-muted">{c.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {c.tags.map((tag) => (
            <li key={tag} className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.72rem] text-fg-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <ProjectDetails card={c} />
          {c.links.demo ? (
            <a
              href={c.links.demo}
              target="_blank"
              rel="noreferrer"
              className={cn(linkButton({ variant: "ghost" }), "gap-1 px-3")}
            >
              {t("demo")}
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
          {c.links.article ? (
            <a
              href={c.links.article}
              target="_blank"
              rel="noreferrer"
              className={cn(linkButton({ variant: "ghost" }), "gap-1.5 px-3")}
            >
              <Newspaper aria-hidden className="size-3.5" />
              {t("article")}
            </a>
          ) : null}
          {c.links.github ? (
            <a
              href={c.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t("github")}: ${c.title}`}
              className={cn(linkButton({ variant: "ghost" }), "size-9 px-0")}
            >
              <GithubIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
