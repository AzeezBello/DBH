import React, { useState } from "react";
import { PhotographicRoomWalkthrough } from "@/components/spatial/PhotographicRoomWalkthrough";
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
  const [selectedDomain, setSelectedDomain] = useState("dealing-room");
  const [selectedNote, setSelectedNote] = useState("");

  const handleOpenConsultation = (defaultDomain?: string, defaultNote?: string) => {
    if (defaultDomain) {
      setSelectedDomain(defaultDomain);
    }
    if (defaultNote !== undefined) {
      setSelectedNote(defaultNote);
    }
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-dbh-cyan/30 selection:text-dbh-cyan overflow-x-hidden">
      {/* 1. PHOTOGRAPHIC ROOM WALKTHROUGH (Real Images with Cinematic Pan, Zoom & Deep Hotspot Focus) */}
      <PhotographicRoomWalkthrough />

      {/* 2. VERTICAL ELEVATOR LADDER (with Step Controls & Keyboard Support) */}
      <ElevatorLadder />

      {/* 3. SUBTLE FILM GRAIN */}
      <div className="noise-overlay" />

      {/* 4. PRISTINE TOP BAR */}
      <Navbar onOpenConsultation={() => handleOpenConsultation("dealing-room", "")} />

      {/* 5. 6 IMMERSIVE ARCHITECTURAL FLOORS */}
      <main className="relative z-10">
        <Floor01Atrium onOpenConsultation={() => handleOpenConsultation("dealing-room", "")} />
        <Floor02Acoustics onOpenConsultation={(domain) => handleOpenConsultation(domain, "")} />
        <Floor03DealingRooms onOpenConsultation={(domain) => handleOpenConsultation(domain, "")} />
        <Floor04Boardroom onOpenConsultation={(domain) => handleOpenConsultation(domain, "")} />
        <Floor05Portfolio
          onOpenConsultation={(domain, note) => handleOpenConsultation(domain, note)}
        />
        <Floor06Contact onOpenConsultation={() => handleOpenConsultation("turnkey", "")} />
      </main>

      {/* 6. CONSULTATION BOOKING & INSTANT SPEC CALCULATOR MODAL */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialDomain={selectedDomain}
        initialNote={selectedNote}
      />
    </div>
  );
}
