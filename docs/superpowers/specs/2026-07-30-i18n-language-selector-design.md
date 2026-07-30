# Design Spec: Multi-Language Support (Russian & English)

## Overview
Add seamless, instant client-side multi-language support (English and Russian) to the portfolio website using React Context and `localStorage` persistence. A custom language switcher UI will be embedded in `MainNavbar` with hover effects matching the site's design aesthetic.

## Architecture

### 1. Language Context (`src/app/context/LanguageContext.tsx`)
- Provides a `LanguageContext` to all client components.
- State `lang`: `'en' | 'ru'` (defaults to `'en'`).
- Persists selected language to `localStorage` under key `portfolio_lang`.
- Provides `lang`, `setLang`, and helper function/dictionary getters for translations.

### 2. Translations Dictionary (`src/app/i18n/translations.ts`)
Comprehensive translation keys organized by component/page domain:
- **Navbar**: links (`WORK`, `TOOLS`, `ABOUT`, `REEL`), toggle labels (`EN`, `RU`).
- **Home Page**: section headers (`Selected Works`, `Personal Sketches`, `Explorations`), actions (`VIEW ARCHIVE`), lightbox controls (`ESC — close`).
- **About Page**: bio texts, stack titles (`Main Stack`, `Currently Expanding Into`), buttons (`DROP ME A LINE`, `DOWNLOAD RESUME (COMING SOON)`).
- **Tools Page**: Asset Browser headline/descriptions, status indicators, motivation points (`Scattered Files`, `Inconsistent Metadata`, `Repeated DCC Setup`), target pipeline labels, current build levels, design targets, build log stages, CTA banner.
- **Work Page**: archive index titles, column headers (`INDEX`, `PROJECT TITLE`, `CATEGORY / FORMAT`, `BUILDING STACK`, `YEAR`), floating preview metadata.
- **Projects Data (`src/app/data/projects.ts`)**: localized category titles and descriptions for all featured projects (`frost-core`, `rampage-rally`, `stanley-bottle`, `the-visit`).
- **Footer**: title, tagline (`CG ARTIST & 3D GENERALIST`), quote (`LET'S BUILD SOMETHING COOL TOGETHER...`), contact links, time indicator.

### 3. Navigation Switcher (`src/app/MainNavbar.tsx`)
- Adds a magnetic `EN | RU` toggle button to the top navbar next to navigation links.
- Uses `#FF5F1F` accent styling for the active language state.

## Verification Plan
- Verify language switching updates all text across `/`, `/about`, `/tools`, `/work`, and case study overlays immediately without page reloads.
- Verify persistence of language selection in `localStorage` across page reloads and route transitions.
