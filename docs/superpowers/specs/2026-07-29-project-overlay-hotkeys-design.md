# Design Specification: ProjectOverlay Hotkeys & Seamless Project Navigation

**Date:** 2026-07-29  
**Author:** LSRSP Portfolio Agent  
**Status:** Approved  

---

## 1. Overview

Enhances the project modal overlay (`ProjectOverlay.tsx`) with seamless project-to-project navigation controls, rich keyboard shortcuts (hotkeys), sticky header navigation buttons, a monospace hotkey legend bar, and optimized video/3D preloading.

---

## 2. Interface & Behavior Specification

### Keyboard Shortcuts (Hotkeys)
- **`ArrowLeft` (`←`):** Navigates to the previous project in the sequence without closing the overlay.
- **`ArrowRight` (`→`):** Navigates to the next project in the sequence.
- **`Space` (` `):** Toggles video play/pause on the project showcase video.
- **`KeyM` (`M`):** Toggles video audio mute/unmute.
- **`Escape` (`Esc`):** If an asset lightbox is active, closes the lightbox. Otherwise, closes the project overlay.

### Header Navigation Bar
- Located inside the sticky top bar of `ProjectOverlay.tsx`:
  - `[ ← PREV ]` button with hover tooltip displaying previous project name.
  - `[ NEXT → ]` button with hover tooltip displaying next project name.
  - `[ × CLOSE ]` button.

### Monospace Hotkey Legend Bar
- Fixed/sticky translucent bar at the bottom right/center of the modal:
  `[ ← → NAVIGATE ]` • `[ SPACE PLAY/PAUSE ]` • `[ M MUTE ]` • `[ ESC CLOSE ]`

---

## 3. Data Flow & Component Signature

### `ProjectOverlay.tsx`
Updated props:
```tsx
interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  currentProjectId?: string;
  project: ProjectData;
}
```

- Sequenced list of projects: `["frost-core", "rampage-rally", "the-visit", "stanley-bottle"]`.
- `onSelectProject(nextId)` triggers seamless project transition.

---

## 4. Verification Plan

1. Open `ProjectOverlay` on any project.
2. Test `ArrowRight` and `ArrowLeft` keys to cycle through projects smoothly.
3. Test `Space` key to pause/play video.
4. Test `M` key to toggle audio mute.
5. Verify top header `[ ← PREV ]` and `[ NEXT → ]` buttons work and show target project titles.
6. Run `npm run build` to verify 0 build errors.
