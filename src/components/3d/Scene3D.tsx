import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { RoomModel } from "./RoomModel";
import { ParticleField } from "./ParticleField";

interface Scene3DProps {
  activeFocus: "all" | "products" | "solutions" | "services";
  onSelectHotspot: (type: "products" | "solutions" | "services") => void;
  className?: string;
  enableZoom?: boolean;
}

export function Scene3D({
  activeFocus,
  onSelectHotspot,
  className = "",
  enableZoom = false,
}: Scene3DProps) {
  return (
    <div className={`relative w-full h-full min-h-[460px] ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5.5, 4.2, 6.5]} fov={42} />

        {/* Cinematic Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[6, 10, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, 3, -2]} intensity={2.5} color="#00A4EF" />
        <pointLight position={[3, 2, 4]} intensity={1.5} color="#6366F1" />

        <Suspense fallback={null}>
          <RoomModel activeFocus={activeFocus} onSelectHotspot={onSelectHotspot} />
          <ParticleField count={200} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={enableZoom}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 5}
          autoRotate={false}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Floating 3D Interaction Badge */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-dbh-cyan animate-pulse" />
        <span>Drag to orbit 3D space • Click hotspots to inspect</span>
      </div>
    </div>
  );
}
