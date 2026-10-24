import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Sparkles } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "dealing-room",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire celebratory confetti (Emil Kowalski delight principle)
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
      title="Request Workspace Consultation"
      description="Schedule an architectural assessment with DBH Solutions senior workspace strategists."
    >
      {submitted ? (
        <div className="py-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
          <p className="text-sm text-slate-300 max-w-sm mb-6">
            Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our specialist engineering consultant will contact you within 24 business hours.
          </p>
          <Button variant="default" onClick={handleReset} className="w-full">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="Azeez Bello"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Corporate Email *
              </label>
              <input
                required
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Company / Organization *
              </label>
              <input
                required
                type="text"
                placeholder="Enterprise Bank Ltd"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Domain
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan"
              >
                <option value="dealing-room">Financial Dealing Room</option>
                <option value="acoustics">Acoustic Ceilings &amp; Baffles</option>
                <option value="turnkey">Full Turnkey Office Fitout</option>
                <option value="ergonomics">Ergonomic Task Seating</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Notes / Scope (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about the site location, square meters, or target timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dbh-cyan focus:ring-1 focus:ring-dbh-cyan resize-none"
            />
          </div>

          <div className="pt-2">
            <Button variant="glow" type="submit" className="w-full gap-2 text-sm uppercase tracking-wider">
              <span>Submit Consultation Request</span>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
