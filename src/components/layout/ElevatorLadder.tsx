import React, { useState, useEffect } from "react";
import { playFloorClick } from "@/lib/audio";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      setScrollProgress(progress);

      // Determine active floor based on scroll progress
      const floorIndex = Math.min(
        Math.floor(progress * FLOORS.length),
        FLOORS.length - 1
      );
      setActiveFloor(FLOORS[floorIndex].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFloorClick = (id: string) => {
    playFloorClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none"
      aria-label="Elevator floor selector"
    >
      {/* Floor Indicator Header */}
      <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4 pl-1">
        LEVEL // 0{FLOORS.findIndex((f) => f.id === activeFloor) + 1}
      </div>

      <div className="relative flex flex-col gap-5 pl-5 border-l border-white/10">
        {/* Dynamic Elevator Tracker Bar */}
        <div
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-dbh-cyan to-sky-400 transition-all duration-300 shadow-[0_0_12px_rgba(0,164,239,0.9)]"
          style={{
            height: `${(1 / FLOORS.length) * 100}%`,
            transform: `translateY(${FLOORS.findIndex((f) => f.id === activeFloor) * 100}%)`,
          }}
        />

        {FLOORS.map((floor) => {
          const isActive = activeFloor === floor.id;
          return (
            <button
              key={floor.id}
              onClick={() => handleFloorClick(floor.id)}
              className="group flex items-center gap-3 text-left transition-all cursor-pointer py-1"
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
    </aside>
  );
}
