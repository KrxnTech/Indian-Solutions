import { COMPANY_INFO } from './company';

/**
 * COMPANY LOCATIONS (6 Locations Total)
 * 
 * 1. Head Office / Operations
 * 2. Work Shop
 * 3. Chhatral Branch
 * 4. Gandhinagar Branch
 * 5. Ahmedabad Branch
 * 6. Siddhpur Branch
 */

export const ALL_LOCATIONS = [
  {
    id: 'head-office',
    name: 'Head Office',
    fullName: 'Head Office / Operations',
    badge: 'Head Office',
    isHeadOffice: true,
    address: 'Hotel Amiras Compound, Ahmedabad - Mehsana Highway, Ta. Kalol, Dist. Gandhinagar, Gujarat - 382729',
    phone: COMPANY_INFO.phonePrimary,
    email: COMPANY_INFO.email,
    mapUrl: 'https://maps.google.com/?q=7CJR%2B874+Hotel+Amiras+Compound,+to,+Ahmedabad+-+Mehsana+Rd,+near+Chhatral,+Chokdi,+GIDC+Chhatral,+Gujarat+382729',
  },
  {
    id: 'workshop',
    name: 'Work Shop',
    fullName: 'Work Shop Facility',
    badge: 'Work Shop',
    isHeadOffice: false,
    address: 'Phase 1, Plot No. 914, G.i.d.c. Chhatral, Ta. Kalol, Dist.- Gandhinagar- 382729. Gujarat.',
    phone: '',
    email: '',
    mapUrl: 'https://maps.google.com/?q=Plot+No.+914+Phase+1+GIDC+Chhatral+Kalol+Gandhinagar+382729+Gujarat',
  },
  {
    id: 'chhatral-branch',
    name: 'Chhatral Branch',
    fullName: 'Chhatral Branch Office',
    badge: 'Branch Office',
    isHeadOffice: false,
    address: 'Hotel Amiras Compound, Ahmedabad-mehsana Highway, Chhatral, Ta. Kalol.',
    phone: '',
    email: '',
    mapUrl: 'https://maps.google.com/?q=Hotel+Amiras+Compound+Ahmedabad+Mehsana+Highway+Chhatral+Kalol',
  },
  {
    id: 'gandhinagar-branch',
    name: 'Gandhinagar Branch',
    fullName: 'Gandhinagar Branch Office',
    badge: 'Branch Office',
    isHeadOffice: false,
    address: 'E-85, Sector 26, G.i.d.c. Gandhinagar, Gujarat.',
    phone: '',
    email: '',
    mapUrl: 'https://maps.google.com/?q=E-85+Sector+26+GIDC+Gandhinagar+Gujarat',
  },
  {
    id: 'ahmedabad-branch',
    name: 'Ahmedabad Branch',
    fullName: 'Ahmedabad Branch Office',
    badge: 'Branch Office',
    isHeadOffice: false,
    address: 'B-26, Patel Estate, Sarkhej, Ahmedabad, Gujarat.',
    phone: '',
    email: '',
    mapUrl: 'https://maps.google.com/?q=B-26+Patel+Estate+Sarkhej+Ahmedabad+Gujarat',
  },
  {
    id: 'siddhpur-branch',
    name: 'Siddhpur Branch',
    fullName: 'Siddhpur Branch Office',
    badge: 'Branch Office',
    isHeadOffice: false,
    address: 'Perfect Studio, Kakoshi Char Rasta.',
    phone: '',
    email: '',
    mapUrl: 'https://maps.google.com/?q=Perfect+Studio+Kakoshi+Char+Rasta+Siddhpur+Gujarat',
  },
];

// Backwards-compatible export of the 5 additional locations
export const ADDITIONAL_LOCATIONS = ALL_LOCATIONS.filter((l) => !l.isHeadOffice);
