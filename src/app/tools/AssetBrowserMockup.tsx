"use client";

import React, { useState, useMemo } from "react";

interface Asset {
  id: string;
  name: string;
  category: "3D Models" | "PBR Materials" | "Textures" | "HDRI" | "Assemblies";
  softwares: Array<"BLENDER" | "CINEMA 4D" | "HOUDINI" | "UNREAL ENGINE">;
  polyCount: string;
  formats: string[];
  thumbnailBg: string;
  accentColor: string;
  version: string;
  fileSize: string;
}

const MOCK_ASSETS: Asset[] = [
  {
    id: "asset-1",
    name: "Cyberpunk Mech Arm v2",
    category: "3D Models",
    softwares: ["BLENDER", "UNREAL ENGINE"],
    polyCount: "142,500 tris",
    formats: [".usd", ".blend", ".fbx"],
    thumbnailBg: "from-cyan-950/80 via-slate-900 to-black",
    accentColor: "#00E5FF",
    version: "v1.4",
    fileSize: "148 MB",
  },
  {
    id: "asset-2",
    name: "Procedural Ice & Frost Shaders",
    category: "PBR Materials",
    softwares: ["CINEMA 4D", "HOUDINI"],
    polyCount: "Procedural 8K",
    formats: [".c4d", ".hip", ".exr"],
    thumbnailBg: "from-blue-950/80 via-indigo-950 to-black",
    accentColor: "#38BDF8",
    version: "v2.0",
    fileSize: "42 MB",
  },
  {
    id: "asset-3",
    name: "Industrial Turbine Generator",
    category: "3D Models",
    softwares: ["BLENDER", "CINEMA 4D"],
    polyCount: "88,200 tris",
    formats: [".usd", ".blend", ".c4d"],
    thumbnailBg: "from-amber-950/80 via-neutral-900 to-black",
    accentColor: "#FF5F1F",
    version: "v1.1",
    fileSize: "215 MB",
  },
  {
    id: "asset-4",
    name: "Modular Sci-Fi Wall Assembly",
    category: "Assemblies",
    softwares: ["UNREAL ENGINE", "HOUDINI"],
    polyCount: "34,100 tris",
    formats: [".usd", ".fbx", ".hip"],
    thumbnailBg: "from-emerald-950/80 via-slate-900 to-black",
    accentColor: "#10B981",
    version: "v3.2",
    fileSize: "86 MB",
  },
  {
    id: "asset-5",
    name: "Deep Space Nebula HDRI Haven",
    category: "HDRI",
    softwares: ["BLENDER", "CINEMA 4D", "HOUDINI", "UNREAL ENGINE"],
    polyCount: "32K EXR 32-bit",
    formats: [".exr", ".hdr"],
    thumbnailBg: "from-purple-950/80 via-slate-950 to-black",
    accentColor: "#A855F7",
    version: "v1.0",
    fileSize: "310 MB",
  },
  {
    id: "asset-6",
    name: "Nanite Carbon Metal Armor",
    category: "PBR Materials",
    softwares: ["UNREAL ENGINE", "BLENDER"],
    polyCount: "8K Surface PBR",
    formats: [".usd", ".blend"],
    thumbnailBg: "from-zinc-800/80 via-zinc-900 to-black",
    accentColor: "#E4E4E7",
    version: "v2.1",
    fileSize: "64 MB",
  },
  {
    id: "asset-7",
    name: "Tactical HUD Vector Overlays",
    category: "Textures",
    softwares: ["CINEMA 4D", "BLENDER"],
    polyCount: "4K Alpha PNG",
    formats: [".png", ".mov"],
    thumbnailBg: "from-rose-950/80 via-slate-950 to-black",
    accentColor: "#F43F5E",
    version: "v1.2",
    fileSize: "95 MB",
  },
  {
    id: "asset-8",
    name: "Quantum Fusion Core Reactor",
    category: "3D Models",
    softwares: ["HOUDINI", "UNREAL ENGINE"],
    polyCount: "210,000 tris",
    formats: [".usd", ".hip", ".fbx"],
    thumbnailBg: "from-teal-950/80 via-slate-900 to-black",
    accentColor: "#14B8A6",
    version: "v1.5",
    fileSize: "340 MB",
  },
];

