import { HeartHandshake, MessageCircle, Snowflake, Store, type LucideIcon } from "lucide-react";
import { Reveal, ScallopEdge } from "./ui";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  {
    icon: Snowflake,
    title: "Quality Food Selection",
    text: "Frozen snacks, cheese, sauces and pantry staples from brands like Habit, Schreiber, Monin and Nutalia.",
  },
  {
    icon: Store,
    title: "Wholesale & Retail Availability",
    text: "Buy a single pack for home or stock up in bulk for your café, bakery or restaurant.",
  },
  {
    icon: MessageCircle,
    title: "Convenient WhatsApp Ordering",
    text: "No sign-up and no checkout. Send us a message with what you need and we'll reply with price and availability.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Focused Service",
    text: "A local store in Taliparamba. Ask us about a product, a pack size or something you can't find.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-frozzy" className="bg-cream pb-24 sm:pb-32">
      <ScallopEdge color="#EAF1EC" className="mb-20 sm:mb-28" />
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why FROZZY</p>
          <h2 className="mt-5 text-[2.4rem] leading-[1.08] sm:text-5xl">Why Choose FROZZY?</h2>
          <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-charcoal/70">
            A neighbourhood frozen food store that keeps ordering simple, whether you need one pack or a hundred.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
              <div className="h-full rounded-[1.75rem] border border-forest/10 bg-paper p-7 transition-colors duration-300 hover:border-forest/25 hover:bg-white sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage text-forest">
                  <f.icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-[1.5rem] leading-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/70">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
