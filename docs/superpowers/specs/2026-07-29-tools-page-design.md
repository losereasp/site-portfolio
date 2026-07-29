# Design Specification: Tools & Asset Browser Showcase Page (`/tools`)

**Date:** 2026-07-29  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Overview

Creates a brand-aligned dedicated page at `/tools` showcasing custom software and pipeline tools created by LSRSP, starting with the flagship **Asset Browser** — a personal multi-DCC 3D asset manager currently in research & development (R&D).

The page highlights the problem with existing tools (Cargo, Quixel Bridge), introduces the local-first architecture for personal asset indexing, presents an interactive dark-mode desktop app UI mockup, and details core features and the development roadmap.

---

## 2. Navigation & Routing

- **Route:** `src/app/tools/page.tsx`
- **Navigation:** Update `src/app/MainNavbar.tsx` to add `TOOLS` link pointing to `/tools` between `WORK` and `ABOUT`.

---

## 3. Page Structure & Components

### A. Hero Section
- **Tag:** `[ PIPELINE & SOFTWARE R&D ]` in monospace with `#FF5F1F` accent dot.
- **Heading:** `ASSET BROWSER` in display uppercase.
- **Subtitle:** `"One personal library. Every DCC. Zero clutter."`
- **Status Indicator:** `[ STATUS: RESEARCH & DEVELOPMENT ]` with pulsing orange dot indicator.

### B. Interactive Desktop App Mockup (`AssetBrowserMockup.tsx`)
- Simulated dark-mode desktop software interface:
  - Header search bar with software filter tags (`ALL`, `BLENDER`, `CINEMA 4D`, `HOUDINI`, `UNREAL ENGINE`).
  - Left navigation sidebar: `3D Models`, `PBR Materials`, `Textures`, `HDRI Haven`, `Assemblies`.
  - Main Asset Grid: Interactive cards featuring 3D model thumbnails, format badges (`.usd`, `.blend`, `.c4d`, `.fbx`), polygon/vertex counts, and `[ 1-CLICK IMPORT ]` CTA.
  - Interactive tab/filter state demonstrating asset filtering by software target.

### C. Problem vs. Solution Bento Grid
- **Problem Card:** Scattered folders, vendor lock-in (Cargo/Bridge restricted to proprietary catalogs), missing texture paths, manual asset import pain.
- **Solution Card:** Local-first indexing without file displacement, universal asset manifests, scale/pivot pre-checks, 1-click DCC export.

### D. Key Technical Specifications Grid
1. **Local-First Indexing:** Indexes existing drives and NAS in place.
2. **Universal Asset Manifest:** Standardized USD / FBX / glTF metadata descriptor across DCCs.
3. **Direct DCC Bridges:** Seamless connectors for Blender, Cinema 4D, Houdini Solaris, and Unreal Engine.
4. **AI Visual Search:** Similarity matching and automatic category auto-tagging.
5. **License & Credit Tracker:** Automatically tracks licenses and generates project attribution credits.

### E. Development Roadmap Timeline
- **Phase 01:** Research & Core Architecture Spec (Current).
- **Phase 02:** Local Desktop MVP & Blender/C4D Bridge.
- **Phase 03:** Closed Beta for 3D Generalists.
- **Phase 04:** Commercial / Public Release.

---

## 4. Verification Plan

1. Verify route `/tools` renders cleanly without layout shift.
2. Test navbar link `TOOLS` navigation across light and scrolled states.
3. Verify interactive software filter buttons work on the desktop mockup component.
4. Run `npm run build` to ensure 0 TypeScript / compilation errors.
