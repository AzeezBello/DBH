import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { MicrosoftLogo, AppleLogo, SedusLogo, IkeaLogo } from "@/components/ui/PartnerLogos";

export function Partners() {
  const partners = [
    {
      name: "Microsoft",
      role: "Enterprise Technology Partner",
      logo: <MicrosoftLogo className="h-8 w-auto" />,
      link: "https://www.microsoft.com",
    },
    {
      name: "Apple",
      role: "Hardware & Ecosystem Partner",
      logo: <AppleLogo className="h-8 w-auto" />,
      link: "https://www.apple.com",
    },
    {
      name: "Sedus",
      role: "German Ergonomics & Seating",
      logo: <SedusLogo className="h-8 w-auto" />,
      link: "https://www.sedus.com",
    },
    {
      name: "IKEA",
      role: "Workplace Furniture & Finishes",
      logo: <IkeaLogo className="h-8 w-auto" />,
      link: "https://www.ikea.com",
    },
  ];

  return (
    <section id="partners" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" dot className="mb-3 backdrop-blur-md bg-slate-950/70">
            Global Ecosystem
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            Our Strategic Global Partners
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            We partner with the world's premier hardware, furniture, and technology leaders to construct certified workspaces across West Africa.
          </p>
        </div>

        {/* Partners Grid with Translucent Glassmorphic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/15 hover:border-dbh-cyan/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-dbh-cyan/20 shadow-lg"
            >
              <div className="h-12 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                {partner.logo}
              </div>
              <span className="text-[11px] font-mono text-slate-300 group-hover:text-dbh-cyan transition-colors text-center">
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
