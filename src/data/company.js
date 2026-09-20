export const COMPANY_INFO = {
  name: 'Indian Safety Solution',
  shortName: 'ISS',
  tagline: 'Complete Industrial & Fire Safety Solutions',
  description:
    'Indian Safety Solution (ISS) is a dedicated provider of complete industrial safety and fire protection solutions. We supply certified industrial PPE, fire fighting systems, emergency response equipment, safety sign boards, and provide specialized industrial safety project execution.',
  address: {
    compound: 'Hotel Amiras Compound',
    highway: 'Ahmedabad - Mehsana Highway',
    taluka: 'Ta. Kalol',
    district: 'Dist. Gandhinagar',
    stateZip: 'Gujarat - 382729',
    full: 'Hotel Amiras Compound, Ahmedabad - Mehsana Highway, Ta. Kalol, Dist. Gandhinagar, Gujarat - 382729',
  },
  phones: [
    '+91 89 80 748 339',
    '+91 88 66 448 339',
  ],
  phonePrimary: '+91 89 80 748 339',
  phoneSecondary: '+91 88 66 448 339',
  email: 'indiansafetysolution@gmail.com',
  website: 'indiansafetysolution.com',
  websiteUrl: 'https://indiansafetysolution.com',
  businessHours: 'Monday – Saturday: 09:00 AM – 06:30 PM IST',
  coreFocus: [
    'Industrial Fire Safety Equipment',
    'Personal Protective Equipment (PPE)',
    'Fire Fighting Project Work',
    'Safety Sign Board Systems',
    'Lockout & Tagout (LOTO)',
    'Safety Training & Documentation',
  ],
};

export function getWhatsAppUrl(customMessage) {
  const cleanPhone = COMPANY_INFO.phonePrimary.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    customMessage ||
      `Hello ${COMPANY_INFO.name}, I am contacting you from your website. I would like to inquire about industrial safety products and fire protection services.`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
