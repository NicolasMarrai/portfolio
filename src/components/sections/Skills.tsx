import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { SkillIcon } from "@/components/site/Icons";
import { skillRows, type Skill, type SkillOrigin } from "@/data/skills";
import { pick } from "@/data/types";
import { cn } from "@/lib/utils";

/** Cores por origem: rótulo, borda da pílula e ícones do lucide. */
const originStyle: Record<SkillOrigin, { label: string; border: string; icon: string }> = {
  professional: { label: "text-lime", border: "border-lime/45", icon: "text-lime" },
  project: { label: "text-cyan", border: "border-cyan/45", icon: "text-cyan" },
  study: { label: "text-orange", border: "border-orange/45", icon: "text-orange" },
};

/** Sentido e velocidade de cada fileira (1ª esquerda, 2ª direita, 3ª esquerda). */
const rowMotion = [
  { direction: "left", secondsPerItem: 5.0 },
  { direction: "right", secondsPerItem: 4.2 },
  { direction: "left", secondsPerItem: 4.6 },
] as const;

/** Mínimo de pílulas por cópia, para a trilha nunca ficar mais curta que a tela. */
const MIN_ITEMS = 12;

function Pill({ skill, origin, locale }: { skill: Skill; origin: SkillOrigin; locale: string }) {
  const name = typeof skill.name === "string" ? skill.name : pick(skill.name, locale);
  return (
    <li
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-full border bg-surface px-4 py-2 text-sm whitespace-nowrap text-fg",
        originStyle[origin].border,
      )}
    >
      <SkillIcon icon={skill.icon} className={originStyle[origin].icon} />
      {name}
    </li>
  );
}

export async function Skills() {
  const t = await getTranslations("skills");
  const locale = await getLocale();

  return (
    <Section id="skills" title={t("title")} intro={t("intro")}>
      <div className="space-y-8 md:space-y-5">
        {skillRows.map((row, i) => {
          const { direction, secondsPerItem } = rowMotion[i % rowMotion.length];
          const repeat = Math.ceil(MIN_ITEMS / row.skills.length);
          const copy = Array.from({ length: repeat }, () => row.skills).flat();
          const label = t(`origin.${row.origin}`);

          return (
            <Reveal key={row.origin} delay={i * 0.05}>
              <div className="grid gap-3 md:grid-cols-[7.5rem_1fr] md:items-center md:gap-6">
                <h3 className={cn("font-mono text-sm", originStyle[row.origin].label)}>{label}</h3>

                {/* Carrossel (escondido para quem prefere menos movimento) */}
                <div className="marquee motion-reduce:hidden" aria-hidden>
                  <div
                    className="marquee-track"
                    data-direction={direction}
                    style={{ ["--marquee-duration" as string]: `${copy.length * secondsPerItem}s` }}
                  >
                    {[0, 1].map((n) => (
                      <ul key={n} className="flex gap-3 py-1 pr-3">
                        {copy.map((s, j) => (
                          <Pill key={j} skill={s} origin={row.origin} locale={locale} />
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>

                {/* Lista estática: leitores de tela e quem prefere menos movimento */}
                <ul className="sr-only flex-wrap gap-3 motion-reduce:not-sr-only motion-reduce:flex" aria-label={label}>
                  {row.skills.map((s, j) => (
                    <Pill key={j} skill={s} origin={row.origin} locale={locale} />
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
