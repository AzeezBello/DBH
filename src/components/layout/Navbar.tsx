import React, { useState, useEffect } from "react";
import { isSoundEnabled, toggleSound, playFloorClick } from "@/lib/audio";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [lagosTime, setLagosTime] = useState("");

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const updateClock = () => {
      const now = new Date();
      // Lagos is UTC+1 (WAT)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(now.toLocaleTimeString("en-GB", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleInquire = () => {
    playFloorClick();
    onOpenConsultation();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 lg:px-12 flex items-center justify-between select-none pointer-events-auto">
      {/* Brand Logo */}
      <a
        href="#floor-01"
        onClick={() => playFloorClick()}
        className="flex items-center gap-3 group"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm text-white group-hover:bg-dbh-cyan group-hover:text-black transition-all">
          D
        </div>
        <div className="flex flex-col">
          <span className="font-bold tracking-widest text-sm text-white group-hover:text-dbh-cyan transition-colors">
            DBH
          </span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500">
            SOLUTIONS
          </span>
        </div>
      </a>

      {/* Center Metadata: Live Lagos Time & Coordinates */}
      <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LAGOS, NG</span>
        </span>
        <span className="text-white font-semibold">{lagosTime} WAT</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-500">6.4311° N, 3.4270° E</span>
      </div>

      {/* Right Actions: Sound Toggle & Minimalist CTA */}
      <div className="flex items-center gap-4">
        {/* Sound Switch */}
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
          title={soundOn ? "Mute audio" : "Enable tactile sound"}
        >
          {soundOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-dbh-cyan" />
              <span className="hidden sm:inline text-[11px]">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline text-[11px] text-slate-500">MUTED</span>
            </>
          )}
        </button>

        {/* Minimalist Inquire Button */}
        <button
          onClick={handleInquire}
          className="relative px-5 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-dbh-cyan hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,164,239,0.5)]"
        >
          <span>Inquire</span>
        </button>
      </div>
    </header>
  );
}
