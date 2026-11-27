import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { degrees } from "@/data/education";
import { certificates } from "@/data/certificates";
import { pick } from "@/data/types";
import { versionedAsset } from "@/lib/versioned-asset";
import { cn } from "@/lib/utils";
import { Certifications, type CertificateCard } from "./Certifications";

/** Formação: graduação em lista compacta + acordeão de certificações. */
export async function Education() {
  const t = await getTranslations("education");
  const locale = await getLocale();

  const hoursLabel = (h: number) => `${h.toLocaleString(locale === "pt" ? "pt-BR" : "en-US")} h`;

  const cards: CertificateCard[] = await Promise.all(
    certificates.map(async (c) => ({
      id: c.id,
      title: pick(c.title, locale),
      meta: [c.issuer, c.hours ? hoursLabel(c.hours) : null, String(c.year)].filter(Boolean).join(" · "),
      thumb: await versionedAsset(`/certificados/thumbs/${c.id}.jpg`),
      pdf: await versionedAsset(`/certificados/${c.id}.pdf`),
    })),
  );

  return (
    <Section id="education" title={t("title")}>
      <Reveal>
        <div className="panel overflow-hidden">
          <h3 className="border-b border-line px-5 py-3 font-mono text-xs text-fg-muted">{t("degrees")}</h3>
          <ul className="divide-y divide-line md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
            {degrees.map((d) => (
              <li key={d.institution} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{pick(d.course, locale)}</p>
                  <span
                    className={cn(
                      "rounded border px-1.5 py-0.5 font-mono text-[0.7rem]",
                      d.current ? "border-lime/40 text-lime" : "border-line-strong text-fg-muted",
                    )}
                  >
                    {pick(d.status, locale)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-fg-muted">
                  {d.institution} · <span className="font-mono">{pick(d.period, locale)}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8">
        <Certifications cards={cards} />
      </Reveal>
    </Section>
  );
}
