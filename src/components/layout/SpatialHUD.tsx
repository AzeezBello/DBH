import React, { useState, useEffect } from "react";
import { Compass, Eye, Volume2, MonitorCheck, HardHat, Sparkles } from "lucide-react";

export function SpatialHUD() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? (window.scrollY / scrollMax) * 100 : 0;
      setScrollPct(Math.round(progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active zone based on scroll %
  let zoneName = "Architectural Overview";
  let zoneColor = "text-dbh-cyan";

  if (scrollPct < 25) {
    zoneName = "Global 3D Overview";
    zoneColor = "text-dbh-cyan";
  } else if (scrollPct < 48) {
    zoneName = "Acoustic Ceiling Architecture";
    zoneColor = "text-sky-400";
  } else if (scrollPct < 70) {
    zoneName = "Financial Dealing Floor";
    zoneColor = "text-emerald-400";
  } else if (scrollPct < 88) {
    zoneName = "Executive Boardroom Suite";
    zoneColor = "text-amber-400";
  } else {
    zoneName = "Victoria Island Global HQ";
    zoneColor = "text-indigo-400";
  }

  const scrollToZone = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl text-slate-200 select-none">
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10">
        <span className="w-2 h-2 rounded-full bg-dbh-cyan animate-ping" />
        <span className="text-[11px] font-mono tracking-wider text-slate-400">
          3D CAM: <span className="text-white font-bold">{scrollPct}%</span>
        </span>
      </div>

      <div className="flex items-center gap-2 px-2">
        <Compass className={`w-3.5 h-3.5 ${zoneColor}`} />
        <span className={`text-xs font-semibold tracking-wide ${zoneColor}`}>
          {zoneName}
        </span>
      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="flex items-center gap-1 pl-2 border-l border-white/10">
        <button
          onClick={() => scrollToZone("#about")}
          title="Overview"
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => scrollToZone("#products")}
          title="Acoustic Ceilings"
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-sky-400 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => scrollToZone("#solutions")}
          title="Dealing Floor"
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <MonitorCheck className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => scrollToZone("#services")}
          title="Boardroom"
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-amber-400 transition-colors"
        >
          <HardHat className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
