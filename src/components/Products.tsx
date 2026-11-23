import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, PRODUCTS, productImage, type Category, type Product } from "../data/products";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { Reveal, ScallopEdge, WhatsAppIcon } from "./ui";

const categoryLabel = (id: Product["category"]) => CATEGORIES.find((c) => c.id === id)?.label ?? "";

function ProductCard({ product }: { product: Product }) {
  const img = productImage(product.id);
  const title = product.brand ? `${product.brand} ${product.name}` : product.name;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream shadow-card ring-1 ring-forest/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-sage">
        {img.large && (
          <img
            src={img.large}
            srcSet={`${img.small} 480w, ${img.large} 800w`}
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            alt={`${title}, representative photo`}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-forest backdrop-blur">
          {categoryLabel(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.brand && (
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#9a7b3c]">{product.brand}</p>
        )}
        <h3 className="mt-1 text-[1.45rem] leading-tight">{product.name}</h3>
        <p className="mt-2 text-[0.93rem] leading-relaxed text-charcoal/70">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="text-sm">
            {product.size && <p className="font-semibold text-emerald-ink">{product.size}</p>}
            <p className={product.price ? "font-display text-xl text-forest" : "text-charcoal/55"}>
              {product.price ?? "Ask for price"}
            </p>
          </div>
          <a
            href={createWhatsAppLink(MESSAGES.product(title, product.size))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !min-h-[44px] shrink-0 !px-4 text-sm"
            aria-label={`Order ${title} on WhatsApp`}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const [active, setActive] = useState<Category["id"]>("all");
  const reduce = useReducedMotion();
  const list = useMemo(() => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)), [active]);

  return (
    <section id="products" className="relative bg-mist pb-24 sm:pb-32">
      <ScallopEdge color="#FFF7E8" />
      <div className="container-site pt-16 sm:pt-24">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Collection</p>
            <h2 className="mt-5 text-[2.4rem] leading-[1.08] sm:text-5xl">Explore Our Frozen Food Collection</h2>
            <p className="mt-4 text-[1.05rem] text-charcoal/70">Discover food favourites for every occasion.</p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
            Tap <span className="font-semibold text-forest">Order Now</span> on any product. WhatsApp opens with
            your message ready to send.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Filter products by category"
          className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {CATEGORIES.map((c) => {
            const count = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
            const selected = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(c.id)}
                className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-forest bg-forest text-cream"
                    : "border-forest/15 bg-cream text-emerald-ink hover:border-forest/40"
                }`}
              >
                {c.label}
                <span className={`text-xs ${selected ? "text-gold" : "text-charcoal/40"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout={!reduce} className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-10 text-center text-sm text-charcoal/55">
          Product photos are for illustration. Stock changes often, so ask us on WhatsApp for brands, pack sizes and
          prices.
        </p>
      </div>
    </section>
  );
}
