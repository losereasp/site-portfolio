"use client";

import React from "react";
import { useLanguage } from "./context/LanguageContext";

interface LanguageToggleProps {
  isLight?: boolean;
}

export default function LanguageToggle({ isLight = false }: LanguageToggleProps) {
  const { lang, setLang, toggleLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-2 select-none font-mono text-xs md:text-sm tracking-wider uppercase"
      role="group"
      aria-label="Language selection"
    >
      {/* RU Button */}
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`cursor-pointer transition-all duration-300 ${
          lang === "ru"
            ? isLight
              ? "text-black font-bold opacity-100"
              : "text-white font-bold opacity-100"
            : isLight
            ? "text-black/40 hover:text-black/75 font-normal"
            : "text-white/40 hover:text-white/75 font-normal"
        }`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>

      {/* Pill Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={lang === "en"}
        aria-label={lang === "ru" ? "Переключить сайт на английский" : "Switch site language to Russian"}
        onClick={toggleLang}
        className={`relative w-8 h-[18px] rounded-full border transition-all duration-300 flex items-center p-[2px] cursor-pointer focus:outline-none ${
          isLight
            ? "border-black/35 bg-black/5 hover:border-black/75"
            : "border-white/40 bg-black/60 hover:border-white/80"
        }`}
      >
        <span
          className={`block w-3 h-3 rounded-full bg-[#FF5F1F] shadow-[0_0_8px_rgba(255,95,31,0.5)] transition-transform duration-300 ease-out ${
            lang === "en" ? "translate-x-3.5" : "translate-x-0"
          }`}
        />
      </button>

      {/* EN Button */}
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`cursor-pointer transition-all duration-300 ${
          lang === "en"
            ? isLight
              ? "text-black font-bold opacity-100"
              : "text-white font-bold opacity-100"
            : isLight
            ? "text-black/40 hover:text-black/75 font-normal"
            : "text-white/40 hover:text-white/75 font-normal"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
