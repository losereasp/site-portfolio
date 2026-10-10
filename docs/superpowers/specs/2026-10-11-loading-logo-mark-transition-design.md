# Loading Logo Mark Transition Design

## Goal

Refine the loading animation so it starts from the actual brand mark in `public/icon.png`, transitions smoothly into the existing letter scramble, and ends as a compact bracketed `[LSRSP]` wordmark.

## Behavior

- At mount, show the real `icon.png` mark rather than a text `l` rendered in the display font. The asset is shown as a contained logo image on the black loading panel, with a subtle opacity/scale settle so the first frame does not pop.
- Hold the mark briefly, then begin the bracket split and letter reveal at the same moment.
- Crossfade the asset out while the text logo row fades/scales in. The existing scramble characters remain the mechanism for changing into `LSRSP`; no hard replacement flash.
- Keep the left-to-right locking rhythm and upward panel exit.
- Reduce the final bracket translation so `[LSRSP]` reads as a compact logo rather than a widely spaced wordmark.

## Implementation

Modify only `src/app/LoadingScreen.tsx`. Add a `showMark`/`revealStarted` phase state and render two layers in the same centered logo stage: the `icon.png` image layer and the text bracket row. The image uses `/icon.png`, `object-contain`, and inline opacity/transform transitions. The text row starts hidden/softly scaled and transitions in when the reveal timer fires. Keep all existing timer cleanup and body overflow restoration.

Use responsive dimensions based on the current logo type scale. Use a shorter bracket offset (approximately `0.14em`) and a gentle easing curve for the initial mark transition. Preserve the orange/white colors and final `[LSRSP]` appearance.

## Acceptance Criteria

1. Initial visible logo is the actual `icon.png` mark, not a text `l`.
2. Initial appearance uses opacity/scale easing and has no visible pop.
3. Bracket movement and scramble/reveal begin together.
4. Asset crossfades into the text logo while the letters continue through scramble to `LSRSP`.
5. Final mark is compact `[LSRSP]` with brackets left in place.
6. Cleanup clears all timers and restores body overflow.
7. `npx eslint src/app/LoadingScreen.tsx` passes and `npm run build` passes.
8. No navbar, global styles, or dependencies change.
