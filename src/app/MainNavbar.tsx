"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { useLanguage } from "./context/LanguageContext";

interface MainNavbarProps {
  lightMode?: boolean;
}

export default function MainNavbar({ lightMode = false }: MainNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
            {t.nav.reel}
          </a>
        </Magnetic>
        <Magnetic>
          <Link href="/tools" className={linkBase}>{t.nav.tools}</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/work" className={linkBase}>{t.nav.work}</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/about" className={linkBase}>{t.nav.about}</Link>
        </Magnetic>

        {/* Segmented EN | RU Language Switcher */}
        <Magnetic>
          <div
            role="group"
            aria-label="Language selector"
            className={`inline-flex items-center font-mono text-xs md:text-sm tracking-wider uppercase select-none rounded-[2px] px-1.5 py-0.5 border ${
              isLight ? "border-black/15 bg-black/5" : "border-white/15 bg-white/5"
            }`}
          >
            <span className={isLight ? "text-black/40 mr-1 font-bold" : "text-white/40 mr-1 font-bold"} aria-hidden="true">[</span>
            <button
              onClick={() => setLang("en")}
              type="button"
              aria-label={lang === "ru" ? "Switch site language to English" : "Site language is English"}
              aria-pressed={lang === "en"}
              className={`min-w-[36px] min-h-[36px] px-1.5 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                lang === "en"
                  ? "text-[#FF5F1F] font-bold border-b-2 border-[#FF5F1F]"
                  : isLight
                  ? "text-black/60 hover:text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
            <span className={`px-0.5 ${isLight ? "text-black/25" : "text-white/25"}`} aria-hidden="true">|</span>
            <button
              onClick={() => setLang("ru")}
              type="button"
              aria-label={lang === "en" ? "Переключить сайт на русский" : "Язык сайта русский"}
              aria-pressed={lang === "ru"}
              className={`min-w-[36px] min-h-[36px] px-1.5 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                lang === "ru"
                  ? "text-[#FF5F1F] font-bold border-b-2 border-[#FF5F1F]"
                  : isLight
                  ? "text-black/60 hover:text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              RU
            </button>
            <span className={isLight ? "text-black/40 ml-1 font-bold" : "text-white/40 ml-1 font-bold"} aria-hidden="true">]</span>
          </div>
        </Magnetic>
      </div>
    </nav>
  );
}
