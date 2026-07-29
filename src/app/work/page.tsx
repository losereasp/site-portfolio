"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";
import ViewCursor from "../ViewCursor";
import ScrollToTop from "../ScrollToTop";
import ProjectOverlay from "../ProjectOverlay";
import Magnetic from "../Magnetic";
import { PROJECTS_DATA } from "../data/projects";

// Full archive order
const ALL_IDS = ["frost-core", "the-visit", "rampage-rally", "stanley-bottle"];

// Technical metadata for the archive view
const PROJECT_METADATA: Record<string, { year: string; index: string }> = {
  "frost-core": { index: "01", year: "2026" },
  "the-visit": { index: "02", year: "2026" },
  "rampage-rally": { index: "03", year: "2025" },
  "stanley-bottle": { index: "04", year: "2024" },
};

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayProject, setDisplayProject] = useState<any>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  // Sync displayProject with hoveredId with delay on cleanup to cover exit animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (hoveredId) {
      setDisplayProject(PROJECTS_DATA[hoveredId as keyof typeof PROJECTS_DATA]);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayProject(null);
      }, 300); // matches the GSAP exit duration
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [hoveredId]);

  const openProject = (id: string) => {
    const data = (PROJECTS_DATA as any)[id];
    setActiveData(data);
    setSelectedProject(data);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setTimeout(() => setActiveData(null), 800);
  };

  // Staggered entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate header title & metadata
      tl.fromTo(".animate-header-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.08 }
      );

      // Animate table header
      tl.fromTo(".animate-table-header",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Animate rows
      tl.fromTo(".animate-row",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "expo.out", stagger: 0.06 },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  // Floating preview cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hoveredId || !previewRef.current) return;

      // Position the preview slightly offset from the cursor
      gsap.to(previewRef.current, {
        x: e.clientX + 30,
        y: e.clientY - 90,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    if (hoveredId) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredId]);

  // Preview card opacity & scale animation on hover state change
  useEffect(() => {
    if (previewRef.current) {
      if (hoveredId) {
        gsap.to(previewRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(previewRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [hoveredId]);

  // Use displayProject for the preview to avoid the content disappearing instantly before fade animation ends

  return (
    <main className="min-h-screen bg-[#F0F0EE] text-[#111111] selection:bg-[#FF5F1F] selection:text-white">
      <ViewCursor />
      <ScrollToTop />
      <MainNavbar lightMode />

      {/* Header */}
      <section className="max-w-[1800px] w-full mx-auto px-[18px] md:px-8 pt-32 lg:pt-48 pb-10 md:pb-16 select-none">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#FF5F1F] mb-4 animate-header-item opacity-0">
              Archive Index // Dataset
            </p>
            <h1 className="font-primary text-6xl md:text-8xl lg:text-[7.5vw] leading-[0.9] uppercase text-black tracking-normal animate-header-item opacity-0">
              Project Archive
            </h1>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/30 mt-4 animate-header-item opacity-0">
              {ALL_IDS.length} Entries Indexed // {new Date().getFullYear()}
            </p>
          </div>
          <Magnetic>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-black/60 hover:text-black transition-colors cursor-pointer self-start md:self-auto animate-header-item opacity-0"
            >
              <span className="text-[#FF5F1F] transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>Back Home</span>
            </Link>
          </Magnetic>
        </div>
        <div className="w-full h-[1px] bg-black/10 mt-8 md:mt-12 animate-header-item opacity-0" />
      </section>

      {/* Archive Index Table */}
      <section className="px-[18px] md:px-8 max-w-[1800px] mx-auto w-full pb-32">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col w-full">
          {/* Table Header */}
          <div className="flex border-b-[2px] border-black/20 pb-4 text-[10px] font-mono tracking-[0.35em] text-black/40 uppercase select-none animate-table-header opacity-0">
            <div className="w-[8%]">INDEX</div>
            <div className="w-[32%]">PROJECT TITLE</div>
            <div className="w-[25%]">CATEGORY / FORMAT</div>
            <div className="w-[25%]">BUILDING STACK</div>
            <div className="w-[10%] text-right">YEAR</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {ALL_IDS.map((id) => {
              const project = PROJECTS_DATA[id as keyof typeof PROJECTS_DATA];
              const meta = PROJECT_METADATA[id];
              return (
                <div
                  key={id}
                  onClick={() => openProject(id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="animate-row opacity-0 group flex items-center border-b border-black/10 py-8 cursor-pointer transition-all duration-300 hover:bg-[#FF5F1F]/5 select-none"
                >
                  {/* Index */}
                  <div className="w-[8%] font-mono text-xs text-black/40 group-hover:text-black/80 transition-colors">
                    [{meta.index}]
                  </div>

                  {/* Title */}
                  <div className="w-[32%] font-primary text-3xl lg:text-4xl xl:text-5xl uppercase tracking-normal text-black group-hover:text-[#FF5F1F] group-hover:translate-x-2 transition-all duration-500 ease-out">
                    {project.title}
                  </div>

                  {/* Category */}
                  <div className="w-[25%] font-mono text-xs uppercase tracking-[0.15em] text-black/50 group-hover:text-black/80 transition-colors">
                    {project.category}
                  </div>

                  {/* Stack */}
                  <div className="w-[25%] flex flex-wrap gap-1.5">
                    {project.software.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border border-black/10 rounded-sm text-black/60 group-hover:border-black/30 group-hover:text-black transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.software.length > 4 && (
                      <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 text-black/40">
                        +{project.software.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Year */}
                  <div className="w-[10%] text-right font-mono text-xs text-black/40 group-hover:text-black/80 transition-colors">
                    {meta.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout (stacked view for small screens) */}
        <div className="flex md:hidden flex-col gap-6 w-full animate-row opacity-0">
          {ALL_IDS.map((id) => {
            const project = PROJECTS_DATA[id as keyof typeof PROJECTS_DATA];
            const meta = PROJECT_METADATA[id];
            return (
              <div
                key={id}
                onClick={() => openProject(id)}
                className="flex flex-col gap-2 pb-6 border-b border-black/10 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-[#FF5F1F]">{meta.index}</span>
                    <h3 className="font-primary text-3xl uppercase leading-none text-black">{project.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-black/50">{meta.year}</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-black/40">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.software.map((tool) => (
                    <span key={tool} className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border border-black/10 rounded-sm text-black/60">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Floating Preview Card (Desktop Only) */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 pointer-events-none z-[200] opacity-0 scale-90 w-80 h-48 bg-black border border-black/20 overflow-hidden shadow-2xl rounded-sm hidden md:block"
        style={{ willChange: "transform, opacity" }}
      >
        {displayProject && (
          <div className="relative w-full h-full">
            {displayProject.hoverVideo ? (
              <video
                key={displayProject.title}
                src={displayProject.hoverVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={displayProject.heroImage}
                alt={displayProject.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Retro grid coordinate overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 flex flex-col pointer-events-none">
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#FF5F1F] uppercase">PREVIEW CORE // DATA</span>
              <span className="font-primary text-lg text-white uppercase leading-none mt-1">{displayProject.title}</span>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Case Study Overlay */}
      <ProjectOverlay
        isOpen={!!selectedProject}
        onClose={closeProject}
        project={selectedProject || activeData || PROJECTS_DATA[ALL_IDS[0] as keyof typeof PROJECTS_DATA]}
        onSelectProject={openProject}
        currentProjectId={selectedProject ? Object.keys(PROJECTS_DATA).find(key => (PROJECTS_DATA as any)[key] === selectedProject) : undefined}
      />
    </main>
  );
}
