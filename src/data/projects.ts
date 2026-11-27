import type { Localized } from "./types";

export type ProjectStatus = "online" | "ended" | "in-progress" | "event";

export type ProjectIcon = "globe" | "graduation" | "qr" | "gauge";

/**
 * Imagens: coloque o arquivo em public/projects/<id>.png (ou .jpg / .webp).
 * O site detecta sozinho; sem arquivo, mostra um placeholder com o ícone e o nome.
 */
export type Project = {
  id: string;
  title: string;
  /** Linha colorida abaixo do título: o contexto do projeto. */
  context: Localized;
  /** Descrição curta do card. */
  summary: Localized;
  status: ProjectStatus;
  /** Categoria usada no filtro da seção Projetos. */
  group: "software" | "hardware";
  /** Ícone do placeholder (enquanto não houver imagem em public/projects/<id>.png). */
  icon: ProjectIcon;
  /** Fluxo da arquitetura, desenhado no card como "A → B → C" (opcional). */
  pipeline?: Localized[];
  /**
   * Capa desenhada no lugar do placeholder, para projetos sem imagem (opcional).
   * Uma imagem em public/projects/<id>.png continua tendo prioridade.
   */
  cover?: { kicker: Localized; headline: Localized; flow?: Localized[] };
  tags: string[];
  /** demo = site no ar; article = notícia/matéria sobre o projeto. */
  links: { demo?: string; github?: string; article?: string };
  /** Conteúdo do modal "Ver detalhes técnicos". */
  details: {
    context: Localized;
    myPart: Localized;
    stack: string[];
    results: Localized[];
  };
};

