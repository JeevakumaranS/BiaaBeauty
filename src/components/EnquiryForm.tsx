import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Phone,
  User,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import {
  EnquiryFormData,
  ValidationErrors,
  AUTHORIZED_SERVICES,
  AuthorizedService,
  validateEnquiryForm,
  getTodayDateString,
  generateWhatsAppUrl,
  cleanIndianPhoneNumber,
} from "../utils/validation.ts";

interface EnquiryFormProps {
  preSelectedService?: AuthorizedService | null;
  onClearPreSelectedService?: () => void;
}

interface ServiceSubDetail {
  title: string;
  badge: string;
  tagline: string;
}

const SERVICE_META: Record<AuthorizedService, ServiceSubDetail> = {
  "Bridal Makeup": {
    title: "Bridal Makeup",
    badge: "HD · Ultra HD · Air Brush",
    tagline: "Elegant / HD / Ultra HD / Air Brush Artistry",
  },
  "Hair Styling": {
    title: "Hair Styling",
    badge: "Elegant & Premium",
    tagline: "Poola Jada, Modern Waves & Updos",
  },
  "Saree Draping": {
    title: "Saree Draping",
    badge: "Pre & Spot Pleating",
    tagline: "Box Folding & Silk Knife-Edge Pleats",
  },
};

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preSelectedService,
  onClearPreSelectedService,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    clientName: "",
    phoneNumber: "",
    eventDate: "",
    services: [],
    venueNotes: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState("");
  const [submittedData, setSubmittedData] = useState<EnquiryFormData | null>(
    null,
  );
  const [copiedRef, setCopiedRef] = useState(false);

  const formSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => {
        const alreadyHas = prev.services.includes(preSelectedService);
        const newServices = alreadyHas
          ? prev.services
          : [...prev.services, preSelectedService];
        return {
          ...prev,
          services: newServices,
        };
      });
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  }, [preSelectedService]);

  const handleServiceToggle = (service: AuthorizedService) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const updated = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });

    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "phoneNumber"
        ? value.replace(/\D/g, "").slice(0, 10)
        : name === "eventDate"
          ? value.replace(/^(\d{4})\d+(-\d{2}-\d{2})$/, "$1$2")
          : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnquiryForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `BIA-${new Date().getFullYear()}-${randomSuffix}`;
    setSubmissionReference(refCode);
    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(submissionReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      phoneNumber: "",
      eventDate: "",
      services: [],
      venueNotes: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
    if (onClearPreSelectedService) {
      onClearPreSelectedService();
    }
  };

  const todayMinDate = getTodayDateString();

  return (
    <section
      id="enquiry"
      ref={formSectionRef}
      className="py-12 md:py-28 bg-[#FAF8F5] border-b border-[#E8E2D5] relative scroll-mt-20 overflow-hidden"
    >
      {/* Ambient warm radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(196,158,96,0.16),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292824] tracking-tight mb-2 sm:mb-3"
          >
            Reserve Your Wedding Date
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#68625B] leading-relaxed max-w-xl mx-auto"
          >
            Check Muhurtham date availability with BIAA BEAUTY atelier. We
            personally confirm booking slots and trial consultations within 24
            hours.
          </motion.p>
        </div>

        {/* Modern Centered Consultation Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E8E2D5] shadow-xl overflow-hidden p-6 sm:p-12 relative">
          <AnimatePresence mode="wait">
            {isSubmitted && submittedData ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-[#FAF8F5] border border-[#C49E60]/50 rounded-2xl p-8 sm:p-10 text-center shadow-xs"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-300">
                  Consultation Request Recorded
                </span>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#292824] tracking-tight mt-3 mb-2">
                  Thank You, {submittedData.clientName}!
                </h3>

                <p className="text-xs sm:text-sm text-[#524B42] max-w-md mx-auto mb-6 leading-relaxed">
                  We have logged your wedding inquiry. Our bridal coordinator
                  will reach out to you at{" "}
                  <strong className="text-[#292824] font-semibold">
                    {cleanIndianPhoneNumber(submittedData.phoneNumber)}
                  </strong>{" "}
                  within 24 hours to confirm date availability and trial
                  schedule.
                </p>

                {/* Summary Box */}
                <div className="bg-white rounded-2xl border border-[#E8E2D5] p-5 text-left max-w-md mx-auto mb-6 space-y-3 shadow-2xs">
                  <div className="flex justify-between items-center text-xs pb-2.5 border-b border-[#E8E2D5]">
                    <span className="text-[#68625B]">Booking Reference:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#292824] text-xs">
                        {submissionReference}
                      </span>
                      <button
                        onClick={handleCopyRef}
                        className="p-1 text-[#8C7449] hover:text-[#292824] cursor-pointer"
                        title="Copy Reference"
                      >
                        {copiedRef ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pb-2.5 border-b border-[#E8E2D5]">
                    <span className="text-[#68625B]">
                      Wedding / Event Date:
                    </span>
                    <span className="font-semibold text-[#292824]">
                      {submittedData.eventDate}
                    </span>
                  </div>

                  <div className="flex justify-between items-start text-xs pb-2.5 border-b border-[#E8E2D5]">
                    <span className="text-[#68625B]">Services Selected:</span>
                    <span className="font-semibold text-[#8C7449] text-right">
                      {submittedData.services.join(", ")}
                    </span>
                  </div>

                  {submittedData.venueNotes && (
                    <div className="text-xs pt-1">
                      <span className="text-[#68625B] block mb-1">
                        Venue / Notes:
                      </span>
                      <p className="text-[#292824] italic bg-[#F8F5EE] p-2.5 rounded-xl border border-[#E8E2D5]">
                        {submittedData.venueNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons with Glowing Hover Effects - No Black Backgrounds */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={generateWhatsAppUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send to WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold tracking-wide text-[#524B42] bg-white hover:bg-[#F8F5EE] border border-[#E8E2D5] hover:border-[#C49E60] rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-medium text-[#292824] tracking-tight">
                    Consultant Form
                  </h3>
                  <p className="text-xs text-[#68625B] mt-1">
                    Share your auspicious event details to verify slot
                    availability.
                  </p>
                </div>

                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="clientName"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#292824] mb-1.5"
                    >
                      Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ananya Sivakumar"
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] focus:bg-white rounded-xl border text-xs text-[#292824] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C49E60]/30 focus:border-[#C49E60] transition-all ${
                          errors.clientName
                            ? "border-rose-400 ring-1 ring-rose-300"
                            : "border-[#E8E2D5]"
                        }`}
                        aria-invalid={!!errors.clientName}
                        required
                      />
                    </div>
                    {errors.clientName && (
                      <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.clientName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#292824] mb-1.5"
                    >
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile (e.g. 9976855732)"
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] focus:bg-white rounded-xl border text-xs text-[#292824] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C49E60]/30 focus:border-[#C49E60] transition-all ${
                          errors.phoneNumber
                            ? "border-rose-400 ring-1 ring-rose-300"
                            : "border-[#E8E2D5]"
                        }`}
                        aria-invalid={!!errors.phoneNumber}
                        required
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#292824] mb-1.5"
                  >
                    Event Date (Muhurtham / Reception){" "}
                    <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      min={todayMinDate}
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] focus:bg-white rounded-xl border text-xs text-[#292824] focus:outline-none focus:ring-2 focus:ring-[#C49E60]/30 focus:border-[#C49E60] transition-all ${
                        errors.eventDate
                          ? "border-rose-400 ring-1 ring-rose-300"
                          : "border-[#E8E2D5]"
                      }`}
                      aria-invalid={!!errors.eventDate}
                      required
                    />
                  </div>
                  {errors.eventDate && (
                    <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.eventDate}</span>
                    </p>
                  )}
                </div>

                {/* Service Multi-Select with Modern Cards & Green Ticks */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292824]">
                      Service(s) Needed <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-[10px] text-[#8C7449] font-medium">
                      Select one or multiple
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {AUTHORIZED_SERVICES.map((service) => {
                      const isSelected = formData.services.includes(service);
                      const meta = SERVICE_META[service];

                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 relative ${
                            isSelected
                              ? "bg-gradient-to-br from-[#FAF5E8] to-[#F3ECD8] border-[#C49E60] shadow-xs ring-1 ring-[#C49E60]/40"
                              : "bg-[#F8F5EE] text-[#292824] border-[#E8E2D5] hover:border-[#C49E60]/60 hover:bg-white"
                          }`}
                          aria-pressed={isSelected}
                        >
                          <div className="flex items-start justify-between gap-1.5 w-full">
                            <span className="text-xs font-semibold text-[#292824]">
                              {service}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                                isSelected
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] leading-tight ${
                              isSelected
                                ? "text-[#8C7449] font-medium"
                                : "text-[#68625B]"
                            }`}
                          >
                            {meta.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.services && (
                    <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.services}</span>
                    </p>
                  )}
                </div>

                {/* Venue Notes */}
                <div>
                  <label
                    htmlFor="venueNotes"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-[#292824] mb-1.5"
                  >
                    Event Venue / Special Requests{" "}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    id="venueNotes"
                    name="venueNotes"
                    rows={2}
                    value={formData.venueNotes}
                    onChange={handleInputChange}
                    placeholder="e.g. Muhurtham at 5:30 AM in Erode, Air Brush makeup preference, 2 pre-pleated silk sarees..."
                    className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] focus:bg-white rounded-xl border border-[#E8E2D5] text-xs text-[#292824] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C49E60]/30 focus:border-[#C49E60] transition-all resize-none"
                  />
                </div>

                {/* Submit Actions: White default, glowing gold hover, no black buttons */}
                <div className="pt-3 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#292824] bg-white hover:text-white border border-[#C49E60] rounded-xl transition-all duration-300 cursor-pointer group/btn shadow-xs overflow-hidden hover:border-[#C49E60] hover:bg-gradient-to-r hover:from-[#BFA054] hover:via-[#B89243] hover:to-[#A37B30] hover:shadow-[0_0_25px_rgba(196,158,96,0.45)] active:scale-[0.98]"
                  >
                    {/* Glowing sweep effect on hover */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

                    <Sparkles className="w-3.5 h-3.5 text-[#C49E60] group-hover/btn:text-white group-hover/btn:rotate-45 group-hover/btn:scale-125 transition-all duration-300 shrink-0 relative z-10" />
                    <span className="relative z-10 font-semibold tracking-wider">
                      Submit Consultation Request
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C7449] group-hover/btn:text-white group-hover/btn:translate-x-1.5 transition-all duration-300 shrink-0 relative z-10" />
                  </button>

                  <a
                    href={generateWhatsAppUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-emerald-700 hover:text-white bg-white hover:bg-emerald-600 border border-emerald-300 hover:border-emerald-600 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] group/wa"
                    title="Send filled enquiry straight to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 group-hover/wa:text-white transition-colors shrink-0" />
                    <span>Direct WhatsApp</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-[#68625B]">
                  Direct concierge callback within 24 hours · Prior studio trial
                  slots confirmed
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
