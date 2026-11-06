import React, { useRef } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AuthorizedService } from "../utils/validation.ts";

interface ServicesMatrixProps {
  onSelectServiceAndBook: (service: AuthorizedService) => void;
}

interface ServiceCardData {
  id: AuthorizedService;
  title: string;
  subtitle: string;
  image: string;
  badges: string[];
  features: string[];
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "Bridal Makeup",
    title: "Bridal Makeup",
    subtitle: "Elegant · HD · Ultra HD · Air Brush",
    image: "/assets/makeup.jpg",
    badges: ["Elegant", "HD Makeup", "Ultra HD", "Air Brush"],
    features: [
      "Elegant, HD, Ultra HD & Air Brush bridal makeup options",
      "Deep barrier hydration & skin-prep before foundation",
      "Sweat-proof, tear-resistant & zero-flashback finish",
      "Bespoke looks for Muhurtham, Reception & Engagement",
    ],
  },
  {
    id: "Hair Styling",
    title: "Hair Styling",
    subtitle: "Elegant & Premium Hair Artistry",
    image: "/assets/hair.jpg",
    badges: ["Elegant Styles", "Premium Styles", "Traditional & Modern"],
    features: [
      "Elegant & Premium bridal hair styles tailored to your attire",
      "Authentic fresh jasmine & temple flower poola jada setting",
      "Modern voluminous textured updos, Hollywood waves & braids",
      "Weight-distributed structure for comfortable multi-hour wear",
    ],
  },
  {
    id: "Saree Draping",
    title: "Saree Draping",
    subtitle: "Pre-Pleating & Spot Pleating Services",
    image: "/assets/saree3.png",
    badges: ["Pre-Pleating", "Spot Pleating", "Box Folding"],
    features: [
      "Pre-Pleating service with steam setting & ready-to-wear box folding",
      "Flawless on-venue Spot Pleating with razor-sharp knife edges",
      "Specialized Kanjivaram silk, organza, tissue & Banarasi draping",
      "Cancan flare silhouette setting & secure oddiyanam waist anchoring",
    ],
  },
];

export const ServicesMatrix: React.FC<ServicesMatrixProps> = ({
  onSelectServiceAndBook,
}) => {
  const servicesCarouselRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: -1 | 1) => {
    const carousel = servicesCarouselRef.current;
    if (carousel) {
      carousel.scrollBy({
        left: direction * carousel.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      className="py-12 md:py-28 bg-[#FAF8F5] border-b border-[#E8E2D5] relative overflow-hidden"
    >
      {/* Background Watermark Crest */}
      <div className="absolute -right-20 top-16 opacity-[0.06] pointer-events-none select-none hidden md:block">
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
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292824] tracking-tight mb-4"
          >
            Primary Services
          </motion.h2>
        </div>

        {/* Swipeable mobile carousel and 3-column desktop grid */}
        <div ref={servicesCarouselRef} className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {SERVICES_DATA.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="w-[calc(100vw-2rem)] shrink-0 snap-center md:w-auto md:min-w-0 md:shrink bg-[#FCFAF7] rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#C49E60]/60 relative"
              >
                {/* Subtle Card Watermark Crest */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.08] pointer-events-none select-none">
                  <img
                    src="/assets/aistudio/logo-without-bg.png"
                    alt=""
                    className="w-48 h-48 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/aistudio/logo-high-res_e4f326c0.png";
                    }}
                  />
                </div>
                <div>
                  {/* Card Visual Header Image */}
                  <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-[#F4EFE6]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium tracking-tight text-[#292824] mb-3 sm:mb-4">
                      {service.title}
                    </h3>

                    {/* Service Advantages */}
                    <div className="space-y-2.5 sm:space-y-3 pt-3.5 sm:pt-4 border-t border-[#E8E2D5]">
                      {service.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs text-[#4A453E]"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 pt-0 sm:p-7 sm:pt-0">
                  <button
                    onClick={() => onSelectServiceAndBook(service.id)}
                    className="relative w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#292824] bg-white hover:text-white border border-[#E8E2D5] rounded-xl transition-all duration-300 cursor-pointer group/btn shadow-2xs overflow-hidden hover:border-[#C49E60] hover:bg-gradient-to-r hover:from-[#BFA054] hover:via-[#B89243] hover:to-[#A37B30] hover:shadow-[0_0_25px_rgba(196,158,96,0.45)] active:scale-[0.98]"
                  >
                    {/* Glowing light beam sweep on hover */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

                    {/* Micro-sparkle animated icon */}
                    <Sparkles className="w-3.5 h-3.5 text-[#C49E60] group-hover/btn:text-white group-hover/btn:rotate-45 group-hover/btn:scale-125 transition-all duration-300 shrink-0 relative z-10" />

                    <span className="relative z-10 transition-colors duration-200">
                      Reserve {service.title}
                    </span>

                    {/* Arrow with translate animation */}
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C7449] group-hover/btn:text-white group-hover/btn:translate-x-1.5 transition-all duration-300 shrink-0 relative z-10" />
                  </button>
                  <div className="mt-2 text-center text-[10px] text-[#8C7449] font-medium tracking-wide">
                    Instant consultation pre-selection
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile carousel controls */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-2 text-[11px] font-medium text-[#8C7449]">
          <button
            type="button"
            onClick={() => scrollServices(-1)}
            className="flex h-11 w-11 items-center justify-center bg-transparent text-[#8C7449] hover:text-[#292824] active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49E60]"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span>Swipe or tap to view services</span>
          <button
            type="button"
            onClick={() => scrollServices(1)}
            className="flex h-11 w-11 items-center justify-center bg-transparent text-[#8C7449] hover:text-[#292824] active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49E60]"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
