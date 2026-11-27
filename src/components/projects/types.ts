import type { Project, ProjectIcon, ProjectStatus } from "@/data/projects";

/** Projeto já traduzido para o idioma atual, pronto para os componentes de cliente. */
export type ProjectCardData = {
  id: string;
  group: Project["group"];
  icon: ProjectIcon;
  image?: string;
  frame?: { url?: string };
  title: string;
  context: string;
  summary: string;
  cover?: { kicker: string; headline: string; flow?: string[] };
  tags: string[];
  status: ProjectStatus;
  links: Project["links"];
  details: { context: string; myPart: string; stack: string[]; results: string[] };
};

/** Cor do ponto de status (card e modal). */
export const statusColor: Record<ProjectStatus, string> = {
  online: "bg-lime",
  ended: "bg-fg-muted",
  "in-progress": "bg-cyan",
  event: "bg-lime",
};
