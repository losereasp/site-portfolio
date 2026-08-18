# LSRSP Portfolio — Design System

## Identity

| Field | Value |
|---|---|
| Brand / handle | **LSRSP** |
| Full name | Iaroslav Marchenkov |
| Role | CG Artist & 3D Motion Designer |
| Location | Da Nang |
| Tagline | "Trying to procrastinate less and do more 3D." |

---

## Colors

Defined in `globals.css` via `@theme inline`. Use as Tailwind utilities: `bg-accent`, `text-fg`, `border-border`, etc.

| Token (CSS var) | Tailwind class | Hex | Usage |
|---|---|---|---|
| `--color-bg` | `bg-bg` | `#F0F0EE` | Main light surface — all sections, overlay modal |
| `--color-surface` | `bg-surface` | `#FFFFFF` | Asset cells in breakdown grid, storyboard container |
| `--color-fg` | `text-fg` | `#111111` | Primary text on light backgrounds |
| `--color-dark` | `bg-dark` | `#000000` | Hero, before/after, navbar scrolled state |
| `--color-accent` | `text-accent`, `bg-accent`, `border-accent` | `#FF5F1F` | Brand orange |
| `--color-border` | — | `rgba(17,17,17,0.1)` | Hairline dividers; use `border-black/10` in Tailwind |
| `--color-muted` | — | `rgba(17,17,17,0.6)` | Secondary text; use `text-black/60` in Tailwind |

### Accent budget rule
One accent (`#FF5F1F`), maximum **twice per visible screen** — typically eyebrow label + CTA or one hover state.

### Selection highlight (set on every page root element)
```
selection:bg-accent selection:text-white
```

---

## Typography

### Fonts

| Class | Source | Font | Weights | Usage |
|---|---|---|---|---|
| `font-primary` | `globals.css @theme` | Impact, Arial Black, Arial Bold | intrinsic | All headings, nav, marquee, card titles — always uppercase |
| `font-mono` | Google Fonts → `--font-jetbrains-mono` | JetBrains Mono | 300, 400 | Labels, eyebrows, captions, metadata, body-level mono |
| `font-sans` | system | -apple-system, system-ui | — | Body copy (sparingly — tech stack tags, About bio) |

> `font-serif` / Playfair Display is loaded but unused. Reserved for a potential editorial/longform page.

### Type scale

| Role | Tailwind classes | Notes |
|---|---|---|
| Hero H1 | `font-primary text-[13vw] lg:text-[10vw] uppercase leading-[0.95]` | Full-bleed hero only |
| Marquee / section header | `font-primary text-5xl md:text-8xl uppercase font-black` | ScrollMarquee |
| Overlay / case study title | `font-primary text-4xl md:text-6xl lg:text-[7vw] uppercase leading-[0.9]` | ProjectOverlay hero |
| Description thematic H2 | `font-primary text-5xl md:text-8xl uppercase leading-[0.9]` | Inside overlay description block |
| Featured card title | `font-primary text-4xl md:text-7xl uppercase leading-none` | Bento featured slot |
| Small card title | `font-primary text-3xl md:text-5xl uppercase leading-none` | Secondary bento cards |
| Section label | `font-mono text-xl md:text-3xl uppercase font-black tracking-tight` | "Style Frames", "Asset Breakdown" section headers |
| About H1 | `font-primary text-5xl lg:text-[5vw] uppercase leading-[1.2] font-bold` | About page name |
| Body / description | `font-mono text-sm md:text-base leading-relaxed` | Project descriptions in overlay |
| Eyebrow | `font-mono text-[10px] tracking-[0.35em] uppercase` | Category, "Case Study", "01 — Featured" |
| Caption / HUD | `font-mono text-[9px] md:text-[10px] tracking-widest uppercase` | Asset labels, video overlay |
| Nav | `font-primary text-2xl md:text-4xl tracking-tight uppercase` | Navigation links |
| Footer name | `font-primary leading-[0.85] text-[15vw] lg:text-[6.5vw] uppercase` | Footer display name |

### Typography rules
- `font-primary` is **always** `uppercase` — never sentence case
- Mono is for metadata/labels, never for display headlines
- Display tracking: `tracking-normal` (0) or `tracking-tight` — never wide
- Mono tracking: `tracking-[0.35em]` to `tracking-widest` — always wide

---

## Spacing & Layout

### Standard page padding
```
px-8 md:px-16
```

