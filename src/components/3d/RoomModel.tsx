import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface RoomModelProps {
  activeFocus: "all" | "products" | "solutions" | "services";
  onSelectHotspot: (type: "products" | "solutions" | "services") => void;
}

export function RoomModel({ activeFocus, onSelectHotspot }: RoomModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const chartRef = useRef<THREE.Group>(null);

  // Subtle continuous rotation & mouse lerp
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle breathing idle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }

    if (chartRef.current) {
      // Animate trading graph pulse
      const t = state.clock.elapsedTime;
      chartRef.current.children.forEach((child, i) => {
        child.scale.y = 1 + Math.sin(t * 3 + i) * 0.25;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. Base Floating Platform / Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.15, 32]} />
        <meshStandardMaterial
          color="#0B1D3A"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Grid line accent on floor */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.6, 3.65, 32]} />
        <meshBasicMaterial color="#00A4EF" opacity={0.6} transparent />
      </mesh>

      {/* 2. ACOUSTIC BAFFLE CEILING SYSTEM (Floating Overhead) */}
      <group position={[0, 3.2, 0]}>
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((z, idx) => (
          <group key={idx} position={[0, 0, z]}>
            {/* Wooden / Acoustic Baffle slat */}
            <mesh castShadow>
              <boxGeometry args={[3.8, 0.35, 0.08]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#C29263" : "#1e293b"}
                roughness={0.5}
                metalness={0.2}
              />
            </mesh>
            {/* Recessed LED Linear Light */}
            {idx % 2 === 1 && (
              <mesh position={[0, -0.18, 0]}>
                <boxGeometry args={[3.2, 0.04, 0.04]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#00A4EF"
                  emissiveIntensity={2.5}
                />
              </mesh>
            )}
          </group>
        ))}

        {/* Hotspot: Acoustic Ceilings */}
        <Html position={[0, 0.4, 0]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("products")}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-dbh-cyan/50 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(0,164,239,0.5)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-dbh-cyan animate-ping" />
            <span>Acoustics &amp; Ceilings</span>
          </button>
        </Html>
      </group>

      {/* 3. FINANCIAL DEALING ROOM CONSOLE & TRADING TERMINALS */}
      <group position={[-1.2, 0.7, 0.4]} rotation={[0, Math.PI / 4, 0]}>
        {/* Curved Trading Console Surface */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 0.08, 0.9]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Heavy-duty steel legs */}
        <mesh position={[-0.8, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.7]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        <mesh position={[0.8, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.7]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>

        {/* Multi-screen Array */}
        {/* Center Screen */}
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[0.85, 0.55, 0.03]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        {/* Left Screen (Angled) */}
        <mesh position={[-0.75, 0.45, -0.1]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.03]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        {/* Right Screen (Angled) */}
        <mesh position={[0.75, 0.45, -0.1]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.03]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Live Candlestick Graph Animation on Center Screen */}
        <group ref={chartRef} position={[-0.28, 0.35, -0.18]}>
          {[-0.18, -0.09, 0, 0.09, 0.18, 0.27, 0.36, 0.45, 0.54].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.04, 0.15 + (i % 3) * 0.06, 0.01]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#10B981" : "#EF4444"} />
            </mesh>
          ))}
        </group>

        {/* Hotspot: Dealing Rooms */}
        <Html position={[0, 0.9, -0.2]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("solutions")}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-400/50 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dealing Rooms</span>
          </button>
        </Html>
      </group>

      {/* 4. EXECUTIVE BOARDROOM & ERGONOMIC ARCHITECTURE */}
      <group position={[1.4, 0.7, -0.2]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Glass Partition Wall in background */}
        <mesh position={[0, 0.8, -1.0]}>
          <boxGeometry args={[2.8, 2.2, 0.04]} />
          <meshPhysicalMaterial
            color="#AEE2FF"
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.9}
            thickness={0.5}
          />
        </mesh>

        {/* Executive Conference Table */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.06, 32]} />
          <meshStandardMaterial color="#2A180D" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Pedestal */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.2, 0.35, 0.65, 16]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>

        {/* Ergonomic Mesh Seating (Sedus inspired) */}
        {[0, 1.8, 3.6].map((angle, i) => {
          const rad = angle * (Math.PI / 3);
          const px = Math.cos(rad) * 1.25;
          const pz = Math.sin(rad) * 1.25;
          return (
            <group key={i} position={[px, -0.1, pz]} rotation={[0, -rad + Math.PI / 2, 0]}>
              {/* Chair seat */}
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.42, 0.06, 0.42]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>
              {/* Chair back */}
              <mesh position={[0, 0.5, -0.18]}>
                <boxGeometry args={[0.38, 0.55, 0.04]} />
                <meshStandardMaterial color="#0284c7" roughness={0.6} />
              </mesh>
              {/* Base stem */}
              <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
            </group>
          );
        })}

        {/* Hotspot: Workspace Consulting */}
        <Html position={[0, 0.7, 0]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("services")}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/50 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Consultancy</span>
          </button>
        </Html>
      </group>
    </group>
  );
}
