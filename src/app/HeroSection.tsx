"use client";

import HeroVideo from "./HeroVideo";
import HeroCursor from "./HeroCursor";

export default function HeroSection() {
  return (
    <>
      <HeroCursor />
      <section
        id="hero-cursor-zone"
        className="relative h-screen w-full flex items-center bg-transparent overflow-hidden cursor-none"
        onClick={() => window.open("https://vimeo.com/1175696148", "_blank")}
      >
        {/* Parallax & Scrolling Fade Video Layer */}
        <HeroVideo />

        {/* Text overlays */}
        <div className="relative z-10 w-full h-full px-8 md:px-16 pb-12 md:pb-24 flex flex-col justify-end">
          <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-12 lg:gap-8 pointer-events-none">
            
            {/* Left side: Main Title & Subtitle */}
            <div data-normal-cursor className="flex flex-col items-start font-primary uppercase pointer-events-auto w-full lg:w-3/5">
              <h1 className="text-white mix-blend-difference leading-[0.95] mb-6 text-[13vw] lg:text-[10vw]">
                Hi, I'm losereasp
              </h1>
              <div className="flex flex-col w-full">
                <p className="font-mono text-white/80 text-lg md:text-2xl tracking-widest uppercase ml-1 md:ml-[6px] mb-6">
                  CG ARTIST & 3D GENERALIST
                </p>
              </div>
            </div>

            {/* Right side: Socials & Quote */}
            <div data-normal-cursor className="flex flex-col w-full lg:w-2/5 max-w-xl font-mono text-white pointer-events-auto mb-4">
              
              <div className="flex gap-6 mb-4 text-[10px] md:text-xs tracking-[0.2em] text-white/80 uppercase w-full justify-start font-bold">
                <a href="https://www.instagram.com/yaroslav.losereasp/" target="_blank" onClick={e => e.stopPropagation()} className="hover:text-[#FF5F1F] transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Instagram
                </a>
                <a href="https://www.threads.com/@yaroslav.losereasp" target="_blank" onClick={e => e.stopPropagation()} className="hover:text-[#FF5F1F] transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 5-1.34" /><path d="M15.4 17.5A6.5 6.5 0 1 1 18.5 12a4.4 4.4 0 0 1-4.4 4.4c-1.3 0-2.3-1-2.3-2.3" /></svg>
                  Threads
                </a>
                <a href="https://www.linkedin.com/in/losereasp/" target="_blank" onClick={e => e.stopPropagation()} className="hover:text-[#FF5F1F] transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn
                </a>
              </div>
              
              <div className="flex gap-4 items-start w-full">
                <p className="text-base md:text-xl tracking-widest leading-[1.8] uppercase opacity-90 text-left">
                  TRYING TO PROCRASTINATE LESS AND DO MORE 3D. HONESTLY, IT'S NOT GOING GREAT, BUT I'M TRYING.
                </p>
              </div>

            </div>
          </div>

          {/* Absolute Right Vertical Text */}
          <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 rotate-90 origin-right text-white/30 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase hidden xl:block whitespace-nowrap">
            SHUMYACHI → MOSCOW → DA NANG
          </div>
        </div>

        {/* Scroll Hint / View Works CTA */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <a data-normal-cursor href="#work" className="group flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-white/50 group-hover:text-[#FF5F1F] transition-colors font-bold">
              VIEW WORKS
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover:text-[#FF5F1F] transition-colors animate-bounce"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </a>
        </div>
      </section>
    </>
  );
}
