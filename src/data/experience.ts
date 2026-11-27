import type { Localized } from "./types";

export type Role = {
  title: Localized;
  type: Localized;
  period: Localized;
  bullets: Localized[];
};

export type Experience = {
  company: string;
  /** "work" = emprego/freelance; "extra" = atividade extracurricular. */
  kind: "work" | "extra";
  location?: Localized;
  roles: Role[];
};

export const experience: Experience[] = [
  {
    company: "CED Global",
    kind: "work",
    roles: [
      {
        title: { pt: "Field Engineer", en: "Field Engineer" },
        type: { pt: "Freelancer", en: "Freelance" },
        period: { pt: "2026 – atual", en: "2026 – present" },
        bullets: [
          {
            pt: "Serviços de campo em infraestrutura de TI em ambientes corporativos.",
            en: "On-site IT infrastructure services in corporate environments.",
          },
          {
            pt: "Instalação, em dupla, de dois servidores Dell PowerEdge R7615: montagem em rack, energia, rede e fibra óptica.",
            en: "Installed two Dell PowerEdge R7615 servers with a partner: rack mounting, power, networking and fiber optics.",
          },
          {
            pt: "Visita técnica sozinho para diagnosticar um equipamento inoperante: conferi alimentação e indicadores de status, repassei o resultado ao time remoto e liberei o acesso para reconfiguração.",
            en: "Solo site visit to diagnose a down device: checked power and status indicators, reported to the remote team and enabled access for reconfiguration.",
          },
        ],
      },
    ],
  },
  {
    company: "TMK NET",
    kind: "work",
    roles: [
      {
        title: { pt: "Estagiário de NOC", en: "NOC Intern" },
        type: { pt: "Estágio", en: "Internship" },
        period: { pt: "2025 – 2026", en: "2025 – 2026" },
        bullets: [
          {
            pt: "Trabalho interno junto ao analista de NOC de um provedor FTTH.",
            en: "Internal work alongside the NOC analyst of an FTTH internet provider.",
          },
          {
            pt: "Testes de sinal, configuração de ONUs/ONTs e roteadores, verificação de equipamentos e conectividade.",
            en: "Signal testing, ONU/ONT and router configuration, equipment and connectivity checks.",
          },
          {
            pt: "Participei da migração dos servidores da empresa, feita de madrugada. A internet dos clientes voltou em cerca de 2 horas.",
            en: "Took part in the company's overnight server migration. Customer internet was back in about 2 hours.",
          },
        ],
      },
    ],
  },
  {
    company: "Engrenados Baja SAE",
    kind: "extra",
    roles: [
      {
        title: { pt: "Sub-Supervisor de TI", en: "IT Deputy Supervisor" },
        type: { pt: "Extracurricular", en: "Extracurricular" },
        period: { pt: "ago/2025 – atual", en: "Aug 2025 – present" },
        bullets: [
          {
            pt: "Responsável, junto com a equipe de TI, pelo desenvolvimento do sistema de telemetria do veículo de competição.",
            en: "Responsible, together with the IT team, for developing the competition vehicle's telemetry system.",
          },
          {
            pt: "Atuo no planejamento da arquitetura, na pesquisa de componentes e na documentação técnica do projeto.",
            en: "I work on architecture planning, component research and the project's technical documentation.",
          },
        ],
      },
    ],
  },
];
