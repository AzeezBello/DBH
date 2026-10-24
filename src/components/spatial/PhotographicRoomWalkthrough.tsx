import React, { useEffect, useRef, useState, useMemo } from "react";
import { playFloorClick } from "@/lib/audio";
import { Sparkles, Eye, Info, CheckCircle2 } from "lucide-react";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  detail: string;
  tag: string;
}

interface RoomConfig {
  id: string;
  floorId: string;
  name: string;
  category: string;
  image: string;
  camera: {
    startScale: number;
    endScale: number;
    startX: number; // percentage
    endX: number;
    startY: number;
    endY: number;
  };
  accentColor: string;
  hotspots: Hotspot[];
}

const ROOMS: RoomConfig[] = [
  {
    id: "room-01",
    floorId: "floor-01",
    name: "Corporate Atrium & Overview",
    category: "LEVEL 01 // ARCHITECTURAL RECEPTION",
    image: "/img/real_executive_office.jpg",
    camera: {
      startScale: 1.04,
      endScale: 1.18,
      startX: 0,
      endX: 2,
      startY: 0,
      endY: -4,
    },
    accentColor: "#00A4EF",
    hotspots: [
      {
        id: "h1-1",
        top: "42%",
        left: "35%",
        title: "Double-Height Architectural Glazing",
        detail: "Low-E acoustic glass facades minimizing thermal transfer and street noise.",
        tag: "ACOUSTIC FACADE",
      },
      {
        id: "h1-2",
        top: "68%",
        left: "68%",
        title: "Executive Collaborative Lounge",
        detail: "Bespoke reception seating engineered for corporate welcoming.",
        tag: "INTERIOR ARCHITECTURE",
      },
    ],
  },
  {
    id: "room-02",
    floorId: "floor-02",
    name: "Acoustic Baffle Ceiling Suite",
    category: "LEVEL 02 // ACOUSTIC ENGINEERING",
    image: "/img/real_ceiling.jpg",
    camera: {
      startScale: 1.08,
      endScale: 1.28,
      startX: -2,
      endX: 4,
      startY: 2,
      endY: -6,
    },
    accentColor: "#38bdf8",
    hotspots: [
      {
        id: "h2-1",
        top: "28%",
        left: "48%",
        title: "Micro-Perforated Oak Baffles",
        detail: "NRC 0.88+ reverberation control with concealed sound absorption cores.",
        tag: "NRC 0.88+",
      },
      {
        id: "h2-2",
        top: "52%",
        left: "72%",
        title: "Recessed 4000K Linear LEDs",
        detail: "Continuous architectural lighting channels integrated flush with baffle grid.",
        tag: "LIGHTING INTEGRATION",
      },
    ],
  },
  {
    id: "room-03",
    floorId: "floor-03",
    name: "Financial Dealing Room",
    category: "LEVEL 03 // MISSION-CRITICAL SYSTEMS",
    image: "/img/real_trading_floor.jpg",
    camera: {
      startScale: 1.05,
      endScale: 1.26,
      startX: 3,
      endX: -4,
      startY: 0,
      endY: -3,
    },
    accentColor: "#10b981",
    hotspots: [
      {
        id: "h3-1",
        top: "45%",
        left: "32%",
        title: "Multi-Screen Trader Consoles",
        detail: "Continuous curved display arms supporting up to 6 ultra-wide financial feeds.",
        tag: "24/7 TRADING DESK",
      },
      {
        id: "h3-2",
        top: "70%",
        left: "58%",
        title: "Dual-Feed A+B UPS Infrastructure",
        detail: "Zero-latency failover power routing under anti-static raised access flooring.",
        tag: "POWER REDUNDANCY",
      },
    ],
  },
  {
    id: "room-04",
    floorId: "floor-04",
    name: "Executive Boardroom Suite",
    category: "LEVEL 04 // EXECUTIVE ARCHITECTURE",
    image: "/img/real_boardroom.jpg",
    camera: {
      startScale: 1.06,
      endScale: 1.24,
      startX: -3,
      endX: 3,
      startY: 1,
      endY: -4,
    },
    accentColor: "#f59e0b",
    hotspots: [
      {
        id: "h4-1",
        top: "38%",
        left: "28%",
        title: "Electrochromic Smart Glass",
        detail: "Instant privacy switching from crystal clear to opaque with Rw 48dB sound barrier.",
        tag: "SMART PRIVACY",
      },
      {
        id: "h4-2",
        top: "62%",
        left: "55%",
        title: "German Sedus Task Seating",
        detail: "Precision ergonomic lumbar support engineered for prolonged executive sessions.",
        tag: "SEDUS ERGONOMICS",
      },
    ],
  },
  {
    id: "room-05",
    floorId: "floor-05",
    name: "Corporate Deployments & Fitouts",
    category: "LEVEL 05 // COMPLETED PORTFOLIO",
    image: "/img/real_ergonomics.jpg",
    camera: {
      startScale: 1.05,
      endScale: 1.20,
      startX: 2,
      endX: -2,
      startY: 0,
      endY: -3,
    },
    accentColor: "#6366f1",
    hotspots: [
      {
        id: "h5-1",
        top: "50%",
        left: "44%",
        title: "Turnkey Enterprise Seating",
        detail: "Certified deployments across Tier-1 Nigerian financial institutions.",
        tag: "TURNKEY INSTALLATION",
      },
    ],
  },
  {
    id: "room-06",
    floorId: "floor-06",
    name: "Lagos Global Headquarters",
    category: "LEVEL 06 // VICTORIA ISLAND",
    image: "/img/real_acoustics_detail.jpg",
    camera: {
      startScale: 1.04,
      endScale: 1.15,
      startX: 0,
      endX: 1,
      startY: 0,
      endY: -2,
    },
    accentColor: "#00A4EF",
    hotspots: [
      {
        id: "h6-1",
        top: "55%",
        left: "50%",
        title: "DBH Operational Center",
        detail: "25B Sanusi Fafunwa, Victoria Island — Central engineering and warehouse hub.",
        tag: "VICTORIA ISLAND HQ",
      },
    ],
  },
];

