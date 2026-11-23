import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createWhatsAppLink, MESSAGES } from "../utils/whatsapp";
import { WhatsAppIcon } from "./ui";

/** Floating WhatsApp button, bottom-right on every screen size. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={createWhatsAppLink(MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with FROZZY on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#1FAF5A] pl-4 pr-4 text-white shadow-[0_12px_30px_-8px_rgba(0,52,41,.55)] sm:bottom-6 sm:right-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <WhatsAppIcon className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]">
            Order now
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
