# Spider-Man Sketch Addition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Web of Spider-Man #1" 3D animated comic cover into the Sketches reel on the portfolio home page as the leading item.

**Architecture:** Transcode the source render to a web-optimized MP4 with faststart and extract a WebP poster frame in `public/`. Integrate the item into the `SKETCHES` configuration in `src/app/page.tsx`.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, ffmpeg.

## Global Constraints

- Source render path: `D:\Projects\_Creative\BlenderProjects\Comic_Covers_3D\web of spider man #1\_OUT\RENDER.mp4`
- Video asset destination: `public/sketches_spiderman.mp4`
- Poster asset destination: `public/sketches_spiderman_poster.webp`
- Aspect ratio: 9 / 16 (1080x1920)
- Label: `BLENDER // WEB OF SPIDER-MAN #1`
- Reel position: First element (index 0)

---

### Task 1: Media Asset Processing & Placement

**Files:**
- Create: `public/sketches_spiderman.mp4`
- Create: `public/sketches_spiderman_poster.webp`

**Interfaces:**
- Consumes: `D:\Projects\_Creative\BlenderProjects\Comic_Covers_3D\web of spider man #1\_OUT\RENDER.mp4`
- Produces: Web-ready video and poster assets in `public/` directory

- [ ] **Step 1: Encode web-optimized video with faststart**

Run:
```powershell
ffmpeg -y -i "D:\Projects\_Creative\BlenderProjects\Comic_Covers_3D\web of spider man #1\_OUT\RENDER.mp4" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart -an "public/sketches_spiderman.mp4"
```

- [ ] **Step 2: Generate first-frame poster in WebP**

Run:
```powershell
ffmpeg -y -ss 00:00:00.000 -i "D:\Projects\_Creative\BlenderProjects\Comic_Covers_3D\web of spider man #1\_OUT\RENDER.mp4" -vframes 1 -c:v libwebp -q:v 85 "public/sketches_spiderman_poster.webp"
```

- [ ] **Step 3: Verify assets exist and inspect file sizes**

Run:
```powershell
Get-Item "public/sketches_spiderman.mp4", "public/sketches_spiderman_poster.webp" | Select-Object Name, Length
```
Expected: Both files exist with size > 0.

---

### Task 2: Code Integration in `src/app/page.tsx` & Build Verification

**Files:**
- Modify: `src/app/page.tsx:95-107`

**Interfaces:**
- Consumes: Assets created in Task 1 (`/sketches_spiderman.mp4`, `/sketches_spiderman_poster.webp`)
- Produces: Updated `SKETCHES` array consumed by `SketchesReel` and `SketchLightbox`

- [ ] **Step 1: Prepend Spider-Man sketch to `SKETCHES` in `src/app/page.tsx`**

Edit `src/app/page.tsx` around line 95 to add the new sketch at the top of the array:
```typescript
const SKETCHES = [
  { id: "spiderman",    video: "/sketches_spiderman.mp4",   label: "BLENDER // WEB OF SPIDER-MAN #1", aspect: 9 / 16, poster: "/sketches_spiderman_poster.webp" },
  { id: "apollo",       video: "/sketches_01.mp4",          label: "Houdini // APOLLO",              aspect: 16 / 9, posterTime: 1.5 },
  { id: "brainpop",     video: "/sketches_brainpop.mp4",    label: "Houdini // BRAINPOP",            aspect: 9 / 16 },
  { id: "pingpong",     video: "/sketches_03.mp4",          label: "Houdini // PING-PONG",           aspect: 16 / 9 },
  { id: "racket",       video: "/sketches_racket.mp4",      label: "Houdini // PING-PONG ALGORITHM", aspect: 1 / 1 },
  { id: "paetochki",    video: "/sketches_paetochki.mp4",   label: "Houdini // PAETOCHKI",           aspect: 4 / 5 },
  { id: "skull",        video: "/sketches_skull.mp4",       label: "C4D // SKULL COLLAB",            aspect: 9 / 16 },
  { id: "statue",       video: "/sketches_statue.mp4",      label: "C4D // STATUE COLLAB",           aspect: 9 / 16,  poster: "/sketches_statue_poster.png" },
  { id: "plastic_cube", isImage: true, image: "/sketches_plastic_cube.png", label: "C4D // CUBE³ WALLPAPER", aspect: 9 / 16 },
  { id: "phone_pillow", video: "/sketches_phone_pillow.mp4",label: "C4D // PHONE PILLOW",            aspect: 16 / 9 },
  { id: "trans_cube",   video: "/sketches_trans_cube.mp4",  label: "C4D // TRANS CUBE",              aspect: 4 / 5,   poster: "/sketches_trans_cube_poster.png" },
];
```

- [ ] **Step 2: Run build to verify compile and types**

Run:
```powershell
npm run build
```
Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Commit changes to git**

Run:
```powershell
git add docs/superpowers/plans/2026-10-08-spiderman-sketch-addition.md src/app/page.tsx public/sketches_spiderman.mp4 public/sketches_spiderman_poster.webp
git commit -m "feat: add web of spider-man #1 to sketches reel"
```
