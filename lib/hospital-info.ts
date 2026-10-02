// Contact details exactly as published on the live site (banner phone pill,
// footer, /contact-us info cards, /visitor-information "Need Assistance?" box,
// /find-a-location card + its map coordinates).
export const HOSPITAL = {
  name: "Gramy Hospital",
  city: "Mumbai",
  address: "WR7G+PFC, Sidhwa Estate, Azad Nagar, Colaba, Mumbai, Maharashtra 400005",
  phoneLabel: "+91 22-35347300",
  phoneHref: "tel:022-35347300",
  whatsappLabel: "+91 88288 66601",
  // Live href is the scheme-less `wa.link/nca63u` (resolves relative and 404s).
  whatsappHref: "https://wa.link/nca63u",
  email: "care@gramyhospital.com",
  emailHref: "mailto:care@gramyhospital.com",
  latitude: 18.910227,
  longitude: 72.813001,
  visitingHours: ["Sunday: 08:00 AM - 10:00 PM", "Monday - Friday: 06:00 AM - 12:00 AM"],
  facilities: ["General Hospital", "Diagnostic Center"],
} as const;

export const HOSPITAL_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${HOSPITAL.latitude},${HOSPITAL.longitude}`;

export interface HospitalLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  image: { src: string; width: number; height: number };
  /** Live `.match-service` values the Service filter matches against. */
  services: readonly string[];
  phoneLabel: string;
  phoneHref: string;
  visitingHours: readonly string[];
  facilities: readonly string[];
  directionsUrl: string;
}

// The live /find-a-location/ widget lists a single centre.
export const LOCATIONS: HospitalLocation[] = [
  {
    id: "gramy-hospital-colaba",
    name: HOSPITAL.name,
    city: HOSPITAL.city,
    address: HOSPITAL.address,
    latitude: HOSPITAL.latitude,
    longitude: HOSPITAL.longitude,
    image: { src: "/images/site/WhatsApp-Image-2026-07-29-at-10.13.36-AM-1.jpeg", width: 1280, height: 960 },
    services: ["All Services"],
    phoneLabel: HOSPITAL.phoneLabel,
    phoneHref: HOSPITAL.phoneHref,
    visitingHours: HOSPITAL.visitingHours,
    facilities: HOSPITAL.facilities,
    directionsUrl: HOSPITAL_DIRECTIONS_URL,
  },
];
