# Design Specification: The Lab Reel (Horizontal Sketches Carousel)

**Date:** 2026-07-29  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Overview

Replaces the current fixed vertical 3-row flex grid for personal 3D sketches with a sleek, high-performance horizontal carousel ("The Lab Reel"). This ensures all 3D sketches retain their natural aspect ratios (16:9, 9:16, 4:5, 1:1) without cropping or distortion, while reducing vertical page clutter and aligning with the LSRSP brand posture (cream background `#F0F0EE`, sharp corners `rounded-sm`, mono typography, orange accent `#FF5F1F`).

---

## 2. Component Architecture

### `SketchesReel.tsx`
A standalone component responsible for:
- Rendering the scrollable horizontal track containing `SketchCard` elements.
- Managing horizontal drag/swipe interactions and scroll position.
- Displaying navigation controls (`[ ← ]`, `[ → ]`) and a monospace progress counter (`[ 01 / 10 ]` + orange track indicator).
- Handling performance via `IntersectionObserver` for video preloading.

### Modified Files:
- `src/app/page.tsx`: Replace `DESKTOP_ROWS` / `MOBILE_ROWS` grid rendering with `SketchesReel` component.

---

## 3. Visual & Interaction Design

### Layout & Dimensions
- **Track Container:** `w-full overflow-x-auto scrollbar-none flex gap-4 md:gap-6 px-[18px] select-none cursor-grab active:cursor-grabbing`.
- **Card Sizing:**
  - Height fixed: `h-[280px]` (mobile), `h-[400px]` (desktop).
  - Width: Auto-calculated via CSS `aspect-[w/h]` based on each item's aspect ratio.
  - Border/Radius: `border border-black/10 rounded-sm bg-black overflow-hidden relative shrink-0`.

### UI Controls
- **Header:** Marquee header `PERSONAL SKETCHES // THE LAB // R&D // EXPERIMENTS`.
- **Controls Bar (Right/Bottom):**
  - Left/Right arrows with magnetic hover: `[ ← ]`, `[ → ]` to scroll by offset.
  - Progress text: `[ 01 / 10 ]` dynamically updating on scroll.
  - Hairline scrollbar indicator with `#FF5F1F` thumb progress.

### Hover & Lightbox Integration
- On hover: video plays smoothly, subtle scale `scale(1.02)`, `EXPAND` badge appears top-right, title label lights up.
- On click: triggers `openSketch(sketch)`, launching `SketchLightbox`.

---

## 4. Technical & Performance Considerations

- **Preloading:** Videos initialize with `preload="none"` or `preload="metadata"` until entering viewport (`IntersectionObserver`).
- **Touch & Mouse Drag:** Native smooth horizontal scrolling on touch devices and wheel/drag support for desktop.
- **Accessibility:** Keyboard arrow navigation when focused, clean `aria-label` tags.

---

## 5. Verification Plan

1. Test horizontal scroll and drag on desktop and mobile viewports.
2. Verify all 10 sketch items render with correct proportions (no cropped heads/objects).
3. Ensure clicking a card correctly opens `SketchLightbox`.
4. Verify build succeeds (`npm run build`).
