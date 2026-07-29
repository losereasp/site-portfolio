# Design Specification: Swiss Architectural Minimal Redesign for `/tools` Page

**Date:** 2026-07-29  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Vision & Aesthetic Direction

Restores the clean, high-end Swiss architectural visual posture of the LSRSP brand (`brand-spec.md`). Eliminates all neon glows, RGB drop-shadows, and background grid noise. Uses a clean cream canvas (`#F0F0EE`), crisp black-and-white structural bento cells (`#111111` / `#FFFFFF`), strict hairline dividers (`border-black/15`), mono JetBrains typography, and disciplined accent budget for `#FF5F1F`.

---

## 2. Token & Palette Architecture

- **Canvas Background:** Cream `#F0F0EE` (consistent across main site and `/about`).
- **Dark Surface:** Pure `#111111` (hero moments, problem card, CTA console).
- **Light Surface:** Pure `#FFFFFF` (solution card, architecture spec cards, mockup frame).
- **Hairline Dividers:** `border-black/10` and `border-black/15`.
- **Accent Color:** `#FF5F1F` (used strictly for status dot and primary action button).
- **Zero Drop-Shadow Noise:** No blur-3xl colored blobs, no neon glows.

---

## 3. Component & Layout Breakdown

### A. Main Navigation & Hero
- `<MainNavbar lightMode />` rendering crisp dark typography on cream background.
- Eyebrow label: `[ PIPELINE & SOFTWARE R&D ]` in monospace with `#FF5F1F` accent dot.
- Display Title: `ASSET BROWSER` in sharp uppercase Impact/sans.
- Status Pill: `[ STATUS: RESEARCH & DEVELOPMENT ]` in sharp white/cream pill (`border border-black/20 bg-white/80`).

### B. Desktop Software Mockup (`AssetBrowserMockup.tsx`)
- Encapsulated in a clean desktop frame with sharp corners (`rounded-sm border border-black/20 bg-black shadow-xl`).

### C. Sticky Navigation Tabs
- Clean minimal bar: `01 // PROBLEM VS SOLUTION`, `02 // TECHNICAL ARCHITECTURE`, `03 // ROADMAP`.
- Active state: `bg-[#111111] text-white border-[#111111]`.
- Inactive state: `bg-white/60 text-black/70 border-black/15 hover:border-black`.

### D. Bento Grid: Problem vs Solution
- **Problem Card:** Matte `#111111` surface, white text, red mono label `[ 01 // THE PAIN POINT ]` (no neon glow).
- **Solution Card:** Pure `#FFFFFF` surface, black text, hairline `border border-black/20`, orange mono label `[ 02 // THE SOLUTION ]`.

### E. Core Architecture Specs
- Clean white grid cards (`bg-white border border-black/15 p-8 hover:border-[#FF5F1F] transition-colors`).

### F. Roadmap Timeline
- Clean grid cards with status pills `[ COMPLETED ]`, `[ IN PROGRESS ]`, `[ UPCOMING ]`, `[ PLANNED ]` (no hardcoded target dates).

### G. Redesigned Terminal CTA Banner
- Sharp matte black container (`bg-[#111111] border border-black p-8 md:p-14 text-white`).
- Action buttons:
  - `[ TELEGRAM CONTACT → ]` (`https://t.me/losereasp`): `bg-[#FF5F1F] text-white hover:bg-white hover:text-black transition-all`.
  - `[ EMAIL INQUIRY → ]` (`mailto:yarik.marchenkov@yandex.ru`): `border border-white/30 text-white hover:bg-white hover:text-black transition-all`.

---

## 4. Verification Plan

1. Verify `/tools` matches the clean visual posture of `/about` and `#work`.
2. Test smooth scrolling and active tab state switching.
3. Test Telegram and Email CTA links.
4. Run `npm run build` to verify 0 errors.
