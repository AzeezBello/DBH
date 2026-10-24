import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playFloorClick, playSwoosh } from "@/lib/audio";
import { MapPin, ArrowUpRight, X, CheckCircle2, Layers, Calendar, ShieldCheck, ArrowRight } from "lucide-react";

export interface PortfolioProject {
  id: string;
  title: string;
  category: "banking" | "acoustics" | "corporate";
  domainKey: string;
  categoryLabel: string;
  location: string;
  year: string;
  area: string;
  image: string;
  secondaryImage: string;
  highlight: string;
  challenge: string;
  solution: string;
  specs: { label: string; value: string }[];
  partnersUsed: string[];
}

interface Floor05PortfolioProps {
  onOpenConsultation: (defaultDomain?: string, defaultNote?: string) => void;
}

const PROJECTS: PortfolioProject[] = [
  {
    id: "vi-dealing-floor",
    title: "Commercial Banking Dealing Floor",
    category: "banking",
    domainKey: "dealing-room",
    categoryLabel: "Financial Dealing Room",
    location: "Victoria Island, Lagos",
    year: "2024",
    area: "1,850 m²",
    image: "/img/real_trading_floor.jpg",
    secondaryImage: "/img/screen_chart.jpg",
    highlight: "48 Dealing Consoles • Redundant Dual-Feed UPS",
    challenge:
      "Tier-1 Nigerian commercial bank required a zero-downtime treasury trading floor capable of housing 48 high-frequency dealers with 6 ultra-wide monitors per desk, isolated A+B power feeds, and sub-45dB ambient acoustic noise.",
    solution:
      "DBH engineered a custom parabolic console array over a 600mm anti-static raised access floor, integrating active silent convection cooling, dual-path Cat6A shielded fiber, and overhead micro-perforated acoustic baffles.",
    specs: [
      { label: "Console Capacity", value: "48 Positions (6x Display)" },
      { label: "Power Architecture", value: "Dual A+B Online UPS" },
      { label: "Acoustic Rating", value: "NRC 0.88 / STI 0.71" },
      { label: "Thermal Extraction", value: "Active Brushless Convection" },
      { label: "Data Infrastructure", value: "Shielded Cat6A + OM4 Fiber" },
      { label: "Execution Timeline", value: "14 Weeks Turnkey" },
    ],
    partnersUsed: ["Microsoft Unified AV", "Sedus 24/7 Task Seating"],
  },
  {
    id: "ikoyi-acoustic-hq",
    title: "Multinational Corporate HQ",
    category: "acoustics",
    domainKey: "acoustics",
    categoryLabel: "Acoustic Ceilings",
    location: "Ikoyi, Lagos",
    year: "2023",
    area: "2,400 m²",
    image: "/img/real_ceiling.jpg",
    secondaryImage: "/img/real_acoustics_detail.jpg",
    highlight: "2,400 m² Baffle Ceilings • NRC 0.88",
    challenge:
      "An open-plan energy headquarters with floor-to-ceiling glass facades suffered from severe 1.45-second slap-back echo, compromising executive speech privacy and video conferencing clarity.",
    solution:
      "Designed and installed 2,400 m² of custom white oak linear acoustic baffles with high-density PET absorption cores and integrated 4000K UGR<16 linear LED luminaires, cutting reverberation by 78%.",
    specs: [
      { label: "Coverage Area", value: "2,400 m² Across 4 Floors" },
      { label: "Reverberation Drop", value: "1.45s → 0.32s (RT60)" },
      { label: "Absorption Coeff.", value: "NRC 0.88 Certified" },
      { label: "Fire Classification", value: "Class A / EN 13501-1 B-s1" },
      { label: "Integrated Lighting", value: "4000K CRI 92+ Linear LED" },
      { label: "Execution Timeline", value: "9 Weeks Phased" },
    ],
    partnersUsed: ["Custom Oak Baffles", "Microsoft Teams Rooms"],
  },
  {
    id: "abuja-boardroom-suite",
    title: "Executive Boardroom Suite",
    category: "corporate",
    domainKey: "turnkey",
    categoryLabel: "Executive Architecture",
    location: "Abuja FCT, Nigeria",
    year: "2024",
    area: "680 m²",
    image: "/img/real_boardroom.jpg",
    secondaryImage: "/img/real_executive_office.jpg",
    highlight: "Smart Glass Partitions • German Walnut Table",
    challenge:
      "Required an ultra-secure C-suite boardroom and ministerial briefing suite with instant visual privacy switching, Rw 48dB speech-proof glazing, and concealed spatial microphone arrays.",
    solution:
      "Delivered a turnkey executive suite featuring double-glazed electrochromic PDLC privacy walls, a 22-seat solid walnut conference table with flush connectivity, and German Sedus executive seating.",
    specs: [
      { label: "Partition System", value: "Rw 48dB Smart PDLC Glass" },
      { label: "Switch Latency", value: "< 80ms Clear to Opaque" },
      { label: "Boardroom Capacity", value: "22 Executive Positions" },
      { label: "AV Integration", value: "Ceiling Beamforming Array" },
      { label: "Executive Seating", value: "Sedus German Leather" },
      { label: "Execution Timeline", value: "11 Weeks Turnkey" },
    ],
    partnersUsed: ["Apple Ecosystem", "Sedus Germany", "Microsoft Surface Hub"],
  },
  {
    id: "eko-atlantic-ergonomics",
    title: "Enterprise Ergonomics Fitout",
    category: "corporate",
    domainKey: "ergonomics",
    categoryLabel: "Ergonomic Systems",
    location: "Eko Atlantic, Lagos",
    year: "2023",
    area: "3,200 m²",
    image: "/img/real_ergonomics.jpg",
    secondaryImage: "/img/real_executive_office.jpg",
    highlight: "320 Sedus Mesh Chairs • Sit-Stand Desks",
    challenge:
      "Fast-growing fintech campus needed 320 ergonomic workstations engineered to prevent musculoskeletal fatigue during 12-hour engineering shifts while maintaining a clean, cable-free aesthetic.",
    solution:
      "Supplied and commissioned 320 German Sedus kinematic mesh task chairs paired with motorized dual-motor sit-stand desks, acoustic desk screens, and integrated under-desk power management.",
    specs: [
      { label: "Workstation Count", value: "320 Complete Positions" },
      { label: "Seating Standard", value: "DIN EN 1335 Type A" },
      { label: "Height Adjustment", value: "650mm – 1,250mm Electric" },
      { label: "Acoustic Zoning", value: "PET Felt Privacy Screens" },
      { label: "Structural Warranty", value: "10-Year Manufacturer SLA" },
      { label: "Execution Timeline", value: "8 Weeks Delivery" },
    ],
    partnersUsed: ["Sedus Germany", "IKEA Commercial Finishes"],
  },
];

