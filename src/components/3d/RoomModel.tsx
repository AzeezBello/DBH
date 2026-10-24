import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface RoomModelProps {
  activeFocus: "all" | "products" | "solutions" | "services";
  onSelectHotspot: (type: "products" | "solutions" | "services") => void;
}

export function RoomModel({ activeFocus, onSelectHotspot }: RoomModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tradingScreensRef = useRef<THREE.Group>(null);

  // Load real high-res textures for photorealistic materials
  const [screenTexture, woodTexture, floorTexture, ceilingPhoto, tradingPhoto, boardroomPhoto] = useTexture([
    "/img/screen_chart.jpg",
    "/img/wood_texture.jpg",
    "/img/floor_texture.jpg",
    "/img/real_ceiling.jpg",
    "/img/real_trading_floor.jpg",
    "/img/real_boardroom.jpg",
  ]);

  useMemo(() => {
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(3, 1);

    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
  }, [woodTexture, floorTexture]);

  // Subtle continuous rotation & mouse interaction
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. Base Floating Platform with Real Architectural Floor Texture */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[4.4, 4.6, 0.16, 48]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>

      {/* Outer Cyan Laser Ring */}
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 3.86, 48]} />
        <meshBasicMaterial color="#00A4EF" opacity={0.8} transparent />
      </mesh>

      {/* 2. ACOUSTIC BAFFLE CEILING (Real Architectural Wood Slats & Recessed LEDs) */}
      <group position={[0, 3.3, 0]}>
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((z, idx) => (
          <group key={idx} position={[0, 0, z]}>
            {/* Real Wood Slat Baffle */}
            <mesh castShadow>
              <boxGeometry args={[4.0, 0.38, 0.09]} />
              <meshStandardMaterial
                map={woodTexture}
                roughness={0.4}
                metalness={0.1}
                color={idx % 2 === 0 ? "#ffffff" : "#d97706"}
              />
            </mesh>
            {/* Recessed Architectural Linear LED Downlight */}
            {idx % 2 === 1 && (
              <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[3.4, 0.04, 0.04]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#00A4EF"
                  emissiveIntensity={3.0}
                />
              </mesh>
            )}
          </group>
        ))}

        {/* Hotspot: Acoustic Ceilings */}
        <Html position={[0, 0.45, 0]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("products")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-dbh-cyan/60 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(0,164,239,0.6)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-dbh-cyan animate-ping" />
            <span>Acoustic Ceilings</span>
          </button>
        </Html>
      </group>

      {/* 3. FINANCIAL DEALING ROOM CONSOLE WITH REAL FINANCIAL DASHBOARD TEXTURE */}
      <group ref={tradingScreensRef} position={[-1.3, 0.7, 0.4]} rotation={[0, Math.PI / 4, 0]}>
        {/* Real Console Worktop */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.2, 0.08, 0.95]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Steel Cantilever Legs */}
        <mesh position={[-0.9, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.75]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.9, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.75]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Center Ultrawide Trading Monitor with REAL Live Trading System Texture */}
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[1.05, 0.6, 0.04]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#00A4EF"
            emissiveMap={screenTexture}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Left Monitor (Angled) */}
        <mesh position={[-0.85, 0.45, -0.08]} rotation={[0, 0.38, 0]}>
          <boxGeometry args={[0.75, 0.6, 0.04]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#10B981"
            emissiveMap={screenTexture}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Right Monitor (Angled) */}
        <mesh position={[0.85, 0.45, -0.08]} rotation={[0, -0.38, 0]}>
          <boxGeometry args={[0.75, 0.6, 0.04]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#00A4EF"
            emissiveMap={screenTexture}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Hotspot: Dealing Rooms */}
        <Html position={[0, 0.95, -0.2]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("solutions")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-emerald-400/60 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dealing Rooms</span>
          </button>
        </Html>
      </group>

      {/* 4. EXECUTIVE SUITE WITH REAL WOOD TABLE & GLASS PARTITIONS */}
      <group position={[1.4, 0.7, -0.2]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Real Glass Acoustic Partition */}
        <mesh position={[0, 0.85, -1.0]}>
          <boxGeometry args={[3.0, 2.3, 0.04]} />
          <meshPhysicalMaterial
            color="#AEE2FF"
            transparent
            opacity={0.35}
            roughness={0.08}
            transmission={0.92}
            thickness={0.6}
            ior={1.5}
          />
        </mesh>

        {/* Conference Table with Real Wood Texture */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.07, 48]} />
          <meshStandardMaterial
            map={woodTexture}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        {/* Brushed Metal Pedestal */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.22, 0.38, 0.65, 24]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Ergonomic Task Seating (Sedus Inspired) */}
        {[0, 2, 4].map((angle, i) => {
          const rad = angle * (Math.PI / 3);
          const px = Math.cos(rad) * 1.35;
          const pz = Math.sin(rad) * 1.35;
          return (
            <group key={i} position={[px, -0.1, pz]} rotation={[0, -rad + Math.PI / 2, 0]}>
              <mesh position={[0, 0.22, 0]}>
                <boxGeometry args={[0.44, 0.06, 0.44]} />
                <meshStandardMaterial color="#0f172a" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.54, -0.19]}>
                <boxGeometry args={[0.4, 0.58, 0.04]} />
                <meshStandardMaterial color="#0284c7" roughness={0.4} />
              </mesh>
              <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
            </group>
          );
        })}

        {/* Hotspot: Workspace Consulting */}
        <Html position={[0, 0.75, 0]} center distanceFactor={10}>
          <button
            onClick={() => onSelectHotspot("services")}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-amber-400/60 text-white text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:scale-110 transition-all cursor-pointer select-none"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Consultancy</span>
          </button>
        </Html>
      </group>

      {/* 5. FLOATING 3D REAL PROJECT IMAGE PORTALS (Spatial Gallery) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Floating Portal 1: Real Ceiling Installation */}
        <group position={[-2.8, 2.0, -1.8]} rotation={[0, 0.35, 0]}>
          <mesh castShadow>
            <planeGeometry args={[1.5, 0.95]} />
            <meshBasicMaterial map={ceilingPhoto} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.56, 1.01]} />
            <meshBasicMaterial color="#00A4EF" opacity={0.6} transparent />
          </mesh>
          <Html position={[0, -0.6, 0]} center distanceFactor={10}>
            <span className="px-2.5 py-1 rounded-md bg-black/80 border border-dbh-cyan/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md whitespace-nowrap">
              Project: Acoustic Fitout
            </span>
          </Html>
        </group>

        {/* Floating Portal 2: Real Trading Room Project */}
        <group position={[2.8, 2.2, -1.6]} rotation={[0, -0.35, 0]}>
          <mesh castShadow>
            <planeGeometry args={[1.5, 0.95]} />
            <meshBasicMaterial map={tradingPhoto} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.56, 1.01]} />
            <meshBasicMaterial color="#10B981" opacity={0.6} transparent />
          </mesh>
          <Html position={[0, -0.6, 0]} center distanceFactor={10}>
            <span className="px-2.5 py-1 rounded-md bg-black/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 backdrop-blur-md whitespace-nowrap">
              Project: Dealing Floor
            </span>
          </Html>
        </group>
      </Float>
    </group>
  );
}
