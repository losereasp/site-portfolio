"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import BeforeAfterSlider from "./BeforeAfterSlider";
import BeforeAfterVideoSlider from "./BeforeAfterVideoSlider";
import Magnetic from "./Magnetic";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically load the heavy 3D viewer only when the overlay opens
const AssetViewer = dynamic(() => import("./AssetViewer"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-[2px] bg-[#FF5F1F] animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF5F1F]">Initializing 3D Core...</span>
      </div>
    </div>
  )
});

interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    software: string[];
    heroImage: string;
    beforeImage?: string;
    afterImage?: string;
    beforeVideo?: string;
    afterVideo?: string;
    assets: string[];
    hoverVideo?: string;
    modelPath?: string;
    styleframes?: string[];
    storyboardImage?: string;
    thematicHeader?: string;
    category?: string;
    youtubeId?: string;
  };
  onSelectProject?: (id: string) => void;
  currentProjectId?: string;
}

const PROJECT_ORDER = ["frost-core", "rampage-rally", "the-visit", "stanley-bottle"];
const PROJECT_TITLES: Record<string, string> = {
  "frost-core": "FROST CORE",
  "rampage-rally": "RAMPAGE RALLY",
  "the-visit": "THE VISIT",
  "stanley-bottle": "STANLEY BOTTLE",
};