### Bento grid (home page, work section)
```
Side padding:  px-[18px]
Gap:           gap-[2px]           ← hairline seam, deliberate — not whitespace
Featured card: w-full h-[60vh] md:h-[80vh]
Secondary row: flex-[6] / flex-[4] split
               height: clamp(400px, 70vh, 800px)
```

### Overlay padding
```
px-6 md:px-12   (tighter than page layout)
```

### Section vertical rhythm
| Context | Classes |
|---|---|
| Major description sections | `py-24 md:py-40` |
| Video / showcase block | `py-12 md:py-20` |
| Closing blocks | `pb-16 md:pb-24` |

### Max widths
| Context | Value |
|---|---|
| Storyboard / video / bento | `max-w-[1700px] mx-auto` |
| About page layout | `max-w-[1400px] mx-auto` |
| Description text | `max-w-lg`, `max-w-2xl`, `max-w-3xl` |
| Overlay modal | `max-w-[1800px]` |

---

## Borders & Radius

| Context | Value |
|---|---|
| Project cards | `rounded-sm` |
| Overlay modal | `rounded-sm` |
| Tech stack tags (About) | `rounded-[3px]` |
| Software pills | `rounded-full` |
| Asset breakdown grid | Sharp — `border border-black overflow-hidden` |
| Storyboard container | `rounded-sm border border-black/10` |
| Expanding stack tags (dashed) | `border border-black/20 border-dashed rounded-[3px]` |

### Border weights
```
Hairline dividers:           border-black/10 (1px)
Section dividers (as line):  h-[2px] bg-black/10
Nav bottom on scroll:        border-b-[3px] border-accent
CTA button:                  border-2 border-accent
Footer links:                border-b-[3px] border-accent
```

---

## Interactive Patterns

### Custom cursor system
- `<ViewCursor />` — global, makes entire page `cursor-none`
- `data-view-cursor` on project cards → renders "VIEW" label
- `data-normal-cursor` on text/links inside hero → restores default OS cursor

### Magnetic
- `<Magnetic>` wraps interactive elements for a subtle pull effect
- Use on: nav links, back buttons, software tags, CTA buttons

### Hover video (project cards)
```
Base:   <img> always visible
Hover:  <video muted loop playsInline> fades over the image
Trigger: onMouseEnter → .play(), onMouseLeave → .pause()
Fade:   opacity-0 group-hover:opacity-100 duration-500
Image scale: group-hover:scale-105 duration-1000
```

### Overlay open / close (GSAP)
```
Open:
  backdrop  opacity-0 → 1,  duration 0.5s, power2.out
  panel     translateY(100%) → 0, duration 0.8s, expo.out, delay 0.1s
Close:
  panel     translateY(100%), duration 0.6s, expo.in
  backdrop  opacity 0, duration 0.4s, power2.in
```

### FLIP layout animation (asset breakdown grid)
```
Trigger: click on an asset cell to expand
Engine:  gsap records DOMRect before state update → animates from delta after
Ease:    expo.out, duration 0.9s
```

---

## Components

### Navbar
```tsx
// Transparent → solid on scroll (threshold: 35% of viewport height)
// Props: lightMode (boolean) — for About page, text starts dark

Fixed top, z-[100], px-8 md:px-16
Default (unscrolled): bg-transparent, py-8, border-transparent
Scrolled:             bg-dark, py-4, border-b-[3px] border-accent, shadow
Brand logo: font-primary text-[#FF5F1F] "LSRSP"
Nav links:  font-primary text-[#FF5F1F], underline on hover, underline-offset-8
```

### Project card
```
Outer:   rounded-sm overflow-hidden cursor-none group
Image:   object-cover, group-hover:scale-105 duration-1000
Video:   absolute inset-0, opacity-0 group-hover:opacity-100 duration-500

Static label (fades on hover):
  bottom-left, eyebrow + title, group-hover:opacity-0

Hover content (gradient + info):
  bg-gradient-to-t from-black/90 via-black/40 to-transparent
  eyebrow (text-accent) + title + description + software pills
  translate-y-4 group-hover:translate-y-0 duration-500
```

### Software pills (dark context — overlay description)
```
font-mono text-[10px] tracking-widest uppercase
px-4 py-2 bg-black text-white
hover:bg-accent transition-colors
Wrap with <Magnetic>
```

