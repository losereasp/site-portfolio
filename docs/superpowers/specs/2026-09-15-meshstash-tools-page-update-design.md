# Design Specification: Meshstash 0.1 Actualization on `/tools` Page

**Date:** 2026-09-15  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved by User  

---

## 1. Overview & Context

Updates the portfolio's dedicated `/tools` page to authentically reflect the real state and engineering milestones of the flagship 3D pipeline software project located in `D:\Projects\Software\asset-browser`.

Key project updates from the underlying codebase:
1. **Rebranded to Meshstash:** Formally transitioned from "Asset Browser" to **Meshstash** (`0.1.0` locally verified baseline, target milestone Daily Driver).
2. **Catalog Query V2 & Scale Proven:** Local SQLite catalog with WAL mode, FTS5 full-text search, tag persistence, content-hash duplicate detection, and 100,000 asset scale proof (42/42 performance & latency gates green).
3. **Multi-tier Preview Engine:** Sidecar extraction, embedded thumbnails, Blender/F3D fallback tiers, 512 MiB LRU cache, and interactive Quick Look featuring an orbitable three.js 3D viewer for `.glb`/`.gltf`.
4. **Broad Format Coverage:** 12 3D/pipeline formats (.blend, .fbx, .obj, .usd/.usda/.usdc/.usdz, .gltf/.glb, .3mf, .max, .skp, .3dm, .stl, .c4d).
5. **DCC Awareness:** Live host discovery for Blender, Cinema 4D, and F3D with version detection.
6. **Active Daily Driver Gates:** Work in progress on 500k scale memory tuning, UI library lifecycle/batch tagging, and clean-Windows package acceptance.

---

## 2. Information Architecture & Section Breakdown

### A. Hero Section & Engineering Terminal Shell (Product Frame)
* **Eyebrow:** `[ THE LAB / PIPELINE R&D // VERIFIED BASELINE 0.1.0 ]`
* **Status Pill:** `[ BASELINE 0.1.0 // DAILY DRIVER GATES ]` with pulsing warm amber indicator (`#f0a85a`).
* **Title:** `MESHSTASH` (uppercase display font, retaining Swiss architectural aesthetic).
* **Subtitle:**
  * EN: *"One local-first 3D asset catalog for Windows. Your files stay exactly where they are."*
  * RU: *"Локальный каталогизатор 3D-ассетов под Windows. Файлы остаются ровно там, где лежат."*
* **Description:**
  * EN: *"A private desktop tool built to index 3D assets in place, generate instant previews, and search the whole library with sub-second queries. Built for a personal pipeline first; thin DCC connectors to follow."*
  * RU: *"Приватный десктопный инструмент: индексирует 3D-ассеты прямо на диске, мгновенно генерирует превью и ищет по всей библиотеке за доли секунды. Создаётся для личного пайплайна; впереди — коннекторы к софту."*
* **Metadata Block:**
  * Role: `PRODUCT / DESIGN / DEV`
  * Stack: `ELECTRON 43 / REACT 19 / TS / SQLITE WAL / THREE.JS`
  * Mode: `LOCAL-FIRST (ZERO CLOUD / ZERO TELEMETRY)`
  * Platform: `WINDOWS 11 X64`

* **Desktop Shell Representation (Terminal Frame):**
  * Top Calibration Bar: `MS | SHELL_CALIBRATION` | `WIN / X64`
  * Shell Title: `MESHSTASH DESKTOP SHELL 0.1.0`
  * Operational State: `● VERIFIED LOCAL PIPELINE (OFFLINE)`
  * Engine Telemetry Grid (2x2 grid):
    1. `CATALOG ENGINE`: `ONLINE // 100K BENCHMARK PASSED`
    2. `PREVIEW ENGINE`: `ONLINE // 3D QUICK LOOK (LRU 512MB)`
    3. `FORMAT COVERAGE`: `12 TYPES (.BLEND, .FBX, .USD, .GLTF...)`
    4. `DCC AWARENESS`: `ACTIVE // BLENDER, C4D, F3D DETECTED`
  * Constraint Footer: `LOCAL-FIRST` | `WINDOWS X64 ONLY` | `ZERO TELEMETRY`
  * Caption:
    * Title: `CURRENT BUILD: MESHSTASH-WIN32-X64-0.1.0.ZIP`
    * Subtitle: `Catalog Query V2 with 100k benchmark verified (42/42 gates green). Daily Driver clean-Windows acceptance and 500k memory gates in progress.`

### B. Marquee Transition Line
* Continuous stream: `LOCAL-FIRST ✦ WINDOWS X64 ✦ OWN YOUR FILES ✦ 100K SCALE PROVEN ✦ 12 FORMATS ✦ THREE.JS QUICK LOOK ✦ SQLITE FTS5 ✦ ACTIVE BUILD`

### C. Why I'm Building It & Pipeline Flow Diagram
* **Core Pains (Narrative):**
  1. `SCATTERED FILES`: Assets spread across local folders, external drives, and closed vendor libraries.
  2. `INCONSISTENT METADATA`: Previews, polycounts, materials, dimensions, and tags get lost or stored arbitrarily.
  3. `REPEATED DCC SETUP`: Moving an asset between DCCs requires rebuilding materials, relinking textures, and fixing axes.
