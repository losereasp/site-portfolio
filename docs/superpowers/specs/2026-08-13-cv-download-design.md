# CV Download Feature Design

## Overview
Enable downloading and viewing of PDF resumes (English and Russian versions) on the `/about` page of the portfolio website, replacing the current "COMING SOON" placeholder button.

## Requirements & Scope
1. **Assets**:
   - Copy `Iaroslav-Marchenkov-CV-EN.pdf` and `Iaroslav-Marchenkov-CV-RU.pdf` from source directory into `public/`.
2. **Internationalization (`src/app/i18n/translations.ts`)**:
   - EN: Change `downloadResume` from `"DOWNLOAD RESUME (COMING SOON)"` to `"DOWNLOAD RESUME"`.
   - RU: Change `downloadResume` from `"СКАЧАТЬ РЕЗЮМЕ (СКОРО)"` to `"СКАЧАТЬ РЕЗЮМЕ"`.
3. **UI / UX (`src/app/about/page.tsx`)**:
   - Replace disabled/stub resume button container with an active `<a>` element wrapped in `<Magnetic>`.
   - Dynamic Link Target:
     - When `language === 'en'`, target `/Iaroslav-Marchenkov-CV-EN.pdf`.
     - When `language === 'ru'`, target `/Iaroslav-Marchenkov-CV-RU.pdf`.
   - Set `target="_blank"` and `rel="noopener noreferrer"` so the PDF opens in a new browser tab for viewing/downloading.
   - Maintain visual styling consistent with secondary action buttons on the site.

## Verification
- Verify build with Next.js build / type check.
- Verify file availability in `public/`.
