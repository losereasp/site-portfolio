# Design Document: Direct Project URLs & Deep-Linked Overlay Routing

## Overview
Give every portfolio project a dedicated canonical URL (`/work/[slug]`) that can be shared, bookmarked, and indexed by search engines, while seamlessly preserving the existing cinematic GSAP `ProjectOverlay` UX on both the Home page (`/`) and Work archive (`/work`).

## Problem Statement
Currently, projects on the Home page (`ProjectCard`) and on `/work` are triggered solely via React `onClick` state. They have no `href` attributes, cannot be opened in new tabs or copied from the browser address bar, have no individual SEO metadata, and visitors cannot share a direct link to a specific project.

## User Goals & Requirements
1. **Direct Shareable Links**: Each project has a clean URL:
   - `/work/echoes-of-kalyazin`
   - `/work/last-mechanic`
   - `/work/frost-core`
   - `/work/the-visit`
   - `/work/rampage-rally`
   - `/work/stanley-bottle`
2. **Seamless In-Page UX**: Clicking a project card on `/` or `/work` opens the existing `ProjectOverlay` immediately without a jarring full-page reload, while updating the browser address bar to `/work/[slug]`.
3. **Closing Reverts URL**: Closing the overlay reverts the URL back to `/` (if opened from home) or `/work` (if opened from the archive) without page reload.
4. **Browser History Support**: The browser's Back/Forward buttons close or re-open the overlay accordingly (`popstate` listener).
5. **Direct Entry & SEO**: Direct visits to `/work/[slug]` render the `/work` view with the `ProjectOverlay` open on initial load, with correct per-project `<title>`, description, OpenGraph image, and canonical URL.
6. **Native Link Features**: Project cards and archive rows render `<Link href="/work/[slug]">` so middle-click and "Open link in new tab" navigate directly to the project URL.

---

## Architecture & Implementation Details

### 1. Dynamic Route: `src/app/work/[slug]/page.tsx`
Create a Next.js 16 App Router page:
- **Parameters**: `params: Promise<{ slug: string }>` (Next.js 16 requirement).
- **Static Generation (`generateStaticParams`)**: Pre-render all 6 project slugs at build time.
- **Metadata (`generateMetadata`)**:
  - Title: `${project.title} — Iaroslav Marchenkov`
  - Description: project summary from `PROJECTS_DATA`
  - Canonical: `https://losereasp.com/work/${slug}`
  - OpenGraph: image (`heroImage`), title, description.
  - Fallback / 404: `notFound()` if `slug` is not in `PROJECTS_DATA`.
- **Client Component Integration**: Render `WorkArchiveView initialProjectSlug={slug}` so that direct visitors land on `/work` with the project overlay active and animating in.

### 2. URL Synchronization in `WorkPage` and `Home`
- **History Push/Replace**:
  - Opening project: `window.history.pushState({ projectId: id }, '', `/work/${id}`)`
  - Project switching (next/previous arrows/hotkeys): `window.history.replaceState({ projectId: nextId }, '', `/work/${nextId}`)`
  - Closing project: `window.history.pushState({}, '', isHome ? '/' : '/work')`
- **Popstate Listener**:
  - When the user clicks the browser Back button, detect whether the new path matches `/work/[slug]` or `/`/`/work`, and open/close the overlay accordingly.

### 3. Component Updates
- **`src/app/ProjectCard.tsx`**:
  - Wrap card element in `<Link href={`/work/${project.id}`}>`.
  - In `handleClick(e)`: `e.preventDefault()`, call `onOpen(project.id)`.
- **`src/app/work/page.tsx`**:
  - Support optional `initialProjectSlug` prop (or query param).
  - Wrap table rows in `<Link href={`/work/${id}`}>` with `e.preventDefault()` on normal click.
- **`src/app/ProjectOverlay.tsx`**:
  - When switching next/prev projects, update the URL to match the newly active project.

### 4. Technical SEO (`sitemap.ts`)
- Update `src/app/sitemap.ts` to include all 6 canonical project URLs:
  - `https://losereasp.com/work/echoes-of-kalyazin`
  - `https://losereasp.com/work/last-mechanic`
  - `https://losereasp.com/work/frost-core`
  - `https://losereasp.com/work/the-visit`
  - `https://losereasp.com/work/rampage-rally`
  - `https://losereasp.com/work/stanley-bottle`

---

## Verification & Testing
1. **Typecheck & Build**: Verify Next.js 16 App Router build (`npm run build` or `npx tsc --noEmit`).
2. **Direct URL Test**: Open `/work/last-mechanic` directly, verify project overlay renders on initial load.
3. **Card Click Test**: Click project card from `/` and `/work`, verify overlay opens and URL changes to `/work/[slug]` without reload.
4. **Close Test**: Close overlay, verify URL reverts to `/` or `/work`.
5. **Back/Forward Test**: Test browser Back button closes overlay.
6. **SEO & Sitemap**: Verify `sitemap.ts` returns the 6 project URLs.
