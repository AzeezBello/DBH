import React, { useState } from "react";
import { motion } from "framer-motion";
import { playFloorClick, playSmartGlassSwitch } from "@/lib/audio";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

interface Floor04BoardroomProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export function Floor04Boardroom({ onOpenConsultation }: Floor04BoardroomProps) {
  const [isGlassFrosted, setIsGlassFrosted] = useState(false);

  const handleToggleGlass = () => {
    const nextState = !isGlassFrosted;
    setIsGlassFrosted(nextState);
    playSmartGlassSwitch(nextState);
  };

  return (
    <section
      id="floor-04"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 lg:px-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
        {/* Left Column: Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-3">
            LEVEL 04 // EXECUTIVE ARCHITECTURE
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Executive Suites &amp; Ergonomics.
          </h2>

          <p className="text-base text-slate-300 font-light leading-relaxed max-w-xl mb-8">
            Complete turnkey workplace fitouts featuring smart electrochromic glass partitions, German Sedus ergonomic task seating, and bespoke executive boardroom suites engineered to international standards.
          </p>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
            {[
              { label: "Ergonomics Partner", val: "Sedus (Germany)" },
              { label: "Glass Partitions", val: "Electrochromic PDLC" },
              { label: "Acoustic Attenuation", val: "Rw 48 dB Sound Stop" },
              { label: "Delivery Model", val: "EPC Turnkey Execution" },
              { label: "MEP Integration", val: "HVAC & Data Cabling" },
              { label: "Certification", val: "ISO 9001 / BIFMA" },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md"
              >
                <p className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</p>
                <p className="text-xs font-mono font-semibold text-amber-300 mt-1">{spec.val}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              playFloorClick();
              onOpenConsultation("turnkey");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Inquire Turnkey Fitouts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Right Column: Real Boardroom Photo + Interactive Smart Glass Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/75 backdrop-blur-2xl p-4 shadow-2xl"
        >
          <div className="relative h-60 sm:h-72 rounded-xl overflow-hidden mb-4">
            <img
              src="/img/real_boardroom.jpg"
              alt="Real Executive Boardroom Installation"
              className="w-full h-full object-cover transition-transform duration-700"
            />

            {/* Simulated PDLC Smart Glass Partition Layer */}
            <div
              className={`absolute inset-0 transition-all duration-150 flex flex-col items-center justify-center p-6 text-center ${
                isGlassFrosted
                  ? "backdrop-blur-xl bg-slate-100/20 opacity-100"
                  : "backdrop-blur-none bg-transparent opacity-0 pointer-events-none"
              }`}
            >
              <div className="p-3 rounded-full bg-slate-950/80 border border-amber-400/50 text-amber-400 mb-2 shadow-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white bg-slate-950/85 px-3 py-1 rounded-full border border-white/15">
                PDLC PRIVACY ACTIVE &bull; 98% OPACITY
              </span>
              <span className="text-[11px] font-mono text-slate-200 mt-1.5 bg-slate-950/70 px-2.5 py-0.5 rounded">
                Rw 48dB Acoustic Seal Engaged
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono pointer-events-none">
              <span className="text-white font-semibold">Executive Boardroom &bull; Abuja FCT</span>
              <span className="text-amber-300">
                {isGlassFrosted ? "FROSTED STATE" : "CRYSTAL CLEAR"}
              </span>
            </div>
          </div>

          {/* Interactive Electrochromic Switcher Control */}
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold block">
                SMART PARTITION DEMO
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {isGlassFrosted ? "Opaque Boardroom Mode" : "Transparent Open Mode"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleGlass}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isGlassFrosted
                  ? "bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
              }`}
            >
              {isGlassFrosted ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Clear Glass</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Frost Glass</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
