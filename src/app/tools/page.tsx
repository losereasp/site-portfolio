"use client";

import React, { useState } from "react";
import Link from "next/link";
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import ViewCursor from "../ViewCursor";
import AssetBrowserMockup from "./AssetBrowserMockup";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "roadmap">("overview");

  const scrollToSection = (id: string, tab: "overview" | "specs" | "roadmap") => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] text-white selection:bg-[#FF5F1F] selection:text-white relative">
      <ViewCursor />
      <ScrollToTop />
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Top Metadata Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-[#FF5F1F] shadow-[0_0_8px_#FF5F1F]" />
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#FF5F1F] font-bold uppercase">
              [ PIPELINE &amp; SOFTWARE R&amp;D ]
            </span>
          </div>

          {/* Status Pill */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#FF5F1F]/40 bg-[#0F0F0F] text-white text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(255,95,31,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F1F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5F1F]" />
            </span>
            <span className="text-white/90">[ STATUS: RESEARCH &amp; DEVELOPMENT ]</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="font-primary text-6xl md:text-9xl font-black uppercase tracking-tight text-white leading-[0.9] mb-6 drop-shadow-[0_0_35px_rgba(255,95,31,0.3)]">
          ASSET BROWSER
        </h1>

        {/* Subtitle / Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-8 font-mono text-xl md:text-3xl text-white/90 font-light leading-snug tracking-tight">
            &quot;One personal library. Every DCC. Zero clutter.&quot;
          </p>

          <div className="lg:col-span-4 font-mono text-xs text-white/60 leading-relaxed border-l-2 border-[#FF5F1F] pl-4">
            A local-first, universal 3D asset manifest &amp; live-bridge tool designed to unify workflows across Blender, Cinema 4D, Houdini, and Unreal Engine.
          </div>
        </div>
      </section>

      {/* Interactive Mockup Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 md:pb-24">
        <div className="mb-4 flex items-center justify-between font-mono text-xs tracking-wider text-white/50 uppercase border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF5F1F]">❖</span>
            <span className="font-bold text-white/90">[ INTERACTIVE SOFTWARE PREVIEW — DEMO V0.4 ]</span>
          </div>
          <span className="hidden sm:inline text-white/40">PROTOTYPE // INTERNAL BUILD</span>
        </div>

        {/* Mockup Frame */}
        <div className="border border-[#FF5F1F]/40 shadow-[0_0_60px_rgba(255,95,31,0.15)] overflow-hidden bg-black">
          <AssetBrowserMockup />
        </div>
      </section>

      {/* Sticky Navigation Quick Filter Tabs */}
      <section className="sticky top-20 z-40 px-4 md:px-8 max-w-7xl mx-auto pb-12">
        <div className="flex flex-wrap items-center gap-3 bg-[#080808]/90 backdrop-blur-md py-3 border-b border-[#FF5F1F]/20">
          <button
            onClick={() => scrollToSection("problem-solution", "overview")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#FF5F1F] text-white border-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                : "bg-[#111111] text-white/70 border-white/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F]"
            }`}
          >
            01 // PROBLEM VS SOLUTION
          </button>
          <button
            onClick={() => scrollToSection("architecture", "specs")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "specs"
                ? "bg-[#FF5F1F] text-white border-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                : "bg-[#111111] text-white/70 border-white/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F]"
            }`}
          >
            02 // TECHNICAL ARCHITECTURE
          </button>
          <button
            onClick={() => scrollToSection("roadmap", "roadmap")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-[#FF5F1F] text-white border-[#FF5F1F] shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                : "bg-[#111111] text-white/70 border-white/10 hover:border-[#FF5F1F] hover:text-[#FF5F1F]"
            }`}
          >
            03 // ROADMAP
          </button>
        </div>
      </section>

      {/* Section 1: Problem vs Solution Bento Grid */}
      <section id="problem-solution" className="px-4 md:px-8 max-w-7xl mx-auto pb-24 md:pb-32 pt-4">
        <div className="mb-10">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
            [ THE PARADIGM SHIFT ]
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-white">
            PROBLEM VS SOLUTION
          </h2>
          <p className="font-mono text-sm text-white/60 max-w-2xl mt-2">
            Why legacy asset managers create friction in modern multi-DCC production pipelines, and how Asset Browser solves it.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* THE PROBLEM CARD - Deep Crimson Dark #0D0606 */}
          <div className="bg-[#0D0606] text-white p-8 md:p-12 border border-red-900/40 relative flex flex-col justify-between overflow-hidden group shadow-[0_0_40px_rgba(239,68,68,0.08)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-red-900/30 pb-4 mb-8">
                <span className="font-mono text-xs text-red-400 tracking-widest uppercase font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block shadow-[0_0_8px_#ef4444]" />
                  [ 01 // THE PAIN POINT ]
                </span>
                <span className="font-mono text-xs text-white/50 uppercase">Ecosystem Fragmentation</span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-white mb-6">
                THE FRAGMENTATION TRAP
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    1. Walled Gardens &amp; Siloed Stores
                  </h4>
                  <p className="font-mono text-xs text-white/70 leading-relaxed">
                    Quixel Bridge, Blender Kit, Cinema 4D Asset Browser, and Epic Marketplace keep assets trapped in proprietary formats and vendor-locked engines.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    2. Scattered NAS &amp; Cloud Drives
                  </h4>
                  <p className="font-mono text-xs text-white/70 leading-relaxed">
                    Assets are spread across local NVMe storage, shared team NAS drives, and cloud backups without standardized metadata or instant visual indexing.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    3. Manual Shader &amp; Texture Re-linking
                  </h4>
                  <p className="font-mono text-xs text-white/70 leading-relaxed">
                    Importing meshes into new DCCs requires rebuilding materials from scratch, re-assigning map channels, and fixing broken absolute path references.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    4. Slow Search &amp; Bloated Caches
                  </h4>
                  <p className="font-mono text-xs text-white/70 leading-relaxed">
                    Heavy desktop apps consume gigabytes of background memory and take minutes to search simple library directories.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-red-900/30 flex items-center justify-between font-mono text-[11px] text-white/50">
              <span>RESULT: WASTED BILLABLE HOURS</span>
              <span className="text-red-400 font-bold">HIGH FRICTION</span>
            </div>
          </div>

          {/* THE SOLUTION CARD - Deep Dark #0E0A06 with #FF5F1F Orange Glow */}
          <div className="bg-[#0E0A06] text-white p-8 md:p-12 border border-[#FF5F1F]/40 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(255,95,31,0.12)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5F1F]/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-[#FF5F1F]/20 pb-4 mb-8">
                <span className="font-mono text-xs text-[#FF5F1F] tracking-widest uppercase font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF5F1F] rounded-full inline-block shadow-[0_0_8px_#FF5F1F]" />
                  [ 02 // THE LSRSP ARCHITECTURE ]
                </span>
                <span className="font-mono text-xs text-white/50 uppercase">Universal Interoperability</span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-white mb-6">
                LOCAL-FIRST UNIVERSAL INDEXING
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    1. Open Universal Manifest (.JSON / OpenUSD)
                  </h4>
                  <p className="font-mono text-xs text-white/80 leading-relaxed">
                    Every asset uses a standardized schema mapping PBR channels, geometry bounds, poly counts, and license info independently of any single 3D application.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    2. 1-Click Multi-DCC Live IPC Bridge
                  </h4>
                  <p className="font-mono text-xs text-white/80 leading-relaxed">
                    High-speed local WebSocket/socket bridges push assets instantly directly into active viewports in Blender, C4D, Houdini, or Unreal Engine with shaders auto-constructed.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    3. Ultra-Fast Rust Local File Scanner
                  </h4>
                  <p className="font-mono text-xs text-white/80 leading-relaxed">
                    Scans 500,000+ local 3D files in seconds. Zero mandatory cloud logins, zero subscription paywalls, and complete data privacy.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    4. AI Vector Similarity &amp; Tagging
                  </h4>
                  <p className="font-mono text-xs text-white/80 leading-relaxed">
                    Local machine learning model automatically generates tags, detects duplicate meshes, and categorizes materials by visual texture features.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#FF5F1F]/20 flex items-center justify-between font-mono text-[11px] text-white/60">
              <span>RESULT: EFFORTLESS FLUIDITY</span>
              <span className="text-[#FF5F1F] font-bold">100% LOCAL CONTROL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Architecture & Technical Specs Grid */}
      <div id="architecture" className="bg-[#050505] text-white py-24 md:py-32 border-y border-[#FF5F1F]/20">
        <section className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
              [ TECHNICAL BLUEPRINT ]
            </span>
            <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-white">
              CORE ARCHITECTURE
            </h2>
            <p className="font-mono text-sm text-white/60 max-w-2xl mt-2">
              Engineered for heavy production pipelines with high-performance native modules and lightweight memory footprint.
            </p>
          </div>

          {/* 5 Technical Specs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Spec 1 */}
            <div className="bg-[#111111] border border-[#FF5F1F]/30 p-8 flex flex-col justify-between hover:border-[#FF5F1F] hover:shadow-[0_0_25px_rgba(255,95,31,0.15)] transition-all group">
              <div>
                <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                  01 // INDEX ENGINE
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#FF5F1F] transition-colors">
                  LOCAL-FIRST INDEXING
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Powered by a high-throughput Rust backend that indexes local NVMe arrays, NAS shares, and external drives in parallel with SQLite WAL caching. Zero latency, works completely offline.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>SCAN SPEED: 150K FILES/SEC</span>
                <span className="font-bold text-[#FF5F1F]">RUST + SQLITE</span>
              </div>
            </div>

            {/* Spec 2 */}
            <div className="bg-[#111111] border border-[#FF5F1F]/30 p-8 flex flex-col justify-between hover:border-[#FF5F1F] hover:shadow-[0_0_25px_rgba(255,95,31,0.15)] transition-all group">
              <div>
                <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                  02 // FORMAT STANDARD
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#FF5F1F] transition-colors">
                  UNIVERSAL MANIFEST
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Open JSON schema wrapping USD (.usdc/.usda), glTF 2.0, and FBX metadata. Preserves material parameters, vertex color maps, LOD hierarchies, and variant sets across target apps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>SUPPORT: USD / GLTF / FBX</span>
                <span className="font-bold text-[#FF5F1F]">OPEN SCHEMAS</span>
              </div>
            </div>

            {/* Spec 3 */}
            <div className="bg-[#111111] border border-[#FF5F1F]/30 p-8 flex flex-col justify-between hover:border-[#FF5F1F] hover:shadow-[0_0_25px_rgba(255,95,31,0.15)] transition-all group">
              <div>
                <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                  03 // LIVE PIPELINE
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#FF5F1F] transition-colors">
                  DIRECT DCC BRIDGES
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Dedicated lightweight add-ons for Blender (4.x+), Cinema 4D (2024+), Houdini (Solaris/LOPs), and Unreal Engine 5. Imports geometry into selection space with node trees linked.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>IPC PROTOCOL: WEBSOCKET</span>
                <span className="font-bold text-[#FF5F1F]">ONE-CLICK IMPORT</span>
              </div>
            </div>

            {/* Spec 4 */}
            <div className="bg-[#111111] border border-[#FF5F1F]/30 p-8 flex flex-col justify-between hover:border-[#FF5F1F] hover:shadow-[0_0_25px_rgba(255,95,31,0.15)] transition-all group">
              <div>
                <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                  04 // INTELLIGENCE
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#FF5F1F] transition-colors">
                  AI VISUAL SEARCH &amp; TAGS
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed">
                  Embedded lightweight CLIP visual embedding engine extracts dominant color palettes, surface roughness attributes, mesh geometry complexity, and auto-generates descriptive tags.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>ON-DEVICE EMBEDDINGS</span>
                <span className="font-bold text-[#FF5F1F]">AUTO-TAGGING</span>
              </div>
            </div>

            {/* Spec 5 */}
            <div className="bg-[#111111] border border-[#FF5F1F]/30 p-8 flex flex-col justify-between hover:border-[#FF5F1F] hover:shadow-[0_0_25px_rgba(255,95,31,0.15)] transition-all group lg:col-span-2">
              <div>
                <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                  05 // GOVERNANCE &amp; RIGHTS
                </div>
                <h3 className="font-primary text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#FF5F1F] transition-colors">
                  LICENSE &amp; CREDIT TRACKER
                </h3>
                <p className="font-mono text-xs text-white/70 leading-relaxed max-w-xl">
                  Automatically logs license terms (CC0, Commercial, Royalty-Free, Attribution Required) and client project tags. Instantly export credit sheets and asset manifests for commercial production handoffs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>PRODUCTION COMPLIANCE</span>
                <span className="font-bold text-[#FF5F1F]">AUTOMATED CREDIT EXPORT</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section 3: Development Roadmap Timeline */}
      <section id="roadmap" className="px-4 md:px-8 max-w-7xl mx-auto py-24 md:py-36">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
            [ EXECUTION TIMELINE ]
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-white">
            ROADMAP
          </h2>
          <p className="font-mono text-sm text-white/60 max-w-2xl mt-2">
            Milestone tracker from initial architecture design to commercial-grade pipeline release.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phase 01 */}
          <div className="bg-[#111111] text-white border border-white/10 p-6 relative flex flex-col justify-between shadow-md">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ COMPLETED ]
            </div>

            <div>
              <span className="font-mono text-xs text-[#FF5F1F] font-bold block mb-2">PHASE 01</span>
              <h3 className="font-primary text-xl font-bold uppercase text-white mb-4">
                RESEARCH &amp; INDEXER
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rust filesystem scanner core</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Universal Manifest JSON spec</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Header parser for FBX / USD / glTF</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 02 */}
          <div className="bg-[#111111] text-white border-2 border-[#FF5F1F] p-6 relative flex flex-col justify-between shadow-[0_0_25px_rgba(255,95,31,0.2)]">
            <div className="absolute top-0 right-0 bg-[#FF5F1F] text-white font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ IN PROGRESS ]
            </div>

            <div>
              <span className="font-mono text-xs text-[#FF5F1F] font-bold block mb-2">PHASE 02</span>
              <h3 className="font-primary text-xl font-bold uppercase text-white mb-4">
                DESKTOP MVP &amp; BRIDGES
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5F1F] font-bold">▶</span>
                  <span>Tauri + React 19 UI front-end</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5F1F] font-bold">▶</span>
                  <span>Blender 4.x Python IPC plugin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF5F1F] font-bold">▶</span>
                  <span>Cinema 4D C++ WebSocket bridge</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 03 */}
          <div className="bg-[#111111]/80 text-white border border-white/10 p-6 relative flex flex-col justify-between shadow-md">
            <div className="absolute top-0 right-0 bg-white/20 text-white/80 font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ UPCOMING ]
            </div>

            <div>
              <span className="font-mono text-xs text-white/40 font-bold block mb-2">PHASE 03</span>
              <h3 className="font-primary text-xl font-bold uppercase text-white/90 mb-4">
                CLOSED BETA &amp; MULTI-DCC
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Houdini Solaris / LOPs bridge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Unreal Engine 5 Content sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>On-device AI visual search model</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 04 */}
          <div className="bg-[#111111]/80 text-white border border-white/10 p-6 relative flex flex-col justify-between shadow-md">
            <div className="absolute top-0 right-0 bg-white/10 text-white/50 font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ PLANNED ]
            </div>

            <div>
              <span className="font-mono text-xs text-white/40 font-bold block mb-2">PHASE 04</span>
              <h3 className="font-primary text-xl font-bold uppercase text-white/90 mb-4">
                RELEASE &amp; SDK
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Open Python / C++ SDK release</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Custom schema extension builder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>○</span>
                  <span>Commercial studio deployment build</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Terminal CTA Console - Dark #050505 */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 md:pb-36">
        <div className="bg-[#050505] text-white p-8 md:p-16 border border-[#FF5F1F]/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_0_50px_rgba(255,95,31,0.15)]">
          {/* Glowing Accent Circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF5F1F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 bg-[#FF5F1F] inline-block animate-pulse shadow-[0_0_8px_#FF5F1F]" />
              <span className="font-mono text-xs text-[#FF5F1F] font-bold tracking-widest uppercase">
                [ R&amp;D COLLABORATION &amp; EARLY BETA TESTING ]
              </span>
            </div>
            <h2 className="font-primary text-3xl md:text-5xl font-black uppercase text-white mb-4 leading-tight">
              WANT TO TEST OR COLLABORATE ON ASSET BROWSER?
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/80 leading-relaxed">
              Asset Browser is currently undergoing active internal testing. I am looking for 3D artists, TDs, and studios interested in testing early builds across Blender, Cinema 4D, Houdini, and Unreal Engine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
            <a
              href="https://t.me/losereasp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-[#FF5F1F] text-white px-8 py-4 border border-[#FF5F1F] hover:bg-white hover:text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(255,95,31,0.4)]"
            >
              [ TELEGRAM CONTACT → ]
            </a>
            <a
              href="mailto:yarik.marchenkov@yandex.ru"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-transparent text-white px-8 py-4 border border-white/40 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
            >
              [ SEND EMAIL ]
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
