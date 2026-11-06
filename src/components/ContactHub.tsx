import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Instagram,
  Navigation,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  CalendarDays,
  Shield,
  Car,
} from "lucide-react";

const EXACT_ADDRESS =
  "Saravana nagar, main road, near erode, Therkkupallam, rifles, Thindal, Erode, Tamil Nadu 638012";

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/ANxetUxjKk9dFUmy9";

export const ContactHub: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(EXACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E8E2D5] relative overflow-hidden"
    >
      {/* Delicate Section Background Watermark */}
      <div className="absolute -left-16 top-16 opacity-[0.05] pointer-events-none select-none hidden md:block">
        <img
          src="/assets/aistudio/logo-without-bg.png"
          alt=""
          className="w-96 h-96 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/aistudio/logo-high-res_e4f326c0.png";
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C7449] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C49E60]" />
            <span>Studio Location & Directions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292824] tracking-tight"
          >
            Visit BIAA BEAUTY Atelier
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#68625B] mt-3 leading-relaxed max-w-xl mx-auto"
          >
            Located in Thindal, Erode. We warmly welcome brides-to-be by prior
            appointment for personalized trials, shade consultations, and saree
            draping sessions.
          </motion.p>
        </div>

        {/* 2-Column: Google Map View (Left) & Studio Address Hub (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Google Map View (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FCFAF7] rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col min-h-[460px] lg:min-h-[520px]">
            {/* Embedded Google Maps Frame */}
            <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[460px] bg-[#F4EFE6]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.8967912423717!2d77.6763188!3d11.3164038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fcce0ddfb3d%3A0xf36fd1de1e28e611!2sBiaa%20Beauty%20Makeup%20Studio!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BIAA BEAUTY Makeup Studio Google Map"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Map Bottom Status Bar */}
            <div className="p-4 bg-white border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#292824] font-medium">
                <MapPin className="w-4 h-4 text-[#C49E60] shrink-0" />
                <span>BIAA BEAUTY Makeup Studio · Thindal, Erode</span>
              </div>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#8C7449] hover:text-[#292824] font-semibold text-xs transition-colors"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Studio Address & Connectivity Hub (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FCFAF7] rounded-3xl border border-[#E8E2D5] p-7 sm:p-9 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Delicate Watermark Logo */}
            <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none select-none">
              <img
                src="/assets/aistudio/logo-without-bg.png"
                alt=""
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/aistudio/logo-high-res_e4f326c0.png";
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7449]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49E60]" />
                  <span>Bridal Studio</span>
                </div>
                <span className="text-xs text-[#68625B] flex items-center gap-1.5 bg-[#F8F5EE] border border-[#E8E2D5] px-2.5 py-1 rounded-full">
                  <CalendarDays className="w-3.5 h-3.5 text-[#C49E60]" />
                  <span>By Prior Appointment</span>
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#292824] tracking-tight mb-2">
                BIAA BEAUTY Makeup Studio
              </h3>

              <p className="text-xs text-[#68625B] leading-relaxed mb-5">
                Our bespoke bridal studio in Thindal, Erode. Visit us for private 1-on-1 shade matching, hair trial styling, and saree pre-pleating.
              </p>

              {/* Exact Address Box */}
              <div className="bg-[#F8F5EE] rounded-2xl border border-[#E8E2D5] p-4.5 mb-5 shadow-2xs">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#68625B] mb-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C49E60]" />
                    <span>Postal Address</span>
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-[#8C7449] hover:text-[#292824] text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#292824] font-medium leading-relaxed">
                  {EXACT_ADDRESS}
                </p>
              </div>

              {/* Atelier Amenities */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <div className="bg-[#F8F5EE] border border-[#E8E2D5] rounded-xl p-3 text-left">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49E60] mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#292824]">Daylight Vanity</div>
                  <div className="text-[10px] text-[#68625B]">Calibrated light</div>
                </div>

                <div className="bg-[#F8F5EE] border border-[#E8E2D5] rounded-xl p-3 text-left">
                  <Shield className="w-3.5 h-3.5 text-[#C49E60] mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#292824]">Private Suite</div>
                  <div className="text-[10px] text-[#68625B]">1-on-1 trials</div>
                </div>

                <div className="bg-[#F8F5EE] border border-[#E8E2D5] rounded-xl p-3 text-left">
                  <Car className="w-3.5 h-3.5 text-[#C49E60] mb-1.5" />
                  <div className="text-[11px] font-semibold text-[#292824]">Easy Parking</div>
                  <div className="text-[10px] text-[#68625B]">Bridal party</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Directions, Direct Call, and Instagram */}
            <div className="space-y-3 pt-5 border-t border-[#E8E2D5]">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-[#292824] bg-white hover:text-white border border-[#C49E60] rounded-xl transition-all duration-300 cursor-pointer group/btn shadow-xs overflow-hidden hover:bg-gradient-to-r hover:from-[#BFA054] hover:via-[#B89243] hover:to-[#A37B30] hover:shadow-[0_0_25px_rgba(196,158,96,0.45)] active:scale-[0.98]"
              >
                {/* Glowing light beam sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <Navigation className="w-4 h-4 text-[#8C7449] group-hover/btn:text-white transition-colors relative z-10" />
                <span className="relative z-10">Get Directions in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8C7449] group-hover/btn:text-white transition-colors relative z-10" />
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:9976855732"
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs font-semibold text-emerald-800 hover:text-white bg-white hover:bg-emerald-600 border border-emerald-300 hover:border-emerald-600 rounded-xl transition-all shadow-2xs hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer group/call"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 group-hover/call:text-white transition-colors shrink-0" />
                  <span>Call 99768 55732</span>
                </a>

                <a
                  href="https://www.instagram.com/beautybiaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs font-semibold text-[#292824] bg-white hover:bg-[#F8F5EE] border border-[#E8E2D5] hover:border-[#C49E60] rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>@beautybiaa</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
