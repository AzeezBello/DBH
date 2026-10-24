import React from "react";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-white/10 text-slate-100 overflow-hidden">
      {/* Background Interactive Map */}
      <div className="relative w-full h-[520px] lg:h-[620px] bg-slate-900">
        <iframe
          title="DBH Solutions Office Location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=3.415020%2C6.422130%2C3.439020%2C6.440130&amp;layer=mapnik&amp;marker=6.431130%2C3.427020"
          className="w-full h-full border-0 grayscale invert contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
          allowFullScreen
        />

        {/* Floating Glassmorphic Contact Card */}
        <div className="absolute top-8 left-6 right-6 lg:left-auto lg:right-16 lg:top-14 lg:w-[440px] z-10 p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Lagos Global Headquarters
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Connect With DBH</h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Ready to transform your enterprise workspace? Contact our specialist consultants for turnkey fitouts, acoustic solutions, and trading desks.
          </p>

          <div className="space-y-4 text-sm">
            <a
              href="mailto:info@dbhsolutions.com"
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-dbh-cyan/15 hover:border-dbh-cyan/30 border border-transparent transition-all text-slate-200 hover:text-dbh-cyan"
            >
              <div className="w-9 h-9 rounded-lg bg-dbh-cyan/20 flex items-center justify-center text-dbh-cyan">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium">info@dbhsolutions.com</span>
            </a>

            <a
              href="tel:+23414536681"
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-dbh-cyan/15 hover:border-dbh-cyan/30 border border-transparent transition-all text-slate-200 hover:text-dbh-cyan"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium">+234 (1) 453 6681</span>
            </a>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 text-slate-300">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">25B Sanusi Fafunwa</p>
                <p className="text-xs text-slate-400">Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
            {[
              { name: "Twitter / X", href: "https://twitter.com", icon: "/img/social-icons/twitter.svg" },
              { name: "Facebook", href: "https://facebook.com", icon: "/img/social-icons/facebook.svg" },
              { name: "LinkedIn", href: "https://linkedin.com", icon: "/img/social-icons/linkedin.svg" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-dbh-cyan/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} className="w-5 h-5 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} DBH Solutions Limited. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Health &amp; Safety</a>
        </div>
      </div>
    </footer>
  );
}
