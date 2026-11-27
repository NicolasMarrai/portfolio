import type { Localized } from "./types";

/**
 * Certificados. Os dados vêm do que está escrito em cada certificado.
 * Arquivos: public/certificados/<id>.pdf e a miniatura em public/certificados/thumbs/<id>.jpg.
 * Os PDFs da Tesla Treinamentos estão com o CPF removido (não publicar os originais).
 */
export type Certificate = {
  id: string;
  title: Localized;
  issuer: string;
  /** Carga horária total, quando o certificado informa. */
  hours?: number;
  year: number;
  /** Linhas do "Sobre o curso": só o que consta no certificado. */
  about: Localized[];
};

/** Ordem: do mais recente para o mais antigo. */
export const certificates: Certificate[] = [
  {
    id: "oracle",
    title: { pt: "Banco de Dados Oracle Completo: SQL + PL/SQL + Modelagem", en: "Complete Oracle Database: SQL + PL/SQL + Modeling" },
    issuer: "Udemy",
    hours: 32,
    year: 2026,
    about: [
      { pt: "Instrutor: Emilio Scudero.", en: "Instructor: Emilio Scudero." },
      { pt: "Concluído em 13/11/2026.", en: "Completed on 11/13/2026." },
    ],
  },
  {
    id: "seguranca-digital",
    title: { pt: "Sensibilização para a Segurança Digital", en: "Digital Security Awareness" },
    issuer: "Cisco Networking Academy",
    year: 2026,
    about: [
      { pt: "Oferecido pelo IME (Instituto Militar de Engenharia). Instrutor: Leandro Ferreira.", en: "Offered by IME (Military Institute of Engineering). Instructor: Leandro Ferreira." },
      { pt: "Concluído em 16/09/2026.", en: "Completed on 09/16/2026." },
    ],
  },
  {
    id: "javascript-full-stack-club",
    title: { pt: "JavaScript", en: "JavaScript" },
    issuer: "Full Stack Club",
    hours: 20,
    year: 2026,
    about: [
      { pt: "Módulos do curso Codestart: Javascript (8 h) e Javascript Avançado (12 h).", en: "Codestart course modules: Javascript (8 h) and Advanced Javascript (12 h)." },
      { pt: "Concluído em 13/07/2026.", en: "Completed on 07/13/2026." },
    ],
  },
  {
    id: "java",
    title: { pt: "Java COMPLETO: Programação Orientada a Objetos + Projetos", en: "Complete Java: Object-Oriented Programming + Projects" },
    issuer: "Udemy",
    hours: 54,
    year: 2026,
    about: [
      { pt: "Instrutor: Nelio Alves.", en: "Instructor: Nelio Alves." },
      { pt: "Concluído em 26/06/2026.", en: "Completed on 06/26/2026." },
    ],
  },
  {
    id: "javascript-cisco",
    title: { pt: "JavaScript Essentials 1 e 2", en: "JavaScript Essentials 1 & 2" },
    issuer: "Cisco Networking Academy",
    year: 2026,
    about: [
      { pt: "Oferecido pela Uniube. Instrutor: Joabe Fuzaro.", en: "Offered by Uniube. Instructor: Joabe Fuzaro." },
      { pt: "Essentials 1 concluído em 16/04/2026 e Essentials 2 em 21/05/2026.", en: "Essentials 1 completed on 04/16/2026 and Essentials 2 on 05/21/2026." },
    ],
  },
  {
    id: "git-github",
    title: { pt: "Git & GitHub", en: "Git & GitHub" },
    issuer: "Full Stack Club",
    hours: 4,
    year: 2026,
    about: [
      { pt: "Módulo do curso Codestart.", en: "Module of the Codestart course." },
      { pt: "Concluído em 18/05/2026.", en: "Completed on 05/18/2026." },
    ],
  },
  {
    id: "css",
    title: { pt: "CSS", en: "CSS" },
    issuer: "Full Stack Club",
    hours: 18,
    year: 2026,
    about: [
      { pt: "Módulos do curso Codestart: Fundamentos CSS (6 h) e CSS Avançado (12 h).", en: "Codestart course modules: CSS Fundamentals (6 h) and Advanced CSS (12 h)." },
      { pt: "Concluído em 23/03/2026.", en: "Completed on 03/23/2026." },
    ],
  },
  {
    id: "mysql",
    title: { pt: "MySQL para Desenvolvedores: Básico ao Avançado", en: "MySQL for Developers: Basic to Advanced" },
    issuer: "Udemy",
    hours: 9,
    year: 2026,
    about: [
      { pt: "Instrutor: Carlos Andrade.", en: "Instructor: Carlos Andrade." },
      { pt: "Concluído em 10/03/2026.", en: "Completed on 03/10/2026." },
    ],
  },
  {
    id: "html",
    title: { pt: "HTML", en: "HTML" },
    issuer: "Full Stack Club",
    hours: 16,
    year: 2026,
    about: [
      { pt: "Módulos do curso Codestart: Fundamentos HTML (8 h) e HTML Avançado (8 h).", en: "Codestart course modules: HTML Fundamentals (8 h) and Advanced HTML (8 h)." },
      { pt: "Concluído em 09/03/2026.", en: "Completed on 03/09/2026." },
    ],
  },
  {
    id: "fundamentos-da-internet",
    title: { pt: "Fundamentos da Internet", en: "Internet Fundamentals" },
    issuer: "Full Stack Club",
    hours: 6,
    year: 2026,
    about: [
      { pt: "Módulo do curso Codestart.", en: "Module of the Codestart course." },
      { pt: "Concluído em 05/03/2026.", en: "Completed on 03/05/2026." },
    ],
  },
  {
    id: "programacao",
    title: { pt: "Curso de Programação", en: "Programming Course" },
    issuer: "Tesla Treinamentos",
    hours: 127,
    year: 2026,
    about: [{ pt: "Emitido em 27/02/2026.", en: "Issued on 02/27/2026." }],
  },
  {
    id: "excel",
    title: { pt: "Excel Básico", en: "Basic Excel" },
    issuer: "Tesla Treinamentos",
    hours: 25,
    year: 2026,
    about: [{ pt: "Emitido em 27/02/2026.", en: "Issued on 02/27/2026." }],
  },
  {
    id: "ia-para-engenheiros",
    title: { pt: "IA para Engenheiros", en: "AI for Engineers" },
    issuer: "Tesla Treinamentos",
    hours: 60,
    year: 2026,
    about: [{ pt: "Emitido em 26/02/2026.", en: "Issued on 02/26/2026." }],
  },
  {
    id: "word",
    title: { pt: "Word", en: "Word" },
    issuer: "Tesla Treinamentos",
    hours: 15,
    year: 2026,
    about: [{ pt: "Emitido em 26/02/2026.", en: "Issued on 02/26/2026." }],
  },
  {
    id: "algoritmos-logica-programacao",
    title: { pt: "Algoritmos e Lógica de Programação", en: "Algorithms and Programming Logic" },
    issuer: "Udemy",
    hours: 30.5,
    year: 2025,
    about: [
      { pt: "Instrutor: Nelio Alves.", en: "Instructor: Nelio Alves." },
      { pt: "Concluído em 12/05/2025.", en: "Completed on 05/12/2025." },
    ],
  },
  {
    id: "arduino",
    title: { pt: "Curso de Arduino", en: "Arduino Course" },
    issuer: "Curso de Arduino",
    hours: 68,
    year: 2021,
    about: [
      { pt: "Professor: Flávio Guimarães. Emitido em 01/05/2021.", en: "Instructor: Flávio Guimarães. Issued on 05/01/2021." },
      {
        pt: "Conteúdo: eletrônica básica, Lei de Ohm, multímetro, circuitos digitais, portas digitais e analógicas, PWM, variáveis, condicionais, laços, arrays e programação orientada a objetos.",
        en: "Content: basic electronics, Ohm's law, multimeter, digital circuits, digital and analog ports, PWM, variables, conditionals, loops, arrays and object-oriented programming.",
      },
    ],
  },
];