export function Floor05Portfolio({ onOpenConsultation }: Floor05PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "banking" | "acoustics" | "corporate">("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<0 | 1>(0);

  const filtered =
    activeFilter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleOpenProject = (proj: PortfolioProject) => {
    playSwoosh();
    setActivePhotoIdx(0);
    setSelectedProject(proj);
  };

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
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-dbh-cyan ${
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
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => handleOpenProject(proj)}
              className="p-5 rounded-2xl bg-slate-950/65 border border-white/10 hover:border-dbh-cyan/50 backdrop-blur-xl transition-all group cursor-pointer hover:-translate-y-1 shadow-xl"
            >
              <div className="relative h-56 rounded-xl overflow-hidden mb-4 border border-white/10">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/90 text-[10px] font-mono font-semibold text-dbh-cyan border border-dbh-cyan/30 backdrop-blur-md">
                    {proj.categoryLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/75 text-[10px] font-mono text-slate-300 border border-white/10 backdrop-blur-md">
                    {proj.area}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proj.location}</span>
                  </span>
                  <span className="font-mono text-[10px] text-dbh-cyan uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Dossier &rarr;
                  </span>
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
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProject(proj);
                  }}
                  className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-dbh-cyan group-hover:text-slate-950 border border-white/10 flex items-center justify-center text-slate-400 transition-all group-hover:scale-110 shrink-0 ml-3"
                  title="Inspect Case Study Dossier"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EXPANDABLE ARCHITECTURAL CASE STUDY DOSSIER DRAWER */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[9990] flex justify-end pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playFloorClick();
                setSelectedProject(null);
              }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Slide-Over Dossier Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 w-full max-w-2xl bg-slate-950/95 border-l border-white/15 backdrop-blur-2xl h-full overflow-y-auto p-6 sm:p-10 text-slate-100 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-dbh-cyan uppercase tracking-widest block">
                      ARCHITECTURAL DOSSIER // {selectedProject.year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      playFloorClick();
                      setSelectedProject(null);
                    }}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Close dossier"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive Dual-Photo Viewer */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15 mb-3">
                  <img
                    src={activePhotoIdx === 0 ? selectedProject.image : selectedProject.secondaryImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-white">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 border border-white/15">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {selectedProject.location}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 border border-white/15">
                        <Layers className="w-3.5 h-3.5 text-dbh-cyan" />
                        {selectedProject.area}
                      </span>
                    </div>

                    {/* Photo Angle Switcher */}
                    <div className="flex items-center gap-1.5 bg-slate-950/85 p-1 rounded-full border border-white/15">
                      <button
                        type="button"
                        onClick={() => {
                          playFloorClick();
                          setActivePhotoIdx(0);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase transition-colors ${
                          activePhotoIdx === 0 ? "bg-dbh-cyan text-white font-bold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Primary View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playFloorClick();
                          setActivePhotoIdx(1);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase transition-colors ${
                          activePhotoIdx === 1 ? "bg-dbh-cyan text-white font-bold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Detail View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1.5 font-semibold">
                      01 // CLIENT CHALLENGE
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1.5 font-semibold">
                      02 // DBH ENGINEERING SOLUTION
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* 6-Point Technical Telemetry Matrix */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">
                    DEPLOYED TECHNICAL TELEMETRY
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProject.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/70 border border-white/10"
                      >
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono font-semibold text-white mt-1 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ecosystem Partners Used */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2.5">
                    CERTIFIED HARDWARE &amp; MATERIALS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.partnersUsed.map((partner) => (
                      <span
                        key={partner}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dbh-cyan/10 border border-dbh-cyan/30 text-xs font-mono text-dbh-cyan"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  <span className="text-white font-semibold block">Planning a similar deployment?</span>
                  <span>Pre-fill our estimator with this specification</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const domain = selectedProject.domainKey;
                    const note = `Reference Case Study: ${selectedProject.title} (${selectedProject.area} - ${selectedProject.highlight})`;
                    setSelectedProject(null);
                    playFloorClick();
                    onOpenConsultation(domain, note);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-dbh-cyan text-white font-semibold text-xs uppercase tracking-wider hover:bg-sky-400 transition-all shadow-[0_0_25px_rgba(0,164,239,0.4)] flex items-center justify-center gap-2"
                >
                  <span>Request Similar Specification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
