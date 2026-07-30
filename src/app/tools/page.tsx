"use client";

import React from "react";
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import ViewCursor from "../ViewCursor";
import ScrollMarquee from "../ScrollMarquee";
import { useLanguage } from "../context/LanguageContext";

export default function ToolsPage() {
  const { t } = useLanguage();

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
              {t.tools.tagline}
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#344553] bg-[#101419] text-white/90 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f0a85a] shadow-[0_0_8px_#f0a85a]" />
            <span>{t.tools.currentShell}</span>
          </div>
        </div>

        {/* Hero Desktop Grid (Product Frame + Poster Display Title) */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch relative z-20 my-auto">
          
          {/* Left Column Title (Desktop: Clean Split with no overflow) */}
          <div className="lg:col-span-5 flex flex-col justify-between order-1 z-30">
            <div>
              <h1 className="font-primary text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-black uppercase tracking-wide text-white leading-[0.88] mb-6 lg:mb-8">
                {t.tools.title}
              </h1>

              <div className="border-l-2 border-[#FF5F1F] pl-4 max-w-lg mb-6">
                <p className="font-mono text-base text-white/90 font-light leading-relaxed mb-3">
                  {t.tools.subTitle}
                </p>
                <p className="font-mono text-xs text-white/60 leading-relaxed">
                  {t.tools.desc}
                </p>
              </div>
            </div>

            {/* Metadata Footer Block */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-mono text-white/50 uppercase tracking-wider">
              <div>
                <span className="text-white/30 block">{t.tools.roleLabel}</span>
                <span className="text-white/90 font-bold">{t.tools.roleValue}</span>
              </div>
              <div>
                <span className="text-white/30 block">{t.tools.stackLabel}</span>
                <span className="text-white/90 font-bold">{t.tools.stackValue}</span>
              </div>
              <div>
                <span className="text-white/30 block">{t.tools.modeLabel}</span>
                <span className="text-white/90 font-bold">{t.tools.modeValue}</span>
              </div>
              <div>
                <span className="text-white/30 block">{t.tools.platformLabel}</span>
                <span className="text-white/90 font-bold">{t.tools.platformValue}</span>
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
                    {t.tools.workspaceStatus}
                  </div>
                  <div className="font-mono text-xl md:text-2xl font-bold uppercase text-[#e8eef1] tracking-wide mb-6">
                    {t.tools.desktopShell}
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs md:text-sm uppercase tracking-widest text-[#c7d1d6] mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f0a85a] border border-[#f8c98f] shadow-[0_0_12px_rgba(240,168,90,0.55)] inline-block" />
                    <span>{t.tools.desktopReady}</span>
                  </div>

                  <div className="pt-4 border-t border-[#344553]/60 grid grid-cols-2 gap-4 font-mono text-[10px] md:text-xs text-[#9dabb2] uppercase tracking-wider">
                    <div>
                      <span className="text-[#7fb7c9]/60 block mb-0.5">{t.tools.catalogEngine}</span>
                      <span className="text-[#e8eef1]">{t.tools.standby}</span>
                    </div>
                    <div>
                      <span className="text-[#7fb7c9]/60 block mb-0.5">{t.tools.dccBridge}</span>
                      <span className="text-[#e8eef1]">{t.tools.standby}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Constraints Footer Bar */}
              <div className="grid grid-cols-3 border-t border-[#344553] bg-[#182129] font-mono text-[10px] md:text-xs text-[#9dabb2] tracking-wider uppercase divide-x divide-[#344553]">
                <div className="px-3 py-2.5 text-center">{t.tools.modeValue}</div>
                <div className="px-3 py-2.5 text-center">{t.tools.platformValue} X64</div>
                <div className="px-3 py-2.5 text-center">{t.tools.noCloud}</div>
              </div>
            </div>

            {/* Rebuilt Left-Aligned Caption Under Product Frame */}
            <div className="mt-3 font-mono text-xs max-w-full">
              <div className="text-white/80 font-bold uppercase tracking-widest">
                {t.tools.currentBuildCap}
              </div>
              <div className="text-white/50 text-[11px] leading-relaxed mt-0.5">
                {t.tools.buildCapSub}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MARQUEE TRANSITION LINE */}
      <ScrollMarquee className="!bg-[#111111] !border-y !border-black text-white py-3" speed={1.8}>
        <div className="flex items-center gap-8 md:gap-16 font-mono text-sm md:text-xl uppercase font-bold tracking-[0.25em] text-[#F0F0EE]">
          {t.tools.marquee.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              <span className="text-[#FF5F1F]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </ScrollMarquee>

      {/* 3. WHY I’M BUILDING IT (Asymmetric Editorial Layout) */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Heading & Narrative Statement */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-3">
              {t.tools.motivationTag}
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase tracking-wide text-[#111111] leading-[0.9] mb-6">
              {t.tools.whyBuilding}
            </h2>
            <p className="font-mono text-base text-black/80 font-light leading-relaxed max-w-md">
              {t.tools.whyDesc}
            </p>
          </div>

          {/* Right Column: Three Vertical Problem Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-black/15">
            <div className="pt-6 pb-8 first:pt-0">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">01 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase tracking-wide text-black">
                  {t.tools.problem1Title}
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                {t.tools.problem1Desc}
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">02 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase tracking-wide text-black">
                  {t.tools.problem2Title}
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                {t.tools.problem2Desc}
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-[#FF5F1F] font-bold">03 —</span>
                <h3 className="font-primary text-2xl md:text-3xl font-bold uppercase tracking-wide text-black">
                  {t.tools.problem3Title}
                </h3>
              </div>
              <p className="font-mono text-sm text-black/70 leading-relaxed pl-12">
                {t.tools.problem3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Target Pipeline Flow Diagram */}
        <div className="bg-[#111111] text-white p-8 md:p-12 border border-black relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-widest uppercase font-bold">
              {t.tools.targetFlowTag}
            </span>
            <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest bg-white/10 px-3 py-1">
              {t.tools.notImplementedTag}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-mono py-4">
            <div className="p-6 border border-white/15 bg-black/40">
              <span className="text-white/40 text-xs block mb-2 font-bold">{t.tools.sourceTitle}</span>
              <span className="text-sm md:text-base font-bold text-white uppercase">{t.tools.sourceDesc}</span>
            </div>

            <div className="flex flex-col items-center justify-center text-[#FF5F1F] font-bold text-xl md:text-2xl py-2">
              <span className="hidden md:inline">➔</span>
              <span className="md:hidden">⬇</span>
              <span className="text-[10px] text-white/40 font-normal tracking-widest mt-1">{t.tools.indexInPlace}</span>
            </div>

            <div className="p-6 border border-[#FF5F1F]/40 bg-[#FF5F1F]/10">
              <span className="text-[#FF5F1F] text-xs block mb-2 font-bold">{t.tools.hubTitle}</span>
              <span className="text-sm md:text-base font-bold text-white uppercase">{t.tools.hubDesc}</span>
            </div>
          </div>

          <div className="flex justify-center text-[#FF5F1F] font-bold text-xl md:text-2xl my-4">
            <span>⬇</span>
          </div>

          <div className="p-6 border border-white/15 bg-black/40 text-center font-mono">
            <span className="text-white/40 text-xs block mb-2 font-bold">{t.tools.targetDccsTitle}</span>
            <span className="text-sm md:text-lg font-bold text-white tracking-widest uppercase">BLENDER / C4D / HOUDINI / UNREAL</span>
          </div>
        </div>
      </section>

      {/* 4. CURRENT BUILD (Three Levels of Implementation Cards) */}
      <section className="bg-[#111111] text-white py-20 md:py-28 border-y border-black">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#FF5F1F] tracking-[0.2em] font-bold uppercase block mb-2">
              {t.tools.transparentTag}
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase tracking-wide text-white">
              {t.tools.currentBuildTitle}
            </h2>
            <p className="font-mono text-base text-white/60 max-w-2xl mt-3">
              {t.tools.currentBuildDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 1: Implemented in Repo */}
            <div className="bg-[#182129] border-2 border-[#FF5F1F] p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-[#FF5F1F] font-bold uppercase tracking-widest">
                    {t.tools.level1Tag}
                  </span>
                  <span className="font-mono text-[10px] bg-[#FF5F1F] text-black font-bold px-2 py-0.5 uppercase">
                    {t.tools.level1Badge}
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-white mb-4">
                  {t.tools.level1Title}
                </h3>
                <ul className="space-y-3 font-mono text-xs md:text-sm text-white/90">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF5F1F] font-bold">✓</span>
                    <span>{t.tools.level1Item1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF5F1F] font-bold">✓</span>
                    <span>{t.tools.level1Item2}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 2: Next Milestones */}
            <div className="bg-[#101419] border border-white/20 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/60 font-bold uppercase tracking-widest">
                    {t.tools.level2Tag}
                  </span>
                  <span className="font-mono text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 uppercase">
                    {t.tools.level2Badge}
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-white/90 mb-4">
                  {t.tools.level2Title}
                </h3>
                <ul className="space-y-3 font-mono text-xs md:text-sm text-white/70">
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>{t.tools.level2Item1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>{t.tools.level2Item2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white/40">▶</span>
                    <span>{t.tools.level2Item3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 3: Future Direction */}
            <div className="bg-[#0A0D11] border border-white/10 p-8 flex flex-col justify-between opacity-75">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/40 font-bold uppercase tracking-widest">
                    {t.tools.level3Tag}
                  </span>
                  <span className="font-mono text-[10px] bg-white/10 text-white/50 font-bold px-2 py-0.5 uppercase">
                    {t.tools.level3Badge}
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-white/70 mb-4">
                  {t.tools.level3Title}
                </h3>
                <ul className="space-y-2.5 font-mono text-xs text-white/50">
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>{t.tools.level3Item1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>{t.tools.level3Item2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>{t.tools.level3Item3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>{t.tools.level3Item4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>{t.tools.level3Item5}</span>
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
            {t.tools.archGoalsTag}
          </span>
          <h2 className="font-primary text-5xl md:text-7xl font-black uppercase tracking-wide text-[#111111]">
            {t.tools.designTargetsTitle}
          </h2>
          <p className="font-mono text-base text-black/70 max-w-2xl mt-3">
            {t.tools.designTargetsDesc}
          </p>
        </div>

        {/* Three Large Horizontal Numbered Rows */}
        <div className="flex flex-col divide-y divide-black/20 border-t border-b border-black/20">
          
          {/* Row 01 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            <div className="md:col-span-2 font-primary text-4xl md:text-5xl font-black tracking-wide text-[#FF5F1F] leading-none">
              01
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase tracking-wide text-black leading-none">
                {t.tools.target1Title}
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                {t.tools.target1Desc}
              </p>
            </div>
          </div>

          {/* Row 02 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            <div className="md:col-span-2 font-primary text-4xl md:text-5xl font-black tracking-wide text-[#FF5F1F] leading-none">
              02
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase tracking-wide text-black leading-none">
                {t.tools.target2Title}
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                {t.tools.target2Desc}
              </p>
            </div>
          </div>

          {/* Row 03 */}
          <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            <div className="md:col-span-2 font-primary text-4xl md:text-5xl font-black tracking-wide text-[#FF5F1F] leading-none">
              03
            </div>
            <div className="md:col-span-4">
              <h3 className="font-primary text-3xl md:text-4xl font-black uppercase tracking-wide text-black leading-none">
                {t.tools.target3Title}
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="font-mono text-sm md:text-base text-black/80 font-light leading-relaxed">
                {t.tools.target3Desc}
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
              {t.tools.stagingTag}
            </span>
            <h2 className="font-primary text-5xl md:text-7xl font-black uppercase tracking-wide text-[#111111]">
              {t.tools.buildLogTitle}
            </h2>
            <p className="font-mono text-base text-black/70 max-w-2xl mt-3">
              {t.tools.buildLogDesc}
            </p>
          </div>

          {/* Desktop Horizontal Timeline / Mobile Vertical */}
          <div className="relative pt-4">
            {/* Horizontal Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[36px] left-0 right-0 h-[2px] bg-black/15 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              
              {/* Node NOW (Orange Accent & Highest Contrast) */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 bg-white pr-4 self-start z-10">
                  <div className="w-6 h-6 rounded-full bg-[#FF5F1F] border-2 border-white ring-2 ring-[#FF5F1F]/30 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span className="font-mono text-sm text-[#FF5F1F] font-bold tracking-widest uppercase">
                    {t.tools.stageNow}
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-[#FF5F1F] pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-black mb-2">
                    {t.tools.stageNowTitle}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/80 leading-relaxed">
                    {t.tools.stageNowDesc}
                  </p>
                </div>
              </div>

              {/* Node NEXT */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 bg-white pr-4 self-start z-10">
                  <div className="w-6 h-6 rounded-full bg-black border-2 border-white ring-2 ring-black/20 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
                    ▶
                  </div>
                  <span className="font-mono text-sm text-black font-bold tracking-widest uppercase">
                    {t.tools.stageNext}
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/20 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-black mb-2">
                    {t.tools.stageNextTitle}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/70 leading-relaxed">
                    {t.tools.stageNextDesc}
                  </p>
                </div>
              </div>

              {/* Node THEN */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 bg-white pr-4 self-start z-10">
                  <div className="w-6 h-6 rounded-full bg-black/40 border-2 border-white flex items-center justify-center text-white font-mono text-xs shrink-0">
                    ○
                  </div>
                  <span className="font-mono text-sm text-black/60 font-bold tracking-widest uppercase">
                    {t.tools.stageThen}
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/15 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-black/80 mb-2">
                    {t.tools.stageThenTitle}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/60 leading-relaxed">
                    {t.tools.stageThenDesc}
                  </p>
                </div>
              </div>

              {/* Node LATER */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6 bg-white pr-4 self-start z-10">
                  <div className="w-6 h-6 rounded-full bg-black/20 border-2 border-white flex items-center justify-center text-white font-mono text-xs shrink-0">
                    ○
                  </div>
                  <span className="font-mono text-sm text-black/40 font-bold tracking-widest uppercase">
                    {t.tools.stageLater}
                  </span>
                </div>
                <div className="border-l-2 lg:border-l-0 lg:border-t-2 border-black/10 pl-4 lg:pl-0 lg:pt-4">
                  <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-black/60 mb-2">
                    {t.tools.stageLaterTitle}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-black/50 leading-relaxed">
                    {t.tools.stageLaterDesc}
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
              {t.tools.feedbackTag}
            </span>
            <h2 className="font-primary text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4 leading-tight">
              {t.tools.ctaTitle}
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/80 leading-relaxed">
              {t.tools.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            <a
              href="https://t.me/losereasp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center text-center font-mono text-xs font-bold tracking-wider uppercase bg-[#FF5F1F] text-white px-6 md:px-8 py-4 border border-[#FF5F1F] hover:bg-white hover:text-black transition-all cursor-pointer whitespace-nowrap"
            >
              {t.tools.telegramBtn}
            </a>
            <a
              href="mailto:iaroslav@losereasp.com"
              className="w-full sm:w-auto inline-flex items-center justify-center text-center font-mono text-xs font-bold tracking-wider uppercase bg-transparent border border-white/30 text-white hover:bg-white hover:text-black transition-all px-6 md:px-8 py-4 cursor-pointer whitespace-nowrap"
            >
              {t.tools.emailBtn}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

