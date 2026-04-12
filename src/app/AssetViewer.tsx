"use client";

import React, { Suspense, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  useGLTF,
  PerspectiveCamera,
  Environment,
  PresentationControls,
  Float,
  Html,
  Center,
  ContactShadows
} from "@react-three/drei";
import { EffectComposer, Bloom, N8AO, Vignette } from "@react-three/postprocessing";

import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

interface AssetViewerProps {
  modelPath: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  // Apply material overrides and fix geometry issues
  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        // Fix for faceted shading (artifacts from compression)
        if (obj.geometry) {
          // Merge vertices to ensure smooth normal calculation
          obj.geometry = BufferGeometryUtils.mergeVertices(obj.geometry);
          obj.geometry.computeVertexNormals();
        }

        obj.castShadow = true;
        obj.receiveShadow = true;

        // Clay Material: Matte, high roughness, no metalness
        if (obj.material) {
          obj.material.metalness = 0;
          obj.material.roughness = 0.85;
          obj.material.color.set("#e2e2e2"); 
          obj.material.envMapIntensity = 1.0; // Increased for better volume/reflections
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#FF5F1F] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em]">Processing Geometry...</p>
      </div>
    </Html>
  );
}

export default function AssetViewer({ modelPath }: AssetViewerProps) {
  return (
    <div
      className="relative bg-[#0a0a0a] group/viewer overflow-hidden"
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    >
      {/* HUD Info */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-[#FF5F1F] rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">3D Asset Viewer // Clay Mode</span>
        </div>
        <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest pl-4">Minimalist Geometry // Ambient Occlusion</p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 pointer-events-none opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-500">
        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest text-right">
          [ Drag to Rotate ]<br />
          [ Scroll to Zoom ]
        </p>
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [40, 50, 40], fov: 40 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Environment for soft fill */}
        <Environment preset="city" />
        
        {/* Cinematic Dual-Tone Lighting */}
        <ambientLight intensity={0.25} />
        
        {/* Key Light - Cold/Cyan tone for tech feel */}
        <spotLight 
          position={[30, 40, 30]} 
          angle={0.35} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          color="#d0e0ff" 
          shadow-bias={-0.0001}
        />
        
        {/* Rim Light - Warm/Orange tone for "volume" separation */}
        <directionalLight 
          position={[-20, 10, -30]} 
          intensity={6} // Increased for a more dramatic pop
          color="#ffccaa" 
        />

        <gridHelper args={[100, 50, 0x222222, 0x111111]} position={[0, -0.01, 0]} />

        {/* Contact Shadows for "grounding" */}
        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.4}
          scale={40}
          blur={2.5}
          far={10}
          resolution={512}
          color="#000000"
        />

        <Suspense fallback={<Loader />}>
          <group scale={0.4} position={[0, 0, 0]}>
            <Model url={modelPath} />
          </group>
        </Suspense>

        {/* Post-Processing Effects - Balanced Depth */}
        <EffectComposer enableNormalPass={false} multisampling={8}>
          <N8AO
            intensity={1.2}
            aoRadius={1.5}
            color="#000000"
            distanceFalloff={1}
          />
          <Bloom luminanceThreshold={1.2} intensity={0.2} levels={9} mipmapBlur />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.3}
          minDistance={10}
          maxDistance={400}
          target={[0, 5, 0]} // Фокус чуть выше нуля, чтобы модель была в центре
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Vignette Overlay (Visual Polish) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
