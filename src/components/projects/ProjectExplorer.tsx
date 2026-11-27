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
          {visible.map((c) => (
            <motion.li
              key={c.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard card={c} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function ProjectCard({ card: c }: { card: ProjectCardData }) {
  const t = useTranslations("projects");
  const h = useTranslations("hardware");
  const Icon = icons[c.icon];

  return (
    <article className="panel panel-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] border-b border-line bg-surface-2">
        {c.image ? (
          // unoptimized: a URL tem ?v=<hash>, e o Next 16 só otimiza query string fixa (localPatterns.search)
          <Image src={c.image} alt={c.title} fill unoptimized className="object-cover" />
        ) : (
          // Placeholder até existir public/projects/<id>.png
          <div className="flex size-full flex-col items-center justify-center gap-3">
            <Icon aria-hidden className="size-9 text-cyan" strokeWidth={1.5} />
            <span className="font-mono text-sm text-fg-muted">{c.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
          <span aria-hidden className={cn("size-1.5 rounded-full", statusColor[c.status])} />
          {t(`status.${c.status}`)}
        </p>
        <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
        <p className="mt-1 text-sm text-cyan">{c.context}</p>
        <p className="mt-3 leading-relaxed text-fg-muted">{c.summary}</p>
        {c.pipeline?.length ? (
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            {h("pipeline")}: {c.pipeline.join(" → ")}
          </p>
        ) : null}

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
