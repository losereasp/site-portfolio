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
                  <svg viewBox="0 0 192 192" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/></svg>
                  Threads
                </a>
                <a href="https://t.me/losereasp" target="_blank" onClick={e => e.stopPropagation()} className="hover:text-[#FF5F1F] transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-4 md:h-4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                  Telegram
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
