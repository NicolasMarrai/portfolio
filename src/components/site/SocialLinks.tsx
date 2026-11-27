import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "./Icons";

export type SocialItem = {
  key: "github" | "linkedin" | "whatsapp" | "instagram" | "email";
  label: string;
  href: string;
  /** Usuário ou número mostrado no card de contato. */
  handle?: string;
  Icon: (props: { className?: string }) => React.ReactNode;
};

/** Só os links preenchidos em src/data/site.ts. */
export function getSocialItems(emailLabel = "E-mail"): SocialItem[] {
  const { github, linkedin, whatsapp, instagram, email } = site.links;
  const h = site.handles;
  const items: SocialItem[] = [];
  if (whatsapp) items.push({ key: "whatsapp", label: "WhatsApp", href: whatsapp, handle: h.whatsapp, Icon: WhatsappIcon });
  if (linkedin) items.push({ key: "linkedin", label: "LinkedIn", href: linkedin, handle: h.linkedin, Icon: LinkedinIcon });
  if (github) items.push({ key: "github", label: "GitHub", href: github, handle: h.github, Icon: GithubIcon });
  if (instagram) items.push({ key: "instagram", label: "Instagram", href: instagram, handle: h.instagram, Icon: InstagramIcon });
  if (email) items.push({ key: "email", label: emailLabel, href: `mailto:${email}`, handle: email, Icon: Mail });
  return items;
}

export function SocialIcons({ className }: { className?: string }) {
  const items = getSocialItems();
  if (!items.length) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
