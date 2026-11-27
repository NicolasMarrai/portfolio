/**
 * Dados de contato e arquivos do site.
 * Campos vazios ("") não aparecem no site: preencha para ativar o botão/ícone.
 */
export const site = {
  name: "Nicolas Marrai",
  fullName: "Nicolas Marrai Alves Feitosa",

  /** URL pública final (ex.: "https://nicolasmarrai.dev"). Usada em SEO e na prévia do LinkedIn. */
  url: "",

  links: {
    whatsapp: "https://wa.me/5563984648255",
    linkedin: "https://www.linkedin.com/in/nicolas-marrai-dev/",
    github: "https://github.com/NicolasMarrai",
    instagram: "https://www.instagram.com/nicolas_marrai/",
    email: "nicolasmarrai.dev@gmail.com",
  },

  /** Texto exibido em cada card de contato (usuário ou número). */
  handles: {
    whatsapp: "(63) 98464-8255",
    linkedin: "nicolas-marrai-dev",
    github: "NicolasMarrai",
    instagram: "@nicolas_marrai",
  },

  /** Coloque os PDFs em /public e informe o caminho, ex.: "/curriculo-nicolas-marrai-pt.pdf". */
  /** Sem versão em inglês, o site em inglês oferece o PDF em português. */
  cv: {
    pt: "/curriculo-nicolas-marrai.pdf",
    en: "",
  },

  /** Foto do hero: coloque o arquivo em /public e informe o caminho, ex.: "/foto.jpg". */
  photo: "/nicolas.jpg",
};

/** Seções da página, na ordem do menu e do rodapé (cada uma é um id âncora). */
export const SECTION_IDS = ["about", "skills", "projects", "experience", "education", "contact"] as const;
