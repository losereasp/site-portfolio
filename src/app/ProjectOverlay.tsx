"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BeforeAfterSlider from "./BeforeAfterSlider";
import Magnetic from "./Magnetic";

interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    software: string[];
    heroImage: string;
    beforeImage: string;
    afterImage: string;
    assets: string[];
  };
}

export default function ProjectOverlay({ isOpen, onClose, project }: ProjectOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      // Content slide down
      gsap.to(contentRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "expo.in",
      });

      // Backdrop fade out
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
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Absolute Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-12 flex justify-end items-center z-20">
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
           <p className="font-mono text-[10px] md:text-xs text-[#FF5F1F] uppercase tracking-[0.4em] mb-4">Case Study</p>
           <h1 className="font-primary text-4xl md:text-6xl lg:text-[7vw] text-white leading-[0.9] uppercase tracking-tighter">
             {project.title}
           </h1>
        </div>
      </section>

      {/* 2. DESCRIPTION BLOCK (LIGHT) */}
      <section className="w-full bg-[#F0F0EE] py-24 md:py-40 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Left: Huge H2 */}
          <div className="md:col-span-12 lg:col-span-7">
            <h2 className="font-primary text-5xl md:text-8xl leading-[0.9] uppercase text-black tracking-tighter">
              Climate Shift:<br />{project.title}
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

      {/* 3. BREAKDOWN BLOCK (Slider) */}
      <section className="w-full bg-black">
        <div className="max-w-[1800px] mx-auto">
          <BeforeAfterSlider 
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
          />
        </div>
      </section>

      {/* 4. ASSETS BLOCK (Bento) */}
      <section className="w-full bg-[#F0F0EE] py-24 md:py-40 px-6 md:px-12">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-6">
            <h2 className="font-mono text-xl md:text-3xl uppercase font-black tracking-tight">Asset Breakdown</h2>
            <div className="flex-1 h-[2px] bg-black/10" />
          </div>

          {/* Hybrid Bento Grid: 1 big, 3 small */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-[1px] bg-black/10 border border-black overflow-hidden">
            {/* Big item (2x2) */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-white border-r border-black/10 aspect-square">
              <img src={project.assets[0]} alt="Asset 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all text-black bg-white px-3 py-1">
                Main Structure Module
              </div>
            </div>
            
            {/* Small items */}
            {project.assets.slice(1, 4).map((asset, i) => (
              <div key={i} className="relative group overflow-hidden bg-white border-b border-black/10 aspect-square">
                <img src={asset} alt={`Asset ${i+2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                <div className="absolute bottom-4 left-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all text-black bg-white px-2 py-0.5">
                  Prop #{i + 2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacer inside overlay */}
      <div className="w-full py-20 text-center border-t border-black/5">
        <Magnetic>
          <button 
            onClick={onClose}
            className="font-primary text-4xl md:text-6xl hover:text-[#FF5F1F] transition-colors uppercase cursor-pointer px-8 py-4"
          >
            Close Case Study
          </button>
        </Magnetic>
      </div>
    </div>
  </div>
);
}
