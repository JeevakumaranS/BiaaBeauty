import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Instagram,
  ExternalLink,
  Star,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: "Bridal Makeup" | "Hair Styling" | "Saree Draping" | "Reception";
  caption: string;
  tags: string;
  likes: string;
  image: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Makeup (3 images)
  {
    id: "1",
    title: "The Muhurtham Radiance",
    category: "Bridal Makeup",
    caption:
      "Pure silk Kanjivaram harmony with flawless dewy skin, gentle antique gold eye shimmer, and 12-hour endurance.",
    tags: "#MuhurthamLook #ErodeBrides #SouthIndianBride",
    likes: "1,420",
    image: "/assets/makeup.jpg",
  },
  {
    id: "2",
    title: "Bespoke HD Bride",
    category: "Bridal Makeup",
    caption:
      "Sculpted bridal contour with barrier hydration, sweat-proof base, and natural glowing radiance.",
    tags: "#HDMakeup #BridalBeauty #BiaaBeauty",
    likes: "1,310",
    image: "/assets/hero2.jpg",
  },
  {
    id: "3",
    title: "Modern Reception Glam",
    category: "Bridal Makeup",
    caption:
      "Soft sculpted glam with glossy nude rose tint, fluttery lashes, and voluminous Hollywood reception wave set.",
    tags: "#ReceptionGlam #BridalWaves #ErodeMakeupArtist",
    likes: "990",
    image: "/assets/hero4.jpg",
  },

  // Hair (3 images)
  {
    id: "4",
    title: "Temple Poola Jada Braid",
    category: "Hair Styling",
    caption:
      "Scented Madurai malli jasmine, rose petals, and handcrafted temple suryavanka brooches woven into an intricate braid.",
    tags: "#PoolaJada #BridalHair #TraditionalBraid",
    likes: "1,180",
    image: "/assets/hair.jpg",
  },
  {
    id: "5",
    title: "Floral Crown Poola Jada",
    category: "Hair Styling",
    caption:
      "Traditional jasmine floral crown styling anchored with temple motifs and lightweight multi-hour comfort.",
    tags: "#PoolaJadaArt #TraditionalHair #BridalStyling",
    likes: "1,240",
    image: "/assets/hair3.jpg",
  },
  {
    id: "6",
    title: "Romantic Bridal Updo",
    category: "Hair Styling",
    caption:
      "Airy textured romantic bridal updo framed with face-framing tendrils and delicate floral accents.",
    tags: "#BridalUpdo #EngagementLook #BiaaBeauty",
    likes: "1,150",
    image: "/assets/hair2.jpg",
  },

  // Saree (3 images)
  {
    id: "7",
    title: "Precision Box-Pleated Draping",
    category: "Saree Draping",
    caption:
      "Razor-sharp knife-edge pleats with zero waistline bulk, anchored securely with oddiyanam for effortless walking.",
    tags: "#SareeDraping #KanjivaramPleats #SilkSareeArt",
    likes: "1,560",
    image: "/assets/saree.jpg",
  },
  {
    id: "8",
    title: "Kanjivaram Silk Pleating",
    category: "Saree Draping",
    caption:
      "Specialized Kanjivaram silk pleating with steam setting, razor-sharp knife edges, and secure oddiyanam anchoring.",
    tags: "#PrePleating #SilkSaree #KanjivaramArt",
    likes: "1,480",
    image: "/assets/saree3.png",
  },
  {
    id: "9",
    title: "Velveteen Cancan Saree Flare",
    category: "Saree Draping",
    caption:
      "Contemporary drape structure featuring cancan flare under-support and immaculate pallu cascade.",
    tags: "#CancanDraping #ModernBride #SareeStyle",
    likes: "870",
    image: "/assets/hero5.jpg",
  },
];

