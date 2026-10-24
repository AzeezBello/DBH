import React, { useState } from "react";
import { SeamlessWorldCanvas } from "@/components/3d/SeamlessWorldCanvas";
import { SpatialHUD } from "@/components/layout/SpatialHUD";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Partners } from "@/components/sections/Partners";
import { Footer } from "@/components/layout/Footer";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 font-sans selection:bg-dbh-cyan/30 selection:text-dbh-cyan overflow-x-hidden">
      {/* 1. SEAMLESS PERSISTENT 3D WORLD CANVAS (Spans entire page from Hero to Footer) */}
      <SeamlessWorldCanvas />

      {/* 2. REAL-TIME 3D SPATIAL TELEMETRY HUD */}
      <SpatialHUD />

      {/* 3. Subtle Film Grain Texture */}
      <div className="noise-overlay" />

      {/* 4. Floating Frosted Glass Navigation Header */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 5. Translucent Content Sections Floating Seamlessly in 3D Space */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onExploreSection={handleScrollToSection}
        />

        {/* Core Pillars: Products, Solutions, Services (3D Spotlight & Tilt Cards) */}
        <Pillars
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onSelectFocus={(type) => handleScrollToSection(`#${type}`)}
        />

        {/* Real Projects & Case Studies (High-Resolution Architectural Photography) */}
        <ProjectsShowcase
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Global Strategic Partners */}
        <Partners />
      </main>

      {/* 6. Translucent Footer with Interactive Map */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* 7. Consultation Booking Dialog */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
