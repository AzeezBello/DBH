import React, { useState } from "react";
import { motion } from "framer-motion";
import { playFloorClick, playAcousticDemo } from "@/lib/audio";
import { Volume2, ArrowRight, Activity } from "lucide-react";

interface Floor02AcousticsProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export function Floor02Acoustics({ onOpenConsultation }: Floor02AcousticsProps) {
  const [acousticMode, setAcousticMode] = useState<"treated" | "untreated">("treated");
  const [isTesting, setIsTesting] = useState(false);

  const triggerAcousticTest = (mode: "treated" | "untreated") => {
    setAcousticMode(mode);
    setIsTesting(true);
    playAcousticDemo(mode);
    setTimeout(() => {
      setIsTesting(false);
    }, mode === "treated" ? 450 : 1200);
  };

  return (
    <section
      id="floor-02"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 lg:px-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
        {/* Left Column: Editorial Specs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-3">
            LEVEL 02 // ARCHITECTURAL ACOUSTICS
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Baffle Ceiling Engineering.
          </h2>

          <p className="text-base text-slate-300 font-light leading-relaxed max-w-xl mb-8">
            Engineered ceiling systems that blend micro-perforated natural wood baffles with sound-masking cores to attenuate reverberation and provide pristine speech privacy in open-plan headquarters.
          </p>

          {/* Technical Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
            {[
              { label: "Absorption Coeff.", val: "NRC 0.88+" },
              { label: "Fire Rating", val: "Class A / Euro B" },
              { label: "Lighting", val: "4000K Recessed LED" },
              { label: "Core Material", val: "PET Fiber + Oak" },
              { label: "Speech Clarity", val: "STI > 0.65" },
              { label: "Warranty", val: "10-Yr Structural" },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md"
              >
                <p className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</p>
                <p className="text-xs font-mono font-semibold text-sky-300 mt-1">{spec.val}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              playFloorClick();
              onOpenConsultation("acoustics");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-sky-400 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>Inquire Acoustic Ceilings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Right Column: Real Installation Photo + Interactive Acoustic Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/75 backdrop-blur-2xl p-4 shadow-2xl"
        >
          <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden mb-4">
            <img
              src="/img/real_acoustics_detail.jpg"
              alt="Real Acoustic Baffle Detail"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-semibold">Macro Finish Detail &bull; Lagos HQ</span>
              <span className="text-sky-300">Natural White Oak</span>
            </div>
          </div>

          {/* Interactive Acoustic Reverberation Simulator */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Acoustic Simulator</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {acousticMode === "treated" ? "RT60: 0.32s (DAMPED)" : "RT60: 1.42s (ECHO)"}
              </span>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => triggerAcousticTest("untreated")}
                className={`py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition-all flex items-center justify-center gap-1.5 ${
                  acousticMode === "untreated"
                    ? "bg-amber-500/20 border-amber-400/60 text-amber-300 font-bold"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <Volume2 className="w-3 h-3" />
                <span>Untreated Room</span>
              </button>

              <button
                type="button"
                onClick={() => triggerAcousticTest("treated")}
                className={`py-2 px-3 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition-all flex items-center justify-center gap-1.5 ${
                  acousticMode === "treated"
                    ? "bg-sky-500/20 border-sky-400/60 text-sky-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <Volume2 className="w-3 h-3" />
                <span>DBH Baffles</span>
              </button>
            </div>

            {/* Live Frequency Decay Visualizer */}
            <div className="h-10 flex items-end justify-between gap-1 px-2 pt-2 bg-slate-950/80 rounded-lg border border-white/5 overflow-hidden">
              {[35, 65, 90, 75, 95, 85, 70, 88, 60, 45, 78, 52, 40, 30].map((bar, idx) => {
                const heightPct = isTesting
                  ? acousticMode === "treated"
                    ? Math.max(18, bar * 0.38)
                    : bar
                  : acousticMode === "treated"
                  ? 16
                  : 42;
                return (
                  <div
                    key={idx}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor:
                        acousticMode === "treated" ? "#38bdf8" : "#f59e0b",
                      opacity: isTesting ? 1 : 0.55,
                    }}
                  />
                );
              })}
            </div>

            <p className="text-[10px] font-mono text-slate-400 mt-2.5 flex items-center justify-between">
              <span>Click buttons above to hear synthesized room decay</span>
              <span className="text-sky-400 font-semibold">-78% REVERB</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
