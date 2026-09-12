# The Last Mechanic Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Pwnisher Challenge "The Last Mechanic" 3D CGI project into the portfolio as the new homepage featured project and top archive entry with complete interactive case study and web-optimized media.

**Architecture:** Convert 4K source assets to web-optimized vertical MP4s/WebPs via ffmpeg; register project in `PROJECTS_DATA`; update `ProjectOverlay` navigation and local breakdown playback; update `/work` archive order; rebuild homepage Bento Grid for 4 projects.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP, FFmpeg.

## Global Constraints

- Project ID: `last-mechanic`
- Project Title: `THE LAST MECHANIC`
- Category: `CHALLENGE` (RU: `ЧЕЛЛЕНДЖ`)
- Software Stack: `["Unreal Engine", "Blender", "Substance Painter", "Cascadeur", "After Effects"]`
- Responsive video: Vertical 1080×1920 (9:16), H.264, web-optimized faststart.

---

### Task 1: Generate & Optimize Web Media Assets

**Files:**
- Create:
  - `public/last_mechanic_hero.webp`
  - `public/last_mechanic_showcase.mp4`
  - `public/last_mechanic_hover.mp4`
  - `public/last_mechanic_breakdown.mp4`
  - `public/last_mechanic_graybox.webp`
  - `public/last_mechanic_after.webp`
  - `public/last_mechanic_lighting.webp`
  - `public/last_mechanic_salvage.webp`
  - `public/last_mechanic_concept.webp`
  - `public/last_mechanic_mocap.mp4`

**Interfaces:**
- Consumes:
  - `A:\UnrealProjects\LastMechanic\_OUT\RENDER.mp4`
  - `A:\UnrealProjects\LastMechanic\_OUT\breakdown\RENDER.mp4`
  - `A:\UnrealProjects\LastMechanic\_OUT\seq2\LS_LastMechanic_Blockout.0080.png`
  - `A:\UnrealProjects\LastMechanic\_OUT\breakdown\01_graybox\LS_LastMechanic_Blockout.0080.png`
  - `A:\UnrealProjects\LastMechanic\_OUT\breakdown\03_lighting\LS_LastMechanic_Blockout.0080.png`
  - `D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\salvage-sign-blueprint.jpg`
  - `D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\concept_mechanic_apron.jpg`
  - `D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\mocap\variant7_mocap.mp4`
- Produces: Web-ready assets in `public/` directory accessible by Next.js.

- [ ] **Step 1: Convert video masters to 1080×1920 web MP4s**
```bash
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\RENDER.mp4" -vf "scale=1080:1920" -c:v libx264 -preset slow -crf 20 -c:a aac -b:a 192k -movflags +faststart "d:\Projects\Software\site-portfolio\public\last_mechanic_showcase.mp4"
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\RENDER.mp4" -vf "scale=1080:1920" -c:v libx264 -preset slow -crf 22 -an -movflags +faststart "d:\Projects\Software\site-portfolio\public\last_mechanic_hover.mp4"
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\breakdown\RENDER.mp4" -vf "scale=1080:1920" -c:v libx264 -preset slow -crf 21 -c:a aac -b:a 192k -movflags +faststart "d:\Projects\Software\site-portfolio\public\last_mechanic_breakdown.mp4"
ffmpeg -y -i "D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\mocap\variant7_mocap.mp4" -c:v libx264 -crf 23 -an -movflags +faststart "d:\Projects\Software\site-portfolio\public\last_mechanic_mocap.mp4"
```

- [ ] **Step 2: Convert frames and concepts to 2K WebPs**
```bash
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\seq2\LS_LastMechanic_Blockout.0080.png" -vf "scale=1080:1920" -q:v 90 "d:\Projects\Software\site-portfolio\public\last_mechanic_hero.webp"
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\seq2\LS_LastMechanic_Blockout.0080.png" -vf "scale=1080:1920" -q:v 90 "d:\Projects\Software\site-portfolio\public\last_mechanic_after.webp"
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\breakdown\01_graybox\LS_LastMechanic_Blockout.0080.png" -vf "scale=1080:1920" -q:v 90 "d:\Projects\Software\site-portfolio\public\last_mechanic_graybox.webp"
ffmpeg -y -i "A:\UnrealProjects\LastMechanic\_OUT\breakdown\03_lighting\LS_LastMechanic_Blockout.0080.png" -vf "scale=1080:1920" -q:v 90 "d:\Projects\Software\site-portfolio\public\last_mechanic_lighting.webp"
ffmpeg -y -i "D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\salvage-sign-blueprint.jpg" -q:v 85 "d:\Projects\Software\site-portfolio\public\last_mechanic_salvage.webp"
ffmpeg -y -i "D:\clippy\workspace\2026-08-04_pwnisher-gauntlet-last-mechanic\concept_mechanic_apron.jpg" -q:v 85 "d:\Projects\Software\site-portfolio\public\last_mechanic_concept.webp"
```

- [ ] **Step 3: Verify all generated assets exist and have nonzero size**
```powershell
Get-ChildItem -Path "d:\Projects\Software\site-portfolio\public\last_mechanic_*" | Select-Object Name, Length
```

---

### Task 2: Register Project Data in Dictionary

**Files:**
- Modify: `src/app/data/projects.ts`

**Interfaces:**
- Produces: `PROJECTS_DATA["last-mechanic"]` entry.

