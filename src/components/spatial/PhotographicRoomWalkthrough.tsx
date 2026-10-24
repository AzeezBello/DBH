import React, { useEffect, useRef, useState } from "react";
import { playFloorClick, playSwoosh } from "@/lib/audio";
import { Maximize2, Minimize2, X } from "lucide-react";

export interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  detail: string;
  tag: string;
  metric: string;
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
    startX: number;
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
        top: "40%",
        left: "36%",
        title: "Double-Height Acoustic Glazing",
        detail: "Low-E laminated glass facade engineered to block 46dB of external urban traffic noise while maximizing daylight harvesting.",
        tag: "ACOUSTIC FACADE",
        metric: "Rw 46 dB Attenuation",
      },
      {
        id: "h1-2",
        top: "66%",
        left: "66%",
        title: "Executive Collaborative Lounge",
        detail: "Bespoke European reception seating and modular acoustic zoning tailored for Tier-1 institutional headquarters.",
        tag: "INTERIOR ARCHITECTURE",
        metric: "BIFMA Certified",
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
        top: "30%",
        left: "48%",
        title: "Micro-Perforated Oak Baffles",
        detail: "High-density PET acoustic core wrapped in natural white oak veneer, reducing open-office reverberation to 0.32 seconds.",
        tag: "NRC 0.88+ ABSORPTION",
        metric: "RT60: 0.32s",
      },
      {
        id: "h2-2",
        top: "52%",
        left: "70%",
        title: "Recessed 4000K Linear LEDs",
        detail: "Glare-free UGR<16 continuous architectural lighting channels integrated flush within the modular baffle tracks.",
        tag: "LIGHTING INTEGRATION",
        metric: "4000K CRI 92+",
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
        top: "44%",
        left: "34%",
        title: "Multi-Screen Trader Consoles",
        detail: "Zero-wobble extruded aluminum parabolic monitor bridges supporting up to 6 ultra-wide Bloomberg/Refinitiv feeds per trader.",
        tag: "24/7 DEALING DESK",
        metric: "6x 49\" Display Capacity",
      },
      {
        id: "h3-2",
        top: "68%",
        left: "58%",
        title: "Dual-Feed A+B UPS Infrastructure",
        detail: "Isolated power & Cat6A fiber pathways with active silent thermal extraction under raised access flooring.",
        tag: "POWER REDUNDANCY",
        metric: "99.999% Uptime SLA",
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
        left: "30%",
        title: "Electrochromic Smart Glass",
        detail: "PDLC liquid-crystal partition wall that transitions from crystal clear to privacy frosted in under 80 milliseconds.",
        tag: "SMART PRIVACY",
        metric: "< 80ms Switch Speed",
      },
      {
        id: "h4-2",
        top: "62%",
        left: "56%",
        title: "German Sedus Task Seating",
        detail: "Precision kinematic spine support with synchronized weight-activated tilt for prolonged executive boardroom sessions.",
        tag: "SEDUS ERGONOMICS",
        metric: "DIN EN 1335 Certified",
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
      endScale: 1.2,
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
        left: "45%",
        title: "Turnkey Enterprise Ergonomics",
        detail: "Complete delivery of 320+ German ergonomic workstations and sit-stand desks across West African corporate headquarters.",
        tag: "TURNKEY INSTALLATION",
        metric: "250+ Deployments",
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
        top: "54%",
        left: "50%",
        title: "DBH Engineering & Design Hub",
        detail: "25B Sanusi Fafunwa, Victoria Island — Housing our acoustic testing laboratory, mock-up showroom, and project engineers.",
        tag: "VICTORIA ISLAND HQ",
        metric: "Lagos, Nigeria",
      },
    ],
  },
];

