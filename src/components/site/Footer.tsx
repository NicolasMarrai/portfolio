import { ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site, SECTION_IDS } from "@/data/site";

/** Ano atual, calculado no build ("use cache": com cacheComponents, Date precisa ficar numa função cacheada). */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** Rodapé compacto em uma faixa: nome + copyright, navegação e "voltar ao topo". */
export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = await currentYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-fg-muted sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <p>
          <span className="font-heading text-sm font-semibold text-fg">{site.name}</span>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          © {year}. {t("rights")}
        </p>

        <nav aria-label={t("navigation")}>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {SECTION_IDS.map((s) => (
              <li key={s}>
                <a href={`#${s}`} className="transition-colors hover:text-cyan">
                  {nav(s)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className="inline-flex w-fit items-center gap-1.5 font-medium text-fg transition-colors hover:text-cyan">
          <ArrowUp aria-hidden className="size-3.5" />
          {t("top")}
        </a>
      </div>
    </footer>
  );
}
