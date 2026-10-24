import React from "react";
import { motion } from "framer-motion";
import { playFloorClick } from "@/lib/audio";
import { MonitorCheck, ArrowRight } from "lucide-react";

interface Floor03DealingRoomsProps {
  onOpenConsultation: (defaultDomain?: string) => void;
}

export function Floor03DealingRooms({ onOpenConsultation }: Floor03DealingRoomsProps) {
  return (
    <section
      id="floor-03"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 lg:px-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
        {/* Left Column: Real Trading Floor Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/60 backdrop-blur-xl p-4 shadow-2xl"
        >
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
            <img
              src="/img/real_trading_floor.jpg"
              alt="Real Financial Dealing Room Deployment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-semibold">Banking Trading Floor &bull; Victoria Island</span>
              <span className="text-emerald-400">48 Consoles</span>
            </div>
          </div>
          <div className="p-4 pt-4 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>REAL PHOTO // DEALING DESKS</span>
            <span className="text-emerald-400">MISSION-CRITICAL TRADING CONSOLES</span>
          </div>
        </motion.div>

        {/* Right Column: Editorial Narrative & Telemetry */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
            LEVEL 03 // MISSION-CRITICAL SYSTEMS
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Financial Dealing Rooms.
          </h2>

          <p className="text-base text-slate-300 font-light leading-relaxed max-w-xl mb-8">
            Specialized command center consoles engineered for high-frequency trading desks, commercial banks, and treasury institutions across Nigeria with zero-downtime thermal and power redundancy.
          </p>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg">
            {[
              { label: "Display Array", val: "Up to 6x Ultra-wide" },
              { label: "Power Redundancy", val: "Dual-Feed A+B UPS" },
              { label: "Thermal Control", val: "Forced Convection" },
              { label: "Cable Mgmt", val: "Raised Floor Trays" },
              { label: "Durability", val: "24/7 Mission Critical" },
              { label: "Audio Integration", val: "Dealer Turret Ready" },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md"
              >
                <p className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</p>
                <p className="text-xs font-mono font-semibold text-emerald-300 mt-1">{spec.val}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              playFloorClick();
              onOpenConsultation("dealing-room");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Inquire Dealing Rooms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
