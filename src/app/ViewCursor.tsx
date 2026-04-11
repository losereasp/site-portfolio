"use client";

import { useEffect, useRef, useState } from "react";

export default function ViewCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Позиция без CSS-transition — мгновенно
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      const target = e.target as Element;
      setVisible(!!target.closest("[data-view-cursor]"));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[300] pointer-events-none select-none -translate-x-1/2 -translate-y-1/2"
      style={{ top: 0, left: 0 }}
    >
      {/* Отдельный div для opacity/scale transition, НЕ затрагивает position */}
      <div
        className="w-24 h-24 rounded-full bg-[#FF5F1F] flex items-center justify-center shadow-[0_0_40px_rgba(255,95,31,0.4)] transition-[opacity,transform] duration-200"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.6)",
        }}
      >
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase">VIEW</span>
      </div>
    </div>
  );
}
