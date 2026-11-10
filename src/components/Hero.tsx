import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onViewGallery: () => void;
}

interface FlowingOrb {
  id: number;
  size: number;
  blurClass: string;
  startX: number;
  startY: number;
  keyframesX: number[];
  keyframesY: number[];
  keyframesScale?: number[];
  keyframesOpacity: number[];
  duration: number;
  delay: number;
  ringGlow?: boolean;
}

interface CarouselSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    src: '/assets/hero1.jpg',
    alt: 'BIAA BEAUTY Bridal Artistry Hero 1',
    title: 'Signature Muhurtham Radiance',
    category: 'Bridal Makeup',
  },
  {
    id: 2,
    src: '/assets/hero2.jpg',
    alt: 'BIAA BEAUTY Bridal Artistry Hero 2',
    title: 'Bespoke Atelier Finish',
    category: 'Bridal Makeup',
  },
  {
    id: 3,
    src: '/assets/hero3.jpg',
    alt: 'BIAA BEAUTY Bridal Artistry Hero 3',
    title: 'Temple Poola Jada',
    category: 'Hair Styling',
  },
  {
    id: 4,
    src: '/assets/hero4.jpg',
    alt: 'BIAA BEAUTY Bridal Artistry Hero 4',
    title: 'Modern Reception Glam',
    category: 'Ultra HD Makeup',
  },
  {
    id: 5,
    src: '/assets/hero5.jpg',
    alt: 'BIAA BEAUTY Bridal Artistry Hero 5',
    title: 'Precision Saree Draping',
    category: 'Kanjivaram Silk',
  },
];

