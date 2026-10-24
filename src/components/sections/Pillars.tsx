import React from "react";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { TiltCard } from "@/components/animations/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Volume2, MonitorCheck, HardHat } from "lucide-react";

interface PillarsProps {
  onOpenConsultation: () => void;
  onSelectFocus: (type: "products" | "solutions" | "services") => void;
}

export function Pillars({ onOpenConsultation, onSelectFocus }: PillarsProps) {
  const pillars = [
    {
      id: "products",
      title: "Products",
      subtitle: "Acoustic Ceilings & Ergonomics",
      description:
        "High-performance architectural ceiling systems, acoustic baffles, and German-engineered ergonomic task seating tailored for contemporary corporate headquarters.",
      image: "/img/ceiling.svg",
      icon: Volume2,
      badge: "Architectural Acoustics",
      badgeVariant: "cyan" as const,
      features: [
        "Reverberation & Sound Masking Control",
        "Linear Recessed LED Lighting Systems",
        "Sedus Certified Task & Executive Chairs",
        "Modular Raised Access Flooring",
      ],
    },
    {
      id: "solutions",
      title: "Solutions",
      subtitle: "Financial Dealing Rooms",
      description:
        "Specialized trading floor environments, multi-screen consoles, mission-critical power redundancies, and low-latency financial technologies for banks and brokerages.",
      image: "/img/dealing-room.svg",
      icon: MonitorCheck,
      badge: "Trading Floor Tech",
      badgeVariant: "success" as const,
      features: [
        "Curved Multi-Display Mount Arrays",
        "Heat Dissipation & Forced Air Cooling",
        "Integrated Turret & Audio Systems",
        "24/7 Mission-Critical Durability",
      ],
    },
    {
      id: "services",
      title: "Services",
      subtitle: "Workspace Consultancy & Turnkey",
      description:
        "Comprehensive workplace strategy, architectural design, MEP engineering, and certified project delivery executed across major Nigerian business hubs.",
      image: "/img/office.svg",
      icon: HardHat,
      badge: "Turnkey Project Delivery",
      badgeVariant: "gold" as const,
      features: [
        "Space Planning & Acoustic Audits",
        "Full MEP & HVAC Engineering",
        "Interior Architecture & Glass Partitioning",
        "Certified Handover & Post-Handover SLA",
      ],
    },
  ];

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" dot className="mb-4">
            Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Engineered For Performance &amp; Prestige
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            From acoustic attenuation to dealing room command centers, our integrated pillars deliver high-yield productivity for leading enterprise brands.
          </p>
        </div>

        {/* 3 Pillars Grid with 3D Tilt & Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} id={pillar.id}>
                <TiltCard tiltIntensity={8}>
                  <SpotlightCard className="h-full flex flex-col justify-between p-7 border-white/15 bg-slate-900/70">
                    <div>
                      {/* Visual Header */}
                      <div className="relative h-56 rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-dbh-cyan/40 transition-colors">
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge variant={pillar.badgeVariant} className="backdrop-blur-md">
                            {pillar.badge}
                          </Badge>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-dbh-cyan/15 text-dbh-cyan">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{pillar.title}</h3>
                      </div>
                      <p className="text-xs font-mono text-dbh-cyan uppercase tracking-wider mb-3">
                        {pillar.subtitle}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      {/* Feature Bullet List */}
                      <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                        {pillar.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onSelectFocus(pillar.id as any)}
                        className="w-full text-xs font-semibold gap-1.5 hover:text-dbh-cyan"
                      >
                        <span>View 3D Model</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={onOpenConsultation}
                        className="text-xs px-4"
                      >
                        Inquire
                      </Button>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
