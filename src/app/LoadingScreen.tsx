"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$";
const TARGET = "LSRSP";
const REVEAL_START = 480;
const STAGGER = 190;
const BRACKET_SPLIT_DURATION = 650;
const MARK_TRANSITION_DURATION = 700;
const BRACKET_OFFSET = 0.14;
const EXIT_SETTLE = 480;
const PANEL_EXIT_DURATION = 700;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen() {
  const [letters, setLetters] = useState<Array<{ char: string; locked: boolean }>>(
    () => TARGET.split("").map((char, i) => ({ char: i === 0 ? "l" : "", locked: false }))
  );
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bracketsOpen, setBracketsOpen] = useState(false);
  const [revealStarted, setRevealStarted] = useState(false);
  const lockedCountRef = useRef(0);
  const revealStartedRef = useRef(false);
  const markRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const introFrame = requestAnimationFrame(() => {
      markRef.current?.animate(
        [
          { opacity: 0, transform: "scale(0.94)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: MARK_TRANSITION_DURATION, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }
      );
    });

    // Scramble unlocked letters every 60ms after the initial [l] hold
    const scramble = setInterval(() => {
      if (!revealStartedRef.current) return;
      setLetters(prev =>
        prev.map((l, i) =>
          i < lockedCountRef.current ? l : { ...l, char: randomChar() }
        )
      );
    }, 60);

    // Split the brackets and start the letter reveal together
    const bracketTimer = setTimeout(() => {
      revealStartedRef.current = true;
      setRevealStarted(true);
      setBracketsOpen(true);
    }, REVEAL_START);

    // Lock letters left→right with stagger
    const locks = TARGET.split("").map((targetChar, i) =>
      setTimeout(() => {
        lockedCountRef.current = i + 1;
        setLetters(prev => {
          const next = [...prev];
          next[i] = { char: targetChar, locked: true };
          return next;
        });
      }, REVEAL_START + i * STAGGER)
    );

    // Slide away after all locked
    const hideAt = REVEAL_START + (TARGET.length - 1) * STAGGER + EXIT_SETTLE;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const hideTimer = setTimeout(() => {
      clearInterval(scramble);
      setHiding(true);
      exitTimer = setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, PANEL_EXIT_DURATION);
    }, hideAt);

    return () => {
      cancelAnimationFrame(introFrame);
      clearInterval(scramble);
      locks.forEach(clearTimeout);
      clearTimeout(bracketTimer);
      clearTimeout(hideTimer);
      if (exitTimer) clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[500] bg-black flex items-center justify-center"
      style={{
        transform: hiding ? "translateY(-100%)" : "translateY(0)",
        transition: hiding ? "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        aria-label="LSRSP loading"
        style={{
          width: "clamp(300px, 58vw, 860px)",
          height: "clamp(120px, 20vw, 260px)",
        }}
      >
        <Image
          src="/icon.png"
          alt="LSRSP logo"
          width={512}
          height={512}
          ref={markRef}
          className="absolute object-contain pointer-events-none"
          style={{
            width: "clamp(88px, 16vw, 220px)",
            height: "clamp(88px, 16vw, 220px)",
            opacity: revealStarted ? 0 : 1,
            transform: revealStarted ? "scale(0.94)" : "scale(1)",
            transition: `opacity ${MARK_TRANSITION_DURATION}ms ease, transform ${MARK_TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        />
        <div
          className="font-primary uppercase leading-none tracking-tight flex items-center whitespace-nowrap"
          style={{
            fontSize: "clamp(64px, 12vw, 180px)",
            opacity: revealStarted ? 1 : 0,
            transform: revealStarted ? "scale(1)" : "scale(0.94)",
            transition: `opacity ${MARK_TRANSITION_DURATION}ms ease, transform ${MARK_TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: "#FF5F1F",
              display: "inline-block",
              transform: bracketsOpen ? `translateX(-${BRACKET_OFFSET}em)` : "translateX(0)",
              transition: `transform ${BRACKET_SPLIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
            }}
          >
            [
          </span>
          {letters.map((l, i) => (
            <span
              key={i}
              style={{
                color: l.locked ? "#ffffff" : "#FF5F1F",
                transition: l.locked ? "color 0.08s ease-out" : "none",
                display: i === 0 || revealStarted ? "inline-block" : "none",
                minWidth: "0.6em",
                textAlign: "center",
              }}
            >
              {l.char}
            </span>
          ))}
          <span
            aria-hidden="true"
            style={{
              color: "#FF5F1F",
              display: "inline-block",
              transform: bracketsOpen ? `translateX(${BRACKET_OFFSET}em)` : "translateX(0)",
              transition: `transform ${BRACKET_SPLIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
            }}
          >
            ]
          </span>
        </div>
      </div>
    </div>
  );
}
