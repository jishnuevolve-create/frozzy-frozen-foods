import { MapPin } from "lucide-react";
import { NAV_ITEMS, SITE } from "../config/site";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { Seal } from "./Logo";
import { InstagramIcon, ScallopEdge, WhatsAppIcon, scrollToId } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();
  const link = (id: string) => ({
    href: `#${id}`,
    onClick: (e: { preventDefault: () => void }) => {
      e.preventDefault();
      scrollToId(id);
    },
  });

  return (
    <footer className="relative bg-emerald-deep text-cream/80">
      <ScallopEdge color="#DCE9DF" />
      <div className="container-site grid gap-12 pb-10 pt-16 sm:pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Seal className="w-28" fill="#FFF7E8" ink="#004B3D" />
          <p className="mt-6 max-w-xs leading-relaxed">
            Frozen foods, cheese, sauces and pantry essentials for homes and businesses in Taliparamba, Kannur.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <a {...link(n.id)} className="transition-colors hover:text-cream">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shop</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a {...link("products")} className="transition-colors hover:text-cream">
                Product collection
              </a>
            </li>
            <li>
              <a {...link("wholesale-retail")} className="transition-colors hover:text-cream">
                Retail orders
              </a>
            </li>
            <li>
              <a href={createWhatsAppLink(MESSAGES.wholesale)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cream">
                Wholesale enquiry
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Get in touch</p>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={createWhatsAppLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cream">
                <WhatsAppIcon className="h-5 w-5 text-gold" /> {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cream">
                <InstagramIcon className="h-5 w-5 text-gold" /> {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-cream">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> {SITE.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-cream/10 py-6 pb-24 text-sm text-cream/55 sm:flex-row sm:justify-between sm:pb-6">
        <p>© {year} FROZZY Frozen Foods. All rights reserved.</p>
        <p>{SITE.location}</p>
      </div>
    </footer>
  );
}
