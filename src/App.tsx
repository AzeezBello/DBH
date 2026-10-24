import React, { useState } from "react";
import { SeamlessWorldCanvas } from "@/components/3d/SeamlessWorldCanvas";
import { ElevatorLadder } from "@/components/layout/ElevatorLadder";
import { Navbar } from "@/components/layout/Navbar";
import { Floor01Atrium } from "@/components/sections/Floor01Atrium";
import { Floor02Acoustics } from "@/components/sections/Floor02Acoustics";
import { Floor03DealingRooms } from "@/components/sections/Floor03DealingRooms";
import { Floor04Boardroom } from "@/components/sections/Floor04Boardroom";
import { Floor05Portfolio } from "@/components/sections/Floor05Portfolio";
import { Floor06Contact } from "@/components/sections/Floor06Contact";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-dbh-cyan/30 selection:text-dbh-cyan overflow-x-hidden">
      {/* 1. SEAMLESS 3D WORLD CANVAS (Fixed Fullscreen from Hero to Footer) */}
      <SeamlessWorldCanvas />

      {/* 2. VERTICAL ELEVATOR LADDER (riseof.digital signature) */}
      <ElevatorLadder />

      {/* 3. SUBTLE FILM GRAIN */}
      <div className="noise-overlay" />

      {/* 4. PRISTINE TOP BAR */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 5. 6 IMMERSIVE ARCHITECTURAL FLOORS */}
      <main className="relative z-10">
        <Floor01Atrium onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Floor02Acoustics onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Floor03DealingRooms onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Floor04Boardroom onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Floor05Portfolio onOpenConsultation={() => setIsConsultationOpen(true)} />
        <Floor06Contact onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>

      {/* 6. CONSULTATION BOOKING MODAL */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
