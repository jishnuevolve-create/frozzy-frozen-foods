import { ArrowDown, Check, ShoppingBag, Truck } from "lucide-react";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { Reveal, ScallopEdge, WhatsAppIcon, scrollToId } from "./ui";

const RETAIL = ["Explore available products", "Ask about pricing", "Order conveniently through WhatsApp"];
const WHOLESALE = ["Enquire about bulk orders", "Request product information", "Discuss availability"];

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={2.2} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WholesaleRetail() {
  return (
    <section id="wholesale-retail" className="relative bg-forest text-cream">
      <ScallopEdge color="#FFF7E8" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-1/3 h-[30rem] w-[30rem] rounded-full border border-cream/10" />
        <div className="absolute -right-10 top-[40%] h-[22rem] w-[22rem] rounded-full border border-cream/10" />
      </div>

      <div className="container-site relative py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-gold before:!bg-gold">Wholesale & Retail</p>
          <h2 className="mt-5 text-[2.4rem] leading-[1.08] !text-cream sm:text-5xl">Frozen Food Solutions for Every Need</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-cream/75">
            Whether you're shopping for your home or purchasing for your business, connect with FROZZY to explore our
            available products.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[2rem] bg-cream p-8 text-charcoal sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-sage text-forest">
                <ShoppingBag className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">For your home</p>
              <h3 className="mt-2 text-[2rem] leading-tight">Retail Customers</h3>
              <List items={RETAIL} />
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("products");
                }}
                className="btn-primary mt-auto self-start !mt-10"
              >
                Shop Retail <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[2rem] border border-cream/15 bg-emerald-ink/60 p-8 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-emerald-ink">
                <Truck className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">For your business</p>
              <h3 className="mt-2 text-[2rem] leading-tight !text-cream">Wholesale Customers</h3>
              <div className="text-cream/85">
                <List items={WHOLESALE} />
              </div>
              <a
                href={createWhatsAppLink(MESSAGES.wholesale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-auto self-start !mt-10"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" /> Wholesale Enquiry
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
