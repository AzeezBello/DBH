import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Showroom3D } from "@/components/sections/Showroom3D";
import { Pillars } from "@/components/sections/Pillars";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Partners } from "@/components/sections/Partners";
import { Footer } from "@/components/layout/Footer";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeFocus, setActiveFocus] = useState<"all" | "products" | "solutions" | "services">("all");

  const handleSelectHotspot = (type: "products" | "solutions" | "services") => {
    setActiveFocus(type);
    const showroomElem = document.getElementById("showroom");
    if (showroomElem) {
      showroomElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreShowroom = () => {
    const showroomElem = document.getElementById("showroom");
    if (showroomElem) {
      showroomElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020713] text-slate-100 flex flex-col font-sans selection:bg-dbh-cyan/30 selection:text-dbh-cyan">
      {/* Subtle Noise Texture for high-taste depth */}
      <div className="noise-overlay" />

      {/* Floating Navigation Header */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live 3D Scene */}
        <Hero
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onExploreShowroom={handleExploreShowroom}
          onSelectHotspot={handleSelectHotspot}
        />

        {/* Dedicated 3D Spatial Showroom & Configurator */}
        <Showroom3D
          activeFocus={activeFocus}
          onSelectFocus={setActiveFocus}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Core Pillars: Products, Solutions, Services */}
        <Pillars
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onSelectFocus={handleSelectHotspot}
        />

        {/* Real Projects & Case Studies (High-Res Architectural Photography) */}
        <ProjectsShowcase
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Global Strategic Partners */}
        <Partners />
      </main>

      {/* Interactive Map & Contact Footer */}
      <Footer />

      {/* Consultation Modal Dialog */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
