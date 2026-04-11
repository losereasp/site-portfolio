"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cursor-zone");
    if (!hero) return;

    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Проверяем — навелись ли мы на интерактивный элемент (data-normal-cursor)
      const target = e.target as Element;
      const isInteractive = !!target.closest("[data-normal-cursor]");
      setIsOverInteractive(isInteractive);

      // Переключаем курсор на секции
      hero.style.cursor = isInteractive ? "auto" : "none";
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => {
      setVisible(false);
      setIsOverInteractive(false);
      hero.style.cursor = "none";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const showPill = visible && !isOverInteractive;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[200] pointer-events-none select-none transition-opacity duration-200 ${
        showPill ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 bg-[#FF5F1F] text-white font-mono font-bold text-sm tracking-widest uppercase px-6 py-3 rounded-full whitespace-nowrap shadow-[0_0_40px_rgba(255,95,31,0.5)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
        PLAY REEL
      </div>
    </div>
  );
}
