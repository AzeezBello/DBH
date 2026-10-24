import React, { useState } from "react";
import { Scene3D } from "@/components/3d/Scene3D";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Maximize2, RotateCcw, Volume2, Shield, Cpu, Compass } from "lucide-react";

interface Showroom3DProps {
  onOpenConsultation: () => void;
  activeFocus: "all" | "products" | "solutions" | "services";
  onSelectFocus: (type: "all" | "products" | "solutions" | "services") => void;
}

export function Showroom3D({ onOpenConsultation, activeFocus, onSelectFocus }: Showroom3DProps) {
  const tabs = [
    { id: "all", label: "Full Overview", badge: "Overview" },
    { id: "products", label: "Acoustics & Ceilings", badge: "dB Reduction" },
    { id: "solutions", label: "Financial Dealing Rooms", badge: "Trading" },
    { id: "services", label: "Executive Interiors", badge: "Turnkey" },
  ];

  const specDetails = {
    all: {
      title: "Integrated Workplace Ecosystem",
      desc: "An enterprise environment engineered by DBH Solutions combining acoustic attenuation, trading floor telemetry, and human-centric ergonomics.",
      specs: [
        { label: "Noise Reduction Coefficient", value: "NRC 0.85+" },
        { label: "Cable Distribution", value: "Raised Access 600mm" },
        { label: "Trading Desk Form Factor", value: "Curved Dual Tier" },
        { label: "Compliance & Safety", value: "BS EN / ISO 9001" },
      ],
      icon: Compass,
      color: "text-dbh-cyan",
    },
    products: {
      title: "Architectural Acoustic Ceilings",
      desc: "Suspended micro-perforated wood and aluminum baffles engineered to absorb reverberation and reduce ambient office distraction.",
      specs: [
        { label: "Acoustic Rating", value: "Class A Absorption" },
        { label: "Lighting Integration", value: "Recessed 4000K LED" },
        { label: "Material Finish", value: "Natural Oak / Slate Anodized" },
        { label: "Fire Resistance", value: "Euroclass B-s1, d0" },
      ],
      icon: Volume2,
      color: "text-dbh-cyan",
    },
    solutions: {
      title: "Financial Dealing Room Consoles",
      desc: "Purpose-built trading floor consoles deployed in leading banks and brokerages across Nigeria and West Africa.",
      specs: [
        { label: "Display Support", value: "Up to 6x 4K Ultra-wide" },
        { label: "Thermal Management", value: "Forced Convection Cooling" },
        { label: "Power & Data", value: "Redundant Dual-Feed UPS" },
        { label: "Ergonomics", value: "Motorized Sit-to-Stand" },
      ],
      icon: Cpu,
      color: "text-emerald-400",
    },
    services: {
      title: "Turnkey Consultancy & MEP Delivery",
      desc: "Comprehensive project execution from spatial acoustic modeling and structural finishes to certified handover.",
      specs: [
        { label: "Delivery Model", value: "EPC Turnkey Execution" },
        { label: "MEP Integration", value: "HVAC & Structured Cabling" },
        { label: "Furniture Partners", value: "Sedus, Apple, Herman Miller" },
        { label: "Warranty", value: "10-Year Structural Guarantee" },
      ],
      icon: Shield,
      color: "text-amber-400",
    },
  };

  const currentSpec = specDetails[activeFocus];
  const IconComponent = currentSpec.icon;

  return (
    <section id="showroom" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <Badge variant="cyan" dot className="mb-4">
            Interactive 3D Spatial Showroom
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Explore DBH Architectures in Real-Time 3D
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Drag to rotate, pan across the architectural spatial model, and click interactive hotspots to inspect acoustic, trading, and ergonomic specifications.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="mt-8 overflow-x-auto max-w-full pb-2">
            <Tabs
              tabs={tabs}
              activeTab={activeFocus}
              onChange={(id) => onSelectFocus(id as any)}
            />
          </div>
        </div>

        {/* 3D Canvas + Live Spec HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main 3D Canvas Stage */}
          <div className="lg:col-span-8 relative h-[520px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
            <Scene3D
              activeFocus={activeFocus}
              onSelectHotspot={(type) => onSelectFocus(type)}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              enableZoom={true}
            />
          </div>

          {/* Live Spec Inspector Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col justify-between h-full min-h-[520px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <IconComponent className={`w-5 h-5 ${currentSpec.color}`} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Specification Telemetry
                  </span>
                  <h3 className="text-xl font-bold text-white">{currentSpec.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {currentSpec.desc}
              </p>

              {/* Technical Spec List */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {currentSpec.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm"
                  >
                    <span className="text-slate-400 text-xs font-medium">{item.label}</span>
                    <span className="font-mono text-xs font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <Button
                variant="glow"
                size="default"
                onClick={onOpenConsultation}
                className="w-full gap-2 text-xs uppercase tracking-wider font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Architectural Specs</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
