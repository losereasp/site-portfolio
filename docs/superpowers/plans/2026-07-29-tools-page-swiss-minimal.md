# Tools Page Swiss Architectural Minimal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/tools` with clean Swiss architectural minimalism (`#F0F0EE` cream canvas, `#111111` / `#FFFFFF` bento cells, zero neon glows, disciplined `#FF5F1F` accent budget).

**Architecture:** Update `src/app/tools/page.tsx` with clean cream posture, `<MainNavbar lightMode />`, smooth scroll tabs, and working Telegram/Email links.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4.

---

### Task 1: Rebuild `src/app/tools/page.tsx`

**Files:**
- Modify: `src/app/tools/page.tsx`

**Interfaces:**
- Consumes: `MainNavbar`, `Footer`, `ScrollToTop`, `ViewCursor`, `AssetBrowserMockup`.
- Produces: Clean Swiss architectural `/tools` page.

- [ ] **Step 1: Rebuild `src/app/tools/page.tsx` with cream canvas, sharp bento grid, clean tabs, and working contact CTA**

Rewrite `src/app/tools/page.tsx`:
- Canvas `#F0F0EE` (cream background).
- Navbar `<MainNavbar lightMode />`.
- Clean Hero section without neon shadows.
- Mockup frame wrapped in clean desktop container with `border border-black/20 shadow-xl`.
- Sticky Tab bar (`01 // PROBLEM VS SOLUTION`, `02 // TECHNICAL ARCHITECTURE`, `03 // ROADMAP`) with active tab state and smooth scroll.
- Bento Grid: Problem Card (`#111111` matte black), Solution Card (`#FFFFFF` pure white).
- Core Architecture: Clean white cards (`#FFFFFF border border-black/15`).
- Roadmap: Clean grid cards (`PHASE 01` to `PHASE 04`) without dates.
- CTA Banner: Matte black `#111111` container with working Telegram (`https://t.me/losereasp`) and Email (`mailto:yarik.marchenkov@yandex.ru`) buttons.

- [ ] **Step 2: Run `npm run build` to verify clean compilation with 0 errors**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit `src/app/tools/page.tsx`**
```bash
git add src/app/tools/page.tsx
git commit -m "feat: rebuild /tools page with clean Swiss architectural minimalism"
```