export function PhotographicRoomWalkthrough() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Smooth lerp values for Steadicam feel
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [renderedMouse, setRenderedMouse] = useState({ x: 0, y: 0 });

  // Update target scroll on scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;
      targetScrollRef.current = pct;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 60FPS fluid physics loop with smooth damping
    let animationFrameId: number;
    const updatePhysics = () => {
      // Lerp scroll progress (smooth camera glide)
      const scrollDelta = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += scrollDelta * 0.085;
      setScrollProgress(currentScrollRef.current);

      // Lerp mouse parallax
      const mouseDeltaX = mouseRef.current.targetX - mouseRef.current.x;
      const mouseDeltaY = mouseRef.current.targetY - mouseRef.current.y;
      mouseRef.current.x += mouseDeltaX * 0.05;
      mouseRef.current.y += mouseDeltaY * 0.05;
      setRenderedMouse({ x: mouseRef.current.x, y: mouseRef.current.y });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute active room index based on smooth progress
  const numRooms = ROOMS.length;
  const activeRoomIndex = Math.min(
    Math.floor(scrollProgress * numRooms),
    numRooms - 1
  );

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none overflow-hidden bg-[#020713]"
      aria-hidden="true"
    >
      {/* 1. ROOM PHOTOGRAPHY STACK WITH SPATIAL CAMERA PAN & ZOOM */}
      {ROOMS.map((room, idx) => {
        // Calculate room's scroll slice [startP, endP]
        const roomSlice = 1 / numRooms;
        const startP = idx * roomSlice;
        const endP = (idx + 1) * roomSlice;

        // Local progress within this room [0, 1]
        let localT = (scrollProgress - startP) / roomSlice;

        // Opacity transition window with smooth easing
        let opacity = 0;
        const fadePadding = 0.22; // smooth cross-fade overlap

        if (scrollProgress >= startP - fadePadding && scrollProgress <= endP + fadePadding) {
          if (scrollProgress < startP) {
            // Fading in
            const f = (scrollProgress - (startP - fadePadding)) / fadePadding;
            opacity = f * f * (3 - 2 * f);
          } else if (scrollProgress > endP) {
            // Fading out
            const f = ((endP + fadePadding) - scrollProgress) / fadePadding;
            opacity = Math.max(f * f * (3 - 2 * f), 0);
          } else {
            // Fully active room
            opacity = 1;
          }
        }

        // Camera Pan & Zoom Calculations
        const clampedT = Math.min(Math.max(localT, 0), 1);
        const smoothT = clampedT * clampedT * (3 - 2 * clampedT);

        const currentScale =
          room.camera.startScale +
          (room.camera.endScale - room.camera.startScale) * smoothT;

        // Add subtle mouse parallax (2.5D physical depth)
        const currentX =
          room.camera.startX +
          (room.camera.endX - room.camera.startX) * smoothT -
          renderedMouse.x * 2.5;

        const currentY =
          room.camera.startY +
          (room.camera.endY - room.camera.startY) * smoothT -
          renderedMouse.y * 2.0;

        if (opacity <= 0.001) {
          return null; // Skip non-visible rooms for maximum GPU efficiency
        }

        return (
          <div
            key={room.id}
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ opacity }}
          >
            {/* The Real Room Photographic Canvas */}
            <div
              className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(${room.image})`,
                transform: `scale(${currentScale}) translate3d(${currentX}%, ${currentY}%, 0)`,
                transformOrigin: "center center",
                transition: "filter 0.5s ease-out",
                filter: opacity < 0.8 ? "blur(2px) brightness(0.7)" : "blur(0px) brightness(0.85)",
              }}
            />

            {/* Room Ambient Rim Flare */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${room.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* Interactive Spatial Hotspots in the Room */}
            {opacity > 0.85 && (
              <div className="absolute inset-0 pointer-events-auto">
                {room.hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    className="absolute"
                    style={{ top: hs.top, left: hs.left }}
                  >
                    <button
                      onClick={() => {
                        playFloorClick();
                        setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
                      }}
                      onMouseEnter={() => {
                        playFloorClick();
                        setActiveHotspot(hs);
                      }}
                      className="group relative flex items-center justify-center cursor-pointer"
                      aria-label={hs.title}
                    >
                      {/* Pulse rings */}
                      <span
                        className="absolute w-8 h-8 rounded-full animate-ping opacity-60"
                        style={{ backgroundColor: room.accentColor }}
                      />
                      <span
                        className="relative w-5 h-5 rounded-full border border-white/80 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white shadow-lg transition-transform group-hover:scale-125"
                        style={{ backgroundColor: `${room.accentColor}CC` }}
                      >
                        +
                      </span>

                      {/* Hotspot Floating Tooltip */}
                      {activeHotspot?.id === hs.id && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-2xl border border-white/20 shadow-2xl text-left pointer-events-auto z-30 animate-in fade-in zoom-in-95 duration-200">
                          <span
                            className="text-[9px] font-mono font-bold uppercase tracking-wider block mb-1"
                            style={{ color: room.accentColor }}
                          >
                            {hs.tag}
                          </span>
                          <h4 className="text-xs font-bold text-white mb-1">
                            {hs.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                            {hs.detail}
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* 2. ARCHITECTURAL VIGNETTE & CONTRAST SHIELDS */}
      {/* Heavy bottom-to-top vignette to guarantee 100% legibility of typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-[#020713]/40 to-[#020713]/80 pointer-events-none" />

      {/* Subtle radial corner shading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(2, 7, 19, 0.75) 100%)",
        }}
      />

      {/* 3. LIVE SPATIAL HUD (riseof.digital signature) */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-30 hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-300 select-none">
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: ROOMS[activeRoomIndex].accentColor }}
          />
          <span className="text-white font-semibold">
            {ROOMS[activeRoomIndex].name}
          </span>
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">
          WALKTHROUGH: {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </div>
  );
}
