# Design Spec: Echoes of Kalyazin Portfolio Integration

- **Date:** 2026-10-26
- **Topic:** Add "Echoes of Kalyazin" 3D CGI / Post-Apocalyptic Environment Project to the Portfolio
- **Author:** Antigravity & Iaroslav Marchenkov (@losereasp)

---

## 1. Overview & Objective

Integrate the newly completed 3D environment and digital matte painting project **«Echoes of Kalyazin»** into the portfolio website.

The integration covers:
1. Setting "Echoes of Kalyazin" as the primary **Featured** project on the homepage Bento Grid.
2. Promoting it to index `01` (`2026`) in the full project archive at `/work`.
3. Populating its complete interactive case study in `ProjectOverlay.tsx`:
   - Interactive 16:9 **Before/After slider** comparing the Clay Viewport Shading with the Final Nuke Composite.
   - Comprehensive **Breakdown Assets grid** with technical nodes (Houdini Solaris USD graph, Nuke compositing tree), Raw Beauty pass, 3D blocking, and real-life photo reference.
4. Generating optimized, web-ready media assets (WebP format, quality 90) from raw source files and workspace screenshots.

---

## 2. Project Metadata & Bilingual Copy

### 2.1 Technical Specs
- **ID:** `echoes-of-kalyazin`
- **Title:** `ECHOES OF KALYAZIN`
- **Category (EN):** `ENVIRONMENT ART`
- **Category (RU):** `3D ОКРУЖЕНИЕ`
- **Software Stack:**
  - `Houdini`
  - `Solaris / Karma`
  - `Blender`
  - `Nuke`

### 2.2 Descriptions
- **Russian (`descriptionRu`):**
  «Постапокалиптическая сцена в заброшенной деревне: одинокий путник на разбитой колее среди полуразрушенных изб и заросшей старинной колокольни. На горизонте возвышается колоссальная чаша радиотелескопа РТ-64, улавливающая сигналы мертвого эфира. Блокинг, сборка сцены и скаттеринг выполнены в Houdini Solaris (USD / Karma), Blender использовался как вспомогательный софт, финальный композ и атмосфера собраны в Nuke.»

- **English (`descriptionEn`):**
  «A post-apocalyptic scene set in an abandoned village: a lone wanderer walking down a muddy road between decaying izbas and an overgrown stone bell tower. On the horizon looms the colossal dish of the RT-64 radio telescope, listening to dead frequencies. Blocked, assembled, and scattered in Houdini Solaris (USD / Karma), with Blender used as auxiliary software, and final atmosphere and compositing in Nuke.»

---

## 3. Media Pipeline & Asset Preparation

### 3.1 Source File Mapping
1. **Hero Final Render:**
   - Source: `D:\Projects\_Creative\HoudiniProjects\2026\CG_KUNG_FU\~OUT\Iaroslav_Marchenkov_v01.jpg`
   - Target: `public/kalyazin_hero.webp`
2. **Clay Viewport Pass (Before Slider):**
   - Source: `C:\Users\Yarik\Desktop\Screenshot_1.png`
   - Target: `public/kalyazin_clay.webp`
3. **Final Composite Pass (After Slider):**
   - Source: `D:\Projects\_Creative\HoudiniProjects\2026\CG_KUNG_FU\~OUT\Iaroslav_Marchenkov_v01.jpg`
   - Target: `public/kalyazin_final.webp`
4. **Raw Beauty Pass (USD Render without background plate):**
   - Source: `C:\Users\Yarik\Desktop\Screenshot_2.png`
   - Target: `public/kalyazin_beauty.webp`
5. **3D Blocking & Scale Composition:**
   - Source: `C:\Users\Yarik\Desktop\Blocking_v003.jpg`
   - Target: `public/kalyazin_blocking.webp`
6. **Houdini Solaris USD Node Graph:**
   - Source: `C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03.jpg`
   - Target: `public/kalyazin_houdini_graph.webp`
7. **Nuke Compositing Tree:**
   - Source: `C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03 (2).jpg`
   - Target: `public/kalyazin_nuke_graph.webp`
8. **Real Reference Photo (Kalyazin Bell Tower & RT-64):**
   - Source: `C:\Users\Yarik\Desktop\5a587e908d26a01367751cb88e48bf15.jpg`
   - Target: `public/kalyazin_reference.webp`

---

## 4. UI Architecture & Components

### 4.1 Homepage Layout (`src/app/page.tsx`)
Reorganize the Bento Grid into a balanced 5-project rhythm:
- **Block 1 (Row 1):** Full-width Featured Card
  - `<ProjectCard id="echoes-of-kalyazin" data={PROJECTS_DATA["echoes-of-kalyazin"]} onClick={openProject} className="w-full h-[60vh] md:h-[80vh]" isFeatured />`