// Luminous golden bokeh orbs and sparkles calibrated to travel along the silk ribbon flow curves
const FLOWING_GLOW_ORBS: FlowingOrb[] = [
  // Primary silk current: Sweeping from bottom-left through center toward the bridal portrait
  {
    id: 1,
    size: 140,
    blurClass: 'blur-2xl',
    startX: 4,
    startY: 68,
    keyframesX: [0, 85, 195, 290, 390, 290, 160, 0],
    keyframesY: [0, -40, -90, -130, -170, -120, -55, 0],
    keyframesScale: [0.9, 1.15, 1.25, 1.1, 0.95, 1.1, 1, 0.9],
    keyframesOpacity: [0.25, 0.55, 0.72, 0.52, 0.3, 0.5, 0.38, 0.25],
    duration: 18,
    delay: 0,
    ringGlow: true,
  },
  {
    id: 2,
    size: 96,
    blurClass: 'blur-xl',
    startX: 14,
    startY: 76,
    keyframesX: [0, 100, 215, 320, 430, 310, 150, 0],
    keyframesY: [0, -48, -100, -140, -185, -125, -62, 0],
    keyframesScale: [1, 1.2, 1.35, 1.18, 0.92, 1.12, 1.05, 1],
    keyframesOpacity: [0.32, 0.68, 0.85, 0.62, 0.35, 0.58, 0.45, 0.32],
    duration: 15,
    delay: 2.5,
    ringGlow: true,
  },
  // Medium distinct round bokeh glowing discs with optical rims
  {
    id: 3,
    size: 68,
    blurClass: 'blur-md',
    startX: 8,
    startY: 56,
    keyframesX: [0, 115, 245, 365, 480, 340, 170, 0],
    keyframesY: [0, -42, -105, -135, -170, -118, -58, 0],
    keyframesScale: [0.85, 1.12, 1.28, 1.16, 0.9, 1.08, 1, 0.85],
    keyframesOpacity: [0.4, 0.78, 0.92, 0.72, 0.38, 0.68, 0.52, 0.4],
    duration: 14,
    delay: 1,
    ringGlow: true,
  },
  {
    id: 4,
    size: 54,
    blurClass: 'blur-md',
    startX: 22,
    startY: 68,
    keyframesX: [0, 110, 225, 325, 435, 295, 135, 0],
    keyframesY: [0, -36, -84, -115, -155, -104, -48, 0],
    keyframesScale: [1, 1.22, 1.32, 1.12, 0.95, 1.16, 1.06, 1],
    keyframesOpacity: [0.32, 0.72, 0.88, 0.66, 0.36, 0.62, 0.46, 0.32],
    duration: 12.5,
    delay: 4.2,
    ringGlow: true,
  },
  {
    id: 5,
    size: 46,
    blurClass: 'blur-sm',
    startX: 32,
    startY: 58,
    keyframesX: [0, 95, 190, 280, 375, 265, 125, 0],
    keyframesY: [0, -32, -78, -108, -145, -98, -42, 0],
    keyframesScale: [0.9, 1.16, 1.26, 1.12, 0.95, 1.12, 1, 0.9],
    keyframesOpacity: [0.45, 0.82, 0.95, 0.76, 0.42, 0.72, 0.52, 0.45],
    duration: 11,
    delay: 6,
    ringGlow: true,
  },
  {
    id: 6,
    size: 40,
    blurClass: 'blur-sm',
    startX: 42,
    startY: 48,
    keyframesX: [0, 88, 175, 255, 335, 235, 105, 0],
    keyframesY: [0, -26, -64, -94, -130, -84, -38, 0],
    keyframesScale: [1, 1.26, 1.16, 0.96, 1.12, 1.22, 1.06, 1],
    keyframesOpacity: [0.4, 0.86, 0.92, 0.66, 0.36, 0.76, 0.56, 0.4],
    duration: 10,
    delay: 3.2,
    ringGlow: true,
  },
  // Small luminous golden pearls & stardust embers riding the current
  {
    id: 7,
    size: 26,
    blurClass: 'blur-[2px]',
    startX: 12,
    startY: 72,
    keyframesX: [0, 125, 255, 365, 485, 345, 175, 0],
    keyframesY: [0, -52, -112, -148, -188, -128, -68, 0],
    keyframesScale: [0.8, 1.32, 1.12, 1.42, 0.9, 1.22, 1, 0.8],
    keyframesOpacity: [0.35, 0.92, 0.72, 0.96, 0.42, 0.82, 0.52, 0.35],
    duration: 9.2,
    delay: 1.5,
  },
  {
    id: 8,
    size: 19,
    blurClass: 'blur-[1px]',
    startX: 20,
    startY: 62,
    keyframesX: [0, 105, 220, 315, 415, 295, 145, 0],
    keyframesY: [0, -42, -88, -122, -158, -108, -52, 0],
    keyframesScale: [1, 1.42, 1, 1.32, 0.9, 1.22, 1.12, 1],
    keyframesOpacity: [0.4, 0.96, 0.62, 0.92, 0.36, 0.86, 0.52, 0.4],
    duration: 8.5,
    delay: 5,
  },
  {
    id: 9,
    size: 30,
    blurClass: 'blur-xs',
    startX: 28,
    startY: 80,
    keyframesX: [0, 98, 205, 300, 395, 275, 135, 0],
    keyframesY: [0, -36, -78, -112, -148, -98, -48, 0],
    keyframesScale: [0.9, 1.22, 1.36, 1.12, 0.95, 1.16, 1, 0.9],
    keyframesOpacity: [0.32, 0.82, 0.96, 0.72, 0.36, 0.76, 0.46, 0.32],
    duration: 11.5,
    delay: 3.2,
  },
  // Secondary silk wave: Arching high across the upper diagonal ribbon
  {
    id: 10,
    size: 85,
    blurClass: 'blur-xl',
    startX: 6,
    startY: 34,
    keyframesX: [0, 115, 225, 345, 455, 315, 155, 0],
    keyframesY: [0, -26, -62, -78, -88, -68, -36, 0],
    keyframesScale: [1, 1.16, 1.26, 1.12, 0.95, 1.12, 1, 1],
    keyframesOpacity: [0.26, 0.56, 0.68, 0.52, 0.32, 0.52, 0.42, 0.26],
    duration: 17,
    delay: 7,
    ringGlow: true,
  },
  {
    id: 11,
    size: 50,
    blurClass: 'blur-md',
    startX: 18,
    startY: 28,
    keyframesX: [0, 105, 210, 310, 415, 285, 145, 0],
    keyframesY: [0, -22, -52, -68, -82, -58, -26, 0],
    keyframesScale: [0.9, 1.22, 1.12, 1.26, 0.95, 1.12, 1, 0.9],
    keyframesOpacity: [0.36, 0.76, 0.86, 0.66, 0.36, 0.72, 0.52, 0.36],
    duration: 13,
    delay: 4.5,
    ringGlow: true,
  },
  {
    id: 12,
    size: 24,
    blurClass: 'blur-[1.5px]',
    startX: 10,
    startY: 40,
    keyframesX: [0, 118, 235, 340, 445, 305, 155, 0],
    keyframesY: [0, -32, -72, -92, -112, -78, -36, 0],
    keyframesScale: [1, 1.36, 1, 1.32, 0.9, 1.22, 1.06, 1],
    keyframesOpacity: [0.42, 0.92, 0.62, 0.86, 0.36, 0.82, 0.52, 0.42],
    duration: 9.6,
    delay: 2.8,
  },
  // Flow around bridal portrait card: Warm corona glow & looping counter-swirls
  {
    id: 13,
    size: 120,
    blurClass: 'blur-2xl',
    startX: 64,
    startY: 38,
    keyframesX: [0, 48, 95, 65, 12, -42, -22, 0],
    keyframesY: [0, -42, -84, -115, -74, -32, 12, 0],
    keyframesScale: [0.95, 1.22, 1.32, 1.16, 0.9, 1.12, 1, 0.95],
    keyframesOpacity: [0.26, 0.58, 0.72, 0.52, 0.32, 0.46, 0.36, 0.26],
    duration: 16.5,
    delay: 5,
    ringGlow: true,
  },
  {
    id: 14,
    size: 58,
    blurClass: 'blur-md',
    startX: 74,
    startY: 52,
    keyframesX: [0, 38, 74, 42, -16, -48, -26, 0],
    keyframesY: [0, -36, -74, -98, -62, -26, 6, 0],
    keyframesScale: [1, 1.22, 1.12, 1.26, 0.95, 1.16, 1, 1],
    keyframesOpacity: [0.32, 0.72, 0.86, 0.62, 0.36, 0.66, 0.46, 0.32],
    duration: 12.8,
    delay: 8,
    ringGlow: true,
  },
  {
    id: 15,
    size: 22,
    blurClass: 'blur-xs',
    startX: 68,
    startY: 64,
    keyframesX: [0, 42, 78, 52, -12, -38, -16, 0],
    keyframesY: [0, -46, -88, -112, -76, -36, -6, 0],
    keyframesScale: [0.8, 1.32, 1.12, 1.42, 0.9, 1.26, 1, 0.8],
    keyframesOpacity: [0.42, 0.92, 0.72, 0.96, 0.42, 0.86, 0.56, 0.42],
    duration: 8.8,
    delay: 6.2,
  },
];

