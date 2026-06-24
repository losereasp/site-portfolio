"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroVideo() {
  const [opacity, setOpacity] = useState(0.6);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Высота окна экрана
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Начинаем фейдить видео: от 0 до 1 высоты экрана. 
      // На старте scrollY = 0 -> opacity 0.6
      // При прокрутке на весь экран scrollY = vh -> opacity 0
      const progress = Math.min(scrollY / vh, 1);
      const newOpacity = 0.6 - (progress * 0.6);
      
      setOpacity(newOpacity);

      // Оптимизация производительности: останавливаем декодирование видео, когда оно скрыто из виду
      if (videoRef.current) {
        if (scrollY >= vh) {
          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
        style={{ opacity }}
      >
        <source src="/showreel.webm" type="video/webm" />
        <source src="/showreel.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
