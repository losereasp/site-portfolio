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
  Center
} from "@react-three/drei";

interface AssetViewerProps {
  modelPath: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  // Apply material overrides for a premium "industrial" look
  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        
        // Enhance material
        if (obj.material) {
          obj.material.metalness = 0.8;
          obj.material.roughness = 0.2;
          obj.material.color.set("#d1d1d1"); // Slightly darker than pure white
          obj.material.envMapIntensity = 2; // Make reflections pop
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
          <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">3D Asset Viewer // Enhanced Material</span>
        </div>
        <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest pl-4">Interactive Mesh // PBR Shading</p>
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
        camera={{ position: [15, 15, 15], fov: 35 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Environment for reflections */}
        <Environment preset="studio" />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
        
        <gridHelper args={[100, 50, 0x333333, 0x111111]} position={[0, -0.01, 0]} />
        
        <Suspense fallback={<Loader />}>
          <group position={[0, 0, 0]}> 
            <Model url={modelPath} />
          </group>
        </Suspense>

        <OrbitControls 
          makeDefault 
          autoRotate 
          autoRotateSpeed={0.5} 
          minDistance={10} 
          maxDistance={150}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Vignette Overlay (Visual Polish) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
