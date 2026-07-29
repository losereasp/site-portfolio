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
import SketchesReel, { type SketchItem } from "./SketchesReel";

function SketchLightbox({ sketch, onClose }: { sketch: SketchItem | null; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sketch) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sketch, onClose]);

  useEffect(() => {
    if (sketch && !sketch.isImage && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [sketch]);

  if (!sketch) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Media container */}
      <div
        className="relative flex items-center justify-center animate-lightbox"
        style={{ maxWidth: '92vw', maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}
      >
        {sketch.isImage ? (
          <img
            src={sketch.image}
            alt={sketch.label}
            style={{ maxWidth: '92vw', maxHeight: '84vh', display: 'block' }}
          />
        ) : (
          <video
            ref={videoRef}
            src={sketch.video}
            poster={sketch.poster}
            loop
            muted
            playsInline
            style={{ maxWidth: '92vw', maxHeight: '84vh', display: 'block' }}
          />
        )}

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 md:p-6 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/60">
            <span className="text-[#FF5F1F]/70 mr-1.5">⬡</span>{sketch.label}
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">ESC — закрыть</p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-[#FF5F1F] transition-colors duration-200 cursor-pointer"
      >
        [×]
      </button>
    </div>
  );
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

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const [openSketch, setOpenSketch] = useState<SketchItem | null>(null);
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

        <div className="pb-16">
          <SketchesReel sketches={SKETCHES} onOpenSketch={(sketch) => setOpenSketch(sketch)} />
        </div>

      </section>

      {/* Spacer Work → Footer */}
      <div className="h-[120px] md:h-[160px] bg-[#F0F0EE] w-full" />

      {/* Footer Section */}
      <Footer />

      {/* Sketch Lightbox */}
      <SketchLightbox sketch={openSketch} onClose={() => setOpenSketch(null)} />

      {/* Case Study Overlay */}
      <ProjectOverlay
        isOpen={!!selectedProject}
        onClose={closeProject}
        project={selectedProject || activeData || PROJECTS_DATA["frost-core"]}
      />
    </main>
  );
}
