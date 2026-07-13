# Losereasp Portfolio — design system conventions

A bold, editorial CG-artist portfolio system: near-black cinematic imagery, a
warm off-white page, one hot-orange accent, oversized condensed display type
against monospace body copy. Built on **Tailwind v4** — style with utility
classes and the brand tokens below.

## Setup — no provider needed
Components render standalone; there is **no** context/theme provider to wrap.
Just import and use. All styling comes from the shipped `styles.css` (import it
once at the app root) — it defines the brand tokens, the compiled utilities, and
`@import`s the two web fonts.

**Fonts** (already wired in `styles.css`): `--font-primary` = **Impact** (the
oversized display face — every hero/title lockup uses it), `--font-mono` =
**JetBrains Mono** (body copy, labels, links — the workhorse), `--font-serif` =
Playfair Display (rare accents). Reach for `font-primary` on anything large and
loud, `font-mono` on everything else.

## The palette — one accent, high contrast
| Token | Utility | Value | Use |
|---|---|---|---|
| `--color-bg` | `bg-bg` | `#F0F0EE` | page background (warm off-white) |
| `--color-fg` | `text-fg` | `#111111` | primary text on light |
| `--color-accent` | `text-accent` / `bg-accent` | `#FF5F1F` | the ONE accent — hot orange, used sparingly for emphasis, underlines, active state |
| `--color-dark` | `bg-dark` | `#000000` | dark sections, nav-over-hero |
| `--color-surface` | `bg-surface` | `#FFFFFF` | raised surfaces |

Idiom notes drawn from the components: the accent frequently appears as a
`border-b-[3px] border-[#FF5F1F]` underline on links, a thin orange rule, or a
solid orange control chip. White text (`text-white`, `text-white/60`) sits on
dark imagery; overlays use `bg-gradient-to-t from-black/90`. Keep the accent rare
— it only reads as loud because everything around it is monochrome.

## Composing the components
- **MainNavbar / ProjectCard / ProjectOverlay** expect **dark imagery or a dark
  surface** behind them (white/orange type on near-black). On a light section,
  pass `lightMode` to `MainNavbar`.
- **ProjectCard** takes a `data` object (`{title, category, description,
  software[], heroImage, hoverVideo?}`) and an `onClick(id)`; `isFeatured` makes
  it the large hero variant. Hover reveals description + software tags.
- **Magnetic** wraps any element so it eases toward the cursor — wrap logos/CTAs.
- **ScrollMarquee** takes `children` + `direction` and scrubs on scroll.
- **BeforeAfterSlider** takes `beforeImage`/`afterImage` for render comparisons.
- **Footer / LocalTime** are self-contained (LocalTime shows Da Nang GMT+7 live).

Read each component's `<Name>.d.ts` for its exact props and `<Name>.prompt.md`
for usage, and `styles.css` for the full token/utility surface before styling.

## Idiomatic example
```tsx
<section className="bg-dark text-white px-8 py-20">
  <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent mb-3">
    Selected Work
  </p>
  <h2 className="font-primary text-6xl md:text-8xl uppercase leading-none mb-10">
    Recent Projects
  </h2>
  <ProjectCard id="frost-core" data={project} onClick={open} isFeatured
    className="w-full aspect-video" />
</section>
```
