import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E2D5] shadow-[0_4px_24px_rgba(196,158,96,0.06)] py-2"
          : "bg-[#FAF8F5]/75 backdrop-blur-md border-b border-[#E8E2D5]/70 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark & Crest */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] rounded-xl p-1 -ml-1 transition-all"
          aria-label="BIAA BEAUTY - Return to top"
        >
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#C5A059] via-[#E8DFC8] to-[#9B783E] shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
              <img
                src="/assets/aistudio/logo-without-bg.png"
                alt="BIAA BEAUTY Crest"
                className="w-full h-full object-contain filter contrast-105"
                onError={(e) => {
                  // Fallback if transparent logo not found
                  (e.target as HTMLImageElement).src =
                    "/assets/aistudio/logo-high-res_e4f326c0.png";
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-wider text-[#292824] group-hover:text-[#9B783E] transition-colors whitespace-nowrap">
              BIAA BEAUTY
            </span>
            <div className="flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-[#8C7449] font-medium">
              {/* <span></span>
              <span className="text-[#C5A059]">·</span> */}
              <span>Thindal, Erode</span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Capsule Pill as in Mockup) */}
        <nav
          className="hidden md:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#332E27] bg-[#F4EFE6]/80 border border-[#E7DFD2] px-7 py-2 rounded-full backdrop-blur-sm"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => handleNavClick("services")}
            className="hover:text-[#9B783E] transition-colors whitespace-nowrap cursor-pointer"
          >
            SERVICES
          </button>
          <button
            onClick={() => handleNavClick("portfolio")}
            className="hover:text-[#9B783E] transition-colors whitespace-nowrap cursor-pointer"
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => handleNavClick("enquiry")}
            className="hover:text-[#9B783E] transition-colors whitespace-nowrap cursor-pointer"
          >
            CONSULTATION
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="hover:text-[#9B783E] transition-colors whitespace-nowrap cursor-pointer"
          >
            STUDIO
          </button>
        </nav>

        {/* Zone 3: Direct Action Booking Button & Telephony */}
        <div className="hidden md:flex items-center gap-3.5 shrink-0">
          <a
            href="tel:9976855732"
            className="group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-[#FAF7F0] border border-[#E2D8C7] hover:border-[#C5A059] shadow-2xs hover:shadow-[0_4px_16px_rgba(196,158,96,0.22)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
            title="Call BIAA BEAUTY Bridal Concierge directly"
          >
            {/* Circular Golden Jewel Icon Badge with Live Pulse */}
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#D4B36D] via-[#C5A059] to-[#9E7B36] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
              <Phone className="w-3.5 h-3.5 stroke-[2.2] group-hover:rotate-12 transition-transform duration-300" />
              {/* <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span> */}
            </div>

            {/* Micro Concierge Label & Number */}
            <div className="flex flex-col text-left leading-tight pr-1">
              {/* <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8C7449] group-hover:text-[#6E5932] transition-colors">
                Bridal Line
              </span> */}
              <span className="text-xs font-bold tracking-wide text-[#292824] tabular-nums group-hover:text-[#9B783E] transition-colors">
                99768 55732
              </span>
            </div>
          </a>

          <button
            onClick={() => handleNavClick("enquiry")}
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#BFA054] to-[#A37B30] hover:from-[#B08A3D] hover:to-[#926C25] rounded-lg shadow-sm hover:shadow-[0_0_20px_rgba(191,160,84,0.4)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap overflow-hidden group"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
            <Calendar className="w-3.5 h-3.5 text-white relative z-10" />
            <span className="relative z-10 font-semibold tracking-wider">
              BOOK CONSULTATION
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle & Call Action */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:9976855732"
            className="group flex items-center gap-1.5 px-2.5 py-1.5 text-[#292824] bg-white/90 border border-[#E2D8C7] hover:border-[#C5A059] rounded-full shadow-2xs active:scale-95 transition-all"
            aria-label="Call BIAA BEAUTY"
          >
            <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#D4B36D] via-[#C5A059] to-[#9E7B36] text-white flex items-center justify-center shadow-xs">
              <Phone className="w-2.5 h-2.5 stroke-[2.2]" />
              {/* <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
              </span> */}
            </div>
            <span className="text-[11px] font-bold tracking-wider text-[#292824]">
              Call
            </span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#292824] bg-white/80 border border-[#E8E2D5] rounded-xl cursor-pointer focus:outline-none"
            aria-label={
              mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#E8E2D5] bg-[#FAF8F5]/98 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-2.5 shadow-xl"
          >
            <div className="flex items-center gap-2 pb-2 text-[11px] font-semibold uppercase tracking-widest text-[#8C7449]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>BIAA BEAUTY Atelier Menu</span>
            </div>

            <button
              onClick={() => handleNavClick("services")}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/70 border border-[#E8E2D5] text-sm font-semibold text-[#292824] hover:bg-white flex items-center justify-between"
            >
              <span>Curated Services</span>
              <ArrowUpRight className="w-4 h-4 text-[#8C7449]" />
            </button>
            <button
              onClick={() => handleNavClick("portfolio")}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/70 border border-[#E8E2D5] text-sm font-semibold text-[#292824] hover:bg-white flex items-center justify-between"
            >
              <span>Bridal Lookbook & Proof</span>
              <ArrowUpRight className="w-4 h-4 text-[#8C7449]" />
            </button>
            <button
              onClick={() => handleNavClick("enquiry")}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/70 border border-[#E8E2D5] text-sm font-semibold text-[#292824] hover:bg-white flex items-center justify-between"
            >
              <span>Consultation Intake</span>
              <ArrowUpRight className="w-4 h-4 text-[#8C7449]" />
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white/70 border border-[#E8E2D5] text-sm font-semibold text-[#292824] hover:bg-white flex items-center justify-between"
            >
              <span>Studio & Location</span>
              <ArrowUpRight className="w-4 h-4 text-[#8C7449]" />
            </button>

            <div className="pt-3 space-y-2.5">
              <button
                onClick={() => handleNavClick("enquiry")}
                className="relative w-full py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#9B783E] hover:from-[#B8860B] hover:via-[#C5A059] hover:to-[#8C6C32] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-xl shadow-md flex items-center justify-center gap-2 overflow-hidden group transition-all duration-300 border border-[#C5A059]"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <Calendar className="w-4 h-4 text-white group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10 font-semibold tracking-wider">
                  Reserve Consultation
                </span>
              </button>

              <div className="flex items-center justify-between px-2 pt-1 text-xs text-[#68625B]">
                <span>Thindal, Erode</span>
                <a
                  href="tel:9976855732"
                  className="inline-flex items-center gap-1.5 text-[#9B783E] font-semibold hover:text-[#7A5B28]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="tabular-nums">99768 55732</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
