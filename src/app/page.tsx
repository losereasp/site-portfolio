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

function SketchCard({ video, label, poster, className = '', style, cropPx = 0, cropX, posterTime, isImage, image }: {
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
      onMouseEnter={() => !isImage && videoRef.current?.play()}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="absolute" style={{ top: -cropPx, left: -(cropX ?? cropPx), right: -(cropX ?? cropPx), bottom: 0, willChange: 'transform' }}>
        {isImage ? (
          <img
            src={image}
            alt={label}
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
        <ScrollMarquee className="!border-b !border-black/5" speed={1.5}>
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
              <SketchCard video="/sketches_paetochki.mp4" label="Houdini // PAETOCHKI" className="aspect-video" />
              <SketchCard video="/sketches_skull.mp4" label="C4D // SKULL COLLAB" className="aspect-video" />
              <SketchCard video="/sketches_statue.mp4" poster="/sketches_statue_poster.png" label="C4D // STATUE COLLAB" className="aspect-video" />
              <SketchCard isImage image="/sketches_plastic_cube.png" label="C4D // CUBE³ WALLPAPER" className="aspect-video" />
              <SketchCard video="/sketches_phone_pillow.mp4" label="C4D // PHONE PILLOW" className="aspect-video" />
              <SketchCard video="/sketches_trans_cube.mp4" poster="/sketches_trans_cube_poster.png" label="C4D // TRANS CUBE" className="col-span-2 aspect-video" />
            </div>
          ) : (
            <div className="flex gap-[2px]">
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                <SketchCard video="/sketches_01.mp4" label="Houdini // APOLLO" className="aspect-video" posterTime={1.5} />
                <SketchCard video="/sketches_racket.mp4" label="Houdini // PING-PONG ALGORITHM" className="aspect-square" />
                <SketchCard video="/sketches_skull.mp4" label="C4D // SKULL COLLAB" className="aspect-[9/16]" />
              </div>
              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                <SketchCard video="/sketches_brainpop.mp4" label="Houdini // BRAINPOP" className="aspect-[9/16]" cropPx={28} cropX={55} />
                <SketchCard video="/sketches_statue.mp4" poster="/sketches_statue_poster.png" label="C4D // STATUE COLLAB" className="aspect-[9/16]" />
                <SketchCard video="/sketches_trans_cube.mp4" poster="/sketches_trans_cube_poster.png" label="C4D // TRANS CUBE" className="aspect-[4/5]" />
              </div>
              {/* Column 3 */}
              <div className="flex-1 flex flex-col gap-[2px]">
                <SketchCard video="/sketches_03.mp4" label="Houdini // PING-PONG" className="aspect-video" />
                <SketchCard video="/sketches_paetochki.mp4" label="Houdini // PAETOCHKI" className="aspect-[4/5]" />
                <SketchCard isImage image="/sketches_plastic_cube.png" label="C4D // CUBE³ WALLPAPER" className="aspect-[9/16]" />
                <SketchCard video="/sketches_phone_pillow.mp4" label="C4D // PHONE PILLOW" className="aspect-video" />
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
