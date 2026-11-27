import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { getSocialItems } from "@/components/site/SocialLinks";

export async function Contact() {
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const items = getSocialItems(t("email"));

  return (
    <Section id="contact" title={nav("contact")}>
      <Reveal>
        {items.length ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map(({ key, label, href, handle, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="panel panel-hover group flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-5 text-cyan" />
                    <span>
                      <span className="block font-medium">{label}</span>
                      {handle ? <span className="block font-mono text-xs text-fg-muted">{handle}</span> : null}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-fg-muted transition-colors group-hover:text-cyan" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel inline-block px-5 py-4 font-mono text-sm text-fg-muted">
            <span className="text-cyan">&gt; </span>
            {t("pending")}
          </p>
        )}
      </Reveal>
    </Section>
  );
}
