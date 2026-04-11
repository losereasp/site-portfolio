"use client";

import { useState } from "react";
import Link from "next/link";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ViewCursor from "./ViewCursor";
import ScrollToTop from "./ScrollToTop";
import ScrollMarquee from "./ScrollMarquee";
import ProjectOverlay from "./ProjectOverlay";

// Project Data mocking
const PROJECTS_DATA = {
  "abstract-fluid": {
    title: "Abstract Fluid",
    description: "Procedural fluid & glass simulation with hyper-realistic dispersion. Full lookdev pipeline from geometry to final comp using custom Houdini solvers.",
    software: ["Houdini", "Redshift", "LookDev", "Compositing"],
    heroImage: "/cg_abstract_sim_1775891741500.png",
    beforeImage: "/cg_abstract_sim_1775891741500.png", // Use same as placeholder for now
    afterImage: "/cg_abstract_sim_1775891741500.png",
    assets: [
      "/cg_abstract_sim_1775891741500.png",
      "/cg_nature_1775891782712.png",
      "/cg_scifi_mech_1775891765789.png",
      "/cg_environment_1775891723289.png"
    ]
  },
  "cyber-alley": {
    title: "Frostpunk Environment",
    description: "A deep dive into procedural environment generation for a post-apocalyptic frozen landscape. Focus on volumetric shader work and high-fidelity asset scattering in Unreal Engine 5.",
    software: ["UE5", "Blender", "Substance", "Houdini"],
    heroImage: "/cg_environment_1775891723289.png",
    beforeImage: "/cg_nature_1775891782712.png", // Wireframe mock
    afterImage: "/cg_environment_1775891723289.png",
    assets: [
      "/cg_environment_1775891723289.png",
      "/cg_scifi_mech_1775891765789.png",
      "/cg_nature_1775891782712.png",
      "/cg_abstract_sim_1775891741500.png"
    ]
  },
  "mech-drone": {
    title: "Mech Drone",
    description: "Hard-surface drone concept. Clean edge-flow modeling with PBR texturing and dramatic studio lighting for high-end cinematic production.",
    software: ["C4D", "Octane", "Hard Surface", "PBR"],
    heroImage: "/cg_scifi_mech_1775891765789.png",
    beforeImage: "/cg_scifi_mech_1775891765789.png",
    afterImage: "/cg_scifi_mech_1775891765789.png",
    assets: [
      "/cg_scifi_mech_1775891765789.png",
      "/cg_nature_1775891782712.png",
      "/cg_abstract_sim_1775891741500.png",
      "/cg_environment_1775891723289.png"
    ]
  }
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);

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
      <ViewCursor />
      <ScrollToTop />
      <MainNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Work Section — Hybrid Bento Grid */}
      <section id="work" className="w-full bg-[#F0F0EE] text-black">

        {/* SELECTED WORKS Marquee Header - GSAP Scroll-Linked */}
        <ScrollMarquee className="!border-b !border-black/5" speed={2}>
          <h2 className="font-mono text-5xl md:text-8xl tracking-[-0.02em] uppercase font-black text-[#111111] flex items-center gap-8 md:gap-16">
            <span>Selected Works</span>
            <span className="w-4 h-4 md:w-6 md:h-6 bg-[#FF5F1F] rounded-full" />
          </h2>
        </ScrollMarquee>

        {/* Bento Grid Container - Precision side gaps */}
        <div className="px-[18px] w-full flex flex-col gap-[2px]">
          
          {/* Block 1: Featured — 100% width */}
          <div 
            data-view-cursor 
            onClick={() => openProject("abstract-fluid")}
            className="relative w-full h-[60vh] md:h-[80vh] cursor-none group overflow-hidden rounded-sm"
          >
            <img src="/cg_abstract_sim_1775891741500.png" alt="Abstract Fluid" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 transition-opacity duration-300 group-hover:opacity-0">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">01 — Featured</p>
              <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white">Abstract Fluid</h3>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-12">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-3">01 — Featured</p>
                <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white mb-4">Abstract Fluid</h3>
                <p className="font-mono text-sm leading-relaxed text-white/60 max-w-lg mb-6">
                  Procedural fluid & glass simulation with hyper-realistic dispersion. Full lookdev pipeline from geometry to final comp.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Houdini", "Redshift", "LookDev", "Compositing"].map(tag => (
                    <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Block 2 & 3: Secondary — 60/40 split */}
          <div className="flex flex-col md:flex-row w-full gap-[2px]" style={{height: "clamp(400px, 70vh, 800px)"}}>
            {/* 60% */}
            <div 
              data-view-cursor 
              onClick={() => openProject("cyber-alley")}
              className="relative flex-[6] h-full cursor-none group overflow-hidden rounded-sm"
            >
              <img src="/cg_environment_1775891723289.png" alt="Cyber Alley" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-1">02 — Environment</p>
                <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white">Cyber Alley</h3>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-10">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-2">02 — Environment</p>
                  <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white mb-3">Cyber Alley</h3>
                  <p className="font-mono text-xs leading-relaxed text-white/60 max-w-md mb-5">
                    Night-time cyberpunk alleyway. Full environment build with volumetric lighting and atmospheric fog passes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["UE5", "Environment Art", "Lighting", "VFX"].map(tag => (
                      <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 40% */}
            <div 
              data-view-cursor 
              onClick={() => openProject("mech-drone")}
              className="relative flex-[4] h-full cursor-none group overflow-hidden rounded-sm"
            >
              <img src="/cg_scifi_mech_1775891765789.png" alt="Mech Drone" className="object-cover w-full h-full object-center transition-transform duration-1000 group-hover:scale-105" />

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-8 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-1">03 — Modeling</p>
                <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white">Mech Drone</h3>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-2">03 — Modeling</p>
                  <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white mb-3">Mech Drone</h3>
                  <p className="font-mono text-xs leading-relaxed text-white/60 max-w-sm mb-5">
                    Hard-surface drone concept. Clean edge-flow modeling with PBR texturing and dramatic studio lighting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["C4D", "Octane", "Hard Surface", "PBR"].map(tag => (
                      <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PERSONAL SKETCHES Marquee Header - GSAP Scroll-Linked */}
        <ScrollMarquee className="!border-t !border-b !border-black/5" speed={1.5}>
          <div className="flex items-center gap-8 md:gap-16 font-mono text-5xl md:text-8xl tracking-[-0.02em] uppercase font-black text-[#111111]">
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
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              {[
                { src: "/cg_nature_1775891782712.png", label: "Lighting Study" },
                { src: "/IMG_4117.jpg", label: "Portrait", extra: "grayscale hover:grayscale-0" },
                { src: "/cg_abstract_sim_1775891741500.png", label: "Fluid Sim" },
                { src: "/cg_environment_1775891723289.png", label: "Env. Sketch" },
                { src: "/cg_scifi_mech_1775891765789.png", label: "Hard Surface" },
                { src: "/cg_nature_1775891782712.png", label: "Atmosphere" },
              ].map((item, i) => (
                <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer bg-black/5">
                  <img src={item.src} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.extra ?? ""}`} alt={item.label} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest text-white/80 uppercase">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        project={selectedProject || activeData || PROJECTS_DATA["abstract-fluid"]} 
      />
    </main>
  );
}
