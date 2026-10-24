import React, { useState, useEffect } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Sparkles, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "3D Space", href: "#showroom" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Services", href: "#services" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dbh-navy to-dbh-cyan flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,164,239,0.5)] border border-white/20 group-hover:scale-105 transition-transform">
            DBH
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white group-hover:text-dbh-cyan transition-colors">
              DBH SOLUTIONS
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Workspace &amp; Tech
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-dbh-cyan transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dbh-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <Magnetic strength={0.3}>
            <Button
              variant="glow"
              size="default"
              onClick={onOpenConsultation}
              className="gap-2 text-xs uppercase tracking-wider font-semibold"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Book Consultation</span>
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-4 pb-6 bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-dbh-cyan py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="glow"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-2 gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Consultation</span>
          </Button>
        </div>
      )}
    </header>
  );
}
