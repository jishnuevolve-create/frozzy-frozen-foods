/**
 * Central business details. Change contact info here and it updates
 * everywhere on the site (navbar, contact, footer, WhatsApp links).
 */
export const SITE = {
  name: "FROZZY Frozen Foods",
  shortName: "FROZZY",
  tagline: "Wholesale & Retail",
  whatsappNumber: "917025645506", // country code + number, no "+" or spaces
  whatsappDisplay: "+91 70256 45506",
  instagramUrl: "https://www.instagram.com/frozzy_frozen_foods/",
  instagramHandle: "@frozzy_frozen_foods",
  location: "Taliparamba, Kannur, Kerala, India",
  address: "Near Salafi Masjid, Nhatuvayal, Taliparamba 670141, Kannur, Kerala",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Salafi+Masjid+Nhatuvayal+Taliparamba",
} as const;

export interface NavItem {
  id: string;
  label: string;
}

/** Order here = order in the navbar and footer. Each id must match a section id. */
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "why-frozzy", label: "Why FROZZY" },
  { id: "wholesale-retail", label: "Wholesale & Retail" },
  { id: "contact", label: "Contact" },
];