* **Target Pipeline Flow Diagram:**
  * Status Badge: `LOCAL HUB & INDEXING: IMPLEMENTED // DCC CONNECTORS: IN PROGRESS`
  * Source: `SCATTERED FOLDERS + VENDOR LIBRARIES`
  * ➔ `INDEX IN PLACE`: Recursive scanner & chokidar filesystem watcher (symlink-safe).
  * `HUB`: `MESHSTASH LOCAL CATALOG` (SQLite FTS5, 12 formats, thumbnail cache, 3D Quick Look).
  * ⬇ `TARGET DCCS`: `BLENDER / CINEMA 4D / HOUDINI / UNREAL ENGINE` (host discovery active, loopback connectors in development).

### D. Transparent State (Current Build: Levels 01–03)
* **Level 01: IMPLEMENTED IN REPO (`MERGED & VERIFIED`)**
  * Hardened Windows x64 packaging (`Meshstash-win32-x64-0.1.0.zip`) with Electron fuses & strict CSP.
  * Local SQLite catalog with WAL mode, automated migrations, and legacy profile import.
  * Incremental catalog engine with recursive scan and chokidar filesystem watching (symlink/junction-safe).
  * Unified Catalog Query V2 with sub-second FTS5 search, type filters, and bounded pagination.
  * Content-hash duplicate asset detection, tag persistence, and saved searches.
  * Multi-tier preview engine: sidecars, embedded thumbnails, Blender/F3D fallbacks, and 512 MiB LRU cache.
  * Interactive Quick Look with three.js 3D OrbitViewer for `.glb`/`.gltf`.
  * Asset metadata extraction (triangles, meshes, materials, dimensions).
  * DCC environment awareness: detects Blender, Cinema 4D, and F3D installations and versions.
  * 100k scale benchmark verified (42/42 performance and latency gates green).

* **Level 02: ACTIVE GATES (`IN PROGRESS`)**
  * 500k scale query memory tuning (reducing peak RSS delta under 64 MiB; latency already passing).
  * User-facing library lifecycle management (add, edit, remove, recover roots).
  * Editable tags UI and batch tagging workflows across multiple assets.
  * Hardened preview subprocess isolation, cancellation, and hung-process timeouts.
  * Clean-Windows exact-package acceptance and multi-hour Daily Driver endurance run.
  * First thin DCC connector prototype (authenticated loopback protocol).

* **Level 03: FUTURE DIRECTION (`PLANNED`)**
  * Deep DCC integrations: 1-click import into Blender, Cinema 4D, Houdini Solaris, and Unreal Engine.
  * Material and texture dependency graph reconstruction.
  * Portable metadata export and sidecar synchronization.
  * Visual similarity search (after core workflow proves useful).

### E. Design Targets (Architectural Principles 01–03)
* **01 — LOCAL-FIRST & ZERO CLOUD:** Index existing folders without moving or modifying original files. Everything stays on local drives: zero runtime network calls, zero telemetry.
* **02 — PORTABLE METADATA & PREVIEWS:** Extract geometry specs (tris, meshes, materials, dimensions) and multi-tier previews while keeping asset descriptors lightweight and clean.
* **03 — THIN DCC CONNECTORS:** Lightweight authenticated loopback connectors communicating with host DCCs instead of bulky, fragile vendor plugins.

### F. Build Log (Timeline)
5-stage verified staging timeline (`lg:grid-cols-5`):
1. **STAGE 01 — DESKTOP FOUNDATION** `[ COMPLETED ]`: Electron shell, repository tooling, and security baseline.
2. **STAGE 02 — PACKAGING + LOCAL DATA** `[ COMPLETED ]`: Hardened Windows x64 packaging & SQLite native binding.
3. **STAGE 03 — WALKING SKELETON** `[ COMPLETED ]`: Directory picker, recursive scan, SQLite persistence, React virtual grid.
4. **STAGE 04 — PREVIEWS & 100K BENCHMARK** `[ COMPLETED ]`: Multi-tier preview engine, 3D OrbitViewer, FTS5 search, 100k scale benchmark verified.
5. **STAGE 05 — DAILY DRIVER & DCC GATES** `[ IN PROGRESS ]`: 500k scale memory tuning, UI library/tag management, clean-Windows acceptance, thin DCC connector.

### G. Feedback CTA & Contact
* Tone: Direct peer dialogue with 3D generalists, TD artists, and motion designers.
* Actions:
  * `[ TELEGRAM CONTACT → ]` (`https://t.me/losereasp`)
  * `[ EMAIL INQUIRY → ]` (`mailto:iaroslav@losereasp.com`)

---

## 3. Technical Implementation Plan

1. **`src/app/i18n/translations.ts`**:
   - Update `translations.en.tools` and `translations.ru.tools` with complete updated datasets.
   - Expand `stages` array from 4 items to 5 items with accurate titles, descriptions, and statuses.
   - Update `level1Items`, `level2Items`, `level3Items` lists.
   - Update `Product Frame` telemetry fields (`catalogEngine`, `previewEngine`, `formatCoverage`, `dccAwareness`).
2. **`src/app/tools/page.tsx`**:
   - Update Hero Product Frame telemetry grid to 4 cells (2x2).
   - Update Build Log grid to `lg:grid-cols-5` to accommodate 5 stages smoothly on desktop.
   - Update badges and static copy references.
3. **Build & Typecheck**:
   - Run `npm run build` or `npx next build` to guarantee 0 compile or type errors.

---

## 4. Verification & Testing

- Verify page renders cleanly on both English and Russian locale toggles.
- Verify responsive layout across mobile, tablet, and wide desktop screens.
- Verify zero TypeScript or Next.js build errors.
