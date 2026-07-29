# Tools & Asset Browser Showcase Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a brand-aligned `/tools` page showcasing LSRSP software R&D projects, starring the multi-DCC Asset Browser, complete with an interactive app UI mockup, problem vs. solution breakdown, feature specs, and roadmap.

**Architecture:** Create `AssetBrowserMockup.tsx` component and `src/app/tools/page.tsx`, and add `TOOLS` link to `MainNavbar.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide/Inline SVG icons.

---

### Task 1: Update `MainNavbar.tsx` Navigation

**Files:**
- Modify: `src/app/MainNavbar.tsx`

**Interfaces:**
- Consumes: Navbar links list.
- Produces: Navbar with `TOOLS` navigation link.

- [ ] **Step 1: Update `src/app/MainNavbar.tsx` to include `TOOLS` link**

In `src/app/MainNavbar.tsx`, add the `TOOLS` link before `WORK`:
```tsx
<Magnetic>
  <Link href="/tools" className={linkBase}>TOOLS</Link>
</Magnetic>
<Magnetic>
  <a href="/#work" className={linkBase}>WORK</a>
</Magnetic>
```

- [ ] **Step 2: Commit `src/app/MainNavbar.tsx`**
```bash
git add src/app/MainNavbar.tsx
git commit -m "feat: add TOOLS link to MainNavbar"
```

---

### Task 2: Create `AssetBrowserMockup.tsx` Component

**Files:**
- Create: `src/app/tools/AssetBrowserMockup.tsx`

**Interfaces:**
- Consumes: User click state for active software filter (`ALL`, `BLENDER`, `CINEMA 4D`, `HOUDINI`, `UNREAL`).
- Produces: Interactive dark-mode desktop software interface mockup simulating the Asset Browser app.

- [ ] **Step 1: Create `src/app/tools/AssetBrowserMockup.tsx`**

Create `src/app/tools/AssetBrowserMockup.tsx` with search bar, filter tags, category sidebar, asset grid cards, format badges, and interactive export simulation.

- [ ] **Step 2: Commit `AssetBrowserMockup.tsx`**
```bash
git add src/app/tools/AssetBrowserMockup.tsx
git commit -m "feat: add AssetBrowserMockup interactive UI component"
```

---

### Task 3: Create `/tools` Page (`src/app/tools/page.tsx`)

**Files:**
- Create: `src/app/tools/page.tsx`

**Interfaces:**
- Consumes: `MainNavbar`, `Footer`, `ScrollToTop`, `ViewCursor`, `AssetBrowserMockup`.
- Produces: Complete `/tools` page.

- [ ] **Step 1: Create `src/app/tools/page.tsx`**

Include:
- Hero Section (`[ PIPELINE & SOFTWARE R&D ]`, `ASSET BROWSER`, `[ STATUS: RESEARCH & DEVELOPMENT ]`).
- Interactive App Mockup (`<AssetBrowserMockup />`).
- Problem vs. Solution Bento Grid.
- Technical Feature Specs Grid (Local-First, Universal Manifest, Direct DCC Bridges, AI Visual Search, License & Credit Tracker).
- Development Roadmap Timeline (Phases 01 to 04).
- CTA & Contact footer banner.

- [ ] **Step 2: Run `npm run build` to verify clean compilation**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit `src/app/tools/page.tsx`**
```bash
git add src/app/tools/page.tsx
git commit -m "feat: add /tools showcase page for Asset Browser"
```
