import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Devolve o caminho de um arquivo de /public com um hash do conteúdo na URL
 * (ex.: "/nicolas.jpg?v=1a2b3c4d"). Ao trocar o arquivo, a URL muda e nenhum
 * cache antigo mostra a versão anterior.
 *
 * "use cache": com cacheComponents, leitura de arquivo e hash durante a
 * renderização precisam ficar numa função cacheada (senão o Next acusa
 * "unstable value while prerendering").
 */
export async function versionedAsset(publicPath: string): Promise<string> {
  "use cache";
  if (!publicPath) return publicPath;
  const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(file)) return publicPath;
  const hash = createHash("md5").update(readFileSync(file)).digest("hex").slice(0, 8);
  return `${publicPath}?v=${hash}`;
}
