import React, { useState, useEffect } from "react";
import { isSoundEnabled, toggleSound, playFloorClick } from "@/lib/audio";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { label: "About", href: "#floor-01" },
  { label: "Products", href: "#floor-02" },
  { label: "Solutions", href: "#floor-03" },
  { label: "Services", href: "#floor-04" },
  { label: "Portfolio", href: "#floor-05" },
  { label: "Contact", href: "#floor-06" },
];

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [lagosTime, setLagosTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavLinkClick = (href: string) => {
    playFloorClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 lg:px-12 flex items-center justify-between select-none pointer-events-auto">
      {/* Brand Logo */}
      <a
        href="#floor-01"
        onClick={() => playFloorClick()}
        className="flex items-center gap-3 group shrink-0"
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

      {/* Desktop Editorial Navigation Links */}
      <nav className="hidden xl:flex items-center gap-7 px-5 py-2 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-300">
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavLinkClick(link.href)}
            className="hover:text-dbh-cyan transition-colors cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Center Metadata: Live Lagos Time & Coordinates */}
      <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LAGOS</span>
        </span>
        <span className="text-white font-semibold">{lagosTime} WAT</span>
        <span className="text-slate-600 hidden lg:inline">•</span>
        <span className="text-slate-500 hidden lg:inline">6.4311° N, 3.4270° E</span>
      </div>

      {/* Right Actions: Sound Toggle & Minimalist CTA */}
      <div className="flex items-center gap-3">
        {/* Sound Switch */}
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
          title={soundOn ? "Mute tactile sound" : "Enable tactile sound"}
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
          className="px-5 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-dbh-cyan hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,164,239,0.5)]"
        >
          <span>Inquire</span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            playFloorClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="xl:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dbh-cyan"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="xl:hidden fixed top-20 left-6 right-6 p-6 rounded-2xl bg-slate-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 animate-in fade-in duration-200 z-50">
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">
              NAVIGATION DIRECTORY
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavLinkClick(link.href)}
                className="text-left py-2 font-mono text-sm text-slate-200 hover:text-dbh-cyan transition-colors border-b border-white/5 focus:outline-none focus-visible:text-dbh-cyan"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleInquire();
              }}
              className="w-full mt-3 py-3 rounded-full bg-dbh-cyan text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,164,239,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Schedule Assessment
            </button>
          </div>
        </>
      )}
    </header>
  );
}
