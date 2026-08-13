# CV Download Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable downloading and viewing of PDF CVs in English and Russian on the `/about` page.

**Architecture:** Copy PDF assets into Next.js `public/` directory, update translations to remove "(COMING SOON)", and replace the disabled button with a dynamic, language-aware `<a target="_blank">` element wrapped in `<Magnetic>` in `src/app/about/page.tsx`.

**Tech Stack:** Next.js, React, TypeScript, GSAP, Tailwind CSS.

## Global Constraints
- Target PDF directory source: `D:\clippy\workspace\2026-07-26_job-search-restart\output\pdf`
- Destination PDF files: `public/Iaroslav-Marchenkov-CV-EN.pdf` and `public/Iaroslav-Marchenkov-CV-RU.pdf`

---

### Task 1: Copy PDF Assets to `public/`

**Files:**
- Create: `public/Iaroslav-Marchenkov-CV-EN.pdf`
- Create: `public/Iaroslav-Marchenkov-CV-RU.pdf`

- [ ] **Step 1: Copy PDF files to `public/`**

Run:
```powershell
Copy-Item "D:\clippy\workspace\2026-07-26_job-search-restart\output\pdf\Iaroslav-Marchenkov-CV-EN.pdf" "d:\Projects\site-portfolio\public\Iaroslav-Marchenkov-CV-EN.pdf"
Copy-Item "D:\clippy\workspace\2026-07-26_job-search-restart\output\pdf\Iaroslav-Marchenkov-CV-RU.pdf" "d:\Projects\site-portfolio\public\Iaroslav-Marchenkov-CV-RU.pdf"
```

- [ ] **Step 2: Verify files exist in `public/`**

Run:
```powershell
Test-Path "d:\Projects\site-portfolio\public\Iaroslav-Marchenkov-CV-EN.pdf"
Test-Path "d:\Projects\site-portfolio\public\Iaroslav-Marchenkov-CV-RU.pdf"
```
Expected: `True` for both.

---

### Task 2: Update Translations

**Files:**
- Modify: `src/app/i18n/translations.ts`

- [ ] **Step 1: Update `downloadResume` strings**

In `src/app/i18n/translations.ts`:
- Change line 28 (EN): `downloadResume: "DOWNLOAD RESUME"`
- Change line 180 (RU): `downloadResume: "СКАЧАТЬ РЕЗЮМЕ"`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 3: Make Resume Button Active in `src/app/about/page.tsx`

**Files:**
- Modify: `src/app/about/page.tsx:127-131`

- [ ] **Step 1: Update button component**

In `src/app/about/page.tsx`, replace lines 127-131:
```tsx
<Magnetic>
  <a 
    href={language === 'ru' ? '/Iaroslav-Marchenkov-CV-RU.pdf' : '/Iaroslav-Marchenkov-CV-EN.pdf'}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center px-8 py-4 border-2 border-black/10 hover:border-black/40 text-black font-mono text-base md:text-lg font-bold uppercase rounded-[3px] w-full sm:w-auto whitespace-nowrap transition-all duration-300"
  >
    {t.about.downloadResume}
  </a>
</Magnetic>
```

Also extract `language` from `useLanguage()` at line 12:
`const { t, language } = useLanguage();`

- [ ] **Step 2: Run build and lint verification**

Run: `npm run build`
Expected: Clean build success without errors.
