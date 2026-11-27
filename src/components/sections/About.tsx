import { getTranslations } from "next-intl/server";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Timeline } from "./Timeline";

export async function About() {
  const t = await getTranslations("about");

  const items = (["t1", "t2", "t3", "t4", "t5"] as const).map((k) => ({
    year: t(`timeline.${k}.year`),
    title: t(`timeline.${k}.title`),
    detail: t(`timeline.${k}.detail`),
  }));

  return (
    <Section id="about" title={t("title")}>
      <Reveal>
        <p className="max-w-[65ch] text-lg leading-relaxed text-fg-muted">{t("intro")}</p>
        <p className="mt-4 font-mono text-sm text-fg-muted">{t("languages")}</p>
      </Reveal>

      <div className="mt-14 md:mt-20">
        <Timeline items={items} />
      </div>
    </Section>
  );
}
