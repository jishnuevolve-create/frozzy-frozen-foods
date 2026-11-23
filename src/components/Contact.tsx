import { useState, type FormEvent } from "react";
import { MapPin, Send } from "lucide-react";
import { SITE } from "../config/site";
import { PRODUCTS } from "../data/products";
import { enquiryMessage, openWhatsApp, type EnquiryForm } from "../utils/whatsapp";
import { InstagramIcon, Reveal, WhatsAppIcon } from "./ui";

type Errors = Partial<Record<keyof EnquiryForm, string>>;

const EMPTY: EnquiryForm = { name: "", phone: "", product: "", message: "" };

function validate(f: EnquiryForm): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Enter your phone number.";
  else if (digits.length < 10 || digits.length > 13) e.phone = "Enter a valid phone number, e.g. 98765 43210.";
  return e;
}

const productNames = PRODUCTS.map((p) => (p.brand ? `${p.brand} ${p.name}` : p.name));

const inputCls =
  "mt-2 block w-full rounded-xl border bg-cream px-4 py-3 text-[1rem] text-charcoal placeholder:text-charcoal/35 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15";

export default function Contact() {
  const [form, setForm] = useState<EnquiryForm>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof EnquiryForm) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    openWhatsApp(enquiryMessage(form));
    setSent(true);
  };

  const field = (key: keyof EnquiryForm) => ({
    id: `f-${key}`,
    value: form[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `f-${key}-err` : undefined,
    className: `${inputCls} ${errors[key] ? "border-red-700/60" : "border-forest/15"}`,
  });

  const Err = ({ k }: { k: keyof EnquiryForm }) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="mt-1.5 text-sm text-red-800">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="relative bg-sage py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact & Enquiry</p>
          <h2 className="mt-5 text-[2.4rem] leading-[1.08] sm:text-5xl">Let's Make Your Next Order Easy</h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-charcoal/70">
            Message us on WhatsApp, visit the store, or fill in the form. We'll get back to you with prices and
            availability.
          </p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-cream p-4 transition hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-cream">
                  <WhatsAppIcon />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">WhatsApp</span>
                  <span className="font-display text-xl text-emerald-ink">{SITE.whatsappDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-cream p-4 transition hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-cream">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Visit us</span>
                  <span className="block text-[0.98rem] font-medium leading-snug text-emerald-ink">{SITE.address}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-cream p-4 transition hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-cream">
                  <InstagramIcon />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Instagram</span>
                  <span className="font-display text-xl text-emerald-ink">{SITE.instagramHandle}</span>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-[2rem] bg-paper p-6 shadow-card sm:p-10"
            aria-labelledby="form-title"
          >
            <h3 id="form-title" className="text-[1.75rem] leading-tight">
              Send an enquiry
            </h3>
            <p className="mt-1.5 text-sm text-charcoal/60">Your message opens in WhatsApp, ready to send.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="text-sm font-semibold text-emerald-ink">
                  Your name <span className="text-red-800">*</span>
                </label>
                <input type="text" autoComplete="name" placeholder="e.g. Fathima" required {...field("name")} />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor="f-phone" className="text-sm font-semibold text-emerald-ink">
                  Phone number <span className="text-red-800">*</span>
                </label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required {...field("phone")} />
                <Err k="phone" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-product" className="text-sm font-semibold text-emerald-ink">
                  Product interested in
                </label>
                <select {...field("product")}>
                  <option value="">Choose a product (optional)</option>
                  {productNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                  <option value="Wholesale / bulk order">Wholesale / bulk order</option>
                  <option value="Something else">Something else</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="text-sm font-semibold text-emerald-ink">
                  Message
                </label>
                <textarea rows={4} placeholder="Quantity, pack size, delivery area…" {...field("message")} />
              </div>
            </div>

            <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
              <Send className="h-4 w-4" /> Send on WhatsApp
            </button>
            <p className="mt-3 text-sm text-forest" role="status" aria-live="polite">
              {sent ? "WhatsApp opened with your enquiry. Tap send in WhatsApp to deliver it." : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
