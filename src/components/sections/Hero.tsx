import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/animations/Magnetic";
import { Sparkles, ArrowRight, Eye, Volume2, MonitorCheck, Compass } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreSection: (id: string) => void;
}

export function Hero({ onOpenConsultation, onExploreSection }: HeroProps) {
  return (
    <section id="about" className="relative min-h-[95vh] pt-32 pb-24 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Hero Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <Badge variant="cyan" dot className="mb-6 backdrop-blur-xl bg-slate-950/70 shadow-lg">
            Immersive 3D Architecture &amp; Technology
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            Transforming Workspaces Across{" "}
            <span className="bg-gradient-to-r from-dbh-cyan via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              West Africa.
            </span>
          </h1>

          <p className="text-lg text-slate-200 leading-relaxed max-w-xl mb-8 backdrop-blur-sm p-2 rounded-xl">
            DBH Solutions delivers certified interior architecture, financial dealing room technologies, acoustic engineering, and high-performance ergonomic environments.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Magnetic strength={0.3}>
              <Button
                variant="glow"
                size="lg"
                onClick={onOpenConsultation}
                className="gap-2.5 text-sm uppercase tracking-wider font-semibold"
              >
                <span>Book Architectural Assessment</span>
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </Button>
            </Magnetic>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onExploreSection("#products")}
              className="gap-2 text-sm text-slate-200 backdrop-blur-md bg-slate-900/40"
            >
              <span>Scroll 3D Universe</span>
              <ArrowRight className="w-4 h-4 text-dbh-cyan" />
            </Button>
          </div>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 w-full max-w-lg shadow-xl">
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono">15+</p>
              <p className="text-xs text-slate-400 mt-0.5">Years Delivery</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-dbh-cyan font-mono">250+</p>
              <p className="text-xs text-slate-400 mt-0.5">Enterprise Projects</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-emerald-400 font-mono">99.8%</p>
              <p className="text-xs text-slate-400 mt-0.5">Safety &amp; SLA</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating 3D Navigation Waypoint Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 p-8 rounded-3xl bg-slate-950/55 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-dbh-cyan/20 border border-dbh-cyan/30 flex items-center justify-center text-dbh-cyan">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-dbh-cyan uppercase tracking-widest">
                  Spatial Navigation
                </span>
                <h3 className="text-xl font-bold text-white">Scroll To Fly Through 3D</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              The entire platform is built within a live, continuous 3D architectural universe. As you scroll down, the camera glides into each specialized zone.
            </p>

            {/* Quick 3D Waypoints */}
            <div className="space-y-3">
              {[
                {
                  id: "#products",
                  name: "Acoustic Ceilings",
                  metric: "NRC 0.88 Rating",
                  icon: Volume2,
                  color: "text-sky-400",
                },
                {
                  id: "#solutions",
                  name: "Financial Dealing Floor",
                  metric: "Real Telemetry Terminals",
                  icon: MonitorCheck,
                  color: "text-emerald-400",
                },
                {
                  id: "#services",
                  name: "Executive Suite & Boardroom",
                  metric: "Smart Glass & Sedus",
                  icon: Eye,
                  color: "text-amber-400",
                },
              ].map((wp) => {
                const Icon = wp.icon;
                return (
                  <button
                    key={wp.name}
                    onClick={() => onExploreSection(wp.id)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-dbh-cyan/15 border border-white/10 hover:border-dbh-cyan/40 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${wp.color}`} />
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-dbh-cyan transition-colors">
                          {wp.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">{wp.metric}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-dbh-cyan group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Scroll or drag mouse to orbit</span>
            <span className="font-mono text-dbh-cyan">Real-time WebGL</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
