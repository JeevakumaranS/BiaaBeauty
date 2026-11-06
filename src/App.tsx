import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesMatrix } from './components/ServicesMatrix.tsx';
import { SocialProof } from './components/SocialProof.tsx';
import { EnquiryForm } from './components/EnquiryForm.tsx';
import { ContactHub } from './components/ContactHub.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthorizedService } from './utils/validation.ts';
import { MessageCircle, Phone, Calendar } from 'lucide-react';

export default function App() {
  const [preSelectedService, setPreSelectedService] = useState<AuthorizedService | null>(null);

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

  const handleBookConsultation = useCallback(() => {
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

      {/* Elevated Mobile Bottom Floating Bar */}
      <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto z-40 bg-[#FCFAF7]/95 backdrop-blur-xl border border-[#E8E2D5] rounded-2xl p-2 md:hidden flex items-center justify-between gap-2 shadow-[0_10px_30px_rgba(41,40,36,0.12)]">
        <a
          href="tel:9976855732"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold text-[#292824] bg-[#F8F5EE] border border-[#E8E2D5] rounded-xl active:bg-[#F2ECE1] transition-all"
          aria-label="Call BIAA BEAUTY"
        >
          <Phone className="w-3.5 h-3.5 text-[#C49E60]" />
          <span>Call 99768</span>
        </a>

        <a
          href="https://wa.me/919976855732?text=Hello%20BIAA%20BEAUTY%2C%20I%20would%20like%20to%20inquire%20about%20bridal%20services%20in%20Erode."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold text-white bg-[#15803D] rounded-xl active:bg-[#166534] transition-all"
          aria-label="WhatsApp BIAA BEAUTY"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={handleBookConsultation}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#BFA054] via-[#B89243] to-[#A37B30] rounded-xl active:scale-[0.98] transition-all shadow-xs"
          aria-label="Book Consultation Form"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}