- **Block 2 & 3 (Row 2):** Split 60/40 container
  - `<ProjectCard id="last-mechanic" data={PROJECTS_DATA["last-mechanic"]} onClick={openProject} className="flex-[6] h-full" />`
  - `<ProjectCard id="frost-core" data={PROJECTS_DATA["frost-core"]} onClick={openProject} className="flex-[4] h-full" />`
- **Block 4 & 5 (Row 3):** Split 40/60 container
  - `<ProjectCard id="rampage-rally" data={PROJECTS_DATA["rampage-rally"]} onClick={openProject} className="flex-[4] h-full" />`
  - `<ProjectCard id="the-visit" data={PROJECTS_DATA["the-visit"]} onClick={openProject} className="flex-[6] h-full" />`
- **Block 6:** Magnetic link to `/work` archive.

### 4.2 Projects Data Dictionary (`src/app/data/projects.ts`)
Add key `"echoes-of-kalyazin"` containing:
- `title`, `category`, `categoryEn`, `categoryRu`
- `thematicHeader`, `thematicHeaderEn`, `thematicHeaderRu`
- `description`, `descriptionEn`, `descriptionRu`
- `software`: `["Houdini", "Solaris / Karma", "Blender", "Nuke"]`
- `heroImage`: `"/kalyazin_hero.webp"`
- `beforeImage`: `"/kalyazin_clay.webp"`
- `afterImage`: `"/kalyazin_final.webp"`
- `assets`:
  - `"/kalyazin_beauty.webp"`
  - `"/kalyazin_blocking.webp"`
  - `"/kalyazin_houdini_graph.webp"`
  - `"/kalyazin_nuke_graph.webp"`
  - `"/kalyazin_reference.webp"`

### 4.3 Full Archive Page (`src/app/work/page.tsx`)
1. Update `ALL_IDS`:
   `["echoes-of-kalyazin", "last-mechanic", "frost-core", "the-visit", "rampage-rally", "stanley-bottle"]`
2. Update `PROJECT_METADATA`:
   - `"echoes-of-kalyazin"`: `{ index: "01", year: "2026" }`
   - `"last-mechanic"`: `{ index: "02", year: "2026" }`
   - `"frost-core"`: `{ index: "03", year: "2026" }`
   - `"the-visit"`: `{ index: "04", year: "2026" }`
   - `"rampage-rally"`: `{ index: "05", year: "2025" }`
   - `"stanley-bottle"`: `{ index: "06", year: "2024" }`

### 4.4 Project Modal Overlay (`src/app/ProjectOverlay.tsx`)
1. Update `PROJECT_ORDER`:
   `["echoes-of-kalyazin", "last-mechanic", "frost-core", "rampage-rally", "the-visit", "stanley-bottle"]`
2. Update `PROJECT_TITLES`:
   `"echoes-of-kalyazin": "ECHOES OF KALYAZIN"`
3. Update `getIndex()` helper:
   `if (titleLower.includes("kalyazin")) return PROJECT_ORDER.indexOf("echoes-of-kalyazin");`
4. Aspect ratio for `BeforeAfterSlider`:
   `aspect-video` for 16:9 (`echoes-of-kalyazin`).
5. Asset captions in technical breakdown:
   - `kalyazin_beauty`:
     - RU: `Solaris & Karma — Raw Beauty Pass (USD Render)`
     - EN: `Solaris & Karma — Raw Beauty Pass (USD Render)`
   - `kalyazin_blocking`:
     - RU: `Houdini — 3D блокинг, композиция и масштаб`
     - EN: `Houdini — 3D Blocking & Scale Composition`
   - `kalyazin_houdini_graph`:
     - RU: `Houdini Solaris — USD Scene Graph & Scatter LOPs`
     - EN: `Houdini Solaris — USD Scene Graph & Scatter LOPs`
   - `kalyazin_nuke_graph`:
     - RU: `Nuke — Нодовый граф композа и грейдинга`
     - EN: `Nuke — Node-based Compositing Tree & Color Grade`
   - `kalyazin_reference`:
     - RU: `Реальный референс — Калязинская колокольня и радиотелескоп РТ-64`
     - EN: `Real Reference — Kalyazin Bell Tower & RT-64 Radio Telescope`

---

## 5. Verification Plan

1. Verify asset conversions in `public/` (all images exist, dimensions valid, WebP compression clean).
2. Run Next.js build check: `npm run build` or `npx next build`.
3. Verify visual layout in browser:
   - Featured card renders properly on the home page.
   - Secondary grid blocks (60/40 and 40/60) align properly on both desktop and mobile viewports.
   - Archive `/work` lists all 6 projects with correct sequential indices (01 to 06).
   - Modal overlay opens, Before/After slider slides smoothly across 16:9 frame, all 5 breakdown cards open in lightbox without errors, Next/Prev navigation loops through all 6 projects.
