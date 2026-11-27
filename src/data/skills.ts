import {
  siArduino,
  siCplusplus,
  siCss,
  siEspressif,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons";
import type { Localized } from "./types";

/**
 * Ícone do item: um logo do Simple Icons ou o nome de um ícone do lucide
 * (para o que não tem logo de marca, como fibra óptica ou rack).
 */
export type SkillIcon =
  | { brand: SimpleIcon }
  | { lucide: "server" | "cable" | "router" | "network" | "database" | "cpu" | "wifi" };

/**
 * Origem de cada skill (regra do CLAUDE.md: diferenciar o que foi estudado,
 * usado em projeto e usado no trabalho).
 * - professional: usado no trabalho (CED Global, TMK NET)
 * - project: usado nos projetos dele, na parte que ele fez
 * - study: estudado em curso, na faculdade ou por conta própria
 */
export type SkillOrigin = "professional" | "project" | "study";

/** Nome próprio (string) ou nome traduzido ({ pt, en }). */
export type Skill = { name: string | Localized; icon: SkillIcon };

/** Uma fileira do carrossel por origem, na ordem em que aparecem no site. */
export type SkillRow = { origin: SkillOrigin; skills: Skill[] };

export const skillRows: SkillRow[] = [
  {
    origin: "professional",
    skills: [
      { name: { pt: "Rack & servidores Dell PowerEdge", en: "Rack & Dell PowerEdge servers" }, icon: { lucide: "server" } },
      { name: { pt: "Fibra óptica", en: "Fiber optics" }, icon: { lucide: "cable" } },
      { name: "FTTH", icon: { lucide: "network" } },
      { name: "ONU/ONT", icon: { lucide: "wifi" } },
      { name: { pt: "Roteadores", en: "Routers" }, icon: { lucide: "router" } },
      { name: { pt: "Diagnóstico de hardware", en: "Hardware diagnostics" }, icon: { lucide: "cpu" } },
    ],
  },
  {
    origin: "project",
    skills: [
      { name: "React", icon: { brand: siReact } },
      { name: "TypeScript", icon: { brand: siTypescript } },
      { name: "Next.js", icon: { brand: siNextdotjs } },
      { name: "Tailwind CSS", icon: { brand: siTailwindcss } },
      { name: "Vite", icon: { brand: siVite } },
      { name: "shadcn/ui", icon: { brand: siShadcnui } },
      { name: "Firebase", icon: { brand: siFirebase } },
      { name: "Git", icon: { brand: siGit } },
      { name: "GitHub", icon: { brand: siGithub } },
      { name: "Vercel", icon: { brand: siVercel } },
      { name: "ESP32", icon: { brand: siEspressif } },
      { name: "Arduino IDE", icon: { brand: siArduino } },
    ],
  },
  {
    origin: "study",
    skills: [
      { name: "HTML", icon: { brand: siHtml5 } },
      { name: "CSS", icon: { brand: siCss } },
      { name: "Java", icon: { brand: siOpenjdk } },
      { name: "Python", icon: { brand: siPython } },
      { name: "C++", icon: { brand: siCplusplus } },
      { name: "MySQL", icon: { brand: siMysql } },
      { name: "Oracle SQL · PL/SQL", icon: { lucide: "database" } },
      { name: "PostgreSQL", icon: { brand: siPostgresql } },
    ],
  },
];
