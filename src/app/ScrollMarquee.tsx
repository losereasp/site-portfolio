"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollMarqueeProps {
  children: React.ReactNode;
  direction?: 1 | -1;
  className?: string;
  speed?: number;
}

/**
 * ScrollMarquee component that links horizontal movement to vertical scroll.
 */
export default function ScrollMarquee({
  children,
  direction = 1,
  className = "",
  speed = 1
}: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Multiplier for speed. Higher = more movement per scroll pixel.
    const scrollModifier = 300 * speed;

    const ctx = gsap.context(() => {
      // We animate the inner wrapper from 0 to -50% of its width.
      // Since children are duplicated, -50% is a perfect loop point.
      gsap.to(wrapperRef.current, {
        xPercent: -50 * direction,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // 1.5 gives it that nice "premium" lag/smoothing
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [direction, speed]);

  return (
    <div ref={containerRef} className={`marquee-container w-full overflow-hidden whitespace-nowrap py-12 md:py-20 border-b border-black/5 ${className}`}>
      <div ref={wrapperRef} className="flex w-max flex-nowrap items-center">
        {/* We render children twice for a seamless infinite loop during the scrub */}
        <div className="flex flex-nowrap items-center gap-8 md:gap-16 px-4 md:px-8">
          {children}
        </div>
        <div className="flex flex-nowrap items-center gap-8 md:gap-16 px-4 md:px-8">
          {children}
        </div>
        <div className="flex flex-nowrap items-center gap-8 md:gap-16 px-4 md:px-8">
          {children}
        </div>
        <div className="flex flex-nowrap items-center gap-8 md:gap-16 px-4 md:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