export const Hero: React.FC<HeroProps> = ({ onViewGallery }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Responsive check for card stack horizontal offset
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  // Automatic gentle carousel advance with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 45) {
      prevSlide();
    } else if (diff < -45) {
      nextSlide();
    }
    touchStartXRef.current = null;
  };

  // Compute 3D stack styling for each slide matching the perspective reference cascade
  const getCardTransform = (index: number) => {
    const total = CAROUSEL_SLIDES.length;
    // Calculate circular relative offset (0 = active front, 1 = first peek right, 2 = second peek right)
    const diff = (index - activeIndex + total) % total;
    
    // Proportional offsets matching the 3D angled cascade reference
    const offsetStep = isMobile ? 44 : 82;
    const baseRotateY = isMobile ? -10 : -16;

    if (diff === 0) {
      // Active front card: fully prominent, matching the reference image's 3D angle
      return {
        zIndex: 30,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: baseRotateY,
        rotateX: 1.5,
        rotateZ: 0,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
        boxShadow:
          '0 28px 56px -12px rgba(41, 40, 36, 0.42), 0 0 32px rgba(196, 158, 96, 0.25)',
      };
    } else if (diff === 1) {
      // First card behind to the right: peeks out with matching 3D perspective
      return {
        zIndex: 20,
        x: offsetStep,
        y: isMobile ? 4 : 8,
        scale: 0.92,
        rotateY: baseRotateY,
        rotateX: 1.5,
        rotateZ: 0,
        opacity: 0.94,
        filter: 'brightness(0.88)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 22px 46px -10px rgba(41, 40, 36, 0.35)',
      };
    } else if (diff === 2) {
      // Second card behind to the right: further depth peek matching reference
      return {
        zIndex: 10,
        x: offsetStep * 1.84,
        y: isMobile ? 8 : 16,
        scale: 0.84,
        rotateY: baseRotateY,
        rotateX: 1.5,
        rotateZ: 0,
        opacity: 0.84,
        filter: 'brightness(0.76)',
        pointerEvents: 'auto' as const,
        boxShadow: '0 18px 36px -8px rgba(41, 40, 36, 0.28)',
      };
    } else {
      // Remaining queued cards hidden behind the stack
      return {
        zIndex: 5,
        x: offsetStep * 2.2,
        y: isMobile ? 12 : 20,
        scale: 0.78,
        rotateY: baseRotateY,
        rotateX: 1.5,
        rotateZ: 0,
        opacity: 0,
        filter: 'brightness(0.65)',
        pointerEvents: 'none' as const,
        boxShadow: 'none',
      };
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] md:max-h-[calc(100vh-5rem)] flex items-center justify-center py-6 sm:py-8 lg:py-10 bg-[#FAF8F5] border-b border-[#E8E2D5]"
    >
      {/* Background with Luminous Golden Silk Ribbons & Bokeh Lights Matching Mockup */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none opacity-95"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
      />

      {/* Animated Flowing Round Glow Spheres Traveling Along Silk Ribbons */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
        {FLOWING_GLOW_ORBS.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full pointer-events-none select-none ${orb.blurClass}`}
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.startX}%`,
              top: `${orb.startY}%`,
              background:
                'radial-gradient(circle, rgba(255, 246, 215, 0.95) 0%, rgba(246, 218, 146, 0.75) 28%, rgba(226, 188, 108, 0.45) 55%, rgba(196, 158, 96, 0.15) 75%, transparent 100%)',
              boxShadow: orb.ringGlow
                ? '0 0 32px 8px rgba(235, 195, 115, 0.45), inset 0 0 12px rgba(255, 252, 230, 0.8)'
                : '0 0 20px 5px rgba(235, 195, 115, 0.38)',
              border: orb.ringGlow
                ? '1px solid rgba(255, 245, 205, 0.45)'
                : undefined,
              mixBlendMode: 'plus-lighter',
            }}
            animate={{
              x: orb.keyframesX,
              y: orb.keyframesY,
              scale: orb.keyframesScale || [1, 1.2, 1],
              opacity: orb.keyframesOpacity,
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}

        {/* Dynamic Sweeping Luminous Light Wave Traveling Along the Silk Path */}
        <motion.div
          className="absolute -left-32 bottom-1/4 w-[460px] h-[160px] rounded-[100%] blur-3xl pointer-events-none select-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 236, 175, 0.38) 0%, rgba(226, 188, 108, 0.22) 45%, transparent 75%)',
            mixBlendMode: 'plus-lighter',
          }}
          animate={{
            x: [0, 220, 520, 840, 1150, 840, 420, 0],
            y: [0, -60, -140, -180, -220, -150, -60, 0],
            scale: [0.9, 1.2, 1.35, 1.2, 0.95, 1.15, 1, 0.9],
            opacity: [0.25, 0.65, 0.85, 0.6, 0.25, 0.55, 0.4, 0.25],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Slogan & Clean Services Triad */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[66px] font-normal tracking-tight text-[#292824] leading-[1.12]"
            >
              Some Moments Deserve <br />
              <span className="italic font-normal text-[#C39F63] font-serif-luxury">
                More Than Ordinary Care.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 sm:mt-8 font-serif-luxury text-base sm:text-lg md:text-xl text-[#292824] flex items-center flex-wrap gap-y-1"
            >
              <span>Bridal Makeup</span>
              <span className="mx-3 text-[#C5A059] font-normal">|</span>
              <span>Hair Styling</span>
              <span className="mx-3 text-[#C5A059] font-normal">|</span>
              <span>Saree Draping</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              onClick={onViewGallery}
              className="mt-5 self-start text-sm font-semibold text-[#292824] underline decoration-[#C5A059] decoration-1 underline-offset-4 transition-colors hover:text-[#9B783E] cursor-pointer"
            >
              View Gallery
            </motion.button>
          </div>

          {/* Right Column: 3D One-Sided Carousel Design */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* 3D Stack Perspective Container */}
            <div
              className="relative w-full max-w-[380px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[540px] xl:max-w-[580px] flex flex-col items-center sm:items-start select-none"
              style={{ perspective: '1200px' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Card Deck Area: Significantly Increased Size */}
              <div className="relative w-[280px] sm:w-[340px] md:w-[370px] lg:w-[390px] xl:w-[420px] aspect-[4/5] max-h-[calc(100vh-9rem)]">
                {CAROUSEL_SLIDES.map((slide, index) => {
                  const isCurrent = index === activeIndex;

                  return (
                    <motion.div
                      key={slide.id}
                      onClick={() => !isCurrent && setActiveIndex(index)}
                      animate={getCardTransform(index)}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-[28px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden border border-[#E8E2D5] cursor-pointer group"
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {/* Pure Clean Image with No Text Overlays */}
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/assets/hero1.jpg';
                        }}
                      />

                      {/* Subtle Inner Glow Highlight on Card Rim */}
                      <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] md:rounded-[36px] border border-white/25 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Transparent Carousel Controls (< ... >) */}
              <div className="mt-6 w-[280px] sm:w-[340px] md:w-[370px] lg:w-[390px] xl:w-[420px] flex items-center justify-between gap-3 px-2">
                {/* Previous Button (<) with Transparent Background */}
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-transparent hover:bg-black/5 text-[#292824] hover:text-[#A37B30] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2]" />
                </button>

                {/* Dots / Capsule Indicator Track (...) with Transparent Background */}
                <div className="flex items-center gap-2 bg-transparent">
                  {CAROUSEL_SLIDES.map((slide, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'w-6 bg-gradient-to-r from-[#BFA054] to-[#A37B30] shadow-[0_0_8px_rgba(196,158,96,0.35)]'
                            : 'w-1.5 bg-black/20 hover:bg-black/40'
                        }`}
                        aria-label={`Jump to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                {/* Next Button (>) with Transparent Background */}
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-transparent hover:bg-black/5 text-[#292824] hover:text-[#A37B30] flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
