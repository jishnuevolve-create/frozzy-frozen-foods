import { ArrowUpRight } from "lucide-react";
import { SITE } from "../config/site";
import { InstagramIcon, Reveal } from "./ui";
import fries from "../assets/instagram/ig-01-fries.webp";
import habitPicks from "../assets/instagram/ig-02-habit-picks.webp";
import nutalia from "../assets/instagram/ig-03-nutalia.webp";
import wholesale from "../assets/instagram/ig-04-wholesale-retail.webp";
import habitScheme from "../assets/instagram/ig-06-habit-scheme.webp";
import newYear from "../assets/instagram/ig-07-new-year.webp";
import opening from "../assets/instagram/ig-08-opening.webp";
import christmas from "../assets/instagram/ig-09-christmas.webp";

const POSTS = [
  { src: fries, alt: "Ohh! Potato French Fries 2.5 kg pack post" },
  { src: habitPicks, alt: "Taste Habit's Picks: a range of Habit pantry products" },
  { src: nutalia, alt: "Nutalia Hazelnut Paste, available in store" },
  { src: wholesale, alt: "Wholesale and retail available at FROZZY Frozen Foods" },
  { src: habitScheme, alt: "Habit special scheme: panko, pasta, jalapeños and olives" },
  { src: christmas, alt: "Christmas post with chicken tenders, mixed vegetables and ice cream" },
  { src: newYear, alt: "Happy New Year 2026 from FROZZY Frozen Foods" },
  { src: opening, alt: "Invitation to the opening of FROZZY Frozen Foods, 31 December 2025" },
];

export default function Instagram() {
  return (
    <section aria-labelledby="ig-heading" className="bg-cream py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">{SITE.instagramHandle}</p>
            <h2 id="ig-heading" className="mt-5 text-[2.4rem] leading-[1.08] sm:text-5xl">
              Follow the FROZZY Experience
            </h2>
            <p className="mt-4 text-[1.05rem] text-charcoal/70">
              Discover our products, latest updates, and food inspiration.
            </p>
          </div>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary self-start md:self-auto">
            <InstagramIcon className="h-[18px] w-[18px]" /> Follow Us
          </a>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {POSTS.map((p, i) => (
            <li key={p.src}>
              <Reveal delay={(i % 4) * 0.06}>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-2xl bg-sage sm:rounded-3xl"
                >
                  <img
                    src={p.src}
                    width={560}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-emerald-ink/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-forest">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
