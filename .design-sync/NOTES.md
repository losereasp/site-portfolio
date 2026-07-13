# design-sync notes — next-portfolio → "Losereasp Portfolio DS"

This repo is a **Next.js App Router portfolio site**, not a component-library
design system. There is no `dist/` and no Storybook, so the sync runs the
package shape off-script. Key adaptations:

- **Named-export barrel** (`.design-sync/ds-entry.tsx`): the app's components are
  `export default`, which the converter's synth entry (`export *`) can't see.
  The barrel re-exports the scoped 9 as named exports and is pinned via
  `cfg.entry`. Add a component here AND in `cfg.componentSrcMap` to sync it.
- **Tailwind v4 CSS is compiled at build time** (`cfg.buildCmd` →
  `.design-sync/build-css.mjs`): `globals.css` is uncompiled (`@import
  "tailwindcss"`), so previews would be unstyled. The script runs the Tailwind
  CLI (scans the repo for class usage) → `.design-sync/.cache/app.css`, pointed
  at by `cfg.cssEntry`. **Re-sync must run `cfg.buildCmd` first** (the driver /
  resync does this) or the CSS is stale/missing.
- **Fonts**: the app loads Playfair Display + JetBrains Mono via `next/font`
  (runtime, no `@font-face` in source). The CSS build prepends a Google Fonts
  `@import` + defines `--font-playfair` / `--font-jetbrains-mono`. These load
  remotely at render time (`[FONT_REMOTE]`, expected). The display font
  `--font-primary` is **Impact** (system font) — no web font shipped; expect
  a `[FONT_MISSING]`/system-fallback note for Impact / "Arial Black".
- **next/* shims** (`.design-sync/shims/`, aliased via `cfg.tsconfig` paths):
  `next/link` → plain `<a>`, `next/image` → plain `<img>` (strips fill/priority/
  etc.), `next/dynamic` → neutral "3D asset" placeholder (the real
  dynamically-imported `AssetViewer` is a Three.js widget that can't render
  statically).

## Scope
Synced 9 renderable components: Footer, ProjectCard, MainNavbar,
BeforeAfterSlider, ProjectOverlay, LocalTime, Magnetic, ScrollMarquee,
LoadingScreen. **Deliberately excluded** (WebGL / video / custom-cursor /
app-glue, no value as standalone cards): HeroSection (R3F/Three), HeroVideo,
HeroCursor, ViewCursor, ScrollToTop, AssetViewer, BeforeAfterVideoSlider.

## Verify-loop learnings (this run)
- **tsconfig comment key breaks aliasing**: a `"//"` key in
  `tsconfig.dssync.json` makes the converter's comment-stripping regex produce
  invalid JSON → `tsconfigPathsPlugin` returns null → next/* shims silently
  don't fire (real next code bundles, `process is not defined` at render). Keep
  that tsconfig comment-free.
- **SVG data-URI encoding**: in `fixtures.tsx`, use literal `#` in colors —
  `encodeURIComponent` encodes once. Pre-encoding `%23` double-encodes → invalid
  colors → images render as stray black shapes.
- **Card modes** (in cfg.overrides): wide cards (Footer, ProjectCard,
  BeforeAfterSlider) use `cardMode:"column"`; MainNavbar is `position:fixed` so
  it needs `cardMode:"single"` (primaryStory OverDark) or it escapes the grid.
- **Floored (ship functional, floor-card preview)**: LoadingScreen and
  ProjectOverlay are mount-time-animation / gsap-opacity-0 components that can't
  render as an honest static frame (LoadingScreen also self-hides after ~1.6s;
  ProjectOverlay animates in from opacity 0). Authoring a static lookalike would
  be a reimplementation, which the skill forbids — so they stay on the floor
  card. Authorable later only if a way to freeze their entry state is found.
- **ScrollMarquee**: only the `direction={1}` story renders statically; a
  `direction={-1}` variant blanked (scrub offset), so only one story is kept.

## Known render warns (expected, not new)
- `[FONT_REMOTE]` for JetBrains Mono / Playfair Display / Impact / Arial Black —
  the two web fonts load via the Google `@import` in the CSS build; Impact/Arial
  are system fallbacks. Not `[FONT_MISSING]`.

## Re-sync risks
- The compiled Tailwind CSS (`.cache/app.css`) is regenerated each run from live
  source — new/removed utility classes change the stylesheet. Deterministic.
- Google Fonts `@import` is network-fetched at render time; an offline render
  falls back to system fonts.
- Animation-driven components (ScrollMarquee, LoadingScreen, Magnetic) rely on
  GSAP/hover/timers — previews capture a static frame only; the "live" motion is
  not represented.
- ProjectOverlay's 3D `AssetViewer` is shimmed to a placeholder — that region of
  the card is intentionally not the real widget.
