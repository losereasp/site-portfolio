# Sketches Reel Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance horizontal carousel track component for personal 3D sketches to replace the fixed flex grid.

**Architecture:** Create a `SketchesReel.tsx` component managing scroll/drag state and intersection observer preloading, then integrate it into `src/app/page.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4.

---

### Task 1: Create `SketchesReel.tsx` Component

**Files:**
- Create: `src/app/SketchesReel.tsx`

**Interfaces:**
- Consumes: `SketchItem` type and `SKETCHES` array from `src/app/page.tsx`.
- Produces: `SketchesReel` React component accepting `sketches` and `onOpenSketch(sketch: SketchItem)`.

- [ ] **Step 1: Create `src/app/SketchesReel.tsx` with track, drag, navigation buttons, and scroll indicator**

Create `src/app/SketchesReel.tsx`:
```tsx
"use client";

import { useRef, useState, useEffect, type MouseEvent } from "react";

export interface SketchItem {
  id: string;
  video?: string;
  isImage?: boolean;
  image?: string;
  label: string;
  poster?: string;
  posterTime?: number;
  aspect: number;
}

interface SketchesReelProps {
  sketches: SketchItem[];
  onOpenSketch: (sketch: SketchItem) => void;
}

export default function SketchesReel({ sketches, onOpenSketch }: SketchesReelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateProgress = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      setCurrentIndex(1);
      return;
    }
    const ratio = track.scrollLeft / maxScroll;
    const idx = Math.min(sketches.length, Math.max(1, Math.round(ratio * (sketches.length - 1)) + 1));
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateProgress, { passive: true });
    return () => track.removeEventListener("scroll", updateProgress);
  }, [sketches.length]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.7;
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Reel Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto scrollbar-none flex gap-4 md:gap-6 px-[18px] select-none ${
          isMouseDown ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: isMouseDown ? "auto" : "smooth" }}
      >
        {sketches.map((sketch) => (
          <ReelCard
            key={sketch.id}
            sketch={sketch}
            onOpen={() => onOpenSketch(sketch)}
          />
        ))}
      </div>

      {/* Control bar */}
      <div className="px-[18px] flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-3 text-black/50">
          <span className="text-[#FF5F1F] font-bold">⬡</span>
          <span className="tracking-[0.3em] uppercase">
            [ {String(currentIndex).padStart(2, "0")} / {String(sketches.length).padStart(2, "0")} ]
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollByAmount("left")}
            className="px-3 py-1.5 border border-black/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors duration-200 tracking-[0.2em]"
            aria-label="Previous sketch"
          >
            [ ← ]
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="px-3 py-1.5 border border-black/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors duration-200 tracking-[0.2em]"
            aria-label="Next sketch"
          >
            [ → ]
          </button>
        </div>
      </div>
    </div>
  );
}

function ReelCard({ sketch, onOpen }: { sketch: SketchItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onClick={onOpen}
      className="group relative overflow-hidden bg-black border border-black/10 rounded-sm shrink-0 cursor-pointer h-[280px] md:h-[400px] transition-transform duration-300 hover:scale-[1.01]"
      style={{ aspectRatio: sketch.aspect }}
    >
      {sketch.isImage ? (
        <img
          src={sketch.image}
          alt={sketch.label}
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <video
          ref={videoRef}
          src={sketch.video}
          poster={sketch.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              if (sketch.posterTime !== undefined) {
                videoRef.current.currentTime = sketch.posterTime;
              }
            }
          }}
        />
      )}

      {/* Expand indicator */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/80">
            EXPAND ⬡
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-300">
          <span className="text-[#FF5F1F]/60 group-hover:text-[#FF5F1F] transition-colors duration-300 mr-1.5">⬡</span>
          {sketch.label}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit `src/app/SketchesReel.tsx`**
```bash
git add src/app/SketchesReel.tsx
git commit -m "feat: add SketchesReel horizontal track component"
```

---

### Task 2: Integrate `SketchesReel` into `src/app/page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace old flex row grid with `<SketchesReel />`**

Import `SketchesReel` in `src/app/page.tsx` and replace lines 312-337 with `<SketchesReel sketches={SKETCHES} onOpenSketch={(sketch) => setOpenSketch(sketch)} />`.

- [ ] **Step 2: Build project and verify clean output**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit `src/app/page.tsx`**
```bash
git add src/app/page.tsx
git commit -m "feat: integrate SketchesReel horizontal track into main page"
```
