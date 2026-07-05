"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
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

function SketchCard({ video, label, poster, posterTime, isImage, image, aspect }: {
  video?: string;
  isImage?: boolean;
  image?: string;
  label: string;
  poster?: string;
  posterTime?: number;
  aspect: number;
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
      className="group relative overflow-hidden bg-black"
      style={{ flex: aspect }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isImage && videoRef.current?.play()}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="absolute inset-0 scale-[1.01] will-change-transform">
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

const SKETCHES = [
  { id: "apollo",       video: "/sketches_01.mp4",          label: "Houdini // APOLLO",              aspect: 16 / 9, posterTime: 1.5 },
  { id: "brainpop",     video: "/sketches_brainpop.mp4",    label: "Houdini // BRAINPOP",            aspect: 9 / 16 },
  { id: "pingpong",     video: "/sketches_03.mp4",          label: "Houdini // PING-PONG",           aspect: 16 / 9 },
  { id: "racket",       video: "/sketches_racket.mp4",      label: "Houdini // PING-PONG ALGORITHM", aspect: 1 / 1 },
  { id: "paetochki",    video: "/sketches_paetochki.mp4",   label: "Houdini // PAETOCHKI",           aspect: 4 / 5 },
  { id: "skull",        video: "/sketches_skull.mp4",       label: "C4D // SKULL COLLAB",            aspect: 9 / 16 },
  { id: "statue",       video: "/sketches_statue.mp4",      label: "C4D // STATUE COLLAB",           aspect: 9 / 16,  poster: "/sketches_statue_poster.png" },
  { id: "plastic_cube", isImage: true, image: "/sketches_plastic_cube.png", label: "C4D // CUBE³ WALLPAPER", aspect: 9 / 16 },
  { id: "phone_pillow", video: "/sketches_phone_pillow.mp4",label: "C4D // PHONE PILLOW",            aspect: 16 / 9 },
  { id: "trans_cube",   video: "/sketches_trans_cube.mp4",  label: "C4D // TRANS CUBE",              aspect: 4 / 5,   poster: "/sketches_trans_cube_poster.png" },
];

// Row groupings: each sub-array fills its row completely via flex:aspect
// Desktop: 3 rows — Row 1 wide/narrow/wide, Row 2 mixed, Row 3 portrait+wide+portrait
// Mobile: 5 rows of 2
const DESKTOP_ROWS = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9]];
const MOBILE_ROWS  = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]];

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

        <div className="px-[18px] pb-16 flex flex-col gap-[2px]">
          {(isMobile ? MOBILE_ROWS : DESKTOP_ROWS).map((indices, ri) => (
            <div
              key={ri}
              className="flex gap-[2px] w-full overflow-hidden"
              style={{ height: isMobile ? 160 : 300 }}
            >
              {indices.map(i => {
                const s = SKETCHES[i];
                return (
                  <SketchCard
                    key={s.id}
                    video={s.video}
                    isImage={s.isImage}
                    image={s.image}
                    label={s.label}
                    poster={s.poster}
                    posterTime={s.posterTime}
                    aspect={s.aspect}
                  />
                );
              })}
            </div>
          ))}
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
