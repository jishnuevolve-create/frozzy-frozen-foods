import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "../config/site";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon, InstagramIcon, scrollToId } from "./ui";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = NAV_ITEMS.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pending = useRef<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // scroll only after the body scroll lock has been released
    if (!open && pending.current) {
      scrollToId(pending.current);
      pending.current = null;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (open) {
      pending.current = id;
      setOpen(false);
    } else {
      scrollToId(id);
    }
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-cream/85 shadow-[0_1px_0_rgba(0,85,65,.10)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-site flex h-[4.5rem] items-center justify-between gap-6" aria-label="Main">
        <a href="#home" onClick={go("home")} aria-label="FROZZY Frozen Foods, back to top" className="rounded-md">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                  active === item.id ? "text-forest" : "text-charcoal/70 hover:text-forest"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={createWhatsAppLink(MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !min-h-[42px] !px-5 text-sm sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Order
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-forest hover:bg-forest/5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-forest text-cream lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-site flex h-[4.5rem] items-center justify-between">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
                aria-label="Close menu"
                autoFocus
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="container-site mt-6 flex-1 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className={`flex items-baseline justify-between border-b border-cream/10 py-4 font-display text-[2rem] leading-tight ${
                      active === item.id ? "text-gold" : "text-cream"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-site space-y-3 pb-8">
              <a
                href={createWhatsAppLink(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full"
              >
                <WhatsAppIcon /> Order on WhatsApp
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn w-full border border-cream/25 text-cream">
                <InstagramIcon /> {SITE.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
