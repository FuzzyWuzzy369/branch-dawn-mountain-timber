import { readdirSync, copyFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const publicAssets = join(root, ".output/public/assets");
const serverDir = join(root, ".output/server");
if (!existsSync(publicAssets) || !existsSync(serverDir)) {
  console.log("[fix-css-asset] skip — .output missing");
  process.exit(0);
}

const cssFiles = readdirSync(publicAssets).filter((f) => /^styles-.*\.css$/.test(f));
if (cssFiles.length === 0) {
  console.warn("[fix-css-asset] no styles-*.css in public assets");
  process.exit(0);
}
const real = cssFiles.sort((a, b) => a.localeCompare(b))[0];

const refs = new Set();
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".mjs") || name.name.endsWith(".js")) {
      const t = readFileSync(p, "utf8");
      for (const m of t.matchAll(/styles-[A-Za-z0-9_-]+\.css/g)) refs.add(m[0]);
    }
  }
}
walk(serverDir);

for (const ref of refs) {
  const dest = join(publicAssets, ref);
  if (!existsSync(dest)) {
    copyFileSync(join(publicAssets, real), dest);
    console.log(`[fix-css-asset] copied ${real} -> ${ref}`);
  }
}
