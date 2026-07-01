"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent } from "react";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LoadingScreen from "./LoadingScreen";
import ViewCursor from "./ViewCursor";
import ScrollToTop from "./ScrollToTop";
import ScrollMarquee from "./ScrollMarquee";
import ProjectOverlay from "./ProjectOverlay";
import { PROJECTS_DATA } from "./data/projects";

// --- Project Card Component ---
interface ProjectCardProps {
  id: string;
  data: any;
  onClick: (id: string) => void;
  className?: string;
  isFeatured?: boolean;
}

function ProjectCard({ id, data, onClick, className = "", isFeatured = false }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      data-view-cursor
      onClick={() => onClick(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden rounded-sm cursor-none ${className}`}
    >
      {/* Base Image */}
      <img
        src={data.heroImage}
        alt={data.title}
        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Hover Video */}
      {data.hoverVideo && (
        <video
          ref={videoRef}
          src={data.hoverVideo}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      )}

      {/* Overlay Content */}
      {isFeatured ? (
        <>
          {/* Static Title (fades on hover) */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 transition-opacity duration-300 group-hover:opacity-0">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">{data.category || "Featured"}</p>
            <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white">{data.title}</h3>
          </div>

          {/* Hover Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-12">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-3">{data.category || "Featured"}</p>
              <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white mb-4">{data.title}</h3>
              <p className="font-mono text-sm leading-relaxed text-white/60 max-w-lg mb-6">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.software.map((tag: string) => (
                  <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Default Overlay Content (Small Cards) */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 transition-opacity duration-300 group-hover:opacity-0">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-1">{data.category || "Project"}</p>
            <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white">{data.title}</h3>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-10">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-2">{data.category || "Project"}</p>
              <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white mb-3">{data.title}</h3>
              <p className="font-mono text-xs leading-relaxed text-white/60 max-w-md mb-5">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.software.map((tag: string) => (
                  <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- End Project Card Component ---

function SketchCard({ video, label, poster, className = '', style, cropPx = 0, cropX, posterTime }: {
  video: string;
  label: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  cropPx?: number;
  cropX?: number;
  posterTime?: number;
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

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-black ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="absolute" style={{ top: -cropPx, left: -(cropX ?? cropPx), right: -(cropX ?? cropPx), bottom: 0, willChange: 'transform' }}>
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
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-300">
          <span className="text-[#FF5F1F]/40 group-hover:text-[#FF5F1F]/80 transition-colors duration-300 mr-1.5">⬡</span>{label}
        </p>
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
        <div className="px-[18px] w-full flex flex-col gap-[2px]">

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
              id="the-visit"
              data={PROJECTS_DATA["the-visit"]}
              onClick={openProject}
              className="flex-[6] h-full"
            />
            <ProjectCard
              id="stanley-bottle"
              data={PROJECTS_DATA["stanley-bottle"]}
              onClick={openProject}
              className="flex-[4] h-full"
            />
          </div>
        </div>

        {/* PERSONAL SKETCHES Marquee Header - GSAP Scroll-Linked */}
        <ScrollMarquee className="!border-t !border-b !border-black/5" speed={1.5}>
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

        <div className="px-[18px] pb-16">
          {isMobile ? (
            <div className="grid grid-cols-2 gap-[2px]">
              <SketchCard video="/sketches_01.mp4" label="Houdini // APOLLO" className="aspect-video" posterTime={1.5} />
              <SketchCard video="/sketches_brainpop.mp4" label="Houdini // BRAINPOP" className="aspect-video" />
              <SketchCard video="/sketches_03.mp4" label="Houdini // PING-PONG" className="aspect-video" />
              <SketchCard video="/sketches_racket.mp4" label="Houdini // PING-PONG ALGORITHM" className="aspect-video" />
              <SketchCard video="/sketches_paetochki.mp4" label="Houdini // PAETOCHKI" className="col-span-2 aspect-video" />
            </div>
          ) : (
            <div className="flex gap-[2px]">
              <div className="flex-1 flex flex-col gap-[2px]">
                <SketchCard video="/sketches_01.mp4" label="Houdini // APOLLO" className="aspect-video" posterTime={1.5} />
                <SketchCard video="/sketches_racket.mp4" label="Houdini // PING-PONG ALGORITHM" className="aspect-square" />
              </div>
              <div className="flex-1">
                <SketchCard video="/sketches_brainpop.mp4" label="Houdini // BRAINPOP" className="aspect-[9/16]" cropPx={28} cropX={55} />
              </div>
              <div className="flex-1 flex flex-col gap-[2px]">
                <SketchCard video="/sketches_03.mp4" label="Houdini // PING-PONG" className="aspect-video" />
                <SketchCard video="/sketches_paetochki.mp4" label="Houdini // PAETOCHKI" className="aspect-[4/5]" />
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
