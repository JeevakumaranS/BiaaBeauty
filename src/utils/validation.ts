export interface EnquiryFormData {
  clientName: string;
  phoneNumber: string;
  eventDate: string;
  services: string[];
  venueNotes: string;
}

export interface ValidationErrors {
  clientName?: string;
  phoneNumber?: string;
  eventDate?: string;
  services?: string;
}

export const AUTHORIZED_SERVICES = [
  'Bridal Makeup',
  'Hair Styling',
  'Saree Draping',
] as const;

export type AuthorizedService = (typeof AUTHORIZED_SERVICES)[number];

export function validateClientName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Client name is required.' };
  }
  // Minimum 2 alphabetical characters (allowing spaces, hyphens, and apostrophes)
  const alphaChars = trimmed.replace(/[^a-zA-Z]/g, '');
  if (alphaChars.length < 2) {
    return { isValid: false, error: 'Name must contain at least 2 alphabetical characters.' };
  }
  return { isValid: true };
}

export function cleanIndianPhoneNumber(phone: string): string {
  // Strip whitespace, dashes, parens, and leading country code +91 or 91 or 0
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  // Standard 10-digit Indian mobile number starting with 6, 7, 8, or 9
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter exactly 10 digits for an Indian mobile number (starting with 6-9).',
    };
  }
  return { isValid: true };
}

export function validateEventDate(dateString: string): { isValid: boolean; error?: string } {
  const trimmed = dateString.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Event date is required.' };
  }
  
  // Format should be YYYY-MM-DD
  const parts = trimmed.split('-');
  if (parts.length !== 3) {
    return { isValid: false, error: 'Invalid date format.' };
  }
  
  const [year, month, day] = parts.map(Number);
  const inputDate = new Date(year, month - 1, day);
  
  if (isNaN(inputDate.getTime())) {
    return { isValid: false, error: 'Invalid calendar date.' };
  }
  
  // Compare with start of today in local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (inputDate < today) {
    return { isValid: false, error: 'Event date must be today or a future date.' };
  }
  
  return { isValid: true };
}

export function validateServices(services: string[]): { isValid: boolean; error?: string } {
  if (!services || services.length === 0) {
    return { isValid: false, error: 'Please select at least one service.' };
  }
  const hasInvalid = services.some(
    (s) => !AUTHORIZED_SERVICES.includes(s as AuthorizedService)
  );
  if (hasInvalid) {
    return { isValid: false, error: 'Only authorized bridal styling services may be selected.' };
  }
  return { isValid: true };
}

export function validateEnquiryForm(data: EnquiryFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};
  
  const nameRes = validateClientName(data.clientName);
  if (!nameRes.isValid) errors.clientName = nameRes.error;

  const phoneRes = validatePhoneNumber(data.phoneNumber);
  if (!phoneRes.isValid) errors.phoneNumber = phoneRes.error;

  const dateRes = validateEventDate(data.eventDate);
  if (!dateRes.isValid) errors.eventDate = dateRes.error;

  const servicesRes = validateServices(data.services);
  if (!servicesRes.isValid) errors.services = servicesRes.error;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateWhatsAppUrl(data: EnquiryFormData): string {
  const cleanedPhone = cleanIndianPhoneNumber(data.phoneNumber);
  const formattedServices = data.services.length > 0 ? data.services.join(', ') : 'Not selected';
  
  const lines = [
    `*Bridal Consultation Inquiry — BIAA BEAUTY*`,
    `Hello BIAA BEAUTY, I would like to check availability for my upcoming wedding event:`,
    ``,
    `*Client Name:* ${data.clientName.trim()}`,
    `*Contact Number:* ${cleanedPhone}`,
    `*Event Date:* ${data.eventDate}`,
    `*Services Requested:* ${formattedServices}`,
  ];

  if (data.venueNotes && data.venueNotes.trim()) {
    lines.push(`*Venue / Notes:* ${data.venueNotes.trim()}`);
  }

  lines.push(``);
  lines.push(`Looking forward to your consultation and bridal trial details!`);

  const message = lines.join('\n');
  return `https://wa.me/919976855732?text=${encodeURIComponent(message)}`;
}
