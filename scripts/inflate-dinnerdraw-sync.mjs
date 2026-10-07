import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "scripts/dinnerdraw-sync/manifest.json");
if (!existsSync(manifestPath)) {
  console.log("[inflate-dinnerdraw-sync] no manifest — skip");
  process.exit(0);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
for (const item of manifest) {
  const b64 = item.parts.map((p) => readFileSync(join(root, p), "utf8")).join("");
  const buf = inflateSync(Buffer.from(b64, "base64"));
  const out = join(root, item.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log("[inflate-dinnerdraw-sync] wrote", item.path, buf.length);
}
