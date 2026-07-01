"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$";
const TARGET = "LSRSP";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen() {
  const [letters, setLetters] = useState<Array<{ char: string; locked: boolean }>>(
    () => TARGET.split("").map((char) => ({ char, locked: false }))
  );
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lockedCountRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Scramble unlocked letters every 60ms
    const scramble = setInterval(() => {
      setLetters(prev =>
        prev.map((l, i) =>
          i < lockedCountRef.current ? l : { ...l, char: randomChar() }
        )
      );
    }, 60);

    // Lock letters left→right with stagger
    const LOCK_START = 350;
    const STAGGER = 190;

    const locks = TARGET.split("").map((targetChar, i) =>
      setTimeout(() => {
        lockedCountRef.current = i + 1;
        setLetters(prev => {
          const next = [...prev];
          next[i] = { char: targetChar, locked: true };
          return next;
        });
      }, LOCK_START + i * STAGGER)
    );

    // Slide away after all locked
    const hideAt = LOCK_START + (TARGET.length - 1) * STAGGER + 480;
    const hideTimer = setTimeout(() => {
      clearInterval(scramble);
      setHiding(true);
      setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, 700);
    }, hideAt);

    return () => {
      clearInterval(scramble);
      locks.forEach(clearTimeout);
      clearTimeout(hideTimer);
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
        className="font-primary uppercase leading-none tracking-tight flex"
        style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
      >
        {letters.map((l, i) => (
          <span
            key={i}
            style={{
              color: l.locked ? "#ffffff" : "#FF5F1F",
              transition: l.locked ? "color 0.08s ease-out" : "none",
              display: "inline-block",
              minWidth: "0.6em",
              textAlign: "center",
            }}
          >
            {l.char}
          </span>
        ))}
      </div>
    </div>
  );
}
