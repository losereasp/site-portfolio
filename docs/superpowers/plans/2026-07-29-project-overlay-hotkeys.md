# ProjectOverlay Hotkeys & Seamless Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance `ProjectOverlay.tsx` with hotkeys (`ArrowLeft`, `ArrowRight`, `Space`, `M`, `Esc`), top header project navigation buttons, and a monospace hotkey legend bar.

**Architecture:** Update `ProjectOverlayProps` to accept `onSelectProject` and `currentProjectId`, add global keyboard listeners, and render navigation buttons and hotkey legend.

**Tech Stack:** Next.js 16 (App Router), React 19, GSAP, Tailwind CSS v4.

---

### Task 1: Update `ProjectOverlay.tsx` with Hotkeys & Navigation Controls

**Files:**
- Modify: `src/app/ProjectOverlay.tsx`

**Interfaces:**
- Consumes: `onSelectProject?: (id: string) => void`, `currentProjectId?: string`.
- Produces: Enhanced `ProjectOverlay` with keyboard navigation, header `[ ← PREV ]` / `[ NEXT → ]` buttons, and hotkey legend bar.

- [ ] **Step 1: Update `ProjectOverlay.tsx` to handle keyboard events and project cycling**

In `src/app/ProjectOverlay.tsx`:
1. Add `onSelectProject` and `currentProjectId` to `ProjectOverlayProps`.
2. Define project order: `const PROJECT_ORDER = ["frost-core", "rampage-rally", "the-visit", "stanley-bottle"];`.
3. Add `keydown` listener for:
   - `ArrowLeft`: Navigate to previous project in `PROJECT_ORDER`.
   - `ArrowRight`: Navigate to next project in `PROJECT_ORDER`.
   - `Space`: Toggle play/pause on project video.
   - `KeyM`: Toggle audio mute.
   - `Escape`: Close lightbox or overlay.
4. Add top navigation buttons in modal header next to close button: `[ ← PREV ]` and `[ NEXT → ]`.
5. Add floating monospace hotkey legend bar at the bottom: `[ ← → NAVIGATE ]` • `[ SPACE PLAY/PAUSE ]` • `[ M MUTE ]` • `[ ESC CLOSE ]`.

- [ ] **Step 2: Commit `src/app/ProjectOverlay.tsx`**
```bash
git add src/app/ProjectOverlay.tsx
git commit -m "feat: add hotkeys, header navigation buttons, and legend bar to ProjectOverlay"
```

---

### Task 2: Update `page.tsx` and `work/page.tsx` Overlay Integration

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/work/page.tsx`

- [ ] **Step 1: Pass `onSelectProject` and `currentProjectId` to `<ProjectOverlay />` in `page.tsx` and `work/page.tsx`**

In `src/app/page.tsx` and `src/app/work/page.tsx`:
Pass `onSelectProject={(id) => openProject(id)}` and `currentProjectId={selectedProject ? Object.keys(PROJECTS_DATA).find(key => (PROJECTS_DATA as any)[key] === selectedProject) : undefined}`.

- [ ] **Step 2: Run `npm run build` to verify clean compilation**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit `page.tsx` and `work/page.tsx`**
```bash
git add src/app/page.tsx src/app/work/page.tsx
git commit -m "feat: integrate onSelectProject handler in ProjectOverlay invocation"
```
