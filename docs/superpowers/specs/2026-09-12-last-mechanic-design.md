# Design Spec: The Last Mechanic (Pwnisher Challenge) Portfolio Integration

- **Date:** 2026-09-12
- **Topic:** Add "The Last Mechanic" 3D CGI / Real-time project to the portfolio
- **Author:** Antigravity & losereasp

---

## 1. Overview & Objective

Integrate the newly completed 3D cinematic project **«The Last Mechanic»** (created for the Pwnisher Community Challenge #13 "Gauntlet of Gods") into the portfolio website.

The integration spans:
1. Setting "The Last Mechanic" as the primary **Featured** project on the homepage Bento Grid.
2. Including it as index `01` (`2026`) in the full project archive at `/work`.
3. Populating its complete interactive case study in `ProjectOverlay.tsx` (hero showcase video with sound, breakdown video, interactive Graybox vs Beauty LookDev slider, and production assets grid).
4. Generating optimized, web-ready media assets (1080p faststart MP4s, 2K WebP stills) from the master 4K renders and project workspace.

---

## 2. Project Metadata & Copy

### 2.1 Technical Specs
- **ID:** `last-mechanic`
- **Title:** `THE LAST MECHANIC`
- **Category (EN):** `CHALLENGE`
- **Category (RU):** `ЧЕЛЛЕНДЖ`
- **Thematic Header (EN):** `Gauntlet of Gods`
- **Thematic Header (RU):** `Gauntlet of Gods`
- **Software Stack:**
  - `Unreal Engine`
  - `Blender`
  - `Substance Painter`
  - `Cascadeur`
  - `After Effects`

### 2.2 Descriptions
- **Russian (`descriptionRu`):**
  «Проект для челленджа Pwnisher «Gauntlet of Gods». История опытного механика, который возвращает к жизни безнадёжный мотоцикл: один точный удар кулаком — и мёртвый мотор оживает. Собрано в Unreal Engine 5 в стилистике приземлённого комиксного реализма (grounded comic realism).»

- **English (`descriptionEn`):**
  «Entry for the Pwnisher "Gauntlet of Gods" challenge. An experienced mechanic revives a seemingly dead motorcycle: tightening the final component, a confident thump of the fist, and the engine comes alive. Crafted in Unreal Engine 5 in a grounded comic realism aesthetic.»

---

## 3. Media Pipeline & Asset Preparation

Source paths:
- Master video with audio: `A:\UnrealProjects\LastMechanic\_OUT\RENDER.mp4`
- Master breakdown video: `A:\UnrealProjects\LastMechanic\_OUT\breakdown\RENDER.mp4`
- Master 4K Beauty sequence: `A:\UnrealProjects\LastMechanic\_OUT\seq2\LS_LastMechanic_Blockout.0080.png`
- Master 4K Graybox sequence: `A:\UnrealProjects\LastMechanic\_OUT\breakdown\01_graybox\LS_LastMechanic_Blockout.0080.png`
- Master 4K Lighting sequence: `A:\UnrealProjects\LastMechanic\_OUT\breakdown\03_lighting\LS_LastMechanic_Blockout.0080.png`
- Concept / Blueprint: `D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\salvage-sign-blueprint.jpg`
- Apron / Wardrobe Concept: `D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\concept_mechanic_apron.jpg`

Output target files in `public/`:
1. `last_mechanic_hero.webp`: Frame 80 beauty render, converted to 2K WebP (quality 90).
2. `last_mechanic_showcase.mp4`: Downscaled to 1080×1920, H.264 CRF 20, AAC audio, `+faststart`.
3. `last_mechanic_hover.mp4`: 1080×1920 H.264 muted loop optimized for hover playback on cards.
4. `last_mechanic_breakdown.mp4`: Downscaled to 1080×1920, H.264 CRF 21, AAC audio, `+faststart`.
5. `last_mechanic_graybox.webp`: Frame 80 graybox pass, 2K WebP for the Before slider.
6. `last_mechanic_after.webp`: Frame 80 beauty render, 2K WebP for the After slider.
7. `last_mechanic_salvage.webp`: Converted from salvage blueprint.
8. `last_mechanic_lighting.webp`: Frame 80 lighting-only pass, 2K WebP.
9. `last_mechanic_concept.webp`: Converted from mechanic apron concept.

---

## 4. UI Architecture & Components

### 4.1 Homepage Layout (`src/app/page.tsx`)
Reorganize Bento Grid with 4 projects:
- **Block 1 (Row 1):** `<ProjectCard id="last-mechanic" isFeatured className="w-full h-[60vh] md:h-[80vh]" />`
- **Block 2 & 3 (Row 2):** Split 60/40 container:
  - `<ProjectCard id="frost-core" className="flex-[6] h-full" />`
  - `<ProjectCard id="rampage-rally" className="flex-[4] h-full" />`
- **Block 3 (Row 3):** Full-width panoramic container:
  - `<ProjectCard id="the-visit" className="w-full h-[50vh] md:h-[65vh]" />`
- **Block 4:** Existing magnetic link to `/work` archive.

### 4.2 Projects Data Dictionary (`src/app/data/projects.ts`)
Add key `"last-mechanic"` with all metadata, assets array, hero/hover/slider paths, and local breakdown video path.

### 4.3 Archive Page (`src/app/work/page.tsx`)
1. Update `ALL_IDS`:
   `["last-mechanic", "frost-core", "the-visit", "rampage-rally", "stanley-bottle"]`
2. Update `PROJECT_METADATA`:
   - `"last-mechanic"`: `{ index: "01", year: "2026" }`
   - `"frost-core"`: `{ index: "02", year: "2026" }`
   - `"the-visit"`: `{ index: "03", year: "2026" }`
   - `"rampage-rally"`: `{ index: "04", year: "2025" }`
   - `"stanley-bottle"`: `{ index: "05", year: "2024" }`

### 4.4 Project Modal Overlay (`src/app/ProjectOverlay.tsx`)
1. Update `PROJECT_ORDER`:
   `["last-mechanic", "frost-core", "rampage-rally", "the-visit", "stanley-bottle"]`
2. Update `PROJECT_TITLES`:
   Add `"last-mechanic": "THE LAST MECHANIC"`
3. Update `getIndex()` helper to match `"mechanic"` -> `"last-mechanic"`.
4. Ensure local video breakdown rendering:
   Add support for `project.breakdownVideo` so that when present, a dedicated high-fidelity video player section is rendered with full controls (matching or complementing the YouTube player for projects that have local MP4 breakdowns).
5. Ensure Before/After slider handles `last-mechanic`'s Graybox ↔ Beauty comparison.
6. Ensure lightbox / asset preview handles all process assets cleanly.

---

## 5. Testing & Verification

1. **Asset integrity:** Verify all 9 generated media files in `public/` are valid, load without 404, and maintain fast loading times.
2. **Homepage Bento layout:**
   - Verify Block 1 renders full-width hero with hover video on mouseenter.
   - Verify Block 2 & 3 render 60/40 split.
   - Verify Block 3 renders The Visit smoothly.
3. **Modal Overlay:**
   - Click "The Last Mechanic" on homepage and `/work`.
   - Test PREV / NEXT keyboard navigation (ArrowLeft, ArrowRight) and on-screen pills.
   - Test video playback, play/pause (Space), mute/unmute (KeyM, slider).
   - Test Before/After slider dragging and responsiveness.
   - Test asset zoom / lightbox.
4. **Localization:** Switch between RU and EN to ensure headers, categories, and descriptions update correctly.
5. **Build & Typecheck:** Run `npm run build` to guarantee zero TypeScript or Next.js build errors.
