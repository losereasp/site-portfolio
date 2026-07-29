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

  return (
    <main className="min-h-screen bg-[#F0F0EE] text-black selection:bg-[#FF5F1F] selection:text-white relative">
      <ViewCursor />
      <ScrollToTop />
      <MainNavbar lightMode />

      {/* Hero Section */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Top Metadata Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#FF5F1F]" />
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#FF5F1F] font-bold uppercase">
              [ PIPELINE & SOFTWARE R&D ]
            </span>
          </div>

          {/* Status Pill */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-black/15 bg-white/70 backdrop-blur-sm text-xs font-mono tracking-widest text-black/80 uppercase">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F1F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5F1F]" />
            </span>
            <span>[ STATUS: RESEARCH & DEVELOPMENT ]</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="font-primary text-6xl md:text-9xl font-black uppercase tracking-tight text-[#111111] leading-[0.9] mb-6">
          ASSET BROWSER
        </h1>

        {/* Subtitle / Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-8 font-mono text-xl md:text-3xl text-black/80 font-light leading-snug tracking-tight">
            &quot;One personal library. Every DCC. Zero clutter.&quot;
          </p>

          <div className="lg:col-span-4 font-mono text-xs text-black/60 leading-relaxed border-l-2 border-[#FF5F1F] pl-4">
            A local-first, universal 3D asset manifest &amp; live-bridge tool designed to unify workflows across Blender, Cinema 4D, Houdini, and Unreal Engine.
          </div>
        </div>
      </section>

      {/* Interactive Mockup Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 md:pb-28">
        <div className="mb-4 flex items-center justify-between font-mono text-xs tracking-wider text-black/50 uppercase border-b border-black/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF5F1F]">❖</span>
            <span>[ INTERACTIVE SOFTWARE PREVIEW — DEMO V0.4 ]</span>
          </div>
          <span className="hidden sm:inline">PROTOTYPE // INTERNAL BUILD</span>
        </div>

        {/* Mockup Frame */}
        <div className="border border-black/20 shadow-2xl overflow-hidden bg-slate-950">
          <AssetBrowserMockup />
        </div>
      </section>

      {/* Navigation Quick Filter Tabs */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-12">
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-black/15 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white/50 text-black/70 border-black/15 hover:border-black hover:text-black"
            }`}
          >
            01 // PROBLEM VS SOLUTION
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "specs"
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white/50 text-black/70 border-black/15 hover:border-black hover:text-black"
            }`}
          >
            02 // TECHNICAL ARCHITECTURE
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`font-mono text-xs md:text-sm tracking-widest uppercase px-5 py-2.5 border transition-all cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white/50 text-black/70 border-black/15 hover:border-black hover:text-black"
            }`}
          >
            03 // DEVELOPMENT ROADMAP
          </button>
        </div>
      </section>

      {/* Section 1: Problem vs Solution Bento Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 md:pb-32">
        <div className="mb-10">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
            [ THE PARADIGM SHIFT ]
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-[#111111]">
            PROBLEM VS SOLUTION
          </h2>
          <p className="font-mono text-sm text-black/60 max-w-2xl mt-2">
            Why legacy asset managers create friction in modern multi-DCC production pipelines, and how Asset Browser solves it.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* THE PROBLEM CARD */}
          <div className="bg-[#111111] text-white p-8 md:p-12 border border-black relative flex flex-col justify-between overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <span className="font-mono text-xs text-red-400 tracking-widest uppercase font-bold">
                  [ 01 // THE PAIN POINT ]
                </span>
                <span className="font-mono text-xs text-white/40 uppercase">Ecosystem Fragmentation</span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-white mb-6">
                THE FRAGMENTATION TRAP
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    1. Walled Gardens &amp; Siloed Stores
                  </h4>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    Quixel Bridge, Blender Kit, Cinema 4D Asset Browser, and Epic Marketplace keep assets trapped in proprietary formats and vendor-locked engines.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    2. Scattered NAS &amp; Cloud Drives
                  </h4>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    Assets are spread across local NVMe storage, shared team NAS drives, and cloud backups without standardized metadata or instant visual indexing.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    3. Manual Shader &amp; Texture Re-linking
                  </h4>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    Importing meshes into new DCCs requires rebuilding materials from scratch, re-assigning map channels, and fixing broken absolute path references.
                  </p>
                </div>

                <div className="border-l-2 border-red-500/60 pl-4">
                  <h4 className="font-mono text-sm font-bold text-white mb-1 uppercase">
                    4. Slow Search &amp; Bloated Caches
                  </h4>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    Heavy desktop apps consume gigabytes of background memory and take minutes to search simple library directories.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>RESULT: WASTED BILLABLE HOURS</span>
              <span className="text-red-400">HIGH FRICTION</span>
            </div>
          </div>

          {/* THE SOLUTION CARD */}
          <div className="bg-white text-black p-8 md:p-12 border-2 border-black relative flex flex-col justify-between overflow-hidden shadow-xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5F1F]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-8">
                <span className="font-mono text-xs text-[#FF5F1F] tracking-widest uppercase font-bold">
                  [ 02 // THE LSRSP ARCHITECTURE ]
                </span>
                <span className="font-mono text-xs text-black/50 uppercase">Universal Interoperability</span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase text-black mb-6">
                LOCAL-FIRST UNIVERSAL INDEXING
              </h3>

              <div className="space-y-6">
                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-black mb-1 uppercase">
                    1. Open Universal Manifest (.JSON / OpenUSD)
                  </h4>
                  <p className="font-mono text-xs text-black/70 leading-relaxed">
                    Every asset uses a standardized schema mapping PBR channels, geometry bounds, poly counts, and license info independently of any single 3D application.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-black mb-1 uppercase">
                    2. 1-Click Multi-DCC Live IPC Bridge
                  </h4>
                  <p className="font-mono text-xs text-black/70 leading-relaxed">
                    High-speed local WebSocket/socket bridges push assets instantly directly into active viewports in Blender, C4D, Houdini, or Unreal Engine with shaders auto-constructed.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-black mb-1 uppercase">
                    3. Ultra-Fast Rust Local File Scanner
                  </h4>
                  <p className="font-mono text-xs text-black/70 leading-relaxed">
                    Scans 500,000+ local 3D files in seconds. Zero mandatory cloud logins, zero subscription paywalls, and complete data privacy.
                  </p>
                </div>

                <div className="border-l-2 border-[#FF5F1F] pl-4">
                  <h4 className="font-mono text-sm font-bold text-black mb-1 uppercase">
                    4. AI Vector Similarity &amp; Tagging
                  </h4>
                  <p className="font-mono text-xs text-black/70 leading-relaxed">
                    Local machine learning model automatically generates tags, detects duplicate meshes, and categorizes materials by visual texture features.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-black/10 flex items-center justify-between font-mono text-[11px] text-black/60">
              <span>RESULT: EFFORTLESS FLUIDITY</span>
              <span className="text-[#FF5F1F] font-bold">100% LOCAL CONTROL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Architecture & Technical Specs Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 md:pb-32">
        <div className="mb-10">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
            [ TECHNICAL BLUEPRINT ]
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-[#111111]">
            CORE ARCHITECTURE
          </h2>
          <p className="font-mono text-sm text-black/60 max-w-2xl mt-2">
            Engineered for heavy production pipelines with high-performance native modules and lightweight memory footprint.
          </p>
        </div>

        {/* 5 Technical Specs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spec 1 */}
          <div className="bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#FF5F1F] transition-colors group">
            <div>
              <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                01 // INDEX ENGINE
              </div>
              <h3 className="font-primary text-2xl font-bold uppercase text-black mb-3 group-hover:text-[#FF5F1F] transition-colors">
                LOCAL-FIRST INDEXING
              </h3>
              <p className="font-mono text-xs text-black/70 leading-relaxed">
                Powered by a high-throughput Rust backend that indexes local NVMe arrays, NAS shares, and external drives in parallel with SQLite WAL caching. Zero latency, works completely offline.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-black/40">
              <span>SCAN SPEED: 150K FILES/SEC</span>
              <span className="font-bold text-black">RUST + SQLITE</span>
            </div>
          </div>

          {/* Spec 2 */}
          <div className="bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#FF5F1F] transition-colors group">
            <div>
              <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                02 // FORMAT STANDARD
              </div>
              <h3 className="font-primary text-2xl font-bold uppercase text-black mb-3 group-hover:text-[#FF5F1F] transition-colors">
                UNIVERSAL MANIFEST
              </h3>
              <p className="font-mono text-xs text-black/70 leading-relaxed">
                Open JSON schema wrapping USD (.usdc/.usda), glTF 2.0, and FBX metadata. Preserves material parameters, vertex color maps, LOD hierarchies, and variant sets across target apps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-black/40">
              <span>SUPPORT: USD / GLTF / FBX</span>
              <span className="font-bold text-black">OPEN SCHEMAS</span>
            </div>
          </div>

          {/* Spec 3 */}
          <div className="bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#FF5F1F] transition-colors group">
            <div>
              <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                03 // LIVE PIPELINE
              </div>
              <h3 className="font-primary text-2xl font-bold uppercase text-black mb-3 group-hover:text-[#FF5F1F] transition-colors">
                DIRECT DCC BRIDGES
              </h3>
              <p className="font-mono text-xs text-black/70 leading-relaxed">
                Dedicated lightweight add-ons for Blender (4.x+), Cinema 4D (2024+), Houdini (Solaris/LOPs), and Unreal Engine 5. Imports geometry into selection space with node trees linked.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-black/40">
              <span>IPC PROTOCOL: WEBSOCKET</span>
              <span className="font-bold text-black">ONE-CLICK IMPORT</span>
            </div>
          </div>

          {/* Spec 4 */}
          <div className="bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#FF5F1F] transition-colors group">
            <div>
              <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                04 // INTELLIGENCE
              </div>
              <h3 className="font-primary text-2xl font-bold uppercase text-black mb-3 group-hover:text-[#FF5F1F] transition-colors">
                AI VISUAL SEARCH &amp; TAGS
              </h3>
              <p className="font-mono text-xs text-black/70 leading-relaxed">
                Embedded lightweight CLIP visual embedding engine extracts dominant color palettes, surface roughness attributes, mesh geometry complexity, and auto-generates descriptive tags.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-black/40">
              <span>ON-DEVICE EMBEDDINGS</span>
              <span className="font-bold text-black">AUTO-TAGGING</span>
            </div>
          </div>

          {/* Spec 5 */}
          <div className="bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#FF5F1F] transition-colors group lg:col-span-2">
            <div>
              <div className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest mb-3">
                05 // GOVERNANCE &amp; RIGHTS
              </div>
              <h3 className="font-primary text-2xl font-bold uppercase text-black mb-3 group-hover:text-[#FF5F1F] transition-colors">
                LICENSE &amp; CREDIT TRACKER
              </h3>
              <p className="font-mono text-xs text-black/70 leading-relaxed max-w-xl">
                Automatically logs license terms (CC0, Commercial, Royalty-Free, Attribution Required) and client project tags. Instantly export credit sheets and asset manifests for commercial production handoffs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-black/40">
              <span>PRODUCTION COMPLIANCE</span>
              <span className="font-bold text-black">AUTOMATED CREDIT EXPORT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Development Roadmap Timeline */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 md:pb-36">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
            [ EXECUTION TIMELINE ]
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-black uppercase text-[#111111]">
            DEVELOPMENT ROADMAP
          </h2>
          <p className="font-mono text-sm text-black/60 max-w-2xl mt-2">
            Milestone tracker from initial architecture design to commercial-grade pipeline release.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phase 01 */}
          <div className="bg-white border border-black/20 p-6 relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ COMPLETED ]
            </div>

            <div>
              <span className="font-mono text-xs text-[#FF5F1F] font-bold block mb-2">PHASE 01</span>
              <h3 className="font-primary text-xl font-bold uppercase text-black mb-3">
                RESEARCH &amp; INDEXER
              </h3>
              <ul className="space-y-2 font-mono text-xs text-black/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Rust filesystem scanner core</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Universal Manifest JSON spec</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Header parser for FBX / USD / glTF</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[10px] text-black/40">
              TARGET: Q1 2026 // DONE
            </div>
          </div>

          {/* Phase 02 */}
          <div className="bg-white border-2 border-[#FF5F1F] p-6 relative flex flex-col justify-between shadow-lg">
            <div className="absolute top-0 right-0 bg-[#FF5F1F] text-white font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ IN PROGRESS ]
            </div>

            <div>
              <span className="font-mono text-xs text-[#FF5F1F] font-bold block mb-2">PHASE 02</span>
              <h3 className="font-primary text-xl font-bold uppercase text-black mb-3">
                DESKTOP MVP &amp; BRIDGES
              </h3>
              <ul className="space-y-2 font-mono text-xs text-black/80">
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

            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[10px] text-[#FF5F1F] font-bold">
              TARGET: Q2 2026 // ACTIVE DEVELOPMENT
            </div>
          </div>

          {/* Phase 03 */}
          <div className="bg-white/60 border border-black/15 p-6 relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-black/20 text-black/70 font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ UPCOMING ]
            </div>

            <div>
              <span className="font-mono text-xs text-black/40 font-bold block mb-2">PHASE 03</span>
              <h3 className="font-primary text-xl font-bold uppercase text-black/80 mb-3">
                CLOSED BETA &amp; MULTI-DCC
              </h3>
              <ul className="space-y-2 font-mono text-xs text-black/60">
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

            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[10px] text-black/40">
              TARGET: Q3 2026 // BETA TESTING
            </div>
          </div>

          {/* Phase 04 */}
          <div className="bg-white/60 border border-black/15 p-6 relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-black/10 text-black/50 font-mono text-[10px] px-2.5 py-1 uppercase font-bold tracking-wider">
              [ PLANNED ]
            </div>

            <div>
              <span className="font-mono text-xs text-black/40 font-bold block mb-2">PHASE 04</span>
              <h3 className="font-primary text-xl font-bold uppercase text-black/80 mb-3">
                RELEASE &amp; SDK
              </h3>
              <ul className="space-y-2 font-mono text-xs text-black/60">
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

            <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[10px] text-black/40">
              TARGET: Q4 2026 // COMMERCIAL RELEASE
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="bg-[#111111] text-white p-8 md:p-16 border-2 border-black relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Accent Graphic Elements */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#FF5F1F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="font-mono text-xs text-[#FF5F1F] font-bold tracking-widest uppercase block mb-3">
              [ R&amp;D COLLABORATION &amp; EARLY ACCESS ]
            </span>
            <h2 className="font-primary text-3xl md:text-5xl font-black uppercase text-white mb-4">
              INTERESTED IN TESTING OR PIPELINE INTEGRATION?
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/70 leading-relaxed">
              Asset Browser is currently undergoing active internal testing. If you are a 3D artist, TD, or studio looking to streamline multi-DCC workflows, reach out for beta access or technical collaboration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
            <a
              href="mailto:contact@lsrsp.com"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-[#FF5F1F] text-white px-8 py-4 border border-[#FF5F1F] hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              GET IN TOUCH
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto text-center font-mono text-xs font-bold tracking-widest uppercase bg-transparent text-white px-8 py-4 border border-white/30 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
            >
              BACK TO PORTFOLIO
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
