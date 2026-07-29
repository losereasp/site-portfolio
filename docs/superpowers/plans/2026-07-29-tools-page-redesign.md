# Tools Page Dark Pipeline Lab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/tools` into a cohesive, dark blueprint terminal experience (`#080808` background, `#FF5F1F` orange nodes, high-contrast engineering cards, interactive tab switching, working contact CTA).

**Architecture:** Update `src/app/tools/page.tsx` with unified dark theme, CSS grid background, dynamic tab panel views, and dark pipeline styling.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4.

---

### Task 1: Redesign `src/app/tools/page.tsx`

**Files:**
- Modify: `src/app/tools/page.tsx`

**Interfaces:**
- Consumes: `MainNavbar`, `Footer`, `ScrollToTop`, `ViewCursor`, `AssetBrowserMockup`.
- Produces: Complete dark pipeline lab `/tools` page.

- [ ] **Step 1: Update `src/app/tools/page.tsx` with dark theme, grid background, tab panel switching, and refined CTA console**

Update `src/app/tools/page.tsx`:
- Background `#080808` with subtle grid background pattern.
- Navbar `MainNavbar` without `lightMode` (renders clean white text for dark mode).
- Hero with glowing display heading, monospace status pill.
- Tab bar switching active views (`overview`, `specs`, `roadmap`).
- Problem vs Solution bento grid with crimson vs orange glows.
- Core Architecture data sheets with `#FF5F1F` hairline borders.
- Roadmap timeline without dates.
- Terminal CTA console with working Telegram and Email links.

- [ ] **Step 2: Run `npm run build` to verify clean compilation with 0 errors**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit `src/app/tools/page.tsx`**
```bash
git add src/app/tools/page.tsx
git commit -m "feat: redesign /tools page as dark pipeline lab terminal"
```
