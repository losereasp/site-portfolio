# LSRSP — Brand Specification

**Brand / handle:** LSRSP  
**Full name:** Iaroslav Marchenkov  
**Role:** CG Artist & 3D Generalist  
**Location:** Da Nang  
**Tagline:** "Trying to procrastinate less and do more 3D."

---

## Color Tokens

```css
:root {
  --bg:      oklch(95% 0.004 95);    /* #F0F0EE — cream, all light surfaces */
  --surface: oklch(100% 0 0);        /* #FFFFFF — cards, grid cells, containers */
  --fg:      oklch(14% 0.008 0);     /* #111111 — primary text on light */
  --muted:   oklch(14% 0.008 0 / 60%); /* #111111 @60% — secondary text */
  --border:  oklch(14% 0.008 0 / 10%); /* #111111 @10% — hairline dividers */
  --accent:  oklch(64% 0.22 38);     /* #FF5F1F — brand orange, single accent */
  --dark:    oklch(0% 0 0);          /* #000000 — hero sections, before/after, nav scrolled */
}
```

### Accent budget
One accent (`--accent`), maximum **twice per visible screen** — eyebrow label + CTA, or one hover state. Never flood backgrounds with orange.

### Dark mode
Not in use. The brand is light-first: cream canvas (`--bg`) for content surfaces, pure black (`--dark`) only for cinematic / hero moments.

---

## Typography

```css
:root {
  --font-display: Impact, "Arial Black", "Arial Bold", sans-serif;
  --font-body:    var(--font-jetbrains-mono), ui-monospace, "JetBrains Mono", monospace;
  --font-mono:    var(--font-jetbrains-mono), ui-monospace, "JetBrains Mono", monospace;
}
```

### Rules
- **Display (`--font-display`):** Always `UPPERCASE`. Used for all titles, headings, nav, marquees. Tracking is `normal` (0) or `tight` — never wide on display. Sizes go large: `clamp(3rem, 10vw, 12rem)` for hero, down to `3xl` for card titles.
- **Mono (`--font-mono`):** Used for ALL body text, captions, labels, eyebrows, metadata. Never for display headlines. Tracking is always wide on mono: `0.35em` to `0.5em` on labels/eyebrows.
- **Serif:** Loaded (Playfair Display) but unused — reserved for editorial/longform context only.
- Sentence case is never used with `--font-display`. If it's a heading, it's uppercase.

### Upgrade path for `--font-display`
Impact is a system fallback. Direct upgrade options (same character): **Bebas Neue**, **Barlow Condensed 900**, **Dharma Gothic C**. Swap only the CSS value — class name stays the same everywhere.

---

## Posture Rules

1. **Cream canvas, black moments.** Background is always `--bg` (#F0F0EE) for content. Switch to pure black (`--dark`) only for hero screens, video players, before/after sliders — cinematic contrast, not decoration.

2. **Hairline grid, no whitespace gaps.** Bento grids and asset breakdowns use `gap-[2px]` — visible seams, not whitespace. The grid itself becomes a design element.

3. **Zero border-radius on structural elements.** Cards: `rounded-sm` (2px). Buttons: sharp. Grid: `overflow-hidden` with `border border-black`. Only software pills in cards use `rounded-full`.

4. **No shadows except modals.** Depth comes from color and stacking, not drop-shadows. Overlay modal uses `shadow-[0_0_100px_rgba(0,0,0,0.5)]` — the one exception.

5. **One accent, used twice.** `#FF5F1F` appears as: eyebrow / category label (text-accent) + CTA or hover state. Never as a background fill on large areas. Nav logo is always `text-accent`.

6. **Motion is expo.** All GSAP transitions use `expo.out` (enter) and `expo.in` / `power2.in` (exit). CSS hover transitions: `duration-500`. Image zoom: `duration-700` to `duration-1000`. Nothing faster than `duration-300`.

7. **Mono for everything below headline.** Body text, descriptions, labels, captions — all monospace. JetBrains Mono, weight 300–400. This is intentional: it reads like a technical sheet, reinforces the CG/generalist identity.

---

## Voice & Tone

- **Terse, specific, not precious.** Label copy is direct: "CLAY RENDER", "LIGHT LAYER COMPOSITION", "Case Study" — never flowery or generic.
- **Numbers and specs are good.** "Full HD Output", "Showcasing // Live" — technical metadata visible in the UI signals craft.
- **No lorem ipsum, no filler.** If a slot is empty, it doesn't render. Every visible word is either real copy or a clearly labeled stub.

---

## Key Brand Moments

| Moment | Treatment |
|---|---|
| Nav logo | `LSRSP` in `--accent`, always top-left, `font-display` |
| Hero heading | Full-bleed, `font-display`, cream or white, `clamp(3rem, 10vw, 12rem)` |
| Category eyebrow | `font-mono`, `text-accent`, `tracking-[0.4em]`, all-caps |
| Software tags (dark ctx) | `bg-dark text-white`, mono, hover → `bg-accent` |
| Render Comparison header | Light section (`--bg`), mono `font-black`, hairline divider to the right |
| Before/After handle | `w-12 h-12 bg-accent` square with three vertical hairlines, glows on drag |
| Video HUD "REC" dot | `bg-accent animate-pulse` when playing, `bg-white/40` when paused |
| Selection highlight | `selection:bg-accent selection:text-white` — set globally |
| Footer name | `font-display`, huge (15vw → 6.5vw), the last brand statement |

---

## CSS Custom Properties (ready to paste)

```css
/* LSRSP brand — paste into :root of any project */
:root {
  --lsrsp-bg:      oklch(95% 0.004 95);
  --lsrsp-surface: oklch(100% 0 0);
  --lsrsp-fg:      oklch(14% 0.008 0);
  --lsrsp-muted:   oklch(14% 0.008 0 / 60%);
  --lsrsp-border:  oklch(14% 0.008 0 / 10%);
  --lsrsp-accent:  oklch(64% 0.22 38);
  --lsrsp-dark:    oklch(0% 0 0);

  --lsrsp-font-display: Impact, "Arial Black", "Arial Bold", sans-serif;
  --lsrsp-font-mono:    "JetBrains Mono", ui-monospace, Menlo, monospace;
}
```

---

## Source files (portfolio implementation)
- Tokens: `src/app/globals.css` — `:root` + `@theme inline`  
- Full dev reference: `DESIGN.md`  
- Project data: `src/app/data/projects.ts`  
- Case study overlay: `src/app/ProjectOverlay.tsx`
