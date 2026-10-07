# Design Spec: Pill Toggle Language Switcher

## Overview
Replace the existing text-only `[ EN | RU ]` language button in `MainNavbar` with a tactile pill toggle switch matching the reference design and the portfolio site's visual identity:
`[ RU ]  ( O )  [ EN ]`
The control features a capsule track, a sliding orange accent thumb (`#FF5F1F`), and clean monospace typography adapting automatically to both dark and light navbar states.

## Component Layout & Geometry

### 1. Structure
- Container: Flex row with `items-center gap-2` (or `gap-2.5`), wrapped within `<Magnetic>` for tactile cursor interaction.
- Order:
  1. `RU` label on the left.
  2. Pill-shaped toggle switch in the center.
  3. `EN` label on the right.

### 2. Labels (`RU` and `EN`)
- Typography: `font-mono text-xs md:text-sm tracking-wider uppercase select-none transition-colors duration-300`.
- Active state:
  - Dark mode (`!isLight`): `text-white font-bold opacity-100`
  - Light mode (`isLight`): `text-black font-bold opacity-100`
- Inactive state:
  - Dark mode (`!isLight`): `text-white/40 font-normal hover:text-white/80`
  - Light mode (`isLight`): `text-black/40 font-normal hover:text-black/80`
- Direct click:
  - Clicking `RU` sets language to Russian (`setLang("ru")`).
  - Clicking `EN` sets language to English (`setLang("en")`).

### 3. Switch Capsule Track
- Geometry: `w-8 h-4` (32px wide by 16px high) with `rounded-full`.
- Border & Background:
  - Dark mode: `border border-white/40 bg-black/60 hover:border-white/80`
  - Light mode: `border border-black/40 bg-black/5 hover:border-black/80`
- Padding: `p-0.5` inside the track for smooth thumb clearance.

### 4. Switch Thumb (Knob)
- Geometry: `w-3 h-3` (12px circular disk), `rounded-full`.
- Color: Brand accent `#FF5F1F` (`bg-[#FF5F1F]`), with slight glow shadow on hover (`shadow-[0_0_8px_rgba(255,95,31,0.5)]`).
- Animation & Alignment:
  - Smooth transform transition: `transition-transform duration-300 ease-out`.
  - When `lang === "ru"`: Thumb is positioned at the left (`translate-x-0`).
  - When `lang === "en"`: Thumb is translated to the right (`translate-x-4`).

## Accessibility & Semantics
- Keyboard and screen reader friendly:
  - Root toggle element has `role="switch"`, `aria-checked={lang === "en"}`, `aria-label="Switch language between Russian and English"`.
  - Pressing `Space` or `Enter` toggles language.

## Theme & Page State Compatibility
- Transparent & Scrolled navbars:
  - On the home page (`/`) and tools page (`/tools`): dark styling by default; switches to solid black with `#FF5F1F` bottom border on scroll.
  - On `/about` and `/work`: `lightMode` is enabled before scrolling (`isLight = lightMode && !scrolled`). The switcher dynamically applies dark typography and borders while in `isLight`, then transitions smoothly to dark styling once scrolled.

## Verification Plan
1. Visual inspection:
   - Check switcher appearance on dark navbar (home `/`, `/tools`).
   - Check switcher appearance on light navbar before scroll (`/about`, `/work`).
   - Check switcher appearance after scroll on all pages.
2. Interaction test:
   - Verify clicking toggle slider moves orange knob left (`RU`) and right (`EN`).
   - Verify clicking `RU` switches language to Russian.
   - Verify clicking `EN` switches language to English.
   - Verify active/inactive label opacities and weights update instantly.
   - Verify site content updates immediately in both languages without full reload.
   - Verify language selection persists in `localStorage` across page reloads.
