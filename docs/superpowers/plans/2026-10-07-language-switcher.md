# Pill Toggle Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `[ EN | RU ]` text toggle in `MainNavbar` with a tactile pill toggle switch with sliding orange thumb (`#FF5F1F`), matching the visual reference and portfolio design system.

**Architecture:** Create an isolated `LanguageToggle` component in `src/app/LanguageToggle.tsx` consuming `useLanguage()`, supporting both dark and light modes (`isLight`), and wire it into `MainNavbar.tsx` inside `<Magnetic>`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, LanguageContext.

## Global Constraints
- Switch layout: `[ RU ] ( O ) [ EN ]` (RU on the left, pill switch in the center, EN on the right).
- Brand styling: `#FF5F1F` orange thumb with subtle glow, `font-mono` JetBrains Mono text.
- Theme adaptivity: Dynamically adapt to `isLight` (transparent navbar on `/about` and `/work` before scroll) and dark mode (transparent/black navbar elsewhere).
- Interaction: Clicking `RU` sets Russian, clicking `EN` sets English, clicking the toggle flips the language with smooth transition.

---

### Task 1: Create `LanguageToggle` Component

**Files:**
- Create: `src/app/LanguageToggle.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `src/app/context/LanguageContext`
- Produces: `export default function LanguageToggle({ isLight }: { isLight?: boolean })`

- [ ] **Step 1: Write `src/app/LanguageToggle.tsx`**

```tsx
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
      {/* RU Option */}
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
        className={`relative w-8 h-[18px] rounded-full border transition-colors duration-300 flex items-center p-[2px] cursor-pointer focus:outline-none ${
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

      {/* EN Option */}
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
```

- [ ] **Step 2: Verify component builds cleanly**

Run: `npm run lint` or `npm run build`

---

### Task 2: Integrate `LanguageToggle` into `MainNavbar`

**Files:**
- Modify: `src/app/MainNavbar.tsx:81-99`

**Interfaces:**
- Consumes: `<LanguageToggle isLight={isLight} />` from `src/app/LanguageToggle`
- Produces: Updated navbar with new toggle

- [ ] **Step 1: Update `MainNavbar.tsx`**

Replace lines 81-99 with `<LanguageToggle isLight={isLight} />` inside `<Magnetic>`.

- [ ] **Step 2: Run build to verify TypeScript and lint**

Run: `npm run build`
Expected: PASS

---

### Task 3: Verification, Commit & Push

- [ ] **Step 1: Run production build and verify no regressions**
Run: `npm run build`
- [ ] **Step 2: Commit changes to Git**
```bash
git add src/app/LanguageToggle.tsx src/app/MainNavbar.tsx docs/superpowers/plans/2026-10-07-language-switcher.md
git commit -m "feat(nav): add pill toggle language switcher with brand styling"
```
- [ ] **Step 3: Push to Git remote**
```bash
git push origin main
```
