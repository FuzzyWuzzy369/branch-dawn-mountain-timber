import { readdirSync, copyFileSync, existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, ".output");
const publicAssets = join(output, "public/assets");
if (!existsSync(publicAssets)) {
  console.log("[fix-css-asset] skip — .output/public/assets missing");
  process.exit(0);
}

const cssFiles = readdirSync(publicAssets).filter((f) => /^styles-.*\.css$/.test(f));
if (cssFiles.length === 0) {
  console.warn("[fix-css-asset] no styles-*.css in public assets");
  process.exit(0);
}
// Prefer the largest real stylesheet (compiled Tailwind), not a tiny stub
const real = cssFiles
  .map((f) => ({ f, size: statSync(join(publicAssets, f)).size }))
  .sort((a, b) => b.size - a.size)[0].f;

const refs = new Set();
function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/\.(mjs|js|html|json)$/.test(name.name)) {
      const t = readFileSync(p, "utf8");
      for (const m of t.matchAll(/styles-[A-Za-z0-9_-]+\.css/g)) refs.add(m[0]);
    }
  }
}
walk(output);

let copied = 0;
for (const ref of refs) {
  const dest = join(publicAssets, ref);
  if (!existsSync(dest) || statSync(dest).size < 1000) {
    copyFileSync(join(publicAssets, real), dest);
    copied += 1;
    console.log(`[fix-css-asset] copied ${real} -> ${ref}`);
  }
}
console.log(`[fix-css-asset] real=${real} refs=${refs.size} copied=${copied}`);
