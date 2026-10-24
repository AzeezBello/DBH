import React, { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { playFloorClick } from "@/lib/audio";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Download, Layers, Clock, ShieldCheck } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
  initialNote?: string;
}

type ScaleTier = "compact" | "enterprise" | "campus";

const TIER_CONFIG: Record<
  ScaleTier,
  {
    label: string;
    area: string;
    capacity: string;
    timeline: string;
    sla: string;
  }
> = {
  compact: {
    label: "Compact Suite",
    area: "250 – 500 m²",
    capacity: "8 – 16 Positions",
    timeline: "6 – 8 Weeks",
    sla: "ISO 9001 Turnkey",
  },
  enterprise: {
    label: "Enterprise Floor",
    area: "500 – 1,500 m²",
    capacity: "16 – 48 Positions",
    timeline: "10 – 12 Weeks",
    sla: "99.99% Redundant SLA",
  },
  campus: {
    label: "Campus HQ",
    area: "1,500 – 5,000+ m²",
    capacity: "48 – 150+ Positions",
    timeline: "14 – 18 Weeks",
    sla: "Dedicated EPC Team",
  },
};

const DOMAIN_PACKAGES: Record<string, { title: string; deliverables: string[] }> = {
  "dealing-room": {
    title: "Financial Dealing Room Infrastructure",
    deliverables: [
      "Extruded Aluminum Parabolic Multi-Screen Consoles",
      "Dual-Feed A+B UPS Power & Shielded Cat6A/Fiber",
      "Active Brushless Thermal Extraction & Turret Integration",
    ],
  },
  acoustics: {
    title: "Architectural Acoustic Baffle System",
    deliverables: [
      "Micro-Perforated White Oak Baffles (NRC 0.88+)",
      "Integrated 4000K CRI 92+ Linear LED Luminaires",
      "RT60 Reverberation Modelling & STI Speech Privacy Audit",
    ],
  },
  turnkey: {
    title: "Executive Boardroom & Turnkey Fitout",
    deliverables: [
      "Rw 48dB Electrochromic Smart PDLC Privacy Glazing",
      "Bespoke Conference Table with Concealed AV & Beamforming Mic",
      "Complete MEP, HVAC Balancing & Architectural Finishes",
    ],
  },
  ergonomics: {
    title: "Certified German Ergonomic Workspace",
    deliverables: [
      "Sedus Kinematic Mesh Task Seating (DIN EN 1335 Type A)",
      "Dual-Motor Sit-Stand Workstations (650mm–1,250mm)",
      "Acoustic PET Desk Screens & Under-Floor Power Management",
    ],
  },
};

