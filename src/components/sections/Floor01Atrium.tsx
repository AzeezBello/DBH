import React from "react";
import { motion } from "framer-motion";
import { playFloorClick } from "@/lib/audio";
import { ArrowDown, Sparkles } from "lucide-react";

interface Floor01AtriumProps {
  onOpenConsultation: () => void;
}

export function Floor01Atrium({ onOpenConsultation }: Floor01AtriumProps) {
  const handleScrollNext = () => {
    playFloorClick();
    const nextElem = document.getElementById("floor-02");
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="floor-01"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 lg:px-24 pointer-events-none"
    >
      {/* Top Metadata Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <span className="font-mono text-xs text-dbh-cyan uppercase tracking-widest block mb-2">
          LEVEL 01 // ATRIUM &amp; OVERVIEW
        </span>
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
          ARCHITECTURAL INFRASTRUCTURE &bull; WEST AFRICA
        </span>
      </motion.div>

      {/* Main Center Editorial Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl pointer-events-auto my-auto py-12"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
          Crafting the Future of Enterprise Workspaces.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mb-10">
          DBH Solutions designs and deploys mission-critical financial dealing rooms, architectural acoustic ceilings, and certified turnkey corporate environments across West Africa.
        </p>

        {/* Minimalist Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              playFloorClick();
              onOpenConsultation();
            }}
            className="px-7 py-3.5 rounded-full bg-dbh-cyan text-white font-semibold text-xs tracking-wider uppercase hover:bg-sky-400 transition-all shadow-[0_0_25px_rgba(0,164,239,0.4)]"
          >
            Schedule Assessment
          </button>

          <button
            onClick={handleScrollNext}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all"
          >
            <span>Explore Solutions</span>
            <ArrowDown className="w-3.5 h-3.5 text-dbh-cyan" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-slate-400 pointer-events-auto"
      >
        <div className="flex items-center gap-6">
          <span><strong className="text-white">15+</strong> YEARS EXCELLENCE</span>
          <span><strong className="text-dbh-cyan">250+</strong> DEPLOYMENTS</span>
          <span><strong className="text-emerald-400">99.8%</strong> SLA FIDELITY</span>
        </div>

        <button
          onClick={handleScrollNext}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL FOR LEVEL 02</span>
          <ArrowDown className="w-3.5 h-3.5 text-dbh-cyan group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
