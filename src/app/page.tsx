"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LoadingScreen from "./LoadingScreen";
import ViewCursor from "./ViewCursor";
import ScrollToTop from "./ScrollToTop";
import ScrollMarquee from "./ScrollMarquee";
import ProjectOverlay from "./ProjectOverlay";
import ProjectCard from "./ProjectCard";
import Magnetic from "./Magnetic";
import { PROJECTS_DATA } from "./data/projects";

const SKETCHES_DATA = [
  {
    id: "01",
    label: "Houdini // APOLLO",
    video: "/sketches_01.mp4",
    software: "HOUDINI",
    engine: "VELLUM CLOTH",
    specs: "840K PARTICLES",
    cache: "4.2 GB",
    status: "CACHED",
    posterTime: 1.5,
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 1,
    aspect: "aspect-video"
  },
  {
    id: "02",
    label: "Houdini // BRAINPOP",
    video: "/sketches_brainpop.mp4",
    software: "HOUDINI",
    engine: "PYRO SPARSE",
    specs: "3.2M PARTICLES",
    cache: "18.5 GB",
    status: "COMPLETE",
    cropPx: 28,
    cropX: 55,
    mobileColSpan: false,
    desktopCol: 2,
    aspect: "aspect-[9/16]"
  },
  {
    id: "03",
    label: "Houdini // PING-PONG",
    video: "/sketches_03.mp4",
    software: "HOUDINI",
    engine: "RBD BULLET",
    specs: "4.5K BODIES",
    cache: "1.8 GB",
    status: "CACHED",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 3,
    aspect: "aspect-video"
  },
  {
    id: "04",
    label: "Houdini // PING-PONG ALGORITHM",
    video: "/sketches_racket.mp4",
    software: "HOUDINI",
    engine: "VEX SCRIPTED",
    specs: "12K ITERATIONS",
    cache: "0.5 GB",
    status: "ACTIVE",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 1,
    aspect: "aspect-square"
  },
  {
    id: "05",
    label: "Houdini // PAETOCHKI",
    video: "/sketches_paetochki.mp4",
    software: "HOUDINI",
    engine: "VELLUM BEADS",
    specs: "18.2K BEADS",
    cache: "6.7 GB",
    status: "COMPLETE",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 3,
    aspect: "aspect-[4/5]"
  },
  {
    id: "06",
    label: "C4D // SKULL COLLAB",
    video: "/sketches_skull.mp4",
    software: "CINEMA 4D",
    engine: "REDSHIFT GPU",
    specs: "1.4M POLYS",
    cache: "RENDER // OK",
    status: "FINISHED",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 1,
    aspect: "aspect-[9/16]"
  },
  {
    id: "07",
    label: "C4D // STATUE COLLAB",
    video: "/sketches_statue.mp4",
    poster: "/sketches_statue_poster.png",
    software: "CINEMA 4D",
    engine: "REDSHIFT GPU",
    specs: "4.8M POLYS",
    cache: "CLAY SHADER",
    status: "FINISHED",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 2,
    aspect: "aspect-[9/16]"
  },
  {
    id: "08",
    label: "C4D // CUBE³ WALLPAPER",
    isImage: true,
    image: "/sketches_plastic_cube.png",
    software: "CINEMA 4D",
    engine: "REDSHIFT GPU",
    specs: "2.6M POLYS",
    cache: "4K RE-LOD",
    status: "FINISHED",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 3,
    aspect: "aspect-[9/16]"
  },
  {
    id: "09",
    label: "C4D // PHONE PILLOW",
    video: "/sketches_phone_pillow.mp4",
    software: "CINEMA 4D",
    engine: "C4D SOFTBODY",
    specs: "920K POLYS",
    cache: "PHYSICS OK",
    status: "FINISHED",
    cropPx: 0,
    mobileColSpan: false,
    desktopCol: 3,
    aspect: "aspect-video"
  },
  {
    id: "10",
    label: "C4D // TRANS CUBE",
    video: "/sketches_trans_cube.mp4",
    poster: "/sketches_trans_cube_poster.png",
    software: "CINEMA 4D",
    engine: "REDSHIFT GPU",
    specs: "3.1M POLYS",
    cache: "DISPERSION",
    status: "FINISHED",
    cropPx: 0,
    mobileColSpan: true,
    desktopCol: 2,
    aspect: "aspect-[4/5]"
  }
];

