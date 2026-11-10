import React from "react";
import { Phone, Instagram, MapPin, ArrowUp, Sparkles } from "lucide-react";

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#E8E2D5] pt-16 pb-24 md:pb-16 text-[#292824] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8E2D5]">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#BFA054] to-[#A37B30] shadow-sm flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
                  <img
                    src="/assets/aistudio/logo-without-bg.png"
                    alt="BIAA BEAUTY Brand Crest"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/aistudio/logo-high-res_e4f326c0.png";
                    }}
                  />
                </div>
              </div>

              <div>
                <span className="font-serif-luxury text-2xl font-semibold tracking-wider text-[#292824]">
                  BIAA BEAUTY
                </span>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C7449] font-medium">
                  Exclusive Bridal Atelier · Thindal, Erode
                </p>
              </div>
            </div>

            {/* <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed max-w-sm">
              Dedicated exclusively to Bridal Makeup, Hair Styling, and Saree Draping. Curating timeless poise and flawless radiance for South Indian brides across Erode and surrounding regions.
            </p> */}

            {/* <div className="text-xs text-[#68625B] pt-1">
              <span>Studio Concierge Line: </span>
              <a
                href="tel:9976855732"
                className="text-[#292824] font-semibold hover:text-[#A37B30] transition-colors tabular-nums"
              >
                99768 55732
              </a>
            </div> */}
          </div>

          {/* Quick Navigation (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#292824]">
              Studio Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#68625B]">
              <li>
                <button
                  onClick={() => onNavigateToSection("services")}
                  className="hover:text-[#A37B30] transition-colors cursor-pointer"
                >
                  Primary Services Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection("portfolio")}
                  className="hover:text-[#A37B30] transition-colors cursor-pointer"
                >
                  Bridal Portfolio & Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection("enquiry")}
                  className="hover:text-[#A37B30] transition-colors cursor-pointer"
                >
                  Consultation Intake Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection("contact")}
                  className="hover:text-[#A37B30] transition-colors cursor-pointer"
                >
                  Studio Location & Maps
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Directives & Address (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#292824]">
              Address
            </h4>
            <p className="text-xs text-[#68625B] leading-relaxed">
              Saravana nagar, main road, near erode, Therkkupallam, rifles,
              Thindal, Erode, Tamil Nadu 638012
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://maps.app.goo.gl/ANxetUxjKk9dFUmy9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#8C7449] hover:text-[#A37B30] transition-colors font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C49E60]" />
                <span>Google Maps Profile</span>
              </a>

              <span className="text-[#C49E60]/40">·</span>

              <a
                href="https://www.instagram.com/beautybiaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#8C7449] hover:text-[#A37B30] transition-colors font-semibold"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C49E60]" />
                <span>@beautybiaa</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7449]">
          <div>
            © {new Date().getFullYear()} BIAA BEAUTY. All rights reserved.
            Bridal Makeup · Hair Styling · Saree Draping.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#524B42] hover:text-[#A37B30] transition-colors cursor-pointer p-1"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C49E60]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
