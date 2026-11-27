import type { Localized } from "./types";

export type Degree = {
  institution: string;
  course: Localized;
  period: Localized;
  status: Localized;
  current: boolean;
};

export const degrees: Degree[] = [
  {
    institution: "Uniube · Uberaba/MG",
    course: { pt: "Engenharia da Computação", en: "Computer Engineering" },
    period: { pt: "jan/2025 – dez/2027", en: "Jan 2025 – Dec 2027" },
    status: { pt: "Em andamento", en: "In progress" },
    current: true,
  },
  {
    institution: "PUC Goiás",
    course: { pt: "Engenharia Mecatrônica", en: "Mechatronics Engineering" },
    period: { pt: "2020 – 2021", en: "2020 – 2021" },
    status: { pt: "Trancado", en: "Discontinued" },
    current: false,
  },
];
