import React from "react";
import { motion } from "framer-motion";
import { playFloorClick } from "@/lib/audio";
import { Volume2, ArrowRight, Check } from "lucide-react";

interface Floor02AcousticsProps {
  onOpenConsultation: () => void;
}

export function Floor02Acoustics({ onOpenConsultation }: Floor02AcousticsProps) {
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
              { label: "Speech Clarity", val: "STI &gt; 0.65" },
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
              onOpenConsultation();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-sky-400 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span>Inquire Acoustic Ceilings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Right Column: Real Installation Photographic Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/60 backdrop-blur-xl p-4 shadow-2xl"
        >
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
            <img
              src="/img/real_ceiling.jpg"
              alt="Real Acoustic Baffle Ceiling Installation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-semibold">Completed Installation &bull; Lagos HQ</span>
              <span className="text-sky-300">2,400 m²</span>
            </div>
          </div>
          <div className="p-4 pt-4 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>REAL PHOTO // ACOUSTIC CEILINGS</span>
            <span className="text-sky-400">LOOK UP IN 3D SPACE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
