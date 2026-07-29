"use client";

import React from "react";
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import ViewCursor from "../ViewCursor";
import ScrollMarquee from "../ScrollMarquee";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F0F0EE] text-black selection:bg-[#FF5F1F] selection:text-white relative font-mono overflow-x-hidden">
      <ViewCursor />
      <ScrollToTop />

      {/* 1. DARK PRODUCT HERO (85–92svh) */}
      <section className="relative min-h-[85svh] lg:min-h-[92svh] bg-[#0A0D11] text-white flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 border-b-2 border-black overflow-hidden">
        <MainNavbar />

        {/* Top Eyebrow & Compact Status */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF5F1F] inline-block" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#FF5F1F] font-bold uppercase">
              [ THE LAB / PERSONAL PIPELINE R&amp;D ]
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#344553] bg-[#101419] text-white/90 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f0a85a] shadow-[0_0_8px_#f0a85a]" />
            <span>[ CURRENT: DESKTOP SHELL ]</span>
          </div>
        </div>

        {/* Hero Desktop Grid (Product Frame + Poster Display Title) */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch relative z-20 my-auto">
          
          {/* Left Column Title (Desktop: Clean Split with no overflow) */}
          <div className="lg:col-span-5 flex flex-col justify-between order-1 z-30">
            <div>
              <h1 className="font-primary text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[0.88] mb-6 lg:mb-8">
                ASSET<br />BROWSER
              </h1>

              <div className="border-l-2 border-[#FF5F1F] pl-4 max-w-lg mb-6">
                <p className="font-mono text-base text-white/90 font-light leading-relaxed tracking-tight mb-3">
                  One local library for the 3D assets I already own.
                </p>
                <p className="font-mono text-xs text-white/60 leading-relaxed">
                  A Windows-first desktop tool I’m building to catalog assets in place and, step by step, send them into Blender, Cinema 4D, Houdini, and Unreal Engine.
                </p>
              </div>
            </div>

            {/* Metadata Footer Block */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-mono text-white/50 uppercase tracking-wider">
              <div>
                <span className="text-white/30 block">ROLE</span>
                <span className="text-white/90 font-bold">PRODUCT / DESIGN / DEV</span>
              </div>
              <div>
                <span className="text-white/30 block">STACK</span>
                <span className="text-white/90 font-bold">ELECTRON / REACT / TS</span>
              </div>
              <div>
                <span className="text-white/30 block">MODE</span>
                <span className="text-white/90 font-bold">LOCAL-FIRST</span>
              </div>
              <div>
                <span className="text-white/30 block">PLATFORM</span>
                <span className="text-white/90 font-bold">WINDOWS 11</span>
              </div>
            </div>
          </div>

          {/* Right Column: PRODUCT FRAME (Real Shell Representation) */}
          <div className="lg:col-span-7 order-2 flex flex-col justify-center">
            {/* Real Electron App Shell Representation */}
            <div className="w-full bg-[#101419] border border-[#344553] shadow-[0_2rem_6rem_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col min-h-[320px] md:min-h-[420px] justify-between">
              
              {/* Top Calibration Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#344553] bg-[#182129] font-mono text-[11px] text-[#7fb7c9] tracking-[0.16em] uppercase">
                <div className="flex items-center gap-2">
                  <span className="text-[#f0a85a] font-bold">AB</span>
                  <span className="text-[#344553]">|</span>
                  <span>SHELL_CALIBRATION</span>
                </div>
                <span className="text-[#7fb7c9]/80 font-bold">WIN / X64</span>
              </div>

              {/* Main Shell Content */}
              <div className="p-8 md:p-12 relative flex flex-col justify-center flex-1 my-auto">
                <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-[#f0a85a]/25 pointer-events-none" />

                <div className="pl-6 md:pl-10">
                  <div className="font-mono text-xs text-[#7fb7c9] tracking-[0.2em] font-bold uppercase mb-2">
                    // WORKSPACE STATUS
                  </div>
                  <div className="font-mono text-xl md:text-2xl font-bold uppercase text-[#e8eef1] tracking-wide mb-6">
                    ELECTRON DESKTOP SHELL
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs md:text-sm uppercase tracking-widest text-[#c7d1d6] mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f0a85a] border border-[#f8c98f] shadow-[0_0_12px_rgba(240,168,90,0.55)] inline-block" />
                    <span>DESKTOP SHELL READY</span>
                  </div>

                  <div className="pt-4 border-t border-[#344553]/60 grid grid-cols-2 gap-4 font-mono text-[10px] md:text-xs text-[#9dabb2] uppercase tracking-wider">
                    <div>
                      <span className="text-[#7fb7c9]/60 block mb-0.5">CATALOG ENGINE</span>
                      <span className="text-[#e8eef1]">STANDBY / NEXT MILESTONE</span>
                    </div>
                    <div>
                      <span className="text-[#7fb7c9]/60 block mb-0.5">DCC IPC BRIDGE</span>
                      <span className="text-[#e8eef1]">STANDBY / NEXT MILESTONE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Constraints Footer Bar */}
              <div className="grid grid-cols-3 border-t border-[#344553] bg-[#182129] font-mono text-[10px] md:text-xs text-[#9dabb2] tracking-wider uppercase divide-x divide-[#344553]">
                <div className="px-3 py-2.5 text-center">LOCAL-FIRST</div>
                <div className="px-3 py-2.5 text-center">WINDOWS 11 X64</div>
                <div className="px-3 py-2.5 text-center">NO CLOUD REQUIRED</div>
              </div>
            </div>

            {/* Rebuilt Left-Aligned Caption Under Product Frame */}
            <div className="mt-3 font-mono text-xs max-w-full">
              <div className="text-white/80 font-bold uppercase tracking-widest">
                CURRENT BUILD / F-02 / ELECTRON DESKTOP SHELL / JUL 2026
              </div>
              <div className="text-white/50 text-[11px] leading-relaxed mt-0.5">
                Catalog, indexing and DCC connectors are not implemented yet.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MARQUEE TRANSITION LINE */}
      <ScrollMarquee className="!bg-[#111111] !border-y !border-black text-white py-3" speed={1.8}>
        <div className="flex items-center gap-8 md:gap-16 font-mono text-sm md:text-xl uppercase font-bold tracking-[0.25em] text-[#F0F0EE]">
          <span>LOCAL-FIRST</span>
          <span className="text-[#FF5F1F]">✦</span>
          <span>WINDOWS</span>
          <span className="text-[#FF5F1F]">✦</span>
          <span>OWN YOUR FILES</span>
          <span className="text-[#FF5F1F]">✦</span>
          <span>MULTI-DCC TARGET</span>
          <span className="text-[#FF5F1F]">✦</span>
          <span>ACTIVE BUILD</span>
          <span className="text-[#FF5F1F]">✦</span>
        </div>
      </ScrollMarquee>

      {/* 3. WHY I’M BUILDING IT (Asymmetric Editorial Layout) */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Heading & Narrative Statement */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-3">
              [ MOTIVATION &amp; CORE PAIN ]
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase text-[#111111] leading-[0.9] mb-6">
              WHY I’M<br />BUILDING IT
            </h2>
            <p className="font-mono text-base text-black/80 font-light leading-relaxed max-w-md">
              My models, materials and textures are spread across local drives, external storage and vendor libraries. Finding the right asset often means remembering where it came from.
            </p>
          </div>

          {/* Right Column: Three Vertical Problem Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-black/15">
            <div className="pt-6 pb-8 first:pt-0">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">01 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase text-black">
                  SCATTERED FILES
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                Assets are scattered across local folders, external drives and closed vendor libraries.
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">02 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase text-black">
                  INCONSISTENT METADATA
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                Previews, tags, source information and license terms are stored inconsistently or get lost.
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">03 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase text-black">
                  REPEATED DCC SETUP
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                Moving an asset between DCCs often means rebuilding materials, relinking textures and repeating import setup.
              </p>
            </div>
          </div>
        </div>

        {/* Target Pipeline Flow Diagram */}
        <div className="bg-[#111111] text-white p-8 md:p-12 border border-black relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-widest uppercase font-bold">
              [ TARGET PIPELINE FLOW ]
            </span>
            <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest bg-white/10 px-3 py-1">
              TARGET WORKFLOW — NOT IMPLEMENTED YET
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-mono py-4">
            <div className="p-6 border border-white/15 bg-black/40">
              <span className="text-white/40 text-xs block mb-2 font-bold">SOURCE</span>
              <span className="text-sm md:text-base font-bold text-white uppercase">SCATTERED FOLDERS + VENDOR LIBRARIES</span>
            </div>

            <div className="flex flex-col items-center justify-center text-[#FF5F1F] font-bold text-xl md:text-2xl py-2">
              <span className="hidden md:inline">➔</span>
              <span className="md:hidden">⬇</span>
              <span className="text-[10px] text-white/40 font-normal tracking-widest mt-1">INDEX IN PLACE</span>
            </div>

            <div className="p-6 border border-[#FF5F1F]/40 bg-[#FF5F1F]/10">
              <span className="text-[#FF5F1F] text-xs block mb-2 font-bold">HUB</span>
              <span className="text-sm md:text-base font-bold text-white uppercase">ONE LOCAL CATALOG</span>
            </div>
          </div>

          <div className="flex justify-center text-[#FF5F1F] font-bold text-xl md:text-2xl my-4">
            <span>⬇</span>
          </div>

          <div className="p-6 border border-white/15 bg-black/40 text-center font-mono">
            <span className="text-white/40 text-xs block mb-2 font-bold">TARGET DCCS</span>
            <span className="text-sm md:text-lg font-bold text-white tracking-widest uppercase">BLENDER / C4D / HOUDINI / UNREAL</span>
          </div>
        </div>
      </section>

      {/* 4. CURRENT BUILD (Three Levels of Implementation Cards) */}
      <section className="bg-[#111111] text-white py-20 md:py-28 border-y border-black">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
              [ TRANSPARENT STATE ]
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase text-white">
              CURRENT BUILD
            </h2>
            <p className="font-mono text-base text-white/60 max-w-2xl mt-3">
              Honest status check of what is merged in the codebase today versus future goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 1: Implemented in Repo */}
            <div className="bg-[#182129] border-2 border-[#FF5F1F] p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest">
                    LEVEL 01
                  </span>
                  <span className="font-mono text-[10px] bg-[#FF5F1F] text-black font-bold px-2 py-0.5 uppercase">
                    MERGED IN REPO
                  </span>
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-4">
                  IMPLEMENTED IN REPO
                </h3>
                <ul className="space-y-3 font-mono text-xs md:text-sm text-white/90">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF5F1F] font-bold">✓</span>
                    <span>Pinned Windows toolchain and workspace checks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF5F1F] font-bold">✓</span>
                    <span>Secure Electron / React desktop shell</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 2: Next Milestones */}
            <div className="bg-[#101419] border border-white/20 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/60 font-bold uppercase tracking-widest">
                    LEVEL 02
                  </span>
                  <span className="font-mono text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 uppercase">
                    NEXT GATES
                  </span>
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white/90 mb-4">
                  NEXT MILESTONES
                </h3>
                <ul className="space-y-3 font-mono text-xs md:text-sm text-white/70">
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>Packaged Windows smoke test</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>Local SQLite read/write slice</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>First end-to-end walking skeleton</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 3: Future Direction */}
            <div className="bg-[#0A0D11] border border-white/10 p-8 flex flex-col justify-between opacity-75">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/40 font-bold uppercase tracking-widest">
                    LEVEL 03
                  </span>
                  <span className="font-mono text-[10px] bg-white/10 text-white/50 font-bold px-2 py-0.5 uppercase">
                    LATER
                  </span>
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white/70 mb-4">
                  FUTURE DIRECTION
                </h3>
                <ul className="space-y-2.5 font-mono text-xs text-white/50">
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Searchable local catalog</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Previews, metadata and filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>First production DCC connector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Additional DCC connectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Visual search after core workflow proves useful</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DESIGN TARGETS (Numbered Manifesto Rows) */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 md:py-28">
        <div className="mb-14">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-3">
            [ ARCHITECTURAL GOALS ]
          </span>
          <h2 className="font-primary text-5xl md:text-7xl font-black uppercase text-[#111111]">
            DESIGN TARGETS
          </h2>
          <p className="font-mono text-base text-black/70 max-w-2xl mt-3">
            Core principles guiding how the software will be structured as development progresses.
          </p>
        </div>

        {/* Three Large Horizontal Numbered Rows */}
        <div className="flex flex-col divide-y divide-black/20 border-t border-b border-black/20">
          
          {/* Row 01 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
            <div className="md:col-span-2 font-mono text-lg md:text-xl font-bold text-[#FF5F1F]">
              01 —
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-black">
                LOCAL CATALOG
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                Index existing folders without moving or modifying the original files.
              </p>
            </div>
          </div>

          {/* Row 02 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
            <div className="md:col-span-2 font-mono text-lg md:text-xl font-bold text-[#FF5F1F]">
              02 —
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-black">
                PORTABLE METADATA
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                Keep previews, tags, source and license information attached to the logical asset.
              </p>
            </div>
          </div>

          {/* Row 03 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
            <div className="md:col-span-2 font-mono text-lg md:text-xl font-bold text-[#FF5F1F]">
              03 —
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-black">
                THIN DCC CONNECTORS
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                Build host-specific import operations around one shared local catalog.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BUILD LOG (Horizontal Timeline on Desktop) */}
      <section className="bg-white py-20 md:py-28 border-t border-black/15">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-3">
              [ REALISTIC STAGING ]
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase text-[#111111]">
              BUILD LOG
            </h2>
            <p className="font-mono text-base text-black/70 max-w-2xl mt-3">
              Sequential staging plan. No artificial release dates — one verified milestone at a time.
            </p>
          </div>

          {/* Desktop Horizontal Timeline / Mobile Vertical */}
          <div className="relative pt-6">
            {/* Horizontal Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[42px] left-0 right-0 h-[2px] bg-black/15 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              
              {/* Node NOW (Orange Accent & Highest Contrast) */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 rounded-full bg-[#FF5F1F] border-2 border-white ring-4 ring-[#FF5F1F]/20 flex items-center justify-center text-white font-mono text-[9px] font-bold">
                    ✓
                  </div>
                  <span className="font-mono text-sm text-[#FF5F1F] font-bold tracking-widest uppercase">
                    NOW
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-[#FF5F1F] pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-primary text-2xl font-black uppercase text-black mb-2">
                    DESKTOP FOUNDATION
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/80 leading-relaxed">
                    Electron shell, repository tooling and security baseline.
                  </p>
                </div>
              </div>

              {/* Node NEXT */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 rounded-full bg-black border-2 border-white ring-4 ring-black/10 flex items-center justify-center text-white font-mono text-[9px] font-bold">
                    ▶
                  </div>
                  <span className="font-mono text-sm text-black font-bold tracking-widest uppercase">
                    NEXT
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/20 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-primary text-2xl font-bold uppercase text-black mb-2">
                    PACKAGING + LOCAL DATA
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/70 leading-relaxed">
                    Packaged Windows verification and first SQLite slice.
                  </p>
                </div>
              </div>

              {/* Node THEN */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 rounded-full bg-black/40 border-2 border-white flex items-center justify-center text-white font-mono text-[9px]">
                    ○
                  </div>
                  <span className="font-mono text-sm text-black/60 font-bold tracking-widest uppercase">
                    THEN
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/15 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-primary text-2xl font-bold uppercase text-black/80 mb-2">
                    WALKING SKELETON
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/60 leading-relaxed">
                    Scan fixtures, show one asset and execute one mock operation end to end.
                  </p>
                </div>
              </div>

              {/* Node LATER */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 rounded-full bg-black/20 border-2 border-white flex items-center justify-center text-white font-mono text-[9px]">
                    ○
                  </div>
                  <span className="font-mono text-sm text-black/40 font-bold tracking-widest uppercase">
                    LATER
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/10 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-primary text-2xl font-bold uppercase text-black/60 mb-2">
                    CATALOG + DCC CONNECTORS
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/50 leading-relaxed">
                    Useful personal catalog first, then one verified connector at a time.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 md:py-28">
        <div className="bg-[#111111] text-white p-8 md:p-14 border border-black shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#FF5F1F] font-bold tracking-widest uppercase block mb-3">
              [ PIPELINE FEEDBACK ]
            </span>
            <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-white mb-4 leading-tight">
              HAVE A MESSY 3D ASSET LIBRARY?
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/80 leading-relaxed">
              I’m documenting how artists store, find, and reuse assets across DCCs. If your library is messy too, tell me what wastes the most time. Early testing comes after the personal build proves useful.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <a
              href="https://t.me/losereasp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-[#FF5F1F] text-white px-8 py-4 border border-[#FF5F1F] hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              [ TELEGRAM CONTACT → ]
            </a>
            <a
              href="mailto:yarik.marchenkov@yandex.ru"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-transparent border border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-4 cursor-pointer"
            >
              [ EMAIL INQUIRY → ]
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