type SoftwareFilter = "ALL" | "BLENDER" | "CINEMA 4D" | "HOUDINI" | "UNREAL ENGINE";

export default function AssetBrowserMockup() {
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareFilter>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exportingAssetId, setExportingAssetId] = useState<string | null>(null);

  // Filtered Assets Calculation
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter((asset) => {
      // Software match
      const matchSoftware =
        selectedSoftware === "ALL" || asset.softwares.includes(selectedSoftware as any);
      
      // Category match
      const matchCategory =
        selectedCategory === "ALL" || asset.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        asset.name.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query) ||
        asset.formats.some((f) => f.toLowerCase().includes(query)) ||
        asset.softwares.some((s) => s.toLowerCase().includes(query));

      return matchSoftware && matchCategory && matchQuery;
    });
  }, [selectedSoftware, selectedCategory, searchQuery]);

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: MOCK_ASSETS.length,
      "3D Models": 0,
      "PBR Materials": 0,
      Textures: 0,
      HDRI: 0,
      Assemblies: 0,
    };

    MOCK_ASSETS.forEach((asset) => {
      if (counts[asset.category] !== undefined) {
        counts[asset.category]++;
      }
    });

    return counts;
  }, []);

  const handleExport = (asset: Asset, targetDCC: string) => {
    setExportingAssetId(asset.id);
    setToastMessage(`BRIDGING [${asset.name.toUpperCase()}] TO ${targetDCC}...`);

    setTimeout(() => {
      setToastMessage(`SUCCESS: Sent ${asset.name} (${asset.formats[0]}) → ${targetDCC} via Socket Bridge (0.4s)`);
      setExportingAssetId(null);
    }, 1200);

    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#0B0C10] shadow-2xl overflow-hidden font-mono text-xs text-white/90 transition-all duration-300 select-none">
      {/* 1. Desktop Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#12141A] border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Mac/Windows Style Window Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:bg-red-500 transition-colors" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:bg-amber-500 transition-colors" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:bg-emerald-500 transition-colors" />
          </div>
          <span className="text-[11px] tracking-wider text-white/50 font-semibold uppercase">
            LSRSP ASSET BROWSER v0.1-ALPHA // RESEARCH BUILD
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            DCC BRIDGE ACTIVE (PORT 9021)
          </span>
          <span className="hidden sm:inline border-l border-white/10 pl-4">
            LOCAL REPO: 1.4 TB
          </span>
        </div>
      </div>

      {/* 2. Top Controls & Filter Tag Bar */}
      <div className="p-4 bg-[#161821] border-b border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search assets, formats (.usd, .blend), tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0C10] border border-white/15 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-2.5 flex items-center text-white/40 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* DCC Target Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <span className="text-[10px] text-white/40 uppercase tracking-wider mr-1 shrink-0">
            Target DCC:
          </span>
          {(["ALL", "BLENDER", "CINEMA 4D", "HOUDINI", "UNREAL ENGINE"] as SoftwareFilter[]).map((sw) => {
            const isActive = selectedSoftware === sw;
            return (
              <button
                key={sw}
                onClick={() => setSelectedSoftware(sw)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-semibold tracking-wider transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#FF5F1F] text-black shadow-lg shadow-[#FF5F1F]/20 font-bold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {sw}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Body: Sidebar + Asset Grid */}
      <div className="flex flex-col md:flex-row min-h-[520px]">
        {/* Sidebar Categories */}
        <div className="w-full md:w-56 bg-[#0E1015] border-r border-b md:border-b-0 border-white/10 p-3 shrink-0">
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold px-2 py-1.5 mb-1">
            LIBRARY CATEGORIES
          </div>
          <nav className="space-y-1">
            {[
              { label: "All Assets", value: "ALL" },
              { label: "3D Models", value: "3D Models" },
              { label: "PBR Materials", value: "PBR Materials" },
              { label: "Textures", value: "Textures" },
              { label: "HDRI Environments", value: "HDRI" },
              { label: "Assemblies", value: "Assemblies" },
            ].map((cat) => {
              const isActive = selectedCategory === cat.value;
              const count = categoryCounts[cat.value] ?? 0;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white font-bold border border-white/15"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded ${
                      isActive ? "bg-[#FF5F1F]/20 text-[#FF5F1F]" : "bg-white/5 text-white/40"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Quick Stats */}
          <div className="mt-8 p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-semibold">
              QUICK PIPELINE STATS
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-white/60">Bridge Delay:</span>
              <span className="text-emerald-400 font-bold">~0.4s</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-white/60">USD Schema:</span>
              <span className="text-cyan-400 font-bold">v23.11</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-white/60">Indexing:</span>
              <span className="text-white/80">Real-time</span>
            </div>
          </div>
        </div>

        {/* Main Asset Grid View */}
        <div className="flex-1 bg-[#090A0E] p-4 md:p-6 overflow-y-auto">
          {/* Header Info */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div className="text-white/70">
              Showing <span className="text-white font-bold">{filteredAssets.length}</span> assets
              {selectedSoftware !== "ALL" && (
                <span className="ml-1 text-[#FF5F1F]">for {selectedSoftware}</span>
              )}
            </div>
            <div className="text-[10px] text-white/40">
              SORT: RECENTLY ADDED ↓
            </div>
          </div>

          {/* Grid Cards */}
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => {
                const targetBridgeDCC =
                  selectedSoftware !== "ALL"
                    ? selectedSoftware
                    : asset.softwares[0];
                const isExporting = exportingAssetId === asset.id;

                return (
                  <div
                    key={asset.id}
                    className="group relative rounded-xl border border-white/10 bg-[#12141C] hover:border-white/25 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Thumbnail Graphic */}
                      <div
                        className={`h-36 w-full bg-gradient-to-br ${asset.thumbnailBg} relative p-3 flex flex-col justify-between overflow-hidden border-b border-white/10`}
                      >
                        {/* Blueprint Grid Pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                        {/* Category & Version Badges */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80 border border-white/10 uppercase">
                            {asset.category}
                          </span>
                          <span className="text-[9px] text-white/50 font-mono">
                            {asset.version}
                          </span>
                        </div>

                        {/* Central Visual Graphic Emblem */}
                        <div className="relative z-10 my-auto flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{
                              backgroundColor: `${asset.accentColor}15`,
                              borderColor: `${asset.accentColor}40`,
                            }}
                          >
                            <svg
                              className="w-7 h-7"
                              fill="none"
                              stroke={asset.accentColor}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom Thumbnail Overlay Tags */}
                        <div className="relative z-10 flex items-center justify-between text-[9px] text-white/60">
                          <span>{asset.polyCount}</span>
                          <span>{asset.fileSize}</span>
                        </div>
                      </div>

                      {/* Card Content Details */}
                      <div className="p-3.5 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-[#FF5F1F] transition-colors leading-snug">
                            {asset.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {asset.formats.map((fmt) => (
                              <span
                                key={fmt}
                                className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-white/60 font-mono border border-white/5"
                              >
                                {fmt}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Supported Software Pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {asset.softwares.map((sw) => (
                            <span
                              key={sw}
                              className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${
                                selectedSoftware === sw
                                  ? "bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/40"
                                  : "bg-white/5 text-white/40"
                              }`}
                            >
                              {sw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Export Action CTA */}
                    <div className="p-3 pt-0">
                      <button
                        onClick={() => handleExport(asset, targetBridgeDCC)}
                        disabled={isExporting}
                        className={`w-full py-2 px-3 rounded-lg font-bold text-[10px] tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isExporting
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse"
                            : "bg-[#FF5F1F] text-black hover:bg-white hover:text-black shadow-md hover:shadow-[#FF5F1F]/20"
                        }`}
                      >
                        {isExporting ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            EXPO-BRIDGING...
                          </>
                        ) : (
                          <>
                            [ EXPORT TO {targetBridgeDCC} → ]
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                🔍
              </div>
              <p className="text-white/60 font-medium">No assets found matching your criteria</p>
              <button
                onClick={() => {
                  setSelectedSoftware("ALL");
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-[11px] text-[#FF5F1F] underline hover:text-white transition-colors cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Active Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-[#FF5F1F] text-black font-bold px-4 py-2.5 flex items-center justify-between animate-lightbox border-t border-black/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span className="tracking-wide text-xs">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-black/70 hover:text-black font-bold text-sm px-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
