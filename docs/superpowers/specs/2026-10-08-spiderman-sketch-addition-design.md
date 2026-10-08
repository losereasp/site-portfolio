# Design Specification: Add "Web of Spider-Man #1" to Sketches Reel

**Date:** 2026-10-08  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Overview

Add a new 3D motion sketch into the "Personal Sketches / The Lab / R&D" reel on the portfolio home page. The artwork is a 3D animated comic cover based on "Web of Spider-Man #1" created in Blender.

The item will be placed as the first entry in the reel (position index 0), with full support for video hover previews, smooth horizontal scrolling, and high-resolution lightbox expansion.

---

## 2. Media Asset Pipeline

### Source File
- **Source path:** `D:\Projects\_Creative\BlenderProjects\Comic_Covers_3D\web of spider man #1\_OUT\RENDER.mp4`
- **Specs:** 1080×1920 (9:16 portrait), 30 fps, 5.0 seconds duration, H.264 video codec.

### Target Files in `public/`
1. **Video (`public/sketches_spiderman.mp4`):**
   - Encoded via `ffmpeg` with `-c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart -an`.
   - Web-optimized with faststart atom at the front of the file for instant streaming without full download buffering.
2. **Poster Image (`public/sketches_spiderman_poster.webp`):**
   - Generated via `ffmpeg -ss 00:00:00.000 -i <source> -vframes 1 -c:v libwebp -q:v 85 public/sketches_spiderman_poster.webp`.
   - Eliminates black frames while the video is loading in the browser.

---

## 3. Code Modifications

### `src/app/page.tsx`
Prepend the new item into the `SKETCHES` array:

```ts
const SKETCHES = [
  {
    id: "spiderman",
    video: "/sketches_spiderman.mp4",
    poster: "/sketches_spiderman_poster.webp",
    label: "BLENDER // WEB OF SPIDER-MAN #1",
    aspect: 9 / 16,
  },
  // ... existing items
];
```

The reel automatically increments the total count in `SketchesReel.tsx` (`[ 01 / 11 ]`) and adjusts the scroll progress indicator.

---

## 4. Verification & Testing

1. **Asset integrity:** Verify `public/sketches_spiderman.mp4` and `public/sketches_spiderman_poster.webp` exist and are valid.
2. **Code integrity & Build:** Run `npm run build` to confirm TypeScript and Next.js compiler pass without errors or warnings.
3. **Runtime verification:** Check that `SKETCHES` contains 11 elements and the Spider-Man item is rendered with aspect ratio 9:16 and correct label.
