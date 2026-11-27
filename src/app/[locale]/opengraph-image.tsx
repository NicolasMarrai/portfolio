import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";

/**
 * Imagem de prévia (LinkedIn, WhatsApp, etc.), gerada no build para cada idioma.
 * Mesmas cores do site: fundo claro, nome em destaque, acento ciano e a foto à direita.
 */
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: param } = await params;
  const locale = hasLocale(routing.locales, param) ? param : routing.defaultLocale;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const photo = site.photo
    ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", site.photo.replace(/^\//, "")))).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F6F7F9",
          color: "#0F172A",
          borderTop: "12px solid #0E7490",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 26, color: "#4D7C0F", display: "flex" }}>{messages.hero.available}</div>
          <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 36, color: "#475569", marginTop: 20 }}>{messages.hero.eyebrow}</div>
          <div style={{ fontSize: 30, color: "#0E7490", marginTop: 36 }}>{messages.hero.role}</div>
        </div>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse só aceita <img>
          <img
            src={photo}
            alt=""
            width={340}
            height={425}
            style={{ objectFit: "cover", objectPosition: "top", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)" }}
          />
        ) : null}
      </div>
    ),
    size,
  );
}
