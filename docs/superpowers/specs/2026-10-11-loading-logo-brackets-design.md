# Loading Logo Brackets Design

## Goal

Update the loading screen so the existing `[l]` brand mark is visible first, then its brackets spread apart while the current letter scramble/reveal starts at the same time. The final loading mark keeps the brackets around the completed `LSRSP` wordmark.

## Current Context

`src/app/LoadingScreen.tsx` currently renders only the five-letter `LSRSP` scramble. Letters lock left-to-right after a short delay, then the black loading panel slides upward. The site navbar already establishes the brand mark as orange square brackets around a lowercase `l`.

## Design

### Timeline

- `0ms`: render `[l]` centered. The opening and closing brackets are orange; the central `l` is the first target letter and starts in the existing orange/unlocked state.
- `250ms`: begin two timelines together:
  - the brackets animate outward from the central letter using CSS transforms;
  - the existing scramble interval continues and the target-letter locking schedule begins for `LSRSP`.
- `250ms + 190ms * i`: lock target letters from left to right, preserving the existing `LSRSP` reveal rhythm. The first `L` is locked at the first lock time; the remaining letters follow the current stagger.
- After the last letter is locked and a short settle delay elapses: slide the full loading panel upward using the existing exit transition.
- During and after the reveal, brackets remain visible around the wordmark. Their final positions are stable and do not overlap the letters.

### Rendering Structure

`LoadingScreen` will render one centered logo row containing:

1. an opening bracket element;
2. five target/scramble letter elements;
3. a closing bracket element.

The bracket elements are independent from the letter state so their transform can animate without affecting scramble logic. The letter array continues to use the current `{ char, locked }` state and `lockedCountRef`.

### Motion and Layout

- Use CSS transitions on the bracket elements rather than a new animation library.
- Brackets begin close to the center, visually forming `[l]`.
- At the split phase, the opening bracket translates left and the closing bracket translates right. Use a responsive CSS distance based on `clamp()` so the effect scales with the existing `clamp(64px, 12vw, 180px)` type size.
- Keep the row centered and prevent bracket/letter wrapping.
- Preserve the existing orange unlocked state, white locked state, black background, and upward panel exit.

### Timing and Cleanup

- Keep the existing scramble interval and per-letter lock cleanup.
- Add cleanup for the bracket split timer and the nested hide timer.
- Restore `document.body.style.overflow` on both normal exit and unmount.
- Compute the hide time from the split start, the existing lock stagger, the last lock, and the existing settle/exit timing so the final bracketed logo is visible before the panel leaves.

## Scope

- Modify only `src/app/LoadingScreen.tsx` for behavior and styling.
- Do not change the navbar logo, global styles, fonts, page structure, or other loading behavior.
- Do not add dependencies.

## Acceptance Criteria

1. On mount, the loading screen visibly starts with `[l]` centered.
2. Brackets begin spreading at the same time the scramble/reveal timeline starts.
3. Letters still scramble and lock left-to-right as `LSRSP`.
4. The final visible mark is bracketed, e.g. `[LSRSP]`, before the panel exits.
5. Unmounting during any phase clears timers/intervals and restores body overflow.
6. `npm run lint` and `npm run build` pass.
7. Existing navbar and non-loading pages remain untouched.
