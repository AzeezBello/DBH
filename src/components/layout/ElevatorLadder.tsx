import React, { useState, useEffect, useCallback } from "react";
import { playFloorClick } from "@/lib/audio";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Floor {
  id: string;
  num: string;
  name: string;
}

const FLOORS: Floor[] = [
  { id: "floor-01", num: "01", name: "ATRIUM" },
  { id: "floor-02", num: "02", name: "ACOUSTICS" },
  { id: "floor-03", num: "03", name: "DEALING ROOM" },
  { id: "floor-04", num: "04", name: "EXECUTIVE" },
  { id: "floor-05", num: "05", name: "PORTFOLIO" },
  { id: "floor-06", num: "06", name: "CONNECT" },
];

export function ElevatorLadder() {
  const [activeFloor, setActiveFloor] = useState("floor-01");

  const handleFloorClick = useCallback((id: string) => {
    playFloorClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const stepFloor = useCallback(
    (direction: -1 | 1) => {
      const currentIndex = FLOORS.findIndex((f) => f.id === activeFloor);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), FLOORS.length - 1);
      if (nextIndex !== currentIndex) {
        handleFloorClick(FLOORS[nextIndex].id);
      }
    },
    [activeFloor, handleFloorClick]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? window.scrollY / scrollMax : 0;

      const floorIndex = Math.min(
        Math.floor(progress * FLOORS.length + 0.08),
        FLOORS.length - 1
      );
      setActiveFloor(FLOORS[Math.max(0, floorIndex)].id);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not hijack keys if typing in a form field or if a dialog is open
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (document.querySelector('[role="dialog"]')) return;

      if (e.key === "PageDown" || (e.altKey && e.key === "ArrowDown")) {
        e.preventDefault();
        stepFloor(1);
      } else if (e.key === "PageUp" || (e.altKey && e.key === "ArrowUp")) {
        e.preventDefault();
        stepFloor(-1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stepFloor]);

  const activeIndex = FLOORS.findIndex((f) => f.id === activeFloor);

  return (
    <aside
      className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none"
      aria-label="Elevator floor selector"
    >
      {/* Floor Indicator Header */}
      <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4 pl-1">
        LEVEL // 0{activeIndex + 1}
      </div>

      <div className="relative flex flex-col gap-5 pl-5 border-l border-white/10">
        {/* Dynamic Elevator Tracker Bar */}
        <div
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-dbh-cyan to-sky-400 transition-all duration-300 shadow-[0_0_12px_rgba(0,164,239,0.9)]"
          style={{
            height: `${(1 / FLOORS.length) * 100}%`,
            transform: `translateY(${activeIndex * 100}%)`,
          }}
        />

        {FLOORS.map((floor) => {
          const isActive = activeFloor === floor.id;
          return (
            <button
              key={floor.id}
              onClick={() => handleFloorClick(floor.id)}
              aria-label={`Navigate to Level ${floor.num}: ${floor.name}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-3 text-left transition-all cursor-pointer py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-dbh-cyan rounded-md"
            >
              <span
                className={`font-mono text-xs transition-colors duration-200 ${
                  isActive
                    ? "text-dbh-cyan font-bold"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {floor.num}
              </span>
              <span
                className={`text-[11px] font-mono tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold opacity-100 translate-x-1"
                    : "text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-300"
                }`}
              >
                {floor.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Elevator Step Controls */}
      <div className="mt-5 pl-1 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => stepFloor(-1)}
          disabled={activeIndex <= 0}
          aria-label="Previous Floor"
          title="Previous Level (Alt + ↑)"
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => stepFloor(1)}
          disabled={activeIndex >= FLOORS.length - 1}
          aria-label="Next Floor"
          title="Next Level (Alt + ↓)"
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
