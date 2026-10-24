import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

// 6 Camera trajectory waypoints matching the 6 architectural floors
const WAYPOINTS = [
  // Floor 01: Atrium & Overview
  { scroll: 0.0, pos: new THREE.Vector3(0, 2.8, 7.5), lookAt: new THREE.Vector3(0, 0.6, 0) },
  // Floor 02: Acoustic Ceilings (Camera zooms in and looks up into wood baffles)
  { scroll: 0.2, pos: new THREE.Vector3(0.4, 2.2, 2.5), lookAt: new THREE.Vector3(0, 3.4, 0) },
  // Floor 03: Financial Dealing Rooms (Camera moves directly into the trading monitor console)
  { scroll: 0.4, pos: new THREE.Vector3(-1.4, 1.1, 1.9), lookAt: new THREE.Vector3(-1.3, 0.75, 0.4) },
  // Floor 04: Executive Boardroom & Sedus (Camera moves across into the glass partition)
  { scroll: 0.6, pos: new THREE.Vector3(1.8, 1.2, 1.6), lookAt: new THREE.Vector3(1.4, 0.7, -0.2) },
  // Floor 05: Completed Portfolio (Camera focuses on floating project photo portals)
  { scroll: 0.8, pos: new THREE.Vector3(0, 1.6, 4.8), lookAt: new THREE.Vector3(0, 1.8, 0) },
  // Floor 06: Lagos HQ (Low-angle illuminated perspective)
  { scroll: 1.0, pos: new THREE.Vector3(0, 0.6, 6.8), lookAt: new THREE.Vector3(0, 1.6, 0) },
];

function CameraController({ mousePos }: { mousePos: { x: number; y: number } }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2.8, 7.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.6, 0));

  useFrame((_, delta) => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;

    let startWP = WAYPOINTS[0];
    let endWP = WAYPOINTS[WAYPOINTS.length - 1];

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (scrollProgress >= WAYPOINTS[i].scroll && scrollProgress <= WAYPOINTS[i + 1].scroll) {
        startWP = WAYPOINTS[i];
        endWP = WAYPOINTS[i + 1];
        break;
      }
    }

    const range = endWP.scroll - startWP.scroll;
    const factor = range > 0 ? (scrollProgress - startWP.scroll) / range : 0;

    // Smooth cubic easing between waypoints
    const smoothFactor = factor * factor * (3 - 2 * factor);

    const targetPos = new THREE.Vector3().lerpVectors(startWP.pos, endWP.pos, smoothFactor);
    const targetLookAt = new THREE.Vector3().lerpVectors(startWP.lookAt, endWP.lookAt, smoothFactor);

    // Subtle mouse parallax
    targetPos.x += mousePos.x * 0.4;
    targetPos.y += mousePos.y * 0.3;

    currentPos.current.lerp(targetPos, delta * 3.8);
    currentLookAt.current.lerp(targetLookAt, delta * 3.8);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function Seamless3DEnvironment() {
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

  return (
    <group position={[0, -0.6, 0]}>
      {/* 1. Base Floating Platform with Real Stone/Concrete Texture */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[4.6, 4.8, 0.18, 48]} />
        <meshStandardMaterial map={floorTexture} roughness={0.3} metalness={0.55} />
      </mesh>

      {/* Luminous Floor Accent Rings */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.1, 4.18, 48]} />
        <meshBasicMaterial color="#00A4EF" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.54, 48]} />
        <meshBasicMaterial color="#6366F1" opacity={0.5} transparent />
      </mesh>

      {/* 2. ACOUSTIC BAFFLE CEILING GRID WITH REAL WOOD TEXTURE & RECESSED LEDS */}
      <group position={[0, 3.4, 0]}>
        {[-2.0, -1.4, -0.8, -0.2, 0.4, 1.0, 1.6, 2.2].map((z, idx) => (
          <group key={idx} position={[0, 0, z]}>
            <mesh castShadow>
              <boxGeometry args={[4.4, 0.38, 0.09]} />
              <meshStandardMaterial
                map={woodTexture}
                roughness={0.35}
                color={idx % 2 === 0 ? "#ffffff" : "#f59e0b"}
              />
            </mesh>
            {/* Linear Recessed LED Downlights */}
            {idx % 2 === 1 && (
              <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[3.8, 0.04, 0.04]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#00A4EF"
                  emissiveIntensity={3.2}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* 3. FINANCIAL DEALING ROOM CONSOLE WITH REAL FINANCIAL CHARTS */}
      <group position={[-1.3, 0.7, 0.4]} rotation={[0, Math.PI / 4, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.2, 0.08, 0.95]} />
          <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.9, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.75]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        <mesh position={[0.9, -0.38, 0]}>
          <boxGeometry args={[0.08, 0.68, 0.75]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>

        {/* Center Ultrawide Trading Monitor */}
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[1.05, 0.6, 0.04]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#00A4EF"
            emissiveMap={screenTexture}
            emissiveIntensity={0.65}
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
            emissiveIntensity={0.5}
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
      </group>

      {/* 4. EXECUTIVE SUITE WITH GLASS PARTITION & REAL WOOD CONFERENCE TABLE */}
      <group position={[1.4, 0.7, -0.2]} rotation={[0, -Math.PI / 6, 0]}>
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

        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.07, 48]} />
          <meshStandardMaterial map={woodTexture} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.22, 0.38, 0.65, 24]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} />
        </mesh>

        {/* Chairs */}
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
            </group>
          );
        })}
      </group>

      {/* 5. FLOATING 3D SPATIAL PHOTOGRAPHY PORTALS */}
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.4}>
        <group position={[-3.0, 2.2, -1.8]} rotation={[0, 0.35, 0]}>
          <mesh castShadow>
            <planeGeometry args={[1.6, 1.0]} />
            <meshBasicMaterial map={ceilingPhoto} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.66, 1.06]} />
            <meshBasicMaterial color="#00A4EF" opacity={0.6} transparent />
          </mesh>
        </group>

        <group position={[3.0, 2.4, -1.6]} rotation={[0, -0.35, 0]}>
          <mesh castShadow>
            <planeGeometry args={[1.6, 1.0]} />
            <meshBasicMaterial map={tradingPhoto} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.66, 1.06]} />
            <meshBasicMaterial color="#10B981" opacity={0.6} transparent />
          </mesh>
        </group>

        <group position={[0, 0.9, -3.2]}>
          <mesh castShadow>
            <planeGeometry args={[1.8, 1.1]} />
            <meshBasicMaterial map={boardroomPhoto} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.86, 1.16]} />
            <meshBasicMaterial color="#E0A96D" opacity={0.6} transparent />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function AmbientParticles({ count = 350 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color("#00A4EF");
    const color2 = new THREE.Color("#6366F1");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const mixed = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.065} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

export function SeamlessWorldCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden">
      <Canvas shadows dpr={[1, 1.75]}>
        <CameraController mousePos={mousePos} />

        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 12, 6]} intensity={2.2} castShadow />
        <pointLight position={[-4, 4, -2]} intensity={3.8} color="#00A4EF" />
        <pointLight position={[4, 3, 4]} intensity={2.6} color="#6366F1" />
        <pointLight position={[0, -0.2, 0]} intensity={2.0} color="#00A4EF" />
        <pointLight position={[0, 3.2, 0]} intensity={1.8} color="#ffffff" />

        <React.Suspense fallback={null}>
          <Seamless3DEnvironment />
          <AmbientParticles count={380} />
        </React.Suspense>
      </Canvas>

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-45" />
    </div>
  );
}
