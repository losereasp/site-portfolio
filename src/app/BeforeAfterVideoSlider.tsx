"use client";

import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterVideoSliderProps {
  beforeVideo: string;
  afterVideo: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterVideoSlider({
  beforeVideo,
  afterVideo,
  beforeLabel = "CLAY RENDER",
  afterLabel = "FINAL RENDER",
}: BeforeAfterVideoSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);
  const beforeRef = useRef<HTMLVideoElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const onMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };

  // Sync before to after on timeupdate
  useEffect(() => {
    const after = afterRef.current;
    const before = beforeRef.current;
    if (!after || !before) return;
    const sync = () => {
      if (Math.abs(before.currentTime - after.currentTime) > 0.15) {
        before.currentTime = after.currentTime;
      }
    };
    after.addEventListener('timeupdate', sync);
    return () => after.removeEventListener('timeupdate', sync);
  }, []);

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden cursor-ew-resize select-none bg-black"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After video — full background */}
      <video
        ref={afterRef}
        src={afterVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before video — clipped to left of slider */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <video
          ref={beforeRef}
          src={beforeVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Before Label (Clipped to the left side of the slider) */}
        <div className="absolute top-6 left-6 font-mono text-[10px] uppercase bg-black/50 text-white px-2 py-1 tracking-widest">
          {beforeLabel}
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#FF5F1F] flex items-center justify-center border border-black shadow-[0_0_20px_rgba(255,95,31,0.4)]">
          <div className="flex gap-1">
            <div className="w-[1px] h-4 bg-black" />
            <div className="w-[1px] h-4 bg-black" />
            <div className="w-[1px] h-4 bg-black" />
          </div>
        </div>
      </div>

      {/* After label — clipped to the right side of the slider */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <div className="absolute top-6 right-6 font-mono text-[10px] uppercase bg-black/50 text-white px-2 py-1 tracking-widest">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}
