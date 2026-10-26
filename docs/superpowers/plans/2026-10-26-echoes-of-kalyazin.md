# Echoes of Kalyazin Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the new 3D post-apocalyptic environment project "Echoes of Kalyazin" to the portfolio as the top Featured project on the homepage, index `01` in `/work`, and with a rich case study in `ProjectOverlay`.

**Architecture:** Convert raw source images and screenshots to high-efficiency WebP files in `public/`. Integrate the project entry in `src/app/data/projects.ts`. Refactor the homepage Bento Grid in `src/app/page.tsx` into a rhythm of Featured 100% -> 60/40 Split -> 40/60 Split. Update the `/work` archive table and configure `ProjectOverlay.tsx` with Before/After slider and technical breakdown labels.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP, Python Pillow / FFmpeg.

## Global Constraints

- **Project ID:** `echoes-of-kalyazin`
- **Title:** `ECHOES OF KALYAZIN`
- **Category (EN):** `ENVIRONMENT ART & POST-APOCALYPSE`
- **Category (RU):** `ENVIRONMENT ART И ПОСТАПОКАЛИПСИС`
- **Thematic Header (EN):** `Abandoned Horizon // Kalyazin`
- **Thematic Header (RU):** `Заброшенный горизонт // Калязин`
- **Software Stack:** `["Houdini", "Solaris / Karma", "Blender", "Nuke"]`
- No placeholder strings ("TBD", "TODO"). All code must be complete and exact.

---

### Task 1: Media Pipeline & Asset Conversion to WebP

**Files:**
- Source 1: `D:\Projects\_Creative\HoudiniProjects\2026\CG_KUNG_FU\~OUT\Iaroslav_Marchenkov_v01.jpg`
- Source 2: `C:\Users\Yarik\Desktop\Screenshot_1.png`
- Source 3: `C:\Users\Yarik\Desktop\Screenshot_2.png`
- Source 4: `C:\Users\Yarik\Desktop\Blocking_v003.jpg`
- Source 5: `C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03.jpg`
- Source 6: `C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03 (2).jpg`
- Source 7: `C:\Users\Yarik\Desktop\5a587e908d26a01367751cb88e48bf15.jpg`
- Output:
  - `public/kalyazin_hero.webp`
  - `public/kalyazin_clay.webp`
  - `public/kalyazin_final.webp`
  - `public/kalyazin_beauty.webp`
  - `public/kalyazin_blocking.webp`
  - `public/kalyazin_houdini_graph.webp`
  - `public/kalyazin_nuke_graph.webp`
  - `public/kalyazin_reference.webp`

- [ ] **Step 1: Run Python conversion script to generate WebP assets**

```python
import os
from PIL import Image

assets = [
    (r"D:\Projects\_Creative\HoudiniProjects\2026\CG_KUNG_FU\~OUT\Iaroslav_Marchenkov_v01.jpg", "public/kalyazin_hero.webp", 92),
    (r"C:\Users\Yarik\Desktop\Screenshot_1.png", "public/kalyazin_clay.webp", 90),
    (r"D:\Projects\_Creative\HoudiniProjects\2026\CG_KUNG_FU\~OUT\Iaroslav_Marchenkov_v01.jpg", "public/kalyazin_final.webp", 92),
    (r"C:\Users\Yarik\Desktop\Screenshot_2.png", "public/kalyazin_beauty.webp", 90),
    (r"C:\Users\Yarik\Desktop\Blocking_v003.jpg", "public/kalyazin_blocking.webp", 90),
    (r"C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03.jpg", "public/kalyazin_houdini_graph.webp", 92),
    (r"C:\Users\Yarik\Desktop\photo_2026-10-25_17-15-03 (2).jpg", "public/kalyazin_nuke_graph.webp", 92),
    (r"C:\Users\Yarik\Desktop\5a587e908d26a01367751cb88e48bf15.jpg", "public/kalyazin_reference.webp", 90),
]

for src, dst, q in assets:
    print(f"Converting {src} -> {dst}")
    with Image.open(src) as img:
        img.save(dst, "WEBP", quality=q)
print("Conversion complete.")
```

- [ ] **Step 2: Verify all 8 files exist in `public/` and report their sizes**

Run PowerShell:
`Get-ChildItem public/kalyazin_* | Select-Object Name, Length`
Expected: 8 `.webp` files, all non-zero length.

- [ ] **Step 3: Commit media assets**

```bash
git add public/kalyazin_*
git commit -m "feat(assets): add WebP assets for Echoes of Kalyazin project"
```

---

### Task 2: Project Data Dictionary Integration

**Files:**
- Modify: `src/app/data/projects.ts`

- [ ] **Step 1: Add `echoes-of-kalyazin` entry to `PROJECTS_DATA`**

In `src/app/data/projects.ts`, insert as the first entry:

