import type { SimpleIcon } from "simple-icons";
import { siGithub, siInstagram, siWhatsapp } from "simple-icons";
import { Cable, Cpu, Database, Network, Router, Server, Wifi } from "lucide-react";
import type { SkillIcon as SkillIconType } from "@/data/skills";

/** Logo de marca do Simple Icons. `colored` usa a cor oficial; senão herda currentColor. */
export function BrandIcon({
  icon,
  className = "size-4",
  colored = false,
}: {
  icon: SimpleIcon;
  className?: string;
  colored?: boolean;
}) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}

const lucideMap = {
  server: Server,
  cable: Cable,
  router: Router,
  network: Network,
  database: Database,
  cpu: Cpu,
  wifi: Wifi,
} as const;

/** Logos muito claros sumiriam no fundo claro: nesses casos, usar currentColor. */
function isTooLight(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 225;
}

export function SkillIcon({ icon, className = "text-cyan" }: { icon: SkillIconType; className?: string }) {
  if ("brand" in icon) {
    return <BrandIcon icon={icon.brand} colored={!isTooLight(icon.brand.hex)} />;
  }
  const Icon = lucideMap[icon.lucide];
  return <Icon aria-hidden className={`size-4 ${className}`} />;
}

export function GithubIcon({ className }: { className?: string }) {
  return <BrandIcon icon={siGithub} className={className} />;
}

export function InstagramIcon({ className }: { className?: string }) {
  return <BrandIcon icon={siInstagram} className={className} />;
}

export function WhatsappIcon({ className }: { className?: string }) {
  return <BrandIcon icon={siWhatsapp} className={className} />;
}

/** O Simple Icons não traz mais o logo do LinkedIn; este é um "in" simples. */
export function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z" />
    </svg>
  );
}
