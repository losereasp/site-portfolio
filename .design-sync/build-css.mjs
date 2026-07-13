// design-sync CSS build — compiles the repo's Tailwind v4 stylesheet into a
// real stylesheet (utility classes materialized) and prepends a web-font
// prelude that supplies the two Google fonts the app loads via next/font at
// runtime (Playfair Display, JetBrains Mono) plus their CSS variables. Impact
// (--font-primary) is a system font and needs no @font-face.
//
// Output → .design-sync/.cache/app.css, pointed at by cfg.cssEntry. Regenerated
// by cfg.buildCmd before every converter run, so it's gitignored (.cache/).
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const cacheDir = resolve(here, ".cache");
mkdirSync(cacheDir, { recursive: true });

const compiled = resolve(cacheDir, "tw.css");
// Tailwind v4 CLI scans the repo for class usage and materializes utilities.
execSync(
  `npx --yes @tailwindcss/cli@4 --input src/app/globals.css --output ${JSON.stringify(compiled)}`,
  { cwd: repoRoot, stdio: "inherit" },
);

const fontPrelude = `/* design-sync font prelude — Google web fonts the app loads via next/font */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;1,400&display=swap');
:root {
  --font-playfair: "Playfair Display", Georgia, serif;
  --font-jetbrains-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
`;

const out = resolve(cacheDir, "app.css");
writeFileSync(out, fontPrelude + "\n" + readFileSync(compiled, "utf8"));
console.log(`design-sync: wrote ${out}`);
