import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { MapPin, Calendar, ArrowUpRight, Sparkles, Building2 } from "lucide-react";

interface ProjectsShowcaseProps {
  onOpenConsultation: () => void;
}

export function ProjectsShowcase({ onOpenConsultation }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<"all" | "banking" | "acoustics" | "corporate">("all");

  const projects = [
    {
      title: "Commercial Bank Trading Floor",
      category: "banking",
      categoryLabel: "Financial Dealing Room",
      location: "Victoria Island, Lagos",
      year: "2024",
      image: "/img/real_trading_floor.jpg",
      highlight: "48 Dealing Consoles • Redundant Dual-Feed UPS • 4K Video Wall",
      description:
        "Engineered and deployed a mission-critical financial dealing floor with low-latency monitor arms, sound attenuation, and ergonomic console integration.",
    },
    {
      title: "Multinational Corporate HQ",
      category: "acoustics",
      categoryLabel: "Acoustic Ceilings",
      location: "Ikoyi, Lagos",
      year: "2023",
      image: "/img/real_ceiling.jpg",
      highlight: "2,400 m² Baffle Ceilings • NRC 0.88 • Recessed Linear LEDs",
      description:
        "Custom acoustic baffle ceiling infrastructure designed to neutralize ambient reverberation across a 5-floor executive open-plan layout.",
    },
    {
      title: "Executive Boardroom Suite",
      category: "corporate",
      categoryLabel: "Executive Architecture",
      location: "Abuja FCT, Nigeria",
      year: "2024",
      image: "/img/real_boardroom.jpg",
      highlight: "Smart Glass Partitions • German Walnut Table • Integrated AV",
      description:
        "High-security executive boardroom featuring electrochromic privacy glass, integrated conference acoustics, and bespoke architectural finishes.",
    },
    {
      title: "Enterprise Ergonomics Fitout",
      category: "corporate",
      categoryLabel: "Ergonomic Systems",
      location: "Eko Atlantic, Lagos",
      year: "2023",
      image: "/img/real_ergonomics.jpg",
      highlight: "320 Sedus Mesh Chairs • Motorized Sit-Stand • Cable Trays",
      description:
        "Turnkey delivery of certified German ergonomic task seating and height-adjustable workstations supporting a hybrid enterprise workforce.",
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-slate-950/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Badge variant="cyan" dot className="mb-4">
              Real Completed Installations
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Featured Case Studies &amp; Installations
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
              Explore high-resolution photography of certified financial dealing rooms, acoustic ceilings, and corporate workspaces executed by DBH Solutions across West Africa.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
            {[
              { id: "all", label: "All Projects" },
              { id: "banking", label: "Trading Floors" },
              { id: "acoustics", label: "Acoustics" },
              { id: "corporate", label: "Executive Suites" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all select-none ${
                  filter === f.id
                    ? "bg-dbh-cyan text-white shadow-[0_0_15px_rgba(0,164,239,0.4)]"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Real Photo Thumbnail */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[11px] font-semibold text-dbh-cyan border border-dbh-cyan/30">
                      {proj.categoryLabel}
                    </span>
                  </div>

                  {/* Bottom Location pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                {/* Title & Highlight */}
                <h3 className="text-xl font-bold text-white group-hover:text-dbh-cyan transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-emerald-400 mb-3 tracking-wide">
                  {proj.highlight}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Completed: {proj.year}</span>
                <button
                  onClick={onOpenConsultation}
                  className="flex items-center gap-1.5 text-xs font-semibold text-dbh-cyan hover:text-white transition-colors group-hover:translate-x-1"
                >
                  <span>Request Project Blueprint</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
