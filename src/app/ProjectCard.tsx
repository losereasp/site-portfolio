"use client";

import { useRef } from "react";
import { useLanguage } from "./context/LanguageContext";

interface ProjectCardProps {
  id: string;
  data: any;
  onClick: (id: string) => void;
  className?: string;
  isFeatured?: boolean;
  /** Hide the idle-state title overlay (use when the hero art already carries a baked-in title/logo). Hover info still shows. */
  hideStaticTitle?: boolean;
}

export default function ProjectCard({ id, data, onClick, className = "", isFeatured = false, hideStaticTitle = false }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();

  const category = lang === 'ru' ? (data.categoryRu || data.category) : (data.categoryEn || data.category);
  const description = lang === 'ru' ? (data.descriptionRu || data.description) : (data.descriptionEn || data.description);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      data-view-cursor
      onClick={() => onClick(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden rounded-sm cursor-none ${className}`}
    >
      {/* Base Image */}
      <img
        src={data.heroImage}
        alt={data.title}
        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Hover Video */}
      {data.hoverVideo && (
        <video
          ref={videoRef}
          src={data.hoverVideo}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      )}

      {/* Overlay Content */}
      {isFeatured ? (
        <>
          {/* Static Title (fades on hover) */}
          {!hideStaticTitle && (
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 transition-opacity duration-300 group-hover:opacity-0">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">{category || "Featured"}</p>
              <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white">{data.title}</h3>
            </div>
          )}

          {/* Hover Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-12">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-3">{category || "Featured"}</p>
              <h3 className="font-primary text-4xl md:text-7xl uppercase leading-none text-white mb-4">{data.title}</h3>
              <p className="font-mono text-sm leading-relaxed text-white/60 max-w-lg mb-6">{description}</p>
              <div className="flex flex-wrap gap-2">
                {data.software.map((tag: string) => (
                  <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Default Overlay Content (Small Cards) */}
          {!hideStaticTitle && (
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 transition-opacity duration-300 group-hover:opacity-0">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-1">{category || "Project"}</p>
              <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white">{data.title}</h3>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-10">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#FF5F1F] mb-2">{category || "Project"}</p>
              <h3 className="font-primary text-3xl md:text-5xl uppercase leading-none text-white mb-3">{data.title}</h3>
              <p className="font-mono text-xs leading-relaxed text-white/60 max-w-md mb-5">{description}</p>
              <div className="flex flex-wrap gap-2">
                {data.software.map((tag: string) => (
                  <span key={tag} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-white/30 text-white/70 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
