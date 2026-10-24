import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function Partners() {
  const partners = [
    {
      name: "Microsoft",
      role: "Enterprise Technology Partner",
      logo: "/img/partners/microsoft.svg",
      link: "https://www.microsoft.com",
    },
    {
      name: "Apple",
      role: "Hardware & Ecosystem Partner",
      logo: "/img/partners/apple.svg",
      link: "https://www.apple.com",
    },
    {
      name: "Sedus",
      role: "German Ergonomics & Seating",
      logo: "/img/partners/sedus.svg",
      link: "https://www.sedus.com",
    },
    {
      name: "IKEA",
      role: "Workplace Furniture & Finishes",
      logo: "/img/partners/ikea.svg",
      link: "https://www.ikea.com",
    },
  ];

  return (
    <section id="partners" className="py-20 relative overflow-hidden bg-slate-950/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" dot className="mb-3">
            Global Ecosystem
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Our Strategic Global Partners
          </h2>
          <p className="text-slate-400 text-sm">
            We partner with the world's premier hardware, furniture, and technology leaders to construct certified workspaces across West Africa.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-dbh-cyan/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-dbh-cyan/10"
            >
              <div className="h-12 flex items-center justify-center mb-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-[140px] object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-dbh-cyan transition-colors text-center">
                {partner.role}
              </span>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-dbh-cyan">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
