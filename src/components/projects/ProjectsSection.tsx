import { existsSync } from "node:fs";
import { join } from "node:path";
import { getLocale, getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { pick } from "@/data/types";
import { Section } from "@/components/site/Section";
import { versionedAsset } from "@/lib/versioned-asset";
import { ProjectExplorer } from "./ProjectExplorer";
import type { ProjectCardData } from "./types";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

/**
 * Procura public/projects/<id>.(png|jpg|jpeg|webp). Roda no build.
 * A URL leva um hash do conteúdo (?v=...): ao trocar a imagem, a URL muda
 * e nenhum cache antigo (navegador ou CDN) mostra a versão anterior.
 */
async function findProjectImage(id: string): Promise<string | undefined> {
  for (const ext of IMAGE_EXTENSIONS) {
    if (existsSync(join(process.cwd(), "public", "projects", `${id}.${ext}`))) {
      return versionedAsset(`/projects/${id}.${ext}`);
    }
  }
  return undefined;
}

/** Monta os cards no servidor (textos já no idioma certo) e entrega ao explorador. */
export async function ProjectsSection() {
  const locale = await getLocale();
  const t = await getTranslations("projects");

  const images = await Promise.all(projects.map((p) => findProjectImage(p.id)));

  const cards: ProjectCardData[] = projects.map((p, i) => ({
    id: p.id,
    group: p.group,
    icon: p.icon,
    image: images[i],
    title: p.title,
    context: pick(p.context, locale),
    summary: pick(p.summary, locale),
    cover: p.cover && {
      kicker: pick(p.cover.kicker, locale),
      headline: pick(p.cover.headline, locale),
      flow: p.cover.flow?.map((step) => pick(step, locale)),
    },
    tags: p.tags,
    status: p.status,
    links: p.links,
    details: {
      context: pick(p.details.context, locale),
      myPart: pick(p.details.myPart, locale),
      stack: p.details.stack,
      results: p.details.results.map((r) => pick(r, locale)),
    },
  }));

  return (
    <Section id="projects" title={t("title")} intro={t("intro")}>
      <ProjectExplorer cards={cards} />
    </Section>
  );
}
