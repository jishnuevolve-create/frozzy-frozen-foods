import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";
import heroMain from "../assets/images/hero-main.webp";
import heroMainSm from "../assets/images/hero-main-sm.webp";
import heroFries from "../assets/images/hero-fries-sm.webp";
import { SITE } from "../config/site";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { Seal } from "./Logo";
import { WhatsAppIcon, scrollToId } from "./ui";

const TRUST = ["Wholesale & Retail", "Convenient Ordering", "Quality Food Selection"];

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="home" className="relative overflow-hidden bg-cream pt-[4.5rem]">
      {/* soft organic background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-24 h-[42rem] w-[42rem] rounded-full bg-sage/70 blur-[2px]" />
      </div>

      <div className="container-site relative grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-16">
        <div className="max-w-xl">
          <motion.p className="eyebrow" {...rise(0.05)}>
            {SITE.tagline} · Taliparamba
          </motion.p>
          <motion.h1
            className="mt-5 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
            {...rise(0.12)}
          >
            Good Food.
            <br />
            <span className="italic text-forest">Frozen Fresh.</span>
            <br />
            Delivered with Care.
          </motion.h1>
          <motion.p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-charcoal/75" {...rise(0.22)}>
            Discover quality frozen food products with FROZZY. Explore our collection, find your favourites, and
            order conveniently through WhatsApp.
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" {...rise(0.3)}>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("products");
              }}
              className="btn-primary"
            >
              Explore Our Products
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href={createWhatsAppLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Order on WhatsApp
            </a>
          </motion.div>

          <motion.ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" {...rise(0.4)}>
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium text-emerald-ink/80">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-forest text-cream">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* image composition */}
        <motion.div
          className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative ml-auto aspect-[11/13] w-[88%] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-sage shadow-lift">
            <img
              src={heroMain}
              srcSet={`${heroMainSm} 550w, ${heroMain} 1100w`}
              sizes="(min-width: 1024px) 40vw, 88vw"
              width={1100}
              height={1300}
              alt="Crispy breaded chicken tenders and golden fries served in a basket with dips"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>

          <div className="absolute bottom-[-1.5rem] left-0 w-[38%] overflow-hidden rounded-full border-[6px] border-cream shadow-card">
            <img
              src={heroFries}
              width={280}
              height={280}
              alt="French fries in a wire basket"
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          <div className="absolute -top-2 left-[4%] w-[28%] sm:left-[2%]">
            <Seal className="spin-slow h-auto w-full drop-shadow-[0_10px_20px_rgba(0,52,41,.25)]" fill="#005541" ink="#FFF7E8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