```typescript
  "echoes-of-kalyazin": {
    title: "ECHOES OF KALYAZIN",
    category: "ENVIRONMENT ART & POST-APOCALYPSE",
    categoryEn: "ENVIRONMENT ART & POST-APOCALYPSE",
    categoryRu: "ENVIRONMENT ART И ПОСТАПОКАЛИПСИС",
    thematicHeader: "Abandoned Horizon // Kalyazin",
    thematicHeaderEn: "Abandoned Horizon // Kalyazin",
    thematicHeaderRu: "Заброшенный горизонт // Калязин",
    description: "A post-apocalyptic scene set in an abandoned village: a lone wanderer walking down a muddy road between decaying izbas and an overgrown stone bell tower. On the horizon looms the colossal dish of the RT-64 radio telescope, listening to dead frequencies. Assembled and scattered in Houdini Solaris (USD / Karma), blocked in Blender, with final atmosphere and compositing in Nuke.",
    descriptionEn: "A post-apocalyptic scene set in an abandoned village: a lone wanderer walking down a muddy road between decaying izbas and an overgrown stone bell tower. On the horizon looms the colossal dish of the RT-64 radio telescope, listening to dead frequencies. Assembled and scattered in Houdini Solaris (USD / Karma), blocked in Blender, with final atmosphere and compositing in Nuke.",
    descriptionRu: "Постапокалиптическая сцена в заброшенной деревне: одинокий путник на разбитой колее среди полуразрушенных изб и заросшей старинной колокольни. На горизонте возвышается колоссальная чаша радиотелескопа РТ-64, улавливающая сигналы мертвого эфира. Собрано и заскаттерено в Houdini Solaris (USD / Karma), блокинг и пропсы подготовлены в Blender, финальный композ и атмосфера собраны в Nuke.",
    software: ["Houdini", "Solaris / Karma", "Blender", "Nuke"],
    heroImage: "/kalyazin_hero.webp",
    beforeImage: "/kalyazin_clay.webp",
    afterImage: "/kalyazin_final.webp",
    assets: [
      "/kalyazin_beauty.webp",
      "/kalyazin_blocking.webp",
      "/kalyazin_houdini_graph.webp",
      "/kalyazin_nuke_graph.webp",
      "/kalyazin_reference.webp"
    ]
  },
```

- [ ] **Step 2: Verify syntax via TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/data/projects.ts
git commit -m "feat(data): add echoes-of-kalyazin to PROJECTS_DATA"
```

---

### Task 3: Homepage Bento Grid Restructuring

**Files:**
- Modify: `src/app/page.tsx:145-200`

- [ ] **Step 1: Update Bento Grid layout in `src/app/page.tsx`**

Replace the existing 4-card structure with the 5-card balanced rhythm:

```tsx
        {/* Bento Grid Container - Precision side gaps */}
        <div className="px-[18px] w-full flex flex-col gap-[2px] bg-[#F0F0EE]">

          {/* Block 1: Featured — 100% width (Echoes of Kalyazin) */}
          <ProjectCard
            id="echoes-of-kalyazin"
            data={PROJECTS_DATA["echoes-of-kalyazin"]}
            onClick={openProject}
            className="w-full h-[60vh] md:h-[80vh]"
            isFeatured
          />

          {/* Block 2 & 3: Secondary — 60/40 split (Last Mechanic + Frost Core) */}
          <div className="flex flex-col md:flex-row w-full gap-[2px]" style={{ height: "clamp(400px, 70vh, 800px)" }}>
            <ProjectCard
              id="last-mechanic"
              data={PROJECTS_DATA["last-mechanic"]}
              onClick={openProject}
              className="flex-[6] h-full"
            />
            <ProjectCard
              id="frost-core"
              data={PROJECTS_DATA["frost-core"]}
              onClick={openProject}
              className="flex-[4] h-full"
            />
          </div>

          {/* Block 4 & 5: Secondary — 40/60 split (Rampage Rally + The Visit) */}
          <div className="flex flex-col md:flex-row w-full gap-[2px]" style={{ height: "clamp(400px, 70vh, 800px)" }}>
            <ProjectCard
              id="rampage-rally"
              data={PROJECTS_DATA["rampage-rally"]}
              onClick={openProject}
              className="flex-[4] h-full"
            />
            <ProjectCard
              id="the-visit"
              data={PROJECTS_DATA["the-visit"]}
              onClick={openProject}
              className="flex-[6] h-full"
            />
          </div>

          {/* Block 6: Clean Tech/Utility Archive Link */}
          <div className="w-full mt-8 mb-6 font-mono text-[10px] md:text-xs select-none flex justify-end items-center">
            <Magnetic>
              <Link
                href="/work"
                className="group flex items-center gap-2 text-black hover:text-[#FF5F1F] font-bold tracking-[0.3em] transition-colors duration-300 cursor-none"
                data-normal-cursor
              >
                <span>{t.home.viewArchive}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">[→]</span>
              </Link>
            </Magnetic>
          </div>

        </div>
