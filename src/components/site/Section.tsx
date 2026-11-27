import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Seção com título em Space Grotesk e, opcionalmente, um parágrafo de introdução. */
export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mb-10 max-w-2xl md:mb-14">
            <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {intro ? <p className="mt-4 text-lg text-fg-muted">{intro}</p> : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
