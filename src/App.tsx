import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesMatrix } from './components/ServicesMatrix.tsx';
import { SocialProof } from './components/SocialProof.tsx';
import { EnquiryForm } from './components/EnquiryForm.tsx';
import { ContactHub } from './components/ContactHub.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthorizedService } from './utils/validation.ts';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [preSelectedService, setPreSelectedService] = useState<AuthorizedService | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleSelectServiceAndBook = useCallback((service: AuthorizedService) => {
    setPreSelectedService(service);
    scrollToSection('enquiry');
  }, [scrollToSection]);

  const handleViewGallery = useCallback(() => {
    scrollToSection('portfolio');
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292824] flex flex-col font-sans selection:bg-[#E5D3B3] selection:text-[#292824]">
      {/* 1. Masthead & Navigation */}
      <Header onNavigateToSection={scrollToSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Impression */}
        <Hero
          onViewGallery={handleViewGallery}
        />

        {/* 3. Primary Services Matrix */}
        <ServicesMatrix onSelectServiceAndBook={handleSelectServiceAndBook} />

        {/* 4. Social Proof & Lookbook */}
        <SocialProof />

        {/* 5. Consultation Intake Enquiry Form */}
        <EnquiryForm
          preSelectedService={preSelectedService}
          onClearPreSelectedService={() => setPreSelectedService(null)}
        />

        {/* 6. Studio Location & Contact Hub */}
        <ContactHub />
      </main>

      {/* Footer */}
      <Footer onNavigateToSection={scrollToSection} />

      {/* Floating Scroll-To-Top Button (Mobile Only, Positioned Above WhatsApp FAB) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-20 right-5 z-40 md:hidden w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DFC8] shadow-md flex items-center justify-center text-[#8C7449] hover:text-[#292824] active:scale-90 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.2]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button (All Views, Bottom Right) */}
      <a
        href="https://wa.me/919976855732?text=Hello%20BIAA%20BEAUTY%2C%20I%20would%20like%20to%20inquire%20about%20bridal%20services%20in%20Erode."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.28)] hover:bg-[#20BD5A] active:scale-[0.97] transition-colors duration-150 cursor-pointer"
        aria-label="Chat on WhatsApp with BIAA BEAUTY"
      >
        {/* Crisp Authentic Two-Color WhatsApp Logo */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          className="relative"
        >
          {/* Solid White Speech Bubble */}
          <path
            fill="#FFFFFF"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2Z"
          />
          {/* Green Phone Receiver */}
          <path
            fill="#25D366"
            d="M17.47 14.38C17.18 14.23 15.73 13.52 15.47 13.42C15.2 13.32 15.01 13.28 14.81 13.57C14.62 13.86 14.07 14.51 13.9 14.71C13.73 14.9 13.56 14.92 13.27 14.78C12.98 14.63 12.04 14.32 10.93 13.33C10.07 12.56 9.49 11.61 9.32 11.32C9.15 11.03 9.3 10.87 9.45 10.73C9.58 10.6 9.74 10.38 9.89 10.22C10.03 10.05 10.08 9.93 10.18 9.74C10.27 9.54 10.23 9.37 10.16 9.23C10.08 9.08 9.51 7.68 9.27 7.1C9.04 6.54 8.8 6.61 8.63 6.6C8.47 6.6 8.27 6.6 8.08 6.6C7.89 6.6 7.57 6.67 7.31 6.96C7.04 7.25 6.3 7.95 6.3 9.38C6.3 10.81 7.34 12.19 7.49 12.38C7.63 12.58 9.53 15.51 12.45 16.77C13.14 17.07 13.69 17.25 14.11 17.39C14.81 17.61 15.44 17.58 15.94 17.5C16.51 17.42 17.68 16.79 17.92 16.12C18.17 15.44 18.17 14.86 18.09 14.74C18.02 14.61 17.76 14.53 17.47 14.38Z"
          />
        </svg>
      </a>
    </div>
  );
}
