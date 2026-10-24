import React, { useState } from "react";
import { motion } from "framer-motion";
import { playFloorClick } from "@/lib/audio";
import { MapPin, ArrowUpRight } from "lucide-react";

interface Floor05PortfolioProps {
  onOpenConsultation: () => void;
}

export function Floor05Portfolio({ onOpenConsultation }: Floor05PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "banking" | "acoustics" | "corporate">("all");

  const projects = [
    {
      title: "Commercial Banking Dealing Floor",
      category: "banking",
      categoryLabel: "Financial Dealing Room",
      location: "Victoria Island, Lagos",
      year: "2024",
      image: "/img/real_trading_floor.jpg",
      highlight: "48 Dealing Consoles • Redundant Dual-Feed UPS",
    },
    {
      title: "Multinational Corporate HQ",
      category: "acoustics",
      categoryLabel: "Acoustic Ceilings",
      location: "Ikoyi, Lagos",
      year: "2023",
      image: "/img/real_ceiling.jpg",
      highlight: "2,400 m² Baffle Ceilings • NRC 0.88",
    },
    {
      title: "Executive Boardroom Suite",
      category: "corporate",
      categoryLabel: "Executive Architecture",
      location: "Abuja FCT, Nigeria",
      year: "2024",
      image: "/img/real_boardroom.jpg",
      highlight: "Smart Glass Partitions • German Walnut Table",
    },
    {
      title: "Enterprise Ergonomics Fitout",
      category: "corporate",
      categoryLabel: "Ergonomic Systems",
      location: "Eko Atlantic, Lagos",
      year: "2023",
      image: "/img/real_ergonomics.jpg",
      highlight: "320 Sedus Mesh Chairs • Sit-Stand Desks",
    },
  ];

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="floor-05"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 lg:px-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs text-dbh-cyan uppercase tracking-widest block mb-2">
              LEVEL 05 // CLIENT PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Certified Enterprise Deployments.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All" },
              { id: "banking", label: "Trading Floors" },
              { id: "acoustics", label: "Acoustics" },
              { id: "corporate", label: "Executive" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playFloorClick();
                  setActiveFilter(f.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all select-none ${
                  activeFilter === f.id
                    ? "bg-dbh-cyan text-white shadow-[0_0_15px_rgba(0,164,239,0.5)] font-bold"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-slate-950/65 border border-white/10 hover:border-dbh-cyan/40 backdrop-blur-xl transition-all group"
            >
              <div className="relative h-56 rounded-xl overflow-hidden mb-4 border border-white/10">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-slate-950/90 text-[10px] font-mono font-semibold text-dbh-cyan border border-dbh-cyan/30 backdrop-blur-md">
                    {proj.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{proj.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-dbh-cyan transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-1">{proj.highlight}</p>
                </div>

                <button
                  onClick={() => {
                    playFloorClick();
                    onOpenConsultation();
                  }}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-dbh-cyan/20 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all group-hover:scale-110 shrink-0 ml-3"
                  title="Request Specs"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