### Software pills (card hover context)
```
font-mono text-[10px] tracking-widest uppercase
px-3 py-1 border border-white/30 text-white/70 rounded-full
```

### Section header (Breakdown / StyleFrames)
```tsx
<div className="flex items-center gap-6">
  <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight">{label}</h2>
  <div className="flex-1 h-[2px] bg-black/10" />
</div>
```

### CTA button (primary)
```
px-8 py-4 border-2 border-accent bg-accent text-fg
hover: bg-transparent text-accent
font-mono font-bold uppercase
Wrap with <Magnetic>
```

### ScrollMarquee
```
Scroll-linked horizontal marquee
speed=2   → Selected Works
speed=1.5 → Personal Sketches / Explorations

Content: font-primary text-5xl md:text-8xl uppercase font-black text-[#111111]
Dots:    w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full
```

### Video player HUD (cinematic showcase)
```
Top-right "REC":  w-2 h-2 bg-accent animate-pulse (playing) | bg-white/40 (paused)
                  font-mono text-[10px] text-white tracking-[0.3em] uppercase
Bottom-left info: font-mono text-[8px] text-white/40 italic (meta)
                  font-primary text-xl md:text-3xl text-white uppercase (title)
Volume group:     bg-black/20 backdrop-blur-sm rounded-full, reveals slider on hover/vol:hover
```

---

## Animations (CSS globals)

| Class | Description |
|---|---|
| `animate-scan` | Orange hairline scans top→bottom over video assets (3s linear infinite, `#FF5F1F` with glow) |
| `animate-lightbox` | Fade + scale 0.96→1 for fullscreen lightbox (0.25s, cubic-bezier 0.215,0.61,0.355,1) |
| `animate-bounce` | Tailwind default — scroll hint arrow in hero |

### Transition defaults
| Type | Duration | Ease |
|---|---|---|
| Standard hover | `duration-500` | `ease-out` |
| Slow image zoom | `duration-700` to `duration-1000` | `ease-out` |
| Fast utility | `duration-300` | `ease-out` |
| Exit | match enter | `ease-in` |
| GSAP enter | 0.8–0.9s | `expo.out` |
| GSAP exit | 0.4–0.6s | `expo.in` / `power2.in` |

---

## Page Structure

### `/` — Home
```
<MainNavbar />
<HeroSection />                  fullscreen video bg, title, socials, scroll hint
<ScrollMarquee "Selected Works" speed=2 />
<BentoGrid px-[18px] gap-[2px]>
  frost-core     100% w, 80vh         isFeatured
  stanley-bottle flex-6   +  mech-drone flex-4    clamp(400px, 70vh, 800px)
</BentoGrid>
— [DO NOT render empty sketch grid until real content exists] —
<Spacer h-[120px] md:h-[160px] />
<Footer />
<ProjectOverlay />               z-[100] portal
```

### `/about`
```
<MainNavbar lightMode />
<section max-w-[1400px] px-8 md:px-16 pt-32 lg:pt-48>
  Left 45%:  Portrait (grayscale → color on hover, aspect-[4/5])
  Right 55%: H1 + bio + stack grid (solid border = main / dashed = learning) + CTA + socials
</section>
```

### ProjectOverlay — case study section order
```
1. Hero screen      dark fullscreen (heroImage, title overlay, close button)
2. Description      light, 7+4 grid (thematicHeader or category, software tags, description)
2.2 Storyboard      conditional (storyboardImage)
2.5 Showcase video  conditional (hoverVideo) — full controls HUD
3. Before/After     conditional (beforeImage + afterImage) — dark section
3.5 Style Frames    conditional (styleframes[]) — 1/2/3 col grid, click → lightbox
4. Asset Breakdown  always — expandable FLIP bento, optional 3D viewer (modelPath)
```

---

## Extension Notes

- **Upgrading `font-primary`:** Impact is a system fallback. A direct upgrade path: Bebas Neue, Barlow Condensed 900, or Dharma Gothic C. Class name stays `font-primary` — swap only the `@theme` value in `globals.css`.
- **Adding a new project:** add entry to `src/app/data/projects.ts` and add a `<ProjectCard>` to the bento in `src/app/page.tsx`.
- **Adding a new case study section to the overlay:** add a `{project.field && (<section>…</section>)}` block in `src/app/ProjectOverlay.tsx` following the existing section order.
- **Color changes:** update `--color-accent` in `globals.css :root` and `@theme inline` — single source of truth.
