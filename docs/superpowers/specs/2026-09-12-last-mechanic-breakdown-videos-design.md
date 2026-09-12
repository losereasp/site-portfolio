# Design Spec: The Last Mechanic — 4-Stage Workflow Breakdown Video Assets

## Context & Purpose
Provide an authentic, high-impact technical breakdown for the "The Last Mechanic" case study modal in the portfolio (`/work` and homepage bento). Replacing all placeholder/generic assets with real screen-recorded production footage across the artist's four core creative applications: Cascadeur, Blender, Substance 3D Painter, and Unreal Engine 5.

---

## 1. Video Asset Specifications

All clips are converted from `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\` masters:
- Resolution: 1920x1080 (16:9 standard for gallery cards)
- Framerate: 30 fps (smooth web playback)
- Codec: H.264 (libx264, CRF 22, preset medium, faststart)
- Audio: Muted default loop, audio track preserved for expandable modal view
- File size target: ~1.5 MB – 2.5 MB per clip for instant streaming

### 1.1 `public/last_mechanic_cascadeur.mp4`
- **Source:** `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 22-04-06_CLEAN.mp4`
- **Range:** 13:51 to 14:03 (12 seconds)
- **Visual:** Cascadeur timeline playback showcasing the mechanic animation from working on the motorcycle engine to standing up into the hero pose.
- **HUD Tag:** `Animation // Cascadeur Rig`

### 1.2 `public/last_mechanic_blender.mp4`
- **Source:** `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 09-39-34_CLEAN.mp4`
- **Range:** 54:55 to 55:07 (12 seconds)
- **Visual:** Subdivision surface modeling in Blender 5.2 LTS, proportional editing on the character's leather apron pocket mesh.
- **HUD Tag:** `3D Modeling // Blender`

### 1.3 `public/last_mechanic_painter.mp4`
- **Source:** `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-31 15-27-08_CLEAN.mp4`
- **Range:** 25:12 to 25:24 (12 seconds)
- **Visual:** Adobe Substance 3D Painter viewport texturing, generating stitched seam details on the leather pocket, layering worn textures and motor oil stains.
- **HUD Tag:** `Texturing // Substance 3D Painter`

### 1.4 `public/last_mechanic_ue5.mp4`
- **Source:** `D:\vid\Last Mechanic\BREAKDOWN_CLEAN\2026-08-08 18-51-36_CLEAN.mp4`
- **Range:** 18:48 to 19:00 (12 seconds)
- **Visual:** Unreal Engine 5 Sequencer timeline, CineCamera framing, TCG Card 3D boundary alignment, and motorcycle scene staging.
- **HUD Tag:** `Staging & Camera // Unreal Engine 5`

---

## 2. Code Changes

### 2.1 `src/app/data/projects.ts`
Update `assets` array for `"last-mechanic"`:
```typescript
assets: [
  "/last_mechanic_cascadeur.mp4",
  "/last_mechanic_blender.mp4",
  "/last_mechanic_painter.mp4",
  "/last_mechanic_ue5.mp4"
]
```

### 2.2 `src/app/ProjectOverlay.tsx`
Add HUD label matching for the four clips inside the video HUD rendering block:
```typescript
asset.includes('last_mechanic_cascadeur') ? 'Animation // Cascadeur Rig' :
asset.includes('last_mechanic_blender') ? '3D Modeling // Blender' :
asset.includes('last_mechanic_painter') ? 'Texturing // Substance 3D Painter' :
asset.includes('last_mechanic_ue5') ? 'Staging & Camera // Unreal Engine 5' :
```

---

## 3. Verification
1. Verify FFmpeg renders output clean MP4s without encoding errors.
2. Confirm file sizes are under 3 MB each.
3. Verify Next.js dev server serves the new MP4s with 200/206 status codes.
4. Run `npm run build` to ensure 0 TypeScript / lint errors.
5. Verify playback in `ProjectOverlay.tsx` (smooth looping, correct labels, accordion expand behavior).
