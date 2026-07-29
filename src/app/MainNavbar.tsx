"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

interface MainNavbarProps {
  lightMode?: boolean;
}

export default function MainNavbar({ lightMode = false }: MainNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = lightMode && !scrolled;
  const linkBase = isLight
    ? "text-black/50 hover:text-black hover:underline underline-offset-8 decoration-[#FF5F1F] transition-all duration-300"
    : "text-white/60 hover:text-white hover:underline underline-offset-8 decoration-[#FF5F1F] transition-all duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-8 md:px-16 flex justify-between items-center z-[100] transition-all duration-700 ease-out border-b-[3px] ${
        scrolled
          ? "bg-[#000000] py-4 border-[#FF5F1F] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white"
          : "bg-transparent py-8 border-transparent shadow-none"
      }`}
    >
      <Magnetic>
        <Link
          href="/"
          aria-label="LSRSP — home"
          className="font-mono font-bold normal-case text-3xl md:text-5xl tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-[#FF5F1F]">[</span>
          <span className={isLight ? "text-black" : "text-white"}>l</span>
          <span className="text-[#FF5F1F]">]</span>
        </Link>
      </Magnetic>
      <div className="flex items-center gap-6 md:gap-12 font-primary text-2xl md:text-4xl tracking-tight">
        <Magnetic>
          <a
            href="https://vimeo.com/1175696148"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} ${
              scrolled
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            REEL
          </a>
        </Magnetic>
        <Magnetic>
          <Link href="/tools" className={linkBase}>TOOLS</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/work" className={linkBase}>WORK</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/about" className={linkBase}>ABOUT</Link>
        </Magnetic>
      </div>
    </nav>
  );
}
