# Meshstash 0.1 Tools Page Actualization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualize the `/tools` page on the portfolio site to reflect the real state of Meshstash 0.1 (rebranding, 100k benchmark, three.js Quick Look, 12 formats, 512MB LRU cache, and 5-stage build log) in both English and Russian.

**Architecture:** Update the internationalization dictionary (`src/app/i18n/translations.ts`) with authentic technical data from `asset-browser`, update `src/app/tools/page.tsx` Hero Product Frame to display a 2x2 engine telemetry grid (Catalog, Preview, Formats, DCC awareness) and expand the Build Log grid to 5 verified stages (`lg:grid-cols-5`).

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS.

## Global Constraints
- Strictly preserve Next.js App Router and React conventions.
- Maintain existing Swiss minimal layout and palette (`#0A0D11`, `#101419`, `#F0F0EE`, `#111111`, `#FF5F1F`, JetBrains mono typography).
- Zero build or typecheck errors (`pnpm check` / `npm run build`).
- Full bilingual parity across English and Russian locales.

---

### Task 1: Update Internationalization Dictionary (`translations.ts`)

**Files:**
- Modify: `src/app/i18n/translations.ts:30-150` (EN `tools` dictionary)
- Modify: `src/app/i18n/translations.ts:210-330` (RU `tools` dictionary)

**Interfaces:**
- Consumes: Existing `translations` object structure in `src/app/i18n/translations.ts`.
- Produces: Updated `t.tools` properties:
  - `tagline`: `"[ THE LAB / PIPELINE R&D // VERIFIED BASELINE 0.1.0 ]"`
  - `currentShell`: `"[ BASELINE 0.1.0 // DAILY DRIVER GATES ]"`
  - `title`: `"MESHSTASH"`
  - `subTitle`: updated subtitle
  - `desc`: updated description
  - `previewEngine`, `previewEngineValue`: new engine telemetry key
  - `formatCoverage`, `formatCoverageValue`: new format coverage key
  - `catalogEngineValue`, `dccBridgeValue`: dynamic status values
  - `level1Items` (10 items), `level2Items` (6 items), `level3Items` (4 items)
  - `stages` (5 items: Desktop Foundation, Packaging + Local Data, Walking Skeleton, Previews & 100k Benchmark, Daily Driver & DCC Gates)

- [ ] **Step 1: Update English `tools` dictionary in `translations.ts`**
  Add `previewEngine`, `previewEngineValue`, `formatCoverage`, `formatCoverageValue`, update `catalogEngineValue`, `dccBridgeValue`, `level1Items`, `level2Items`, `level3Items`, `stages`, and narrative titles/descriptions.

- [ ] **Step 2: Update Russian `tools` dictionary in `translations.ts`**
  Add parallel Russian translations for all new and updated fields with authentic technical terminology.

- [ ] **Step 3: Run TypeScript typecheck to verify interface consistency**
  Run: `pnpm typecheck` or `npm run build`
  Expected: Success, type definitions are satisfied.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/i18n/translations.ts
  git commit -m "feat(tools): update i18n translations with meshstash 0.1 telemetry and stages"
  ```

---

### Task 2: Update `/tools/page.tsx` Product Frame & Build Log Grid

**Files:**
- Modify: `src/app/tools/page.tsx:80-145` (Product Frame in Hero)
- Modify: `src/app/tools/page.tsx:215-255` (Target Pipeline flow badge)
- Modify: `src/app/tools/page.tsx:435-498` (Build Log 5-stage grid)

**Interfaces:**
- Consumes: Updated `t.tools` schema from `Task 1`.
- Produces: Enhanced Hero Product Frame with 2x2 telemetry grid (`CATALOG ENGINE`, `PREVIEW ENGINE`, `FORMAT COVERAGE`, `DCC AWARENESS`) and 5-stage responsive Build Log (`grid-cols-1 md:grid-cols-2 lg:grid-cols-5`).

- [ ] **Step 1: Update Hero Product Frame in `src/app/tools/page.tsx`**
  - Update top bar calibration text to `MS | SHELL_CALIBRATION`.
  - Expand engine telemetry block from 2 columns to a 4-tile grid (2x2) rendering:
    1. `t.tools.catalogEngine` + `t.tools.catalogEngineValue`
    2. `t.tools.previewEngine` + `t.tools.previewEngineValue`
    3. `t.tools.formatCoverage` + `t.tools.formatCoverageValue`
    4. `t.tools.dccBridge` + `t.tools.dccBridgeValue`
  - Ensure footer constraints display `t.tools.modeValue`, `t.tools.platformValue`, and `t.tools.noCloud`.

- [ ] **Step 2: Update Target Pipeline Flow badge**
  - Use `t.tools.notImplementedTag` which now reads `LOCAL HUB & INDEXING: IMPLEMENTED // DCC CONNECTORS: IN PROGRESS`.

- [ ] **Step 3: Update Build Log grid in `src/app/tools/page.tsx`**
  - Update grid classes: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10`.
  - Ensure horizontal line and connector dots smoothly align across 5 stages on desktop.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/tools/page.tsx
  git commit -m "feat(tools): update product frame telemetry and 5-stage build log"
  ```

---

### Task 3: Build & Verification

**Files:**
- Verify: `src/app/tools/page.tsx`
- Verify: `src/app/i18n/translations.ts`

- [ ] **Step 1: Run production build**
  Run: `npm run build`
  Expected: Clean build with 0 warnings, 0 type errors, successfully generating `/tools`.

- [ ] **Step 2: Verify desktop & mobile layout and language toggles**
  Verify English and Russian texts render properly without overflow, truncation, or layout shift.

- [ ] **Step 3: Commit and summarize in walkthrough**
  ```bash
  git status
  ```