function SketchCard({
  id,
  video,
  label,
  poster,
  className = '',
  style,
  cropPx = 0,
  cropX,
  posterTime,
  isImage,
  image,
  software,
  engine,
  specs,
  cache,
  status,
  aspect
}: {
  id: string;
  video?: string;
  isImage?: boolean;
  image?: string;
  label: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  cropPx?: number;
  cropX?: number;
  posterTime?: number;
  software: string;
  engine: string;
  specs: string;
  cache: string;
  status: string;
  aspect: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (posterTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = posterTime;
    }
  }, [posterTime]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transition = 'transform 0.2s ease-out';
    inner.style.transform = `translate(${dx * 12}px, ${dy * 12}px) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    if (inner) {
      inner.style.transition = 'transform 0.6s ease-out';
      inner.style.transform = '';
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = posterTime ?? 0;
    }
  };

  const cleanLabel = label.replace(/^(Houdini|C4D) \/\/ /, "");

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-surface border border-black/10 rounded-sm flex flex-col transition-all duration-500 hover:border-black/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.03)] ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isImage && videoRef.current?.play()}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 bg-[#FBFBFA]/80 font-mono text-[9px] tracking-[0.1em] uppercase text-black/50 select-none">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-[#FF5F1F] animate-pulse' : 'bg-[#FF5F1F]/40'}`} />
          <span>FILE // REF-{id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-1.5 py-[2px] text-[8px] font-bold tracking-normal leading-none ${software === 'HOUDINI' ? 'bg-black text-white' : 'bg-black/10 text-black/70'} rounded-[2px]`}>
            {software}
          </span>
          <span className="text-black/20 select-none">//</span>
          <span className="text-[#FF5F1F] font-black">{status}</span>
        </div>
      </div>

      {/* Media Viewport */}
      <div className={`relative w-full overflow-hidden bg-black ${aspect}`}>
        <div 
          ref={innerRef} 
          className="absolute inset-0 scale-[1.05] will-change-transform"
          style={{ top: -cropPx, left: -(cropX ?? cropPx), right: -(cropX ?? cropPx), bottom: 0 }}
        >
          {isImage ? (
            <img
              src={image}
              alt={cleanLabel}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              muted
              loop
              playsInline
              preload={posterTime !== undefined ? "auto" : "metadata"}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-[#FBFBFA]/40 font-mono text-[9px] leading-relaxed text-black/60 select-none border-t border-black/5 flex-1 flex flex-col justify-between">
        <div className="font-bold text-black uppercase tracking-[0.12em] mb-2 flex items-center justify-between">
          <span>{cleanLabel}</span>
          <span className="text-[#FF5F1F]/40">⬡</span>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-black/40 pt-1.5 border-t border-black/[0.04]">
          <div><span className="text-black/30 font-bold">[ENGINE]</span> {engine}</div>
          <div><span className="text-black/30 font-bold">[DATA]</span> {specs}</div>
          <div className="col-span-2"><span className="text-black/30 font-bold">[CACHE]</span> {cache}</div>
        </div>
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const isMobile = useIsMobile();
  const openProject = (id: string) => {
    const data = (PROJECTS_DATA as any)[id];
    setActiveData(data);
    setSelectedProject(data);
  };

  const closeProject = () => {
    setSelectedProject(null);
    // Оставляем activeData на время анимации закрытия
    setTimeout(() => {
      setActiveData(null);
    }, 800);
  };

  return (
    <main className="min-h-screen selection:bg-[#FF5F1F] selection:text-white">
      <LoadingScreen />
      <ViewCursor />
      <ScrollToTop />
      <MainNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Work Section — Hybrid Bento Grid */}
      <section id="work" className="w-full bg-[#F0F0EE] text-black">

        {/* SELECTED WORKS Marquee Header - GSAP Scroll-Linked */}
        <ScrollMarquee className="!border-b !border-black/5" speed={2}>
          <h2 className="font-mono text-5xl md:text-8xl uppercase font-black text-[#111111] flex items-center gap-8 md:gap-16">
            <span>Selected Works</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
          </h2>
        </ScrollMarquee>

        {/* Bento Grid Container - Precision side gaps */}
        <div className="px-[18px] w-full flex flex-col gap-[2px] bg-[#F0F0EE]">

          {/* Block 1: Featured — 100% width */}
          <ProjectCard
            id="frost-core"
            data={PROJECTS_DATA["frost-core"]}
            onClick={openProject}
            className="w-full h-[60vh] md:h-[80vh]"
            isFeatured
          />

          {/* Block 2 & 3: Secondary — 60/40 split */}
          <div className="flex flex-col md:flex-row w-full gap-[2px]" style={{ height: "clamp(400px, 70vh, 800px)" }}>
            <ProjectCard
              id="rampage-rally"
              data={PROJECTS_DATA["rampage-rally"]}
              onClick={openProject}
              className="flex-[6] h-full"
            />
            <ProjectCard
              id="the-visit"
              data={PROJECTS_DATA["the-visit"]}
              onClick={openProject}
              className="flex-[4] h-full"
            />
          </div>

          {/* Block 4: Clean Tech/Utility Archive Link */}
          <div className="w-full mt-8 mb-6 font-mono text-[10px] md:text-xs select-none flex justify-end items-center">
            <Magnetic>
              <Link
                href="/work"
                className="group flex items-center gap-2 text-black hover:text-[#FF5F1F] font-bold tracking-[0.3em] transition-colors duration-300 cursor-none"
                data-normal-cursor
              >
                <span>VIEW ARCHIVE</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">[→]</span>
              </Link>
            </Magnetic>
          </div>


        </div>

        {/* PERSONAL SKETCHES Marquee Header - GSAP Scroll-Linked */}
        <ScrollMarquee className="" speed={1.5}>
          <div className="flex items-center gap-8 md:gap-16 font-mono text-5xl md:text-8xl uppercase font-black text-[#111111]">
            <span>Personal Sketches</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
            <span>Explorations</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
            <span>The Lab</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
            <span>R&D</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
          </div>
        </ScrollMarquee>

        {/* R&D System Information Bar */}
        <div className="px-[18px] pb-4 pt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-wider text-black/40 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF5F1F] rounded-full animate-pulse" />
            <span>CLUSTER STATUS: ONLINE</span>
          </div>
          <div>// GPU NODE: ACTIVE</div>
          <div>// VRAM CACHE: 24GB COMPILED</div>
          <div>// VISUALS: BEAUTY + UTILITY LAYERS</div>
          <div className="ml-auto text-black/60 hidden md:block">CORE_INDEX // COMPLETED: 10/10</div>
        </div>

        <div className="px-[18px] pb-16">
          {isMobile ? (
            <div className="grid grid-cols-2 gap-[2px]">
              {SKETCHES_DATA.map((sketch) => (
                <SketchCard
                  key={sketch.id}
                  id={sketch.id}
                  video={sketch.video}
                  poster={sketch.poster}
                  isImage={sketch.isImage}
                  image={sketch.image}
                  label={sketch.label}
                  posterTime={sketch.posterTime}
                  cropPx={sketch.cropPx}
                  cropX={sketch.cropX}
                  software={sketch.software}
                  engine={sketch.engine}
                  specs={sketch.specs}
                  cache={sketch.cache}
                  status={sketch.status}
                  aspect={sketch.aspect}
                  className={sketch.mobileColSpan ? "col-span-2" : ""}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-[2px]">
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                {SKETCHES_DATA.filter((s) => s.desktopCol === 1).map((sketch) => (
                  <SketchCard
                    key={sketch.id}
                    id={sketch.id}
                    video={sketch.video}
                    poster={sketch.poster}
                    isImage={sketch.isImage}
                    image={sketch.image}
                    label={sketch.label}
                    posterTime={sketch.posterTime}
                    cropPx={sketch.cropPx}
                    cropX={sketch.cropX}
                    software={sketch.software}
                    engine={sketch.engine}
                    specs={sketch.specs}
                    cache={sketch.cache}
                    status={sketch.status}
                    aspect={sketch.aspect}
                  />
                ))}
              </div>
              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                {SKETCHES_DATA.filter((s) => s.desktopCol === 2).map((sketch) => (
                  <SketchCard
                    key={sketch.id}
                    id={sketch.id}
                    video={sketch.video}
                    poster={sketch.poster}
                    isImage={sketch.isImage}
                    image={sketch.image}
                    label={sketch.label}
                    posterTime={sketch.posterTime}
                    cropPx={sketch.cropPx}
                    cropX={sketch.cropX}
                    software={sketch.software}
                    engine={sketch.engine}
                    specs={sketch.specs}
                    cache={sketch.cache}
                    status={sketch.status}
                    aspect={sketch.aspect}
                  />
                ))}
              </div>
              {/* Column 3 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                {SKETCHES_DATA.filter((s) => s.desktopCol === 3).map((sketch) => (
                  <SketchCard
                    key={sketch.id}
                    id={sketch.id}
                    video={sketch.video}
                    poster={sketch.poster}
                    isImage={sketch.isImage}
                    image={sketch.image}
                    label={sketch.label}
                    posterTime={sketch.posterTime}
                    cropPx={sketch.cropPx}
                    cropX={sketch.cropX}
                    software={sketch.software}
                    engine={sketch.engine}
                    specs={sketch.specs}
                    cache={sketch.cache}
                    status={sketch.status}
                    aspect={sketch.aspect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </section>

      {/* Spacer Work → Footer */}
      <div className="h-[120px] md:h-[160px] bg-[#F0F0EE] w-full" />

      {/* Footer Section */}
      <Footer />

      {/* Case Study Overlay */}
      <ProjectOverlay
        isOpen={!!selectedProject}
        onClose={closeProject}
        project={selectedProject || activeData || PROJECTS_DATA["frost-core"]}
      />
    </main>
  );
}
