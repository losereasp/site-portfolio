# Design Specification: Dark Pipeline Lab Redesign for `/tools` Page

**Date:** 2026-07-29  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Vision & Aesthetic Direction

Reshapes the `/tools` page into a high-tech, cinematic 3D Pipeline & Software R&D Terminal. Replaces generic light-and-dark blocks with a unified dark blueprint theme (`#080808` / `#0A0A0A`), subtle grid lines, glowing orange accent nodes (`#FF5F1F`), monospace engineering data sheets, and interactive state transitions.

---

## 2. Token & Palette Architecture

- **Canvas Background:** Deep dark `#080808` with a subtle 32px CSS grid pattern overlay.
- **Card Surfaces:** `#111111` with `#FF5F1F`/15% borders and `#FF5F1F`/40% on hover.
- **Primary Text:** `#F0F0EE` (cream white).
- **Secondary Text:** `#A0A0A0` (mono gray).
- **Accent Color:** `#FF5F1F` (LSRSP brand orange).
- **Alert/Problem Color:** `#FF3344` (crimson red).

---

## 3. Section Breakdown

### A. Dark Hero Section
- **Tag:** `[ SOFTWARE & PIPELINE R&D ]` in monospace `#FF5F1F`.
- **Title:** `ASSET BROWSER` in display uppercase with glowing orange drop-shadow effect.
- **Subtitle:** `"One personal library. Every DCC. Zero clutter."`
- **Status Pill:** `[ STATUS: RESEARCH & DEVELOPMENT ]` with pulsing orange node.

### B. Software Showcase Mockup (`AssetBrowserMockup.tsx`)
- Containerized inside a dark terminal frame (`border border-[#FF5F1F]/40 shadow-[0_0_50px_rgba(255,95,31,0.15)]`).

### C. Tab Controls & State Switching
- Monospace tab bar: `[ 01 // PROBLEM VS SOLUTION ]`, `[ 02 // TECHNICAL ARCHITECTURE ]`, `[ 03 // ROADMAP ]`.
- Toggling tabs switches active view panel smoothly while maintaining scroll position or smoothly anchoring to content.

### D. Bento Grid: Problem vs Solution
- **Problem Card (Crimson Glow):** Dark `#0D0606` surface, red accent line, breakdown of legacy tool flaws.
- **Solution Card (Orange Glow):** Dark `#0E0A06` surface, `#FF5F1F` accent line, local-first universal manifest breakdown.

### E. Technical Blueprint Data Sheets
- 5 dark engineering spec cards with data metrics (`150K FILES/SEC`, `OPENUSD`, `WEBSOCKET IPC`, `CLIP EMBEDDINGS`, `CREDIT EXPORT`).

### F. Roadmap Timeline
- Clean 4-phase milestone cards without hardcoded dates: `PHASE 01 // RESEARCH`, `PHASE 02 // MVP`, `PHASE 03 // CLOSED BETA`, `PHASE 04 // COMMERCIAL RELEASE`.

### G. Redesigned Terminal CTA Banner
- Terminal console frame `[ R&D BETA TEST & PIPELINE COLLABORATION ]`.
- Functional links:
  - `[ TELEGRAM CONTACT → ]` (`https://t.me/losereasp`).
  - `[ EMAIL INQUIRY → ]` (`mailto:yarik.marchenkov@yandex.ru`).

---

## 4. Verification Plan

1. Verify dark blueprint theme renders smoothly without layout bugs.
2. Test interactive tab switching between Problem/Solution, Architecture, and Roadmap panels.
3. Test Telegram and Email CTA links.
4. Run `npm run build` to verify 0 errors.