export function PhotographicRoomWalkthrough() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [focusedHotspot, setFocusedHotspot] = useState<Hotspot | null>(null);

  // Smooth lerp values for Steadicam feel
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const lastRoomIndexRef = useRef(0);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [renderedMouse, setRenderedMouse] = useState({ x: 0, y: 0 });

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocusedHotspot(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    let animationFrameId: number;
    const updatePhysics = () => {
      const scrollDelta = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += scrollDelta * 0.085;
      setScrollProgress(currentScrollRef.current);

      // Clear focus zoom if user scrolls into a different room
      const currentRoomIdx = Math.min(
        Math.floor(currentScrollRef.current * ROOMS.length),
        ROOMS.length - 1
      );
      if (currentRoomIdx !== lastRoomIndexRef.current) {
        lastRoomIndexRef.current = currentRoomIdx;
        setFocusedHotspot(null);
      }

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
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const numRooms = ROOMS.length;
  const activeRoomIndex = Math.min(
    Math.floor(scrollProgress * numRooms),
    numRooms - 1
  );

  const handleToggleHotspot = (hs: Hotspot) => {
    if (focusedHotspot?.id === hs.id) {
      playFloorClick();
      setFocusedHotspot(null);
    } else {
      playSwoosh();
      setFocusedHotspot(hs);
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none overflow-hidden bg-[#020713]"
      aria-hidden="true"
    >
      {/* 1. ROOM PHOTOGRAPHY STACK WITH SPATIAL CAMERA PAN, ZOOM & HOTSPOT FOCUS */}
      {ROOMS.map((room, idx) => {
        const roomSlice = 1 / numRooms;
        const startP = idx * roomSlice;
        const endP = (idx + 1) * roomSlice;

        const localT = (scrollProgress - startP) / roomSlice;

        let opacity = 0;
        const fadePadding = 0.22;

        if (scrollProgress >= startP - fadePadding && scrollProgress <= endP + fadePadding) {
          if (scrollProgress < startP) {
            const f = (scrollProgress - (startP - fadePadding)) / fadePadding;
            opacity = f * f * (3 - 2 * f);
          } else if (scrollProgress > endP) {
            const f = (endP + fadePadding - scrollProgress) / fadePadding;
            opacity = Math.max(f * f * (3 - 2 * f), 0);
          } else {
            opacity = 1;
          }
        }

        if (opacity <= 0.001) {
          return null;
        }

        const clampedT = Math.min(Math.max(localT, 0), 1);
        const smoothT = clampedT * clampedT * (3 - 2 * clampedT);

        // Check if a hotspot in this room is currently locked for Deep Focus Zoom
        const activeRoomHotspot =
          focusedHotspot && room.hotspots.some((h) => h.id === focusedHotspot.id)
            ? focusedHotspot
            : null;

        let targetScale =
          room.camera.startScale +
          (room.camera.endScale - room.camera.startScale) * smoothT;

        let targetX =
          room.camera.startX +
          (room.camera.endX - room.camera.startX) * smoothT -
          renderedMouse.x * 2.5;

        let targetY =
          room.camera.startY +
          (room.camera.endY - room.camera.startY) * smoothT -
          renderedMouse.y * 2.0;

        if (activeRoomHotspot) {
          const hsLeft = parseFloat(activeRoomHotspot.left);
          const hsTop = parseFloat(activeRoomHotspot.top);
          targetScale = 1.44;
          targetX = (50 - hsLeft) * 0.42 - renderedMouse.x * 1.2;
          targetY = (50 - hsTop) * 0.42 - renderedMouse.y * 1.2;
        }

        return (
          <div
            key={room.id}
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ opacity }}
          >
            {/* Real Room Photographic Canvas with Smooth CSS Transition on Focus Zoom */}
            <div
              className="absolute -inset-12 w-[calc(100%+96px)] h-[calc(100%+96px)] bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(${room.image})`,
                transform: `scale(${targetScale}) translate3d(${targetX}%, ${targetY}%, 0)`,
                transformOrigin: "center center",
                transition: activeRoomHotspot
                  ? "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease-out"
                  : "transform 0.12s linear, filter 0.5s ease-out",
                filter:
                  opacity < 0.8
                    ? "blur(2px) brightness(0.7)"
                    : activeRoomHotspot
                    ? "blur(0px) brightness(0.95) contrast(1.06)"
                    : "blur(0px) brightness(0.84)",
              }}
            />

            {/* Spotlight Dimmer when Hotspot is Focused */}
            {activeRoomHotspot && (
              <div
                className="absolute inset-0 pointer-events-auto transition-opacity duration-500 cursor-zoom-out"
                onClick={() => {
                  playFloorClick();
                  setFocusedHotspot(null);
                }}
                style={{
                  background: `radial-gradient(circle at 50% 50%, transparent 18%, rgba(2, 7, 19, 0.78) 70%)`,
                }}
                title="Click anywhere to reset camera zoom"
              />
            )}

            {/* Room Ambient Rim Flare */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${room.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* Interactive Spatial Hotspots */}
            {opacity > 0.85 && (
              <div className="absolute inset-0 pointer-events-none">
                {room.hotspots.map((hs) => {
                  const isFocused = focusedHotspot?.id === hs.id;
                  return (
                    <div
                      key={hs.id}
                      className="absolute pointer-events-auto z-30"
                      style={{ top: hs.top, left: hs.left }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleHotspot(hs);
                        }}
                        className="group relative flex items-center gap-2 cursor-pointer focus:outline-none"
                        aria-label={`Inspect ${hs.title}`}
                      >
                        {/* Pulse ring */}
                        <span
                          className="absolute -left-1.5 -top-1.5 w-9 h-9 rounded-full animate-ping opacity-50"
                          style={{ backgroundColor: room.accentColor }}
                        />
                        <span
                          className={`relative w-6 h-6 rounded-full border border-white/90 backdrop-blur-md flex items-center justify-center text-xs font-bold text-white shadow-xl transition-all duration-300 ${
                            isFocused ? "scale-125 ring-4 ring-white/30" : "group-hover:scale-125"
                          }`}
                          style={{ backgroundColor: room.accentColor }}
                        >
                          {isFocused ? <Minimize2 className="w-3 h-3" /> : "+"}
                        </span>

                        {/* Compact Label Pill next to Pin */}
                        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-xl text-[10px] font-mono text-slate-200 group-hover:text-white group-hover:border-white/40 transition-all shadow-lg">
                          <span>{hs.tag}</span>
                          <Maximize2 className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                        </span>
                      </button>

                      {/* Expanded Deep-Focus Architectural Callout Card */}
                      {isFocused && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 sm:w-80 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-left pointer-events-auto z-40 animate-in fade-in zoom-in-95 duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5"
                              style={{ color: room.accentColor }}
                            >
                              {hs.tag}
                            </span>
                            <button
                              onClick={() => {
                                playFloorClick();
                                setFocusedHotspot(null);
                              }}
                              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Exit focus zoom"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-1.5">
                            {hs.title}
                          </h4>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                            {hs.detail}
                          </p>

                          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-emerald-400 font-semibold">
                              SPEC: {hs.metric}
                            </span>
                            <button
                              onClick={() => {
                                playFloorClick();
                                setFocusedHotspot(null);
                              }}
                              className="text-slate-400 hover:text-white underline"
                            >
                              RESET ZOOM [ESC]
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* 2. ARCHITECTURAL VIGNETTE & CONTRAST SHIELDS */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-[#020713]/35 to-[#020713]/80 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 42%, rgba(2, 7, 19, 0.72) 100%)",
        }}
      />

      {/* 3. LIVE SPATIAL HUD */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-30 hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/75 border border-white/15 backdrop-blur-xl text-xs font-mono text-slate-300 select-none pointer-events-auto">
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
          {focusedHotspot ? (
            <button
              onClick={() => {
                playFloorClick();
                setFocusedHotspot(null);
              }}
              className="text-dbh-cyan hover:underline font-semibold"
            >
              ZOOM LOCKED (RESET)
            </button>
          ) : (
            `WALKTHROUGH: ${Math.round(scrollProgress * 100)}%`
          )}
        </span>
      </div>
    </div>
  );
}
