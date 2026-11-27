"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Award, ChevronDown, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { linkButton } from "@/components/site/link-button";
import { cn } from "@/lib/utils";

export type CertificateCard = {
  id: string;
  title: string;
  meta: string;
  thumb: string;
  pdf: string;
};

/** Acordeão "Certificações": fechado mostra só o cabeçalho; aberto mostra a grade de cards. */
export function Certifications({ cards }: { cards: CertificateCard[] }) {
  const t = useTranslations("education.certifications");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="panel panel-hover flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-md border border-cyan/30 bg-cyan/10">
          <Award aria-hidden className="size-5 text-cyan" />
        </span>
        <span className="flex-1">
          <span className="block font-heading text-xl font-semibold sm:text-2xl">{t("title")}</span>
          <span className="mt-0.5 block text-sm text-fg-muted">{t("hint", { count: cards.length })}</span>
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-5 shrink-0 text-cyan transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <li key={c.id}>
                  <CertificateItem card={c} />
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CertificateItem({ card: c }: { card: CertificateCard }) {
  const t = useTranslations("education.certifications");
  return (
    <article className="panel panel-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] border-b border-line bg-surface-2">
        <Image
          src={c.thumb}
          alt={`${t("preview")}: ${c.title}`}
          fill
          unoptimized
          loading="lazy"
          className="object-contain p-3"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">{c.title}</h3>
        <p className="mt-1 font-mono text-xs text-cyan">{c.meta}</p>

        <div className="mt-auto pt-5">
          <a
            href={c.pdf}
            download
            className={cn(linkButton({ variant: "solid", size: "md" }), "w-full")}
          >
            <Download aria-hidden className="size-4" />
            {t("download")}
          </a>
        </div>
      </div>
    </article>
  );
}
