# LSRSP — Portfolio & 3D R&D Lab

> **Iaroslav Marchenkov** · CG Generalist & Creative Developer  
> Live Site: [https://site-portfolio-kappa-two.vercel.app](https://site-portfolio-kappa-two.vercel.app)

---

## ⚡ Overview

Personal portfolio and experimental R&D lab showcasing 3D artwork, motion graphics, interactive WebGL, and custom software pipeline tools. Built with a Swiss architectural visual posture (*Cream canvas, sharp hairline dividers, restrained brand orange `#FF5F1F`*).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **3D & Graphics:** [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Animation:** [GSAP](https://gsap.com/) & [Framer Motion](https://framer.com/motion)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design Tokens
- **Typography:** Impact (Display Headers) & JetBrains Mono (Metadata & Technical Data)
- **Language:** TypeScript

---

## 🚀 Key Features & Pages

- **Main Experience (`/`)**:
  - Interactive 3D Canvas Hero
  - Drag-based "Lab Reel" horizontal carousel for 3D sketches (`SketchesReel.tsx`)
  - Bento Grid for Selected Commercial Works (`FROST CORE`, `RAMPAGE RALLY`, `THE VISIT`, `STANLEY BOTTLE`)
  - Modal Project Overlay with full keyboard hotkeys (`←` / `→` Navigate, `Space` Play/Pause, `M` Mute, `Esc` Close)
- **Tools R&D Showcase (`/tools`)**:
  - Case Study & Architecture Breakdown for **Asset Browser** — a Windows-first, local-first 3D asset manifest desktop application
  - Honest progress tracking (*Implemented in Repo vs Next Milestones vs Long-Term Direction*)
  - Pipeline feedback & collaboration channel
- **Work Archive (`/work`)**: Complete showcase of commercial projects & technical breakdowns
- **About (`/about`)**: Biography, toolchain inventory, workflow philosophy, and direct contact options

---

## ⚙️ Local Development

```bash
# Clone repository
git clone https://github.com/losereasp/site-portfolio.git
cd site-portfolio

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Build & Verification

```bash
# Type check and production build
npm run build

# Start production server
npm run start
```

---

## 📬 Contact

- **Telegram:** [@losereasp](https://t.me/losereasp)
- **Email:** [yarik.marchenkov@yandex.ru](mailto:yarik.marchenkov@yandex.ru)
