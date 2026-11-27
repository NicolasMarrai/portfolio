import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { experience } from "@/data/experience";
import { pick } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Linha do tempo vertical única em estilo "log":
 * período em mono à esquerda, nó na linha e card à direita.
 */
export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  const entries = experience.flatMap((job) => job.roles.map((role) => ({ job, role })));

  return (
    <Section id="experience" title={t("title")}>
      <ol className="relative">
        {/* linha vertical */}
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line-strong md:left-[11.5rem]" />

        {entries.map(({ job, role }, i) => (
          <li key={`${job.company}-${i}`} className="relative pb-10 pl-8 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0">
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-bg md:left-[11.15rem]",
                job.kind === "extra" ? "bg-fg-muted" : "bg-cyan",
              )}
            />

            <p className="font-mono text-sm text-fg-muted md:pr-6 md:pt-0.5 md:text-right">{pick(role.period, locale)}</p>

            <Reveal delay={i * 0.04} className="mt-2 md:mt-0 md:pl-6">
              <article className="panel panel-hover p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {pick(role.title, locale)} <span className="text-fg-muted">@</span>{" "}
                    <span className="text-cyan">{job.company}</span>
                  </h3>
                  <span className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-fg-muted">
                    {job.kind === "extra" ? t("extra") : pick(role.type, locale)}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 leading-relaxed text-fg-muted">
                      <span aria-hidden className="font-mono text-cyan">
                        -
                      </span>
                      {pick(b, locale)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