export default function ProjectOverlay({ 
  isOpen, 
  onClose, 
  project, 
  onSelectProject, 
  currentProjectId 
}: ProjectOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  const assetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevRects = useRef<Map<number, DOMRect>>(new Map());

  const getIndex = () => {
    if (currentProjectId) {
      const idx = PROJECT_ORDER.indexOf(currentProjectId);
      if (idx !== -1) return idx;
    }
    const titleLower = project.title.toLowerCase();
    if (titleLower.includes("frost")) return PROJECT_ORDER.indexOf("frost-core");
    if (titleLower.includes("rampage")) return PROJECT_ORDER.indexOf("rampage-rally");
    if (titleLower.includes("visit")) return PROJECT_ORDER.indexOf("the-visit");
    if (titleLower.includes("stanley")) return PROJECT_ORDER.indexOf("stanley-bottle");
    return 0;
  };

  const currentIndex = getIndex();
  const prevIndex = (currentIndex - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length;
  const nextIndex = (currentIndex + 1) % PROJECT_ORDER.length;
  const prevId = PROJECT_ORDER[prevIndex];
  const nextId = PROJECT_ORDER[nextIndex];
  const prevTitle = PROJECT_TITLES[prevId] || prevId.toUpperCase();
  const nextTitle = PROJECT_TITLES[nextId] || nextId.toUpperCase();

  // FLIP Animation Engine - Professional Layout transitions
  useLayoutEffect(() => {
    const items = assetRefs.current.filter(Boolean) as HTMLDivElement[];
    items.forEach((item, i) => {
      const first = prevRects.current.get(i);
      if (!first) return;

      const last = item.getBoundingClientRect();
      
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      // Kill any current animations to prevent jitter
      gsap.killTweensOf(item);

      // Invert & Play
      gsap.from(item, {
        x: deltaX,
        y: deltaY,
        scaleX: deltaW,
        scaleY: deltaH,
        duration: 0.9,
        ease: "expo.out",
        clearProps: "transform",
        overwrite: "auto",
      });
    });
  }, [expandedIndex]);

  // Global keydown handler for hotkeys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "Escape") {
        if (activeLightbox) {
          setActiveLightbox(null);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (onSelectProject) {
          const idx = getIndex();
          const prevIdx = (idx - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length;
          onSelectProject(PROJECT_ORDER[prevIdx]);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (onSelectProject) {
          const idx = getIndex();
          const nextIdx = (idx + 1) % PROJECT_ORDER.length;
          onSelectProject(PROJECT_ORDER[nextIdx]);
        }
        return;
      }

      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (videoPlayerRef.current) {
          if (isPlaying) {
            videoPlayerRef.current.pause();
            setIsPlaying(false);
          } else {
            videoPlayerRef.current.play();
            setIsPlaying(true);
          }
        }
        return;
      }

      if (e.key === "m" || e.key === "M" || e.code === "KeyM") {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeLightbox, currentProjectId, isPlaying, isMuted, onSelectProject, onClose, project]);

  const handleAssetClick = (i: number) => {
    // 1. Capture "First" state for all items
    const rects = new Map<number, DOMRect>();
    assetRefs.current.forEach((ref, index) => {
      if (ref) rects.set(index, ref.getBoundingClientRect());
    });
    prevRects.current = rects;

    // 2. Update state to trigger re-layout
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Backdrop fade in
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Content slide up
      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.1,
      });

      // Make root visible
      gsap.set(overlayRef.current, { visibility: "visible" });

    } else {
      if (!contentRef.current || !backdropRef.current || !overlayRef.current) return;

      gsap.to(contentRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "expo.in",
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: "hidden" });
          document.body.style.overflow = "auto";
        },
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleSidebarPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoPlayerRef.current) return;
    if (isPlaying) {
      videoPlayerRef.current.pause();
    } else {
      videoPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoPlayerRef.current) {
      videoPlayerRef.current.volume = val;
      if (val > 0) {
        videoPlayerRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoPlayerRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  if (!isOpen && !overlayRef.current) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center invisible"
    >
      {/* Backdrop - blurred background - Fades in separately */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer opacity-0"
        onClick={onClose}
      />

      {/* Floating Modal Content - Slides up separately */}
      <div 
        ref={contentRef}
        className="relative w-full h-full max-w-[1800px] m-4 md:m-12 bg-[#F0F0EE] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-sm translate-y-full"
      >
        {/* 1. HERO SCREEN (DARK) */}
      <section className="relative w-full h-screen bg-black overflow-hidden">
        <img 
          src={project.heroImage} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-75"
        />
        
        {/* Top shadow gradient for header readability */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/75 to-transparent pointer-events-none z-10" />
        
        {/* Bottom shadow gradient for title readability */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
        
        {/* Absolute Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-12 flex justify-between items-center z-20">
          {/* Header Navigation Buttons */}
          {onSelectProject ? (
            <div className="flex items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/10 text-white font-mono text-[10px] md:text-xs">
              <button 
                onClick={() => onSelectProject(prevId)}
                className="hover:text-[#FF5F1F] transition-colors flex items-center gap-1.5 uppercase font-medium"
                title={`Navigate to ${prevTitle}`}
              >
                <span>[ ← PREV ]</span>
                <span className="hidden sm:inline text-white/50 font-normal text-[9px] md:text-[10px] ml-0.5">{prevTitle}</span>
              </button>
              <span className="text-white/20 font-light">|</span>
              <button 
                onClick={() => onSelectProject(nextId)}
                className="hover:text-[#FF5F1F] transition-colors flex items-center gap-1.5 uppercase font-medium"
                title={`Navigate to ${nextTitle}`}
              >
                <span className="hidden sm:inline text-white/50 font-normal text-[9px] md:text-[10px] mr-0.5">{nextTitle}</span>
                <span>[ NEXT → ]</span>
              </button>
            </div>
          ) : <div />}

          <Magnetic>
            <button 
              onClick={onClose}
              className="font-mono text-xs md:text-sm text-white hover:text-[#FF5F1F] hover:underline underline-offset-8 transition-all uppercase tracking-widest px-4 py-2"
            >
              ← Back to Work
            </button>
          </Magnetic>
        </div>

        {/* Hero Title Overlay */}
        <div className="absolute bottom-12 left-6 md:left-12 flex flex-col items-start max-w-[90%] pointer-events-none">
           <p className="font-mono text-[10px] md:text-xs text-[#FF5F1F] uppercase tracking-[0.4em] mb-4 ml-1 md:ml-[6px]">Case Study</p>
           <h1 className="font-primary text-4xl md:text-6xl lg:text-[7vw] text-white leading-[0.9] uppercase tracking-normal">
             {project.title}
           </h1>
        </div>
      </section>

      {/* 2. DESCRIPTION BLOCK (LIGHT) */}
      <section className="w-full bg-[#F0F0EE] py-24 md:py-40 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Left: Huge H2 */}
          <div className="md:col-span-12 lg:col-span-7">
            <h2 className="font-primary text-5xl md:text-8xl leading-[0.9] uppercase text-black tracking-normal">
              {project.thematicHeader ? (
                <>
                  {project.thematicHeader}:<br />{project.title}
                </>
              ) : (
                project.category || project.title
              )}
            </h2>
          </div>
          
          {/* Right: Soft & Desc */}
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
            <div className="flex flex-wrap gap-2">
              {project.software.map(soft => (
                <Magnetic key={soft}>
                  <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase px-4 py-2 bg-black text-white cursor-default hover:bg-[#FF5F1F] transition-colors inline-block">
                    [ {soft} ]
                  </span>
                </Magnetic>
              ))}
            </div>
            <p className="font-mono text-sm md:text-base leading-relaxed text-black/70">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* 2.2. STORYBOARD & MOODBOARD BLOCK */}
      {project.storyboardImage && (
        <section className="w-full bg-[#F0F0EE] pb-24 px-6 md:px-12">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-6">
              <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight">Moodboard</h2>
              <div className="flex-1 h-[2px] bg-black/10" />
            </div>
            
            <div className="w-full max-w-[1700px] mx-auto bg-white border border-black/10 shadow-sm rounded-sm overflow-hidden">
              <img 
                src={project.storyboardImage} 
                alt="Storyboard & Moodboard" 
                className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
          </div>
        </section>
      )}
      
      {/* 2.5 CINEMATIC SHOWCASE (UPDATED) */}
      {project.hoverVideo && (
        <section className="w-full bg-[#F0F0EE] px-6 md:px-12 py-12 md:py-20">
          <div 
            className="relative aspect-video w-full max-w-[1700px] mx-auto overflow-hidden rounded-sm shadow-xl group bg-black"
            onClick={toggleSidebarPlay}
          >
            <video 
              ref={videoPlayerRef}
              autoPlay 
              preload="metadata"
              loop 
              muted={isMuted}
              playsInline 
              className="w-full h-full object-cover cursor-pointer"
            >
              <source src={project.hoverVideo} type="video/mp4" />
            </video>
            
            {/* Player visual elements */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />
            
            {/* Play/Pause Large Center Icon (Optional, subtle) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            )}

            {/* Cinematic "Rec" HUD element */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-3">
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isPlaying ? 'bg-[#FF5F1F] animate-pulse' : 'bg-white/40'}`} />
              <span className="font-mono text-[10px] md:text-xs text-white uppercase tracking-[0.3em]">Showcase // {isPlaying ? 'Live' : 'Paused'}</span>
            </div>
            
            {/* Controls HUD */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:right-10 md:left-auto flex items-center gap-4 md:gap-6 z-20">
               {/* Volume Control Group */}
               <div className="flex items-center gap-3 group/vol bg-black/20 backdrop-blur-sm px-3 md:px-5 py-2 md:py-3 rounded-full border border-white/10 hover:border-white/30 transition-all pointer-events-auto">
                 
                 {/* Text Label (Restored) */}
                 <span className="font-mono text-[10px] text-white opacity-40 uppercase tracking-widest hidden lg:block cursor-default">
                   {isMuted ? '[ Click to Unmute ]' : '[ Click to Mute ]'}
                 </span>

                 <button 
                   onClick={toggleMute}
                   className="text-white hover:text-[#FF5F1F] transition-colors"
                 >
                   {isMuted || volume === 0 ? (
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                   ) : (
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                   )}
                 </button>

                 {/* Animated Slider Container */}
                 <div className="flex items-center gap-3 overflow-hidden max-w-0 group-hover/vol:max-w-[200px] transition-all duration-500 ease-out opacity-0 group-hover/vol:opacity-100">
                   <input 
                     type="range" 
                     min="0" 
                     max="1" 
                     step="0.01" 
                     value={isMuted ? 0 : volume} 
                     onChange={handleVolumeChange}
                     className="w-16 md:w-24 h-[2px] bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF5F1F]"
                     onClick={e => e.stopPropagation()}
                   />
                   <span className="font-mono text-[9px] text-white/60 min-w-[30px]">
                     {Math.round((isMuted ? 0 : volume) * 100)}%
                   </span>
                 </div>
               </div>
            </div>

            {/* Left Info HUD */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col gap-1 pointer-events-none">
              <p className="font-mono text-[8px] md:text-[10px] text-white/40 uppercase tracking-widest italic">Full HD Output</p>
              <p className="font-primary text-xl md:text-3xl text-white uppercase tracking-normal">{project.title} // Cinematic</p>
            </div>
          </div>
        </section>
      )}

      {/* 2.8. FULL BREAKDOWN VIDEO (YouTube embed) */}
      {project.youtubeId && (
        <section className="w-full bg-[#111111] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1700px] mx-auto flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight text-white">Full Breakdown</h2>
              <div className="flex-1 h-[2px] bg-white/10" />
              <a
                href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#FF5F1F] transition-colors flex items-center gap-2 shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                YouTube ↗
              </a>
            </div>
            <div className="relative w-full aspect-video overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                title={`${project.title} — Full Breakdown`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. BREAKDOWN BLOCK (Slider) */}
      {project.beforeImage && project.afterImage && (
        <section className="w-full">
          <div className="bg-[#F0F0EE] px-6 md:px-12 pt-24 md:pt-40 pb-12">
            <div className="flex items-center gap-6">
              <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight text-black">Render Comparison</h2>
              <div className="flex-1 h-[2px] bg-black/10" />
            </div>
          </div>
          <div className="bg-black max-w-[1800px] mx-auto">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
            />
          </div>
        </section>
      )}

      {/* 3.2. VIDEO BEFORE/AFTER SLIDER */}
      {project.beforeVideo && project.afterVideo && (
        <section className="w-full bg-[#F0F0EE] px-6 md:px-12 pt-24 md:pt-40 pb-0">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight text-black">Render Comparison</h2>
            <div className="flex-1 h-[2px] bg-black/10" />
          </div>
          <div className="max-w-[1800px] mx-auto">
            <BeforeAfterVideoSlider
              beforeVideo={project.beforeVideo}
              afterVideo={project.afterVideo}
            />
          </div>
        </section>
      )}

      {/* 3.5. STYLEFRAMES BLOCK */}
      {project.styleframes && project.styleframes.length > 0 && (
        <section className="w-full bg-[#F0F0EE] pt-24 md:pt-40 px-6 md:px-12">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-6">
              <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight">Style Frames</h2>
              <div className="flex-1 h-[2px] bg-black/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {project.styleframes.map((sf, index) => {
                const isPortrait = sf.includes('scene_9');
                
                // Determine label based on file name/path
                let label = `Scene ${index + 1} Frame`;
                if (sf.includes('scene_1')) label = 'Scene 1 Frame';
                else if (sf.includes('scene_2')) label = 'Scene 2 Frame';
                else if (sf.includes('scene_6')) label = 'Scene 2 Detail Frame';
                else if (sf.includes('scene_7')) label = 'Scene 2 Detail Frame';
                else if (sf.includes('scene_3')) label = 'Scene 3 Frame';
                else if (sf.includes('scene_8')) label = 'Scene 3 Detail Frame';
                else if (sf.includes('scene_4')) label = 'Scene 4 Frame';
                else if (sf.includes('scene_5')) label = 'Scene 5 Frame';

                return (
                  <div 
                    key={index}
                    className={`relative group overflow-hidden bg-white ${isPortrait ? 'aspect-[5/8]' : 'aspect-video'} border border-black/10 shadow-sm rounded-sm cursor-zoom-in`}
                    onClick={() => setActiveLightbox(sf)}
                  >
                    <Image 
                      src={sf} 
                      alt={label} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-black bg-white px-2.5 py-1 shadow-md z-10">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. ASSETS BLOCK (Bento) */}
      <section className="w-full bg-[#F0F0EE] pt-24 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-6">
            <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight">Asset Breakdown</h2>
            <div className="flex-1 h-[2px] bg-black/10" />
          </div>

          {/* Cinematic Gallery Layout */}
          <div className="flex flex-col gap-[1px] bg-black/10 border border-black overflow-hidden">
            
            {/* 1. PRIMARY FEATURED ASSET (Full Width 16:9) — Only rendered if 3D model is present */}
            {isOpen && project.modelPath && (
              <div className="relative group overflow-hidden bg-white aspect-video w-full border-b border-black/10">
                <AssetViewer modelPath={project.modelPath} />
              </div>
            )}
            
            {/* 2. SECONDARY ASSETS GRID (Row-Grouped Expandable Accordion) */}
            <div className="flex flex-col gap-[1px]">
              {(() => {
                const sliceStart = project.modelPath ? 1 : 0;
                const assetsToRender = project.assets.slice(sliceStart);
                const rowsCount = Math.ceil(assetsToRender.length / 2);
                
                return Array.from({ length: rowsCount }).map((_, rowIndex) => {
                  const startIndex = rowIndex * 2;
                  const rowAssets = assetsToRender.slice(startIndex, startIndex + 2);
                  if (rowAssets.length === 0) return null;

                return (
                  <div key={startIndex} className="flex flex-wrap w-full gap-[1px]">
                    {rowAssets.map((asset, subIndex) => {
                      const globalIndex = startIndex + subIndex;
                      const isVideo = asset.endsWith('.mp4') || asset.endsWith('.webm');
                      const isExpanded = expandedIndex === globalIndex;
                      const isDisplaced = expandedIndex !== null && !isExpanded;
                      const isSolo = rowAssets.length === 1;
                      
                      return (
                        <div 
                          key={globalIndex} 
                          ref={el => { assetRefs.current[globalIndex] = el; }}
                          className={`relative group overflow-hidden bg-white aspect-video border-b border-black/10 last:border-b-0 cursor-pointer overflow-hidden ${
                            isExpanded ? 'w-full z-20 order-[-1]' : isSolo ? 'w-full z-10 order-0' : 'w-full md:w-[calc(50%-0.5px)] z-10 order-0'
                          } ${isDisplaced ? 'opacity-40 grayscale-[0.5]' : 'opacity-100 grayscale-0'}`}
                          onClick={() => handleAssetClick(globalIndex)}
                          style={{ transformOrigin: "0 0" }}
                        >
                          {/* Scanner Effect (Video Only) */}
                          {isVideo && !isExpanded && (
                            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                              <div className="animate-scan" />
                            </div>
                          )}

                          {isVideo ? (
                            <div className="relative w-full h-full">
                              <video 
                                key={asset}
                                src={asset} 
                                autoPlay 
                                preload="metadata"
                                muted={isMuted} 
                                loop 
                                playsInline 
                                onCanPlay={(e) => e.currentTarget.play()}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                              />
                              {/* Video HUD Overlay with background shadow for readability */}
                              <div className={`absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                              <div className={`absolute top-4 left-4 z-20 pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 bg-[#FF5F1F] rounded-full animate-pulse shadow-[0_0_8px_#FF5F1F] shrink-0 translate-y-[-1.5px]" />
                                  <span className="font-mono text-[9px] text-white/90 uppercase tracking-[0.2em] drop-shadow-md">
                                    {asset.includes('rampage_start_viewport_animation_car') ? 'Animation // Car Rig Viewport' :
                                     asset.includes('rampage_start_viewport') ? 'Viewport // Start Layout' :
                                     asset.includes('rampage_start') ? 'Render // Start Scene' :
                                     asset.includes('rampage_end_plus') ? 'Render // Final Cut +' :
                                     asset.includes('rampage_test_1') ? 'Concept // Motion Test' :
                                     asset.includes('rampage_roll_car') ? 'Asset // VAZ 2108' :
                                     asset.includes('rampage_roll_buhanka') ? 'Asset // UAZ Bukhanka' :
                                     asset.includes('rampage_roll_future_cars') ? 'Asset // Future Cars' :
                                     asset.includes('rampage_roll_bus') ? 'Asset // Electrobus KAMAZ' :
                                     asset.includes('rampage_roll_helicopter') ? 'Asset // Mi-24 Helicopter' :
                                     asset.includes('rampage_roll_buildings') ? 'Asset // Soviet Blocks' :
                                     asset.includes('rampage_roll_trees') ? 'Asset // Environment Trees' :
                                     asset.includes('rampage_roll_rain') ? 'FX // Rain Simulation' :
                                     asset.includes('rampage_cascadeur') ? 'Animation // Cascadeur Rig' :
                                     asset.includes('breakdown_character') ? 'Character animation' :
                                     asset.includes('rampage_clay_env') ? 'Viewport // Environment' :
                                     asset.includes('rampage_clay_pov') ? 'Viewport // Camera POV' :
                                     asset.includes('rampage_crash_1') ? 'Physics // Crash Simulation' :
                                     asset.includes('rampage_crash_2') ? 'Physics // Impact Study' :
                                     asset.includes('rampage_crash_3') ? 'Physics // Debris Dynamics' :
                                     asset.includes('scene_') ? 'C4D Simulation Render' :
                                     asset.includes('light_layers') ? 'Lighting Layers' : 'Processing Stream'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full h-full">
                              <Image 
                                src={asset} 
                                alt={`Asset ${globalIndex+2}`} 
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                              />
                            </div>
                          )}
                          
                          {/* Expand Affordance Overlay */}
                          {!isExpanded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                              <div className="flex flex-col items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md bg-white/5">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                </div>
                                <span className="font-mono text-[10px] text-white uppercase tracking-[0.4em] font-bold">[ Click to Expand ]</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 duration-500" />
                          
                          <div className={`absolute bottom-6 left-6 font-mono text-[8px] md:text-[10px] uppercase tracking-widest transition-all duration-500 ease-in-out text-black bg-white px-3 py-1 z-10 shadow-lg ${
                            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
                          }`}>
                            {asset.includes('rampage_start_viewport_animation_car') ? 'Start Scene — Car Animation Viewport' :
                             asset.includes('rampage_start_viewport') ? 'Start Scene — Viewport Blocking' :
                             asset.includes('rampage_start') ? 'Start Scene — Final Lighting Render' :
                             asset.includes('rampage_end_plus') ? 'End Scene — Final Lighting Render' :
                             asset.includes('rampage_test_1') ? 'Initial Scene Concept Test' :
                             asset.includes('rampage_roll_car') ? 'VAZ 2108 — Hero Vehicle' :
                             asset.includes('rampage_roll_buhanka') ? 'UAZ Bukhanka — Postal Van' :
                             asset.includes('rampage_roll_future_cars') ? 'Future Cars — Background Props' :
                             asset.includes('rampage_roll_bus') ? 'Electrobus KAMAZ-6282' :
                             asset.includes('rampage_roll_helicopter') ? 'Mi-24 — Military Helicopter' :
                             asset.includes('rampage_roll_buildings') ? 'Soviet Residential Blocks' :
                             asset.includes('rampage_roll_trees') ? 'Environment Trees' :
                             asset.includes('rampage_roll_rain') ? 'Rain FX Simulation' :
                             asset.includes('rampage_cascadeur') ? 'Cascadeur — Character Animation' :
                             asset.includes('rampage_clay_env') ? 'End Scene — Viewport Blocking' :
                             asset.includes('rampage_clay_pov') ? 'End Scene — Final animation' :
                             asset.includes('rampage_crash_1') ? 'Crash Physics Simulation' :
                             asset.includes('rampage_crash_2') ? 'Impact Dynamics Study' :
                             asset.includes('rampage_crash_3') ? 'Debris Simulation Pass' :
                             asset.includes('rampage_keyvisual') ? 'Final Key Visual' :
                             asset.includes('breakdown_character') ? 'Cascadeur Technical Breakdown' :
                             asset.includes('detail_4') ? 'Unreal Engine Viewport' : 
                             asset.includes('detail_1') ? 'After Effects Compositing' : 
                             asset.includes('detail_2') ? 'Substance Painter Texturing' : 
                             asset.includes('3.gif') ? 'Material macro look-dev loop' :
                             asset.includes('4.png') ? 'Studio lighting styleframe' :
                             asset.includes('scene_1_collect') ? 'Scene assembly loop' :
                             asset.includes('scene_2_collect+') ? 'Motion & camera layout' :
                             asset.includes('scene_2_collect') ? 'Simulation dynamics' :
                             asset.includes('scene_4_collect') ? 'Reflection details' :
                             asset.includes('scene_5_collect_+1+') ? 'Final compositing breakdown' :
                             asset.includes('scene_5_collect_+1') ? 'Post-processing pass' :
                             asset.includes('Screenshot_1.png') ? 'Cinema 4D layout snapshot' :
                             asset.includes('light_layers') ? 'Light Layer Composition' :
                             `Technical Analysis #${globalIndex + 1}`}
                          </div>

                          {/* Expand/Contract Indicator (Small Corner) */}
                          <div className="absolute top-6 right-6 z-40">
                            <div className={`transition-all duration-500 border border-white/20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center h-8 w-8 text-white ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
              })()}
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* Lightbox Fullscreen Modal */}
    {activeLightbox && (
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center cursor-zoom-out select-none"
        onClick={() => setActiveLightbox(null)}
      >
        {/* Close Button */}
        <button 
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors cursor-pointer p-2 z-[110]"
          onClick={() => setActiveLightbox(null)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image Container */}
        <div 
          className="relative w-full h-full max-w-[92vw] max-h-[92vh] flex items-center justify-center animate-lightbox"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={activeLightbox} 
            alt="Style Frame Fullscreen" 
            className="max-w-full max-h-full object-contain shadow-2xl border border-white/5" 
          />
        </div>
      </div>
    )}

    {/* Floating Monospace Hotkey Legend Bar */}
    {isOpen && !activeLightbox && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[105] pointer-events-none">
        <div className="bg-black/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-2xl flex flex-wrap items-center justify-center gap-2 md:gap-3 font-mono text-[9px] md:text-[11px] text-white uppercase tracking-wider">
          <span className="text-[#FF5F1F] font-semibold">[ ← → NAVIGATE ]</span>
          <span className="text-white/30">•</span>
          <span className="text-[#FF5F1F] font-semibold">[ SPACE PLAY/PAUSE ]</span>
          <span className="text-white/30">•</span>
          <span className="text-[#FF5F1F] font-semibold">[ M MUTE ]</span>
          <span className="text-white/30">•</span>
          <span className="text-[#FF5F1F] font-semibold">[ ESC CLOSE ]</span>
        </div>
      </div>
    )}
  </div>
);
}
