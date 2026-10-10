"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$";
const TARGET = "LSRSP";
const REVEAL_START = 350;
const STAGGER = 190;
const BRACKET_SPLIT_DURATION = 650;
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

  useEffect(() => {
    document.body.style.overflow = "hidden";

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
        className="font-primary uppercase leading-none tracking-tight flex items-center whitespace-nowrap"
        aria-label="LSRSP loading"
        style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
      >
        <span
          aria-hidden="true"
          style={{
            color: "#FF5F1F",
            display: "inline-block",
            transform: bracketsOpen ? "translateX(-0.32em)" : "translateX(0)",
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
            transform: bracketsOpen ? "translateX(0.32em)" : "translateX(0)",
            transition: `transform ${BRACKET_SPLIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          }}
        >
          ]
        </span>
      </div>
    </div>
  );
}
