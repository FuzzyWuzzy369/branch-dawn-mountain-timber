import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { inflateSync } from "node:zlib";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "scripts/dinnerdraw-sync/manifest.json");
if (!existsSync(manifestPath)) {
  console.log("[inflate-dinnerdraw-sync] no manifest — skip");
  process.exit(0);
}
const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
for (const item of manifest) {
  const out = join(root, item.path);
  let buf;
  if (item.parts) {
    const b64 = item.parts.map((p) => readFileSync(join(root, p), "utf8")).join("");
    buf = inflateSync(Buffer.from(b64, "base64"));
  } else {
    // Small literal edits on the repo copy; each is skipped once already applied.
    let text = readFileSync(out, "utf8");
    for (const e of item.edits) {
      if (e.cut) {
        const a = text.indexOf(e.cut[0]);
        if (a === -1) continue;
        const b = text.indexOf(e.cut[1], a);
        if (b === -1) throw new Error(`[inflate-dinnerdraw-sync] ${item.path}: cut end not found`);
        text = text.slice(0, a) + text.slice(b + e.cut[1].length);
      } else if (text.includes(e.find)) {
        text = text.replace(e.find, e.replace);
      }
    }
    buf = Buffer.from(text, "utf8");
  }
  if (item.sha256 && sha(buf) !== item.sha256) {
    throw new Error(`[inflate-dinnerdraw-sync] ${item.path}: sha256 mismatch (stale or missing source) — refusing to build`);
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log("[inflate-dinnerdraw-sync] wrote", item.path, buf.length);
}
