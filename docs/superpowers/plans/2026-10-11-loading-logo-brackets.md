# Loading Logo Brackets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the loading logo from `[l]` into a bracketed `LSRSP` while bracket spreading and letter scrambling/reveal run concurrently.

**Architecture:** Keep the existing client-only `LoadingScreen` state machine and per-letter timers. Add a separate `bracketsOpen` state for the bracket transform, render brackets as siblings around the existing letters, and start the bracket timer at the same `REVEAL_START` timestamp as the lock schedule. Keep the existing panel exit and body-overflow cleanup, adding cleanup for the new split and nested exit timers.

**Tech Stack:** Next.js App Router, React 19 client component, TypeScript, inline CSS styles, existing npm lint/build scripts.

## Global Constraints

- Modify only `src/app/LoadingScreen.tsx` for runtime behavior and styling.
- Preserve the existing black panel, orange unlocked letters, white locked letters, and upward exit transition.
- Do not change the navbar logo, global styles, page structure, or dependencies.
- Brackets and letter reveal must begin at the same time.
- Final visible state before exit must keep brackets around the completed `LSRSP`.
- Cleanup must clear all timers/intervals and restore `document.body.style.overflow`.

---

### Task 1: Add concurrent bracket animation state and timing

**Files:**
- Modify: `src/app/LoadingScreen.tsx:12-64`

**Interfaces:**
- Consumes: existing `letters`, `hiding`, `hidden`, and `lockedCountRef` state.
- Produces: a `bracketsOpen` boolean used by the render to switch bracket transforms.

- [ ] **Step 1: Add bracket state and named timing constants**

Add `const [bracketsOpen, setBracketsOpen] = useState(false);` beside the existing loading state. Inside the effect define `REVEAL_START = 350`, `STAGGER = 190`, and `BRACKET_SPLIT_DURATION = 650`. Use `REVEAL_START` for both the bracket split timeout and the first letter lock so both timelines start together.

- [ ] **Step 2: Schedule the bracket split alongside the lock schedule**

Create a `bracketTimer` with `setTimeout(() => setBracketsOpen(true), REVEAL_START)`. Keep the existing lock timeout array, replacing its duplicated lock-start literal with `REVEAL_START`.

- [ ] **Step 3: Make the exit timing account for the complete reveal**

Keep `hideAt = REVEAL_START + (TARGET.length - 1) * STAGGER + 480`. Schedule the nested `setTimeout` used to finish the panel exit through a named `exitTimer` variable so cleanup can cancel it. Clear `bracketTimer` and `exitTimer` in the effect cleanup in addition to the existing interval, lock timers, and hide timer.

- [ ] **Step 4: Run lint after the state/timer change**

Run: `npm run lint`

Expected: PASS with no TypeScript/ESLint errors.

---

### Task 2: Render and style the bracketed logo row

**Files:**
- Modify: `src/app/LoadingScreen.tsx:68-95`

**Interfaces:**
- Consumes: `bracketsOpen` and the existing `letters` array.
- Produces: centered `[l]` initial state, bracketed `LSRSP` final state.

- [ ] **Step 1: Replace the letters-only wrapper with a bracketed row**

Keep the existing font classes and font-size style on the wrapper, add `items-center whitespace-nowrap`, and render an opening bracket before `letters.map(...)` plus a closing bracket after it. The bracket text should be `[` and `]` and use the same orange brand color as unlocked letters.

- [ ] **Step 2: Add responsive split transforms**

Use the following bracket style shape for both bracket spans:

```tsx
{
  color: "#FF5F1F",
  display: "inline-block",
  transition: `transform ${BRACKET_SPLIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
  transform: bracketsOpen
    ? `translateX(${side === "left" ? "-0.32em" : "0.32em"})`
    : "translateX(0)",
}
```

Define the side-specific sign directly on each span (`-0.32em` for `[` and `0.32em` for `]`) rather than adding a new helper abstraction. This scales with the existing font size and leaves a visible final frame around the wordmark.

- [ ] **Step 3: Preserve letter styling and accessibility semantics**

Keep the existing letter color transition, minimum width, and centered text. Add `aria-label="LSRSP loading"` to the row wrapper; brackets remain decorative visual spans and do not receive separate labels.

- [ ] **Step 4: Run lint and production build**

Run: `npm run lint`

Expected: PASS.

Run: `npm run build`

Expected: PASS with a successful Next.js production build.

---

### Task 3: Verify timing, cleanup, and regression scope

**Files:**
- Modify: `src/app/LoadingScreen.tsx` only if verification finds an issue.

**Interfaces:**
- Consumes: compiled loading component.
- Produces: verified loading animation with no changed navbar/page files.

- [ ] **Step 1: Inspect the final component for timing and cleanup invariants**

Confirm that `REVEAL_START` is used for both `setBracketsOpen` and the first lock, `clearTimeout(bracketTimer)` and `clearTimeout(exitTimer)` are present, and `document.body.style.overflow = ""` exists in both exit completion and effect cleanup.

- [ ] **Step 2: Check the working tree scope**

Run: `git status --short`

Expected: only the design/plan docs and `src/app/LoadingScreen.tsx` are changed by this feature; no navbar or global style files are modified.

- [ ] **Step 3: Commit the feature**

```bash
git add src/app/LoadingScreen.tsx docs/superpowers/specs/2026-10-11-loading-logo-brackets-design.md docs/superpowers/plans/2026-10-11-loading-logo-brackets.md
git commit -m "feat: animate loading logo brackets"
```

Expected: commit succeeds and contains only the scoped feature files.
