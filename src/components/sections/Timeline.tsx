"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineItem = { year: string; title: string; detail: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_DURATION = 1.1;

/**
 * Linha do tempo sem caixas: só a reta, os pontos e o texto.
 * Desktop: horizontal (a reta se desenha da esquerda para a direita).
 * Mobile: vertical à esquerda (a reta se desenha de cima para baixo).
 * Os pontos aparecem em sequência; o último (atual) fica preenchido e pulsando.
 *
 * A animação é disparada pelo container (useInView). Os elementos começam com
 * escala 0 e, sem área, o IntersectionObserver não os detecta sozinhos.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const reduce = !!useReducedMotion();
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLOListElement>(null);
  const desktopIn = useInView(desktopRef, { once: true, margin: "-80px" });
  const mobileIn = useInView(mobileRef, { once: true, margin: "-80px" });

  const last = items.length - 1;
  const cols = { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` };
  const dotDelay = (i: number) => (LINE_DURATION / items.length) * i + 0.15;

  /** Estado inicial/final de cada elemento, de acordo com o inView. */
  const show = (inView: boolean) => reduce || inView;

  return (
    <>
      {/* ---------- Desktop: horizontal ---------- */}
      <div ref={desktopRef} className="hidden md:block">
        <div aria-hidden className="grid" style={cols}>
          {items.map((item, i) => (
            <motion.p
              key={`y-${item.year}`}
              className="pb-4 text-center font-mono text-sm text-cyan"
              initial={false}
              animate={show(desktopIn) ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : dotDelay(i), ease: EASE }}
            >
              {item.year}
            </motion.p>
          ))}
        </div>

        {/* reta + pontos */}
        <div aria-hidden className="relative h-3">
          <motion.span
            className="absolute top-1/2 h-px origin-left -translate-y-1/2 bg-line-strong"
            style={{ left: `${50 / items.length}%`, right: `${50 / items.length}%` }}
            initial={false}
            animate={{ scaleX: show(desktopIn) ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : LINE_DURATION, ease: EASE }}
          />
          <div className="relative grid h-full" style={cols}>
            {items.map((item, i) => (
              <div key={`d-${item.year}`} className="flex items-center justify-center">
                <Dot current={i === last} visible={show(desktopIn)} delay={reduce ? 0 : dotDelay(i)} />
              </div>
            ))}
          </div>
        </div>

        <ol className="grid" style={cols}>
          {items.map((item, i) => (
            <motion.li
              key={`t-${item.year}`}
              className="px-3 pt-5 text-center"
              initial={false}
              animate={show(desktopIn) ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : dotDelay(i) + 0.05, ease: EASE }}
            >
              <span className="sr-only">{item.year}: </span>
              <p className="font-semibold text-fg">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ---------- Mobile: vertical ---------- */}
      <ol ref={mobileRef} className="relative md:hidden">
        <motion.span
          aria-hidden
          className="absolute bottom-3 left-[5px] top-2 w-px origin-top bg-line-strong"
          initial={false}
          animate={{ scaleY: show(mobileIn) ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : LINE_DURATION, ease: EASE }}
        />
        {items.map((item, i) => (
          <motion.li
            key={item.year}
            className="relative pb-8 pl-8 last:pb-0"
            initial={false}
            animate={show(mobileIn) ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : dotDelay(i), ease: EASE }}
          >
            <span className="absolute left-0 top-1">
              <Dot current={i === last} visible={show(mobileIn)} delay={reduce ? 0 : dotDelay(i)} />
            </span>
            <p className="font-mono text-sm text-cyan">{item.year}</p>
            <p className="mt-1 font-semibold text-fg">{item.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
          </motion.li>
        ))}
      </ol>
    </>
  );
}

function Dot({ current, visible, delay }: { current: boolean; visible: boolean; delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="relative flex size-3"
      initial={false}
      animate={{ scale: visible ? 1 : 0 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
    >
      {current ? (
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-50 [animation-duration:2s] motion-reduce:hidden" />
      ) : null}
      <span
        className={cn(
          "relative size-3 rounded-full border-2",
          current ? "border-cyan bg-cyan" : "border-fg-muted bg-bg",
        )}
      />
    </motion.span>
  );
}
