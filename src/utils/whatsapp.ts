import { SITE } from "../config/site";

export const WHATSAPP_NUMBER = SITE.whatsappNumber;

export const createWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const MESSAGES = {
  general: "Hi FROZZY Frozen Foods! I'd like to know more about your products.",
  wholesale:
    "Hi FROZZY Frozen Foods! I'm interested in wholesale purchasing. Please share your available products and wholesale details.",
  product: (name: string, size?: string) =>
    `Hi FROZZY Frozen Foods! I'm interested in ordering ${name}${size ? ` (${size})` : ""}. Please share the price and availability.`,
};

export interface EnquiryForm {
  name: string;
  phone: string;
  product: string;
  message: string;
}

export const enquiryMessage = (f: EnquiryForm): string =>
  [
    "Hi FROZZY Frozen Foods! I have an enquiry.",
    "",
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `Product interested in: ${f.product.trim() || "Not specified"}`,
    f.message.trim() ? `Message: ${f.message.trim()}` : "",
  ]
    .filter((line, i, arr) => !(line === "" && i === arr.length - 1))
    .join("\n");

/** Opens WhatsApp in a new tab (falls back to same tab if pop-ups are blocked). */
export const openWhatsApp = (message: string): void => {
  const url = createWhatsAppLink(message);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
};
