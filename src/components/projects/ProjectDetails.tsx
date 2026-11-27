"use client";

import { ArrowUpRight, Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GithubIcon } from "@/components/site/Icons";
import { linkButton } from "@/components/site/link-button";
import { cn } from "@/lib/utils";
import { statusColor, type ProjectCardData } from "./types";

/** Botão "Ver detalhes técnicos" + modal (shadcn/ui Dialog). */
export function ProjectDetails({ card: c }: { card: ProjectCardData }) {
  const t = useTranslations("projects");
  const { demo, github, article } = c.links;

  return (
    <Dialog>
      <DialogTrigger className={cn("cursor-pointer", linkButton({ variant: "outline" }))}>{t("details")}</DialogTrigger>

      <DialogContent className="max-h-[88dvh] gap-0 overflow-y-auto rounded-lg border border-line bg-surface p-0 ring-0 sm:max-w-2xl">
        <DialogHeader className="gap-0 border-b border-line px-6 py-6 pr-12 text-left sm:px-8">
          <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
            <span aria-hidden className={cn("size-1.5 rounded-full", statusColor[c.status])} />
            {t(`status.${c.status}`)}
          </p>
          <DialogTitle className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">{c.title}</DialogTitle>
          <DialogDescription className="mt-1 text-base text-cyan">{c.context}</DialogDescription>
        </DialogHeader>

        <dl className="divide-y divide-line px-6 sm:px-8">
          <Row title={t("modal.context")}>{c.details.context}</Row>
          <Row title={t("modal.myPart")}>{c.details.myPart}</Row>
          <Row title={t("modal.stack")}>
            <ul className="flex flex-wrap gap-1.5">
              {c.details.stack.map((s) => (
                <li key={s} className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-fg">
                  {s}
                </li>
              ))}
            </ul>
          </Row>
          <Row title={t("modal.results")}>
            <ul className="space-y-2">
              {c.details.results.map((r, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className="font-mono text-cyan">
                    &gt;
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Row>
        </dl>

        {demo || github || article ? (
          <div className="flex flex-wrap gap-3 border-t border-line px-6 py-5 sm:px-8">
            {demo ? (
              <a href={demo} target="_blank" rel="noreferrer" className={linkButton({ variant: "solid" })}>
                {t("demo")}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            {article ? (
              <a href={article} target="_blank" rel="noreferrer" className={linkButton({ variant: "outline" })}>
                <Newspaper aria-hidden className="size-4" />
                {t("article")}
              </a>
            ) : null}
            {github ? (
              <a href={github} target="_blank" rel="noreferrer" className={linkButton({ variant: "outline" })}>
                <GithubIcon className="size-4" />
                {t("github")}
              </a>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <dt className="font-mono text-xs leading-6 text-fg-muted">{title}</dt>
      <dd className="leading-relaxed text-fg">{children}</dd>
    </div>
  );
}