export function ConsultationModal({
  isOpen,
  onClose,
  initialDomain = "dealing-room",
  initialNote = "",
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [scaleTier, setScaleTier] = useState<ScaleTier>("enterprise");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: initialDomain,
    notes: initialNote,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialDomain || "dealing-room",
        notes: initialNote || prev.notes,
      }));
    }
  }, [isOpen, initialDomain, initialNote]);

  const activeTier = TIER_CONFIG[scaleTier];
  const activeDomain = DOMAIN_PACKAGES[formData.projectType] || DOMAIN_PACKAGES["dealing-room"];

  const handleDownloadSpecSheet = () => {
    playFloorClick();
    const content = [
      "====================================================================",
      "DBH SOLUTIONS LIMITED — ARCHITECTURAL SPECIFICATION BRIEF",
      "25B Sanusi Fafunwa, Victoria Island, Lagos | +234 (1) 453 6681",
      "====================================================================",
      "",
      `GENERATED DATE:   ${new Date().toUTCString()}`,
      `CLIENT / ORG:     ${formData.company || "Prospective Enterprise Client"}`,
      `CONTACT:          ${formData.name || "N/A"} (${formData.email || "N/A"})`,
      "",
      "--------------------------------------------------------------------",
      "1. SELECTED INFRASTRUCTURE SCOPE",
      "--------------------------------------------------------------------",
      `Primary Domain:   ${activeDomain.title}`,
      `Scale Tier:       ${activeTier.label} (${activeTier.area})`,
      `Target Capacity:  ${activeTier.capacity}`,
      `Est. Timeline:    ${activeTier.timeline}`,
      `Quality Standard: ${activeTier.sla}`,
      "",
      "--------------------------------------------------------------------",
      "2. CORE ENGINEERING DELIVERABLES",
      "--------------------------------------------------------------------",
      ...activeDomain.deliverables.map((d, i) => `  [0${i + 1}] ${d}`),
      "",
      "--------------------------------------------------------------------",
      "3. PROJECT NOTES",
      "--------------------------------------------------------------------",
      formData.notes || "Standard turnkey architectural assessment requested.",
      "",
      "====================================================================",
      "For formal BOQ and CAD layout assessment: info@dbhsolutions.com",
      "====================================================================",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DBH-Spec-Brief-${formData.projectType}-${scaleTier}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playFloorClick();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00A4EF", "#6366F1", "#10B981", "#F59E0B"],
      });
    } catch (err) {
      // ignore
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleReset}
      title="Workspace Specification & Assessment"
      description="Configure your target floor scope and schedule an engineering review with DBH Solutions."
    >
      {submitted ? (
        <div className="py-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Specification Registered</h4>
          <p className="text-sm text-slate-300 max-w-sm mb-4">
            Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our senior workspace strategist will contact you within 24 business hours regarding your{" "}
            <span className="text-dbh-cyan font-mono">{activeTier.area}</span> project.
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="button"
              onClick={handleDownloadSpecSheet}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-dbh-cyan" />
              <span>Download Spec Brief</span>
            </button>
            <Button variant="default" onClick={handleReset} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Interactive Scope & Capacity Estimator */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-dbh-cyan font-semibold">
                STEP 1 // CONFIGURE WORKSPACE SCALE
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                EST. {activeTier.timeline}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {(["compact", "enterprise", "campus"] as ScaleTier[]).map((tierKey) => {
                const t = TIER_CONFIG[tierKey];
                const isSelected = scaleTier === tierKey;
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => {
                      playFloorClick();
                      setScaleTier(tierKey);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-dbh-cyan/15 border-dbh-cyan text-white shadow-[0_0_15px_rgba(0,164,239,0.25)]"
                        : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block">{t.label}</span>
                    <span className="text-[10px] font-mono text-dbh-cyan block mt-0.5">{t.area}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Engineering Preview */}
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-dbh-cyan" />
                  <span>{activeTier.capacity}</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{activeTier.sla}</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate pt-1 border-t border-white/5">
                Includes: {activeDomain.deliverables[0]}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="consult-name" className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                id="consult-name"
                name="name"
                autoComplete="name"
                required
                type="text"
                placeholder="Azeez Bello"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="consult-email" className="block text-xs font-semibold text-slate-300 mb-1">
                Corporate Email *
              </label>
              <input
                id="consult-email"
                name="email"
                autoComplete="email"
                required
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="consult-company" className="block text-xs font-semibold text-slate-300 mb-1">
                Company / Organization *
              </label>
              <input
                id="consult-company"
                name="organization"
                autoComplete="organization"
                required
                type="text"
                placeholder="Enterprise Bank Ltd"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="consult-type" className="block text-xs font-semibold text-slate-300 mb-1">
                Project Domain
              </label>
              <select
                id="consult-type"
                name="projectType"
                value={formData.projectType}
                onChange={(e) => {
                  playFloorClick();
                  setFormData({ ...formData, projectType: e.target.value });
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan transition-colors cursor-pointer"
              >
                <option value="dealing-room" className="bg-slate-900 text-white">Financial Dealing Room</option>
                <option value="acoustics" className="bg-slate-900 text-white">Acoustic Ceilings &amp; Baffles</option>
                <option value="turnkey" className="bg-slate-900 text-white">Full Turnkey Office Fitout</option>
                <option value="ergonomics" className="bg-slate-900 text-white">Ergonomic Task Seating</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="consult-notes" className="block text-xs font-semibold text-slate-300 mb-1">
              Project Notes / Scope (Optional)
            </label>
            <textarea
              id="consult-notes"
              name="notes"
              rows={2}
              placeholder="Site location, target consoles/headcount, or timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan resize-none transition-colors"
            />
          </div>

          <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleDownloadSpecSheet}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors shrink-0"
              title="Download instant specification summary (.TXT)"
            >
              <Download className="w-3.5 h-3.5 text-dbh-cyan" />
              <span>Save Spec Sheet</span>
            </button>

            <Button variant="glow" type="submit" className="flex-1 gap-2 text-xs uppercase tracking-wider">
              <span>Submit Consultation Request</span>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