- [ ] **Step 1: Add "last-mechanic" entry to PROJECTS_DATA**
```typescript
  "last-mechanic": {
    title: "THE LAST MECHANIC",
    category: "CHALLENGE",
    categoryEn: "CHALLENGE",
    categoryRu: "ЧЕЛЛЕНДЖ",
    thematicHeader: "Gauntlet of Gods",
    thematicHeaderEn: "Gauntlet of Gods",
    thematicHeaderRu: "Gauntlet of Gods",
    description: "Entry for the Pwnisher 'Gauntlet of Gods' challenge. An experienced mechanic revives a seemingly dead motorcycle: tightening the final component, a confident thump of the fist, and the engine comes alive. Crafted in Unreal Engine 5 in a grounded comic realism aesthetic.",
    descriptionEn: "Entry for the Pwnisher 'Gauntlet of Gods' challenge. An experienced mechanic revives a seemingly dead motorcycle: tightening the final component, a confident thump of the fist, and the engine comes alive. Crafted in Unreal Engine 5 in a grounded comic realism aesthetic.",
    descriptionRu: "Проект для челленджа Pwnisher «Gauntlet of Gods». История опытного механика, который возвращает к жизни безнадёжный мотоцикл: один точный удар кулаком — и мёртвый мотор оживает. Собрано в Unreal Engine 5 в стилистике приземлённого комиксного реализма (grounded comic realism).",
    software: ["Unreal Engine", "Blender", "Substance Painter", "Cascadeur", "After Effects"],
    heroImage: "/last_mechanic_hero.webp",
    hoverVideo: "/last_mechanic_hover.mp4",
    showcaseVideo: "/last_mechanic_showcase.mp4",
    breakdownVideo: "/last_mechanic_breakdown.mp4",
    beforeImage: "/last_mechanic_graybox.webp",
    afterImage: "/last_mechanic_after.webp",
    assets: [
      "/last_mechanic_lighting.webp",
      "/last_mechanic_salvage.webp",
      "/last_mechanic_concept.webp",
      "/last_mechanic_mocap.mp4"
    ]
  },
```

---

### Task 3: Modal Overlay Enhancements

**Files:**
- Modify: `src/app/ProjectOverlay.tsx`

**Interfaces:**
- Consumes: `PROJECTS_DATA["last-mechanic"]`
- Produces: Support for `"last-mechanic"` navigation and `breakdownVideo` player section.

- [ ] **Step 1: Update PROJECT_ORDER and PROJECT_TITLES**
```typescript
const PROJECT_ORDER = ["last-mechanic", "frost-core", "rampage-rally", "the-visit", "stanley-bottle"];
const PROJECT_TITLES: Record<string, string> = {
  "last-mechanic": "THE LAST MECHANIC",
  "frost-core": "FROST CORE",
  "rampage-rally": "RAMPAGE RALLY",
  "the-visit": "THE VISIT",
  "stanley-bottle": "STANLEY BOTTLE",
};
```

- [ ] **Step 2: Update getIndex() match**
```typescript
    if (titleLower.includes("mechanic")) return PROJECT_ORDER.indexOf("last-mechanic");
```

- [ ] **Step 3: Add breakdownVideo player section if breakdownVideo is defined**
Render local MP4 breakdown with video controls and styling matching the design language.

---

### Task 4: Archive Page Integration

**Files:**
- Modify: `src/app/work/page.tsx`

- [ ] **Step 1: Update ALL_IDS and PROJECT_METADATA**
```typescript
const ALL_IDS = ["last-mechanic", "frost-core", "the-visit", "rampage-rally", "stanley-bottle"];

const PROJECT_METADATA: Record<string, { year: string; index: string }> = {
  "last-mechanic": { index: "01", year: "2026" },
  "frost-core": { index: "02", year: "2026" },
  "the-visit": { index: "03", year: "2026" },
  "rampage-rally": { index: "04", year: "2025" },
  "stanley-bottle": { index: "05", year: "2024" },
};
```

---

### Task 5: Homepage Bento Grid Update

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Reorganize Bento Grid container to feature last-mechanic at top**
```tsx
        {/* Bento Grid Container - Precision side gaps */}
        <div className="px-[18px] w-full flex flex-col gap-[2px] bg-[#F0F0EE]">

          {/* Block 1: Featured — 100% width */}
          <ProjectCard
            id="last-mechanic"
            data={PROJECTS_DATA["last-mechanic"]}
            onClick={openProject}
            className="w-full h-[60vh] md:h-[80vh]"
            isFeatured
          />

          {/* Block 2 & 3: Secondary — 60/40 split */}
          <div className="flex flex-col md:flex-row w-full gap-[2px]" style={{ height: "clamp(400px, 70vh, 800px)" }}>
            <ProjectCard
              id="frost-core"
              data={PROJECTS_DATA["frost-core"]}
              onClick={openProject}
              className="flex-[6] h-full"
            />
            <ProjectCard
              id="rampage-rally"
              data={PROJECTS_DATA["rampage-rally"]}
              onClick={openProject}
              className="flex-[4] h-full"
            />
          </div>

          {/* Block 4: The Visit — Panoramic full width */}
          <ProjectCard
            id="the-visit"
            data={PROJECTS_DATA["the-visit"]}
            onClick={openProject}
            className="w-full h-[50vh] md:h-[65vh]"
          />

          {/* Block 5: Clean Tech/Utility Archive Link */}
          ...
```

---

### Task 6: Verification & Validation

- [ ] **Step 1: Run TypeScript compiler and production build**
```bash
npm run build
```
Verify: Zero TypeScript or Next.js build errors.

- [ ] **Step 2: Functional verification in browser**
Test `http://localhost:3000`:
- Check homepage card hover playback for The Last Mechanic.
- Open project overlay, verify showcase video with audio, breakdown video, before/after slider.
- Navigate via PREV / NEXT.
- Check `/work` table list (5 projects, index 01-05).
- Test RU/EN language switcher.

- [ ] **Step 3: Commit all changes**
```bash
git add .
git commit -m "feat: add Pwnisher challenge The Last Mechanic project"
```
