import React from "react";
import { motion } from "framer-motion";
import { Scene3D } from "@/components/3d/Scene3D";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/animations/Magnetic";
import { Sparkles, ArrowRight, Layers, ShieldCheck, Award } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreShowroom: () => void;
  onSelectHotspot: (type: "products" | "solutions" | "services") => void;
}

export function Hero({ onOpenConsultation, onExploreShowroom, onSelectHotspot }: HeroProps) {
  return (
    <section id="about" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-dbh-cyan/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Hero Typography & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <Badge variant="cyan" dot className="mb-6">
            Enterprise Workspace &amp; Infrastructure
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Transforming Workspaces Across{" "}
            <span className="bg-gradient-to-r from-dbh-cyan via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              West Africa.
            </span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
            DBH Solutions delivers world-class interior architecture, financial dealing room technologies, acoustic engineering, and high-performance ergonomic environments.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Magnetic strength={0.3}>
              <Button
                variant="glow"
                size="lg"
                onClick={onOpenConsultation}
                className="gap-2.5 text-sm uppercase tracking-wider"
              >
                <span>Book Consultation</span>
                <Sparkles className="w-4 h-4" />
              </Button>
            </Magnetic>

            <Button
              variant="outline"
              size="lg"
              onClick={onExploreShowroom}
              className="gap-2 text-sm text-slate-200"
            >
              <span>Explore 3D Space</span>
              <ArrowRight className="w-4 h-4 text-dbh-cyan" />
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono">15+</p>
              <p className="text-xs text-slate-400 mt-0.5">Years Excellence</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-dbh-cyan font-mono">250+</p>
              <p className="text-xs text-slate-400 mt-0.5">Corporate Projects</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-emerald-400 font-mono">99.8%</p>
              <p className="text-xs text-slate-400 mt-0.5">Client Trust</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D WebGL Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative w-full h-[500px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl"
        >
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-radial-vignette opacity-30" />

          {/* 3D Scene */}
          <Scene3D
            activeFocus="all"
            onSelectHotspot={onSelectHotspot}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            enableZoom={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