```

- [ ] **Step 2: Check TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): feature echoes-of-kalyazin and rebalance bento grid"
```

---

### Task 4: Archive Page (`/work`) List & Indexing

**Files:**
- Modify: `src/app/work/page.tsx:15-26`

- [ ] **Step 1: Update `ALL_IDS` and `PROJECT_METADATA`**

In `src/app/work/page.tsx`:
```typescript
// Full archive order
const ALL_IDS = ["echoes-of-kalyazin", "last-mechanic", "frost-core", "the-visit", "rampage-rally", "stanley-bottle"];

// Technical metadata for the archive view
const PROJECT_METADATA: Record<string, { year: string; index: string }> = {
  "echoes-of-kalyazin": { index: "01", year: "2026" },
  "last-mechanic": { index: "02", year: "2026" },
  "frost-core": { index: "03", year: "2026" },
  "the-visit": { index: "04", year: "2026" },
  "rampage-rally": { index: "05", year: "2025" },
  "stanley-bottle": { index: "06", year: "2024" },
};
```

- [ ] **Step 2: Check TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat(work): prepend echoes-of-kalyazin as index 01 in archive"
```

---

### Task 5: Modal Overlay (`ProjectOverlay.tsx`) Integration

**Files:**
- Modify: `src/app/ProjectOverlay.tsx`

- [ ] **Step 1: Update `PROJECT_ORDER` and `PROJECT_TITLES`**

```typescript
const PROJECT_ORDER = ["echoes-of-kalyazin", "last-mechanic", "frost-core", "rampage-rally", "the-visit", "stanley-bottle"];
const PROJECT_TITLES: Record<string, string> = {
  "echoes-of-kalyazin": "ECHOES OF KALYAZIN",
  "last-mechanic": "THE LAST MECHANIC",
  "frost-core": "FROST CORE",
  "rampage-rally": "RAMPAGE RALLY",
  "the-visit": "THE VISIT",
  "stanley-bottle": "STANLEY BOTTLE",
};
```

- [ ] **Step 2: Update `getIndex()` helper**

Add match for `kalyazin`:
```typescript
    if (titleLower.includes("kalyazin")) return PROJECT_ORDER.indexOf("echoes-of-kalyazin");
```

- [ ] **Step 3: Configure `BeforeAfterSlider` aspect class**

Ensure `aspectClass` applies `aspect-video` for `echoes-of-kalyazin`:
```typescript
    (currentProjectId === "echoes-of-kalyazin" || project.title.toLowerCase().includes("kalyazin"))
      ? "aspect-video"
      : ...
```

- [ ] **Step 4: Add HUD and breakdown card labels**

In HUD labels (lines ~760):
```typescript
asset.includes('kalyazin_beauty') ? 'Solaris & Karma // Raw Beauty Pass' :
asset.includes('kalyazin_blocking') ? 'Blender // 3D Blocking & Scale' :
asset.includes('kalyazin_houdini_graph') ? 'Houdini // USD Solaris Graph' :
asset.includes('kalyazin_nuke_graph') ? 'Nuke // Compositing Tree' :
asset.includes('kalyazin_reference') ? 'Reference // Kalyazin Tower & RT-64' :
```

In expanded card titles (lines ~830):
```typescript
asset.includes('kalyazin_beauty') ? (lang === 'ru' ? 'Solaris & Karma — Raw Beauty Pass (USD Render)' : 'Solaris & Karma — Raw Beauty Pass (USD Render)') :
asset.includes('kalyazin_blocking') ? (lang === 'ru' ? 'Blender — 3D блокинг, композиция и масштаб' : 'Blender — 3D Blocking & Scale Composition') :
asset.includes('kalyazin_houdini_graph') ? (lang === 'ru' ? 'Houdini Solaris — USD Scene Graph & Scatter LOPs' : 'Houdini Solaris — USD Scene Graph & Scatter LOPs') :
asset.includes('kalyazin_nuke_graph') ? (lang === 'ru' ? 'Nuke — Нодовый граф композа и цветокоррекция' : 'Nuke — Node-based Compositing Tree & Color Grade') :
asset.includes('kalyazin_reference') ? (lang === 'ru' ? 'Реальный референс — Калязинская колокольня и радиотелескоп РТ-64' : 'Real Reference — Kalyazin Bell Tower & RT-64 Radio Telescope') :
```

- [ ] **Step 5: Check TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/ProjectOverlay.tsx
git commit -m "feat(overlay): support echoes-of-kalyazin navigation, slider and technical breakdown"
```

---

### Task 6: Full Build Verification & Quality Assurance

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Next.js builds successfully with 0 errors, generating `/`, `/work`, `/about`, `/tools`.

- [ ] **Step 2: Inspect assets and test dev server**

Verify all routes and media response headers.
