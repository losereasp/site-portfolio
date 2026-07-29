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
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updateProgress = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      setCurrentIndex(1);
      setScrollProgress(0);
      return;
    }
    const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
    setScrollProgress(ratio);
    const idx = Math.min(sketches.length, Math.max(1, Math.round(ratio * (sketches.length - 1)) + 1));
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
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
    setIsHovered(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    
    // Update floating drag cursor position relative to track
    const rect = track.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {/* Reel Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto no-scrollbar flex gap-4 md:gap-6 px-[18px] select-none relative ${
          isMouseDown ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: isMouseDown ? "auto" : "smooth" }}
      >
        {/* Floating Custom Drag Cursor Indicator */}
        {isHovered && (
          <div
            className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:block"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              opacity: isHovered ? 1 : 0,
            }}
          >
            <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#FF5F1F]/40 shadow-lg text-white font-mono text-[9px] tracking-[0.25em] uppercase flex items-center gap-1.5 rounded-full">
              <span className="text-[#FF5F1F] font-bold">‹</span>
              <span>{isMouseDown ? "HOLD & DRAG" : "DRAG REEL"}</span>
              <span className="text-[#FF5F1F] font-bold">›</span>
            </div>
          </div>
        )}

        {sketches.map((sketch) => (
          <ReelCard
            key={sketch.id}
            sketch={sketch}
            onOpen={() => onOpenSketch(sketch)}
          />
        ))}
      </div>

      {/* Control bar with branded custom scroll progress indicator */}
      <div className="px-[18px] flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-3 text-black/60">
          <span className="text-[#FF5F1F] font-bold">⬡</span>
          <span className="tracking-[0.3em] uppercase">
            [ {String(currentIndex).padStart(2, "0")} / {String(sketches.length).padStart(2, "0")} ]
          </span>
        </div>

        {/* Custom Brand Progress Line */}
        <div className="flex-1 max-w-[160px] sm:max-w-[240px] md:max-w-[340px] h-[3px] bg-black/10 relative overflow-hidden rounded-full mx-4">
          <div
            className="h-full bg-[#FF5F1F] transition-all duration-150 rounded-full"
            style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollByAmount("left")}
            className="px-3 py-1.5 border border-black/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors duration-200 tracking-[0.2em] bg-white/40 backdrop-blur-xs"
            aria-label="Previous sketch"
          >
            [ ← ]
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="px-3 py-1.5 border border-black/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F] transition-colors duration-200 tracking-[0.2em] bg-white/40 backdrop-blur-xs"
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

  const handleMouseEnter = () => {
    if (!sketch.isImage && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!sketch.isImage && videoRef.current) {
      videoRef.current.pause();
      if (sketch.posterTime !== undefined) {
        videoRef.current.currentTime = sketch.posterTime;
      }
    }
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
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