const TESTIMONIALS = [
  {
    bride: "Swathi & Vignesh",
    event: "Muhurtham Wedding at Erode",
    quote:
      "My makeup stayed untouched from 5:30 AM through our entire 6-hour Muhurtham ceremony under hot mandap lamps. Not a single pleat of my heavy Kanjivaram moved. BIAA BEAUTY is in a league of their own.",
    verified: "Verified Muhurtham Bride",
  },
  {
    bride: "Keerthana M.",
    event: "Reception & Engagement at Thindal",
    quote:
      "The poola jada was so lightweight I could dance freely at the reception! I was nervous about heavy hair pins, but their technique was weightless and secure. The trial session gave me so much peace of mind.",
    verified: "Verified Reception Bride",
  },
  {
    bride: "Dr. Archana S.",
    event: "Traditional Tamil Wedding",
    quote:
      "The best bridal artist in Erode. Dedicated, punctual, and strictly focused on bridal styling without trying to upsell salon packages. The pre-pleating service saved us at least 45 minutes on the wedding morning.",
    verified: "Verified Bridal Trial Client",
  },
];

type CategoryFilter =
  | "All"
  | "Bridal Makeup"
  | "Hair Styling"
  | "Saree Draping";

export const SocialProof: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const [isReviewPaused, setIsReviewPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-move mobile review from right to left in a continuous loop
  useEffect(() => {
    if (isReviewPaused) return;
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isReviewPaused]);

  const handleReviewTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsReviewPaused(true);
  };

  const handleReviewTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe left -> advance to next
          setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        } else {
          // Swipe right -> go to previous
          setActiveReviewIndex(
            (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
          );
        }
      }
      touchStartX.current = null;
    }
    setIsReviewPaused(false);
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Bridal Makeup")
      return item.category === "Bridal Makeup" || item.category === "Reception";
    return item.category === activeCategory;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <section
      id="portfolio"
      className="py-12 md:py-28 bg-[#FAF8F5] border-b border-[#E8E2D5] relative overflow-hidden"
    >
      {/* Background Watermark Crest */}
      <div className="absolute -left-20 top-24 opacity-[0.05] pointer-events-none select-none hidden md:block">
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
        {/* Header & Direct Instagram Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292824] tracking-tight">
              Curated Bridal Lookbook
            </h2>
            <p className="font-serif-luxury text-sm sm:text-base text-[#524B42] mt-2 sm:mt-2.5 leading-relaxed">
              Explore real Muhurtham, reception, and engagement artistry styled
              by BIAA BEAUTY. Every drape, braid, and finish documented in
              authentic perfection.
            </p>
          </div>

          <a
            href="https://www.instagram.com/beautybiaa"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold uppercase tracking-wider text-[#292824] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#BFA054] hover:via-[#B89243] hover:to-[#A37B30] rounded-xl transition-all duration-300 shadow-2xs hover:shadow-[0_0_24px_rgba(196,158,96,0.35)] hover:scale-[1.02] active:scale-[0.98] border border-[#E8E2D5] hover:border-[#C49E60] cursor-pointer shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-[#8C7449] group-hover:text-white transition-colors duration-200" />
            <span className="transition-colors duration-200">
              More on @beautybiaa
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8C7449] group-hover:text-white transition-colors duration-200" />
          </a>
        </div>

        {/* Modern Tab Navigation (Horizontally swipeable on mobile, fluid on desktop) */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-5 sm:gap-8 mb-6 md:mb-10 pb-2.5 border-b border-[#E8E2D5]">
          {(
            [
              "All",
              "Bridal Makeup",
              "Hair Styling",
              "Saree Draping",
            ] as CategoryFilter[]
          ).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`relative pb-2 text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors duration-200 cursor-pointer font-serif-luxury whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[#292824] font-semibold"
                    : "text-[#8C7449] hover:text-[#292824] font-medium"
                }`}
              >
                <span>{cat === "All" ? "All Curations" : cat}</span>

                {/* Modern Animated Underline Slider */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute -bottom-[11px] inset-x-0 h-[2.5px] bg-gradient-to-r from-[#BFA054] via-[#C49E60] to-[#A37B30] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid (2-Column Compact on Mobile, 3-Column on Desktop) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-7 mb-8 md:mb-12"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, idx) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  whileHover={{ y: -8 }}
                  transition={{
                    layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.35, delay: idx * 0.05 },
                    scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-[0_24px_48px_-12px_rgba(196,158,96,0.25)] hover:border-[#C49E60]/70 group transition-all duration-500 relative aspect-[3/4] sm:aspect-[3/4] cursor-pointer"
                >
                  {/* Photo with Shimmer, Zoom & Gradient Scrim */}
                  <img
                    src={item.image}
                    alt={`${item.category} - ${item.title}`}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/makeup.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors duration-500" />

                  {/* Delicate Light Beam Sweep on Hover */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Subtle Inner Glow Border */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/20 pointer-events-none" />

                  {/* In-Image Text Overlay: Category & Title Only */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-7 text-white pointer-events-none flex flex-col justify-end">
                    <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#F3D799] drop-shadow-sm mb-0.5 sm:mb-1.5">
                      {item.category}
                    </span>
                    <h4 className="font-serif-luxury text-xs sm:text-2xl font-normal tracking-tight text-white drop-shadow-md leading-tight sm:leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More Button (Shows next 6 items when available) */}
        {hasMore && (
          <div className="flex justify-center -mt-2 mb-12 md:mb-20">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-wider text-[#292824] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#BFA054] hover:via-[#B89243] hover:to-[#A37B30] rounded-xl transition-all duration-300 shadow-2xs hover:shadow-[0_0_24px_rgba(196,158,96,0.35)] hover:scale-[1.02] active:scale-[0.98] border border-[#E8E2D5] hover:border-[#C49E60] cursor-pointer"
            >
              <span>View More</span>
              <span className="text-[11px] text-[#8C7449] group-hover:text-white/90">
                ({filteredItems.length - visibleCount} more)
              </span>
              <ChevronDown className="w-4 h-4 text-[#8C7449] group-hover:text-white transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        )}

        {/* Real Testimonial Quotes (Swipeable on Mobile, 3-Col on Desktop) */}
        <div className="bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#E8E2D5] p-5 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <div className="flex items-center justify-center gap-1 text-[#C49E60] mb-2 sm:mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C49E60]" />
              ))}
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-3xl font-normal text-[#292824] tracking-tight">
              Love Notes From Our Brides
            </h3>
            <p className="text-[11px] sm:text-xs text-[#8C7449] mt-1 sm:mt-2 uppercase tracking-widest font-semibold">
              Uncompromising Dedication · Documented Trust
            </p>
          </div>

          {/* Mobile View: Full-Width Review Completely on Screen, Auto-Moving Right-To-Left in a Loop */}
          <div
            className="md:hidden relative w-full overflow-hidden"
            onTouchStart={handleReviewTouchStart}
            onTouchEnd={handleReviewTouchEnd}
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
          >
            <div className="relative min-h-[220px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIndex}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-[#F8F5EE] rounded-2xl border border-[#E8E2D5] p-5 sm:p-6 shadow-2xs flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle Testimonial Card Watermark */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none select-none">
                    <img
                      src="/assets/aistudio/logo-without-bg.png"
                      alt=""
                      className="w-32 h-32 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/aistudio/logo-high-res_e4f326c0.png";
                      }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed italic mb-4 relative z-10">
                    “{TESTIMONIALS[activeReviewIndex].quote}”
                  </p>
                  <div className="pt-3 border-t border-[#E8E2D5] relative z-10">
                    <div className="font-semibold text-xs sm:text-sm text-[#292824]">
                      {TESTIMONIALS[activeReviewIndex].bride}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#8C7449] font-medium">
                      {TESTIMONIALS[activeReviewIndex].event}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>{TESTIMONIALS[activeReviewIndex].verified}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Carousel Indicators (Progress Dots) */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeReviewIndex === i
                      ? "w-6 bg-gradient-to-r from-[#BFA054] to-[#A37B30]"
                      : "w-1.5 bg-[#D8CEBA] hover:bg-[#C49E60]/60"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Web View: Unchanged 3-Column Grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F8F5EE] rounded-2xl border border-[#E8E2D5] p-6 shadow-2xs flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Subtle Testimonial Card Watermark */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none select-none">
                  <img
                    src="/assets/aistudio/logo-without-bg.png"
                    alt=""
                    className="w-32 h-32 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/aistudio/logo-high-res_e4f326c0.png";
                    }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed italic mb-6 relative z-10">
                  “{t.quote}”
                </p>
                <div className="pt-4 border-t border-[#E8E2D5]">
                  <div className="font-semibold text-sm text-[#292824]">
                    {t.bride}
                  </div>
                  <div className="text-xs text-[#8C7449] font-medium">
                    {t.event}
                  </div>
                  <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{t.verified}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