export const projects: Project[] = [
  {
    id: "cognull",
    title: "Cognull",
    context: { pt: "Site institucional", en: "Company website" },
    summary: {
      pt: "Site institucional com componentes reutilizáveis, layout responsivo, formulário de contato e SEO.",
      en: "Company website with reusable components, responsive layout, contact form and SEO.",
    },
    status: "online",
    group: "software",
    icon: "globe",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui", "EmailJS"],
    links: { demo: "https://www.cognull.com.br/" },
    details: {
      context: {
        pt: "Site institucional da Cognull, publicado e no ar.",
        en: "Cognull's company website, published and live.",
      },
      myPart: {
        pt: "Desenvolvimento do front-end: componentes reutilizáveis, layout responsivo, formulário de contato com EmailJS e SEO.",
        en: "Front-end development: reusable components, responsive layout, contact form with EmailJS and SEO.",
      },
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui", "EmailJS"],
      results: [{ pt: "Site no ar em cognull.com.br.", en: "Live at cognull.com.br." }],
    },
  },
  {
    id: "healthmed",
    title: "HealthMed",
    context: {
      pt: "Plataforma de ensino para estudantes de medicina",
      en: "Learning platform for medical students",
    },
    summary: {
      pt: "Feita com amigos para resolver o problema real de um amigo: cursos em vídeo, carrinho, cupons, níveis de permissão e painel administrativo.",
      en: "Built with friends to solve a friend's real problem: video courses, cart, coupons, permission levels and an admin panel.",
    },
    status: "ended",
    group: "software",
    icon: "graduation",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Mux"],
    links: {},
    details: {
      context: {
        pt: "Plataforma criada em grupo para um amigo. Ele decidiu não levar o projeto adiante, e a plataforma foi tirada do ar.",
        en: "A platform built as a group for a friend. He decided not to move forward, and the platform was taken offline.",
      },
      myPart: {
        pt: "Upload das aulas, construção das telas e a facilidade de acesso do aluno ao conteúdo.",
        en: "Lesson upload, building the screens and making the content easy for students to access.",
      },
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Supabase (Auth, DB, Storage)",
        "PostgreSQL + RLS",
        "Mux",
        "TanStack Query",
        "Vitest",
        "React Testing Library",
      ],
      results: [
        {
          pt: "Funcionalidades do projeto: cursos, carrinho, cupons, níveis de permissão e painel administrativo.",
          en: "Project features: courses, cart, coupons, permission levels and an admin panel.",
        },
        { pt: "Projeto encerrado, hoje fora do ar.", en: "Project ended, currently offline." },
      ],
    },
  },
  {
    id: "bomba-logica",
    title: "Bomba-Lógica",
    context: { pt: "XVIII ENTEC Uniube · 2025", en: "XVIII ENTEC Uniube · 2025" },
    summary: {
      pt: "Simulação educativa de engenharia social: um QR Code leva a um formulário, e o envio dos dados aciona um ESP32 com LED e buzzer.",
      en: "Educational social-engineering simulation: a QR code leads to a form, and submitting it triggers an ESP32 with an LED and buzzer.",
    },
    status: "event",
    group: "hardware",
    icon: "qr",
    cover: {
      kicker: { pt: "XVIII ENTEC · 2025", en: "XVIII ENTEC · 2025" },
      headline: {
        pt: "Uma simulação educativa de engenharia social",
        en: "An educational social-engineering simulation",
      },
      flow: [
        { pt: "QR Code", en: "QR code" },
        { pt: "Formulário", en: "Form" },
        { pt: "ESP32", en: "ESP32" },
        { pt: "LED · buzzer", en: "LED · buzzer" },
      ],
    },
    tags: ["Next.js", "TypeScript", "Firebase", "ESP32", "Arduino IDE"],
    links: {
      demo: "https://bomba-logica-next.vercel.app/",
      article: "https://revistas.uniube.br/index.php/retii/article/view/1966",
    },
    details: {
      context: {
        pt: "Projeto apresentado na XVIII ENTEC da Uniube. Um QR Code impresso leva a um formulário web. Quando a pessoa envia os dados, um ESP32 aciona um LED ou buzzer, e ela recebe mensagens de conscientização. No fim do formulário havia um sorteio.",
        en: "Project shown at Uniube's XVIII ENTEC. A printed QR code leads to a web form. When someone submits their data, an ESP32 triggers an LED or buzzer and the person gets awareness messages. The form ended with a prize draw.",
      },
      myPart: {
        pt: "O grupo oficial tinha 15 alunos de Engenharia da Computação e Elétrica, mas eu fiz praticamente o projeto inteiro em dupla com um amigo.",
        en: "The official group had 15 Computer and Electrical Engineering students, but a friend and I built almost the whole project as a pair.",
      },
      stack: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Phosphor Icons",
        "Firebase",
        "Vercel",
        "ESP32 (Arduino IDE)",
      ],
      results: [
        {
          pt: "Integração de ponta a ponta: QR Code → formulário web → Firebase → ESP32 com LED/buzzer.",
          en: "End-to-end integration: QR code → web form → Firebase → ESP32 with LED/buzzer.",
        },
      ],
    },
  },
  {
    id: "baja",
    title: "Telemetria Baja SAE",
    context: {
      pt: "Engrenados Baja SAE · desde ago/2025",
      en: "Engrenados Baja SAE · since Aug 2025",
    },
    summary: {
      pt: "Arquitetura de telemetria do carro: sensores em RS-485, ECU STM32, gateway ESP32 com LoRa e 4G, e Grafana no box.",
      en: "Telemetry architecture for the car: RS-485 sensors, an STM32 ECU, an ESP32 gateway with LoRa and 4G, and Grafana in the pit.",
    },
    status: "in-progress",
    group: "hardware",
    icon: "gauge",
    tags: ["STM32", "ESP32", "RS-485", "LoRa", "Grafana"],
    pipeline: [
      { pt: "Sensores", en: "Sensors" },
      { pt: "RS-485", en: "RS-485" },
      { pt: "ECU STM32", en: "STM32 ECU" },
      { pt: "Gateway ESP32", en: "ESP32 gateway" },
      { pt: "LoRa · 4G", en: "LoRa · 4G" },
      { pt: "Grafana no box", en: "Grafana in the pit" },
    ],
    links: {},
    details: {
      context: {
        pt: "Faço parte da equipe Engrenados Baja SAE, que constrói um veículo off-road para competições. Como Sub-Supervisor de TI, sou responsável, junto com a equipe de TI, pelo desenvolvimento da telemetria: um sistema para acompanhar os dados do carro em tempo real, direto do box.",
        en: "I'm part of the Engrenados Baja SAE team, which builds an off-road vehicle for competitions. As IT Deputy Supervisor, I'm responsible, together with the IT team, for developing the telemetry: a system to follow the car's data in real time, right from the pit.",
      },
      myPart: {
        pt: "Desenvolvimento do sistema de telemetria em conjunto com a equipe de TI: planejamento da arquitetura, pesquisa de componentes e documentação técnica.",
        en: "Developing the telemetry system together with the IT team: architecture planning, component research and technical documentation.",
      },
      stack: ["STM32 Black Pill", "ESP32", "RS-485", "LoRa 915 MHz", "4G LTE", "Grafana", "SD card"],
      results: [
        {
          pt: "Sensores: pressão do freio, RPM, temperatura do cabeçote e da correia CVT, posição do acelerador e GPS.",
          en: "Sensors: brake pressure, RPM, cylinder head and CVT belt temperature, throttle position and GPS.",
        },
      ],
    },
  },
];
