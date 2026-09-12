# The Last Mechanic — Breakdown Video Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 4 authentic, web-optimized MP4 breakdown video clips from production footage in `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\` and integrate them into The Last Mechanic case study modal grid.

**Architecture:** FFmpeg extracts 12-second 1080p 30fps H.264 web-loops into `public/`. `projects.ts` references the files in `assets`. `ProjectOverlay.tsx` detects the filenames and attaches HUD badges with pulsating indicators and expand-to-fullscreen capabilities.

**Tech Stack:** FFmpeg (libx264, AAC, faststart), Next.js 15 App Router, TypeScript, Tailwind CSS.

## Global Constraints
- Target directory for web assets: `d:\Projects\Software\site-portfolio\public\`
- Video format: MP4 (H.264 / AAC, faststart, 1920x1080, 30fps, CRF 22)
- Size limit: < 3 MB per video clip
- No placeholder or third-party assets (all 4 clips from project recordings)

---

### Task 1: Render Cascadeur Breakdown Clip

**Files:**
- Create: `public/last_mechanic_cascadeur.mp4`

**Interfaces:**
- Source: `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 22-04-06_CLEAN.mp4`
- Time range: `00:13:51` to `00:14:03` (12s)

- [ ] **Step 1: Execute FFmpeg export**
```bash
ffmpeg -y -ss 00:13:51 -i "D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 22-04-06_CLEAN.mp4" -t 12 -vf "scale=1920:1080,fps=30" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "d:\Projects\Software\site-portfolio\public\last_mechanic_cascadeur.mp4"
```

- [ ] **Step 2: Verify video existence and file size**
Confirm file size is between 1 MB and 3 MB and plays properly.

- [ ] **Step 3: Commit asset**
```bash
git add public/last_mechanic_cascadeur.mp4
git commit -m "feat(assets): add cascadeur breakdown video clip"
```

---

### Task 2: Render Blender Apron Modeling Breakdown Clip

**Files:**
- Create: `public/last_mechanic_blender.mp4`

**Interfaces:**
- Source: `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 09-39-34_CLEAN.mp4`
- Time range: `00:54:55` to `00:55:07` (12s)

- [ ] **Step 1: Execute FFmpeg export**
```bash
ffmpeg -y -ss 00:54:55 -i "D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 09-39-34_CLEAN.mp4" -t 12 -vf "scale=1920:1080,fps=30" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "d:\Projects\Software\site-portfolio\public\last_mechanic_blender.mp4"
```

- [ ] **Step 2: Verify video existence and file size**
Confirm file size is between 1 MB and 3 MB.

- [ ] **Step 3: Commit asset**
```bash
git add public/last_mechanic_blender.mp4
git commit -m "feat(assets): add blender breakdown video clip"
```

---

### Task 3: Render Substance 3D Painter Breakdown Clip

**Files:**
- Create: `public/last_mechanic_painter.mp4`

**Interfaces:**
- Source: `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 15-27-08_CLEAN.mp4`
- Time range: `00:25:12` to `00:25:24` (12s)

- [ ] **Step 1: Execute FFmpeg export**
```bash
ffmpeg -y -ss 00:25:12 -i "D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 15-27-08_CLEAN.mp4" -t 12 -vf "scale=1920:1080,fps=30" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "d:\Projects\Software\site-portfolio\public\last_mechanic_painter.mp4"
```

- [ ] **Step 2: Verify video existence and file size**
Confirm file size is between 1 MB and 3 MB.

- [ ] **Step 3: Commit asset**
```bash
git add public/last_mechanic_painter.mp4
git commit -m "feat(assets): add substance painter breakdown video clip"
```

---

### Task 4: Render Unreal Engine 5 Breakdown Clip

**Files:**
- Create: `public/last_mechanic_ue5.mp4`

**Interfaces:**
- Source: `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 18-51-36_CLEAN.mp4`
- Time range: `00:18:48` to `00:19:00` (12s)

- [ ] **Step 1: Execute FFmpeg export**
```bash
ffmpeg -y -ss 00:18:48 -i "D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 18-51-36_CLEAN.mp4" -t 12 -vf "scale=1920:1080,fps=30" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "d:\Projects\Software\site-portfolio\public\last_mechanic_ue5.mp4"
```

- [ ] **Step 2: Verify video existence and file size**
Confirm file size is between 1 MB and 3 MB.

- [ ] **Step 3: Commit asset**
```bash
git add public/last_mechanic_ue5.mp4
git commit -m "feat(assets): add ue5 breakdown video clip"
```

---

### Task 5: Integrate Assets and HUD Badges in Codebase

**Files:**
- Modify: `src/app/data/projects.ts`
- Modify: `src/app/ProjectOverlay.tsx`

- [ ] **Step 1: Update `projects.ts`**
Register the 4 assets under `last-mechanic`:
```typescript
assets: [
  "/last_mechanic_cascadeur.mp4",
  "/last_mechanic_blender.mp4",
  "/last_mechanic_painter.mp4",
  "/last_mechanic_ue5.mp4"
]
```

- [ ] **Step 2: Update HUD labels in `ProjectOverlay.tsx`**
Ensure HUD badge text displays:
- `last_mechanic_cascadeur` -> `Animation // Cascadeur Rig`
- `last_mechanic_blender` -> `3D Modeling // Blender`
- `last_mechanic_painter` -> `Texturing // Substance 3D Painter`
- `last_mechanic_ue5` -> `Staging & Camera // Unreal Engine 5`

- [ ] **Step 3: Run `npm run build`**
Confirm clean compile with 0 errors.

- [ ] **Step 4: Commit code changes**
```bash
git add src/app/data/projects.ts src/app/ProjectOverlay.tsx
git commit -m "feat(last-mechanic): add 4 workflow breakdown video assets and HUD badges"
```
