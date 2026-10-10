# Loading Logo Mark Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Start the loading screen with the real `icon.png` mark, crossfade into the concurrent bracket split and `LSRSP` scramble, and keep a compact `[LSRSP]` final state.

**Architecture:** Keep the existing timer-driven `LoadingScreen` client component. Add a synchronized asset-mark layer above the text logo row, with the asset fading/scaling out exactly when the bracket/reveal timer turns on the text layer. Keep the existing per-letter scramble/lock state, panel exit, and cleanup. Reduce bracket transforms only in this component.

**Tech Stack:** Next.js App Router, React 19, TypeScript, inline styles, existing static asset `/icon.png`.

## Global Constraints

- Modify only `src/app/LoadingScreen.tsx` plus the feature spec/plan documents.
- Use the existing `/icon.png` asset; do not add dependencies or modify the asset.
- Preserve the existing black panel, orange unlocked letters, white locked letters, and upward exit.
- Bracket split and scramble/reveal start at the same timer.
- Final state must remain a compact bracketed `[LSRSP]`.
- Clear every timer/interval and restore `document.body.style.overflow` on cleanup.

---

### Task 1: Add synchronized mark phase

**Files:**
- Modify: `src/app/LoadingScreen.tsx:7-80`

**Interfaces:**
- Consumes: `bracketsOpen`, `revealStarted`, existing letter timers.
- Produces: `markTransitioned`/`revealStarted` state that controls the two visual layers.

- [ ] **Step 1: Add mark transition constants and initial letter state**

Add constants near the existing timing values:

```ts
const MARK_TRANSITION_DURATION = 700;
const MARK_HOLD = 420;
const BRACKET_OFFSET = 0.14;
```

Keep the initial letters as `l` followed by empty positions so the first text frame is not visible as a heavy font logo.

- [ ] **Step 2: Start the split, reveal, and crossfade together**

Change the existing bracket timer to set `revealStartedRef.current = true`, `setRevealStarted(true)`, and `setBracketsOpen(true)` at `MARK_HOLD`. Keep that same `MARK_HOLD` in each letter-lock timer, so the asset transition and first letter lock share one start time. Do not create a second independent reveal clock.

- [ ] **Step 3: Preserve and extend cleanup**

Keep cleanup for the scramble interval, all lock timers, bracket timer, hide timer, optional exit timer, and body overflow. No timer may be created without a corresponding cleanup path.

- [ ] **Step 4: Run the changed-file lint**

Run: `npx eslint src/app/LoadingScreen.tsx`

Expected: PASS with no output.

---

### Task 2: Render the actual asset and crossfade into the compact wordmark

**Files:**
- Modify: `src/app/LoadingScreen.tsx:82-155`

**Interfaces:**
- Consumes: `revealStarted`, `bracketsOpen`, `letters`.
- Produces: actual `/icon.png` initial mark, smooth crossfade, compact bracketed text final state.

- [ ] **Step 1: Create a relative centered logo stage**

Make the existing logo wrapper `relative flex items-center justify-center` and preserve the responsive type-size rule. Render an asset layer and a text layer in the same centered stage.

- [ ] **Step 2: Render the mark image layer**

Use an image element with these essential properties:

```tsx
<img
  src="/icon.png"
  alt="LSRSP logo"
  className="absolute object-contain"
  style={{
    width: "clamp(88px, 16vw, 220px)",
    height: "clamp(88px, 16vw, 220px)",
    opacity: revealStarted ? 0 : 1,
    transform: revealStarted ? "scale(0.94)" : "scale(1)",
    transition: `opacity ${MARK_TRANSITION_DURATION}ms ease, transform ${MARK_TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
  }}
/>
```

Keep the asset above the text before reveal and non-interactive. The opacity/scale transition must avoid a pop in the initial frame.

- [ ] **Step 3: Crossfade the text row in**

Give the text row `opacity: revealStarted ? 1 : 0`, `transform: revealStarted ? "scale(1)" : "scale(0.94)"`, and the same `MARK_TRANSITION_DURATION` ease. Keep the first `l` hidden from the initial stage by rendering the text row as a transition layer, not as the primary first logo.

- [ ] **Step 4: Tighten the brackets**

Change the opening/closing bracket transforms from `0.32em` to `BRACKET_OFFSET` with signs `-` and `+`. Keep the bracket transition easing and color unchanged.

- [ ] **Step 5: Run lint and build**

Run: `npx eslint src/app/LoadingScreen.tsx`

Expected: PASS.

Run: `npm run build`

Expected: successful production build.

---

### Task 3: Verify and commit

**Files:**
- Modify only if verification finds an issue: `src/app/LoadingScreen.tsx`

- [ ] **Step 1: Inspect timing invariants**

Confirm the asset is visible while `revealStarted` is false, both asset/text transitions switch at the reveal timer, the first lock uses the same timer start, and bracket transforms use `BRACKET_OFFSET`.

- [ ] **Step 2: Check diff scope**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; only `LoadingScreen.tsx` and the new spec/plan docs are changed.

- [ ] **Step 3: Commit the scoped change**

```bash
git add src/app/LoadingScreen.tsx docs/superpowers/specs/2026-10-11-loading-logo-mark-transition-design.md docs/superpowers/plans/2026-10-11-loading-logo-mark-transition.md
git commit -m "feat: refine loading logo transition"
```

Expected: commit succeeds with no unrelated files.
