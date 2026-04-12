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

  const textColor = lightMode && !scrolled ? "text-[#111111]" : "text-white";

  return (
    <nav 
      className={`fixed top-0 left-0 w-full px-8 md:px-16 flex justify-between items-center z-[100] transition-all duration-700 ease-out border-b-[3px] ${textColor} ${
        scrolled 
          ? "bg-[#000000] py-4 border-[#FF5F1F] shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
          : "bg-transparent py-8 border-transparent shadow-none"
      }`}
    >
      <Magnetic>
        <Link href="/" className="font-primary text-2xl md:text-4xl tracking-tight uppercase text-[#FF5F1F] hover:underline underline-offset-8 transition-all">
          LSRSP
        </Link>
      </Magnetic>
      <div className="flex items-center gap-6 md:gap-12 font-primary text-2xl md:text-4xl tracking-tight text-[#FF5F1F]">
        <Magnetic>
          <a 
            href="https://vimeo.com/1175696148" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hover:underline underline-offset-8 transition-all duration-500 ${
              scrolled 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            REEL
          </a>
        </Magnetic>
        <Magnetic>
          <a href="/#work" className="hover:underline underline-offset-8 transition-all">WORK</a>
        </Magnetic>
        <Magnetic>
          <Link href="/about" className="hover:underline underline-offset-8 transition-all">ABOUT</Link>
        </Magnetic>
      </div>
    </nav>
  );
}
