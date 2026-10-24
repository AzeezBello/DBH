import React from "react";
import { motion } from "framer-motion";
import { playFloorClick } from "@/lib/audio";
import { Mail, Phone, MapPin } from "lucide-react";

interface Floor06ContactProps {
  onOpenConsultation: () => void;
}

export function Floor06Contact({ onOpenConsultation }: Floor06ContactProps) {
  const partners = [
    { name: "Microsoft", role: "Tech Partner", logo: "/img/partners/microsoft.svg", link: "https://www.microsoft.com" },
    { name: "Apple", role: "Hardware Partner", logo: "/img/partners/apple.svg", link: "https://www.apple.com" },
    { name: "Sedus", role: "German Ergonomics", logo: "/img/partners/sedus.svg", link: "https://www.sedus.com" },
    { name: "IKEA", role: "Workplace Finishes", logo: "/img/partners/ikea.svg", link: "https://www.ikea.com" },
  ];

  const handleNavJump = (hash: string) => {
    playFloorClick();
    const elem = document.querySelector(hash);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="floor-06"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 lg:px-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest block mb-2">
            LEVEL 06 // GLOBAL HEADQUARTERS &bull; LAGOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Connect With DBH Solutions.
          </h2>
        </div>

        {/* Map & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Interactive Dark Map */}
          <div className="lg:col-span-7 h-[360px] lg:h-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950/70 backdrop-blur-xl relative">
            <iframe
              title="DBH Solutions Lagos Office"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.415020%2C6.422130%2C3.439020%2C6.440130&amp;layer=mapnik&amp;marker=6.431130%2C3.427020"
              className="w-full h-full border-0 grayscale invert contrast-125 opacity-75 hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VICTORIA ISLAND &bull; 6.4311° N, 3.4270° E</span>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-950/70 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-3">
                DIRECT CHANNELS
              </span>
              <h3 className="text-xl font-bold text-white mb-6">
                Start Your Architectural Project
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href="mailto:info@dbhsolutions.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-dbh-cyan/15 hover:border-dbh-cyan/30 border border-transparent transition-all text-slate-300 hover:text-white"
                >
                  <Mail className="w-4 h-4 text-dbh-cyan" />
                  <span>info@dbhsolutions.com</span>
                </a>

                <a
                  href="tel:+23414536681"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-dbh-cyan/15 hover:border-dbh-cyan/30 border border-transparent transition-all text-slate-300 hover:text-white"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+234 (1) 453 6681</span>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">25B Sanusi Fafunwa</p>
                    <p className="text-[11px] text-slate-400">Victoria Island, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playFloorClick();
                onOpenConsultation();
              }}
              className="w-full mt-8 py-3.5 rounded-full bg-dbh-cyan text-white font-semibold text-xs tracking-wider uppercase hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(0,164,239,0.4)]"
            >
              Book Formal Assessment
            </button>
          </div>
        </div>

        {/* Global Partners Minimalist Row */}
        <div className="pt-8 border-t border-white/10 mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              CERTIFIED ECOSYSTEM PARTNERS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-dbh-cyan/40 backdrop-blur-md transition-all group"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-7 max-w-[110px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Editorial Directory */}
        <div className="pt-10 pb-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-3">
              DBH Solutions
            </span>
            <p className="text-slate-400 leading-relaxed font-sans text-xs">
              Specialized workspace engineering, mission-critical financial dealing rooms, and turnkey architectural fitouts across West Africa.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-3">
              Products
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNavJump("#floor-02")} className="hover:text-dbh-cyan transition-colors">
                  Acoustic Baffle Ceilings
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-02")} className="hover:text-dbh-cyan transition-colors">
                  Sound Absorption Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-04")} className="hover:text-dbh-cyan transition-colors">
                  Sedus Ergonomic Seating
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-04")} className="hover:text-dbh-cyan transition-colors">
                  Demountable Glass Walls
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-3">
              Solutions &amp; Services
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNavJump("#floor-03")} className="hover:text-emerald-400 transition-colors">
                  Financial Dealing Rooms
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-03")} className="hover:text-emerald-400 transition-colors">
                  High-Frequency Trading Desks
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-04")} className="hover:text-amber-400 transition-colors">
                  Turnkey Workspace Fitouts
                </button>
              </li>
              <li>
                <button onClick={() => handleNavJump("#floor-04")} className="hover:text-amber-400 transition-colors">
                  Acoustic &amp; MEP Consultancy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-3">
              Headquarters
            </span>
            <address className="not-italic text-slate-400 space-y-1">
              <p className="text-white">25B Sanusi Fafunwa</p>
              <p>Victoria Island, Lagos</p>
              <p className="text-dbh-cyan">info@dbhsolutions.com</p>
              <p className="text-emerald-400">+234 (1) 453 6681</p>
            </address>
          </div>
        </div>
      </div>

      {/* Footer Legal Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 pointer-events-auto">
        <span>&copy; {new Date().getFullYear()} DBH SOLUTIONS LIMITED. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <a href="#" className="hover:text-slate-300">PRIVACY</a>
          <a href="#" className="hover:text-slate-300">TERMS</a>
          <button onClick={() => handleNavJump("#floor-01")} className="text-dbh-cyan hover:underline">
            BACK TO TOP &uarr;
          </button>
        </div>
      </div>
    </section>
  );
}
