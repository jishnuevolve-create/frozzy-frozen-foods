import { ArrowRight } from "lucide-react";
import pantry from "../assets/images/about-pantry.webp";
import pantrySm from "../assets/images/about-pantry-sm.webp";
import spices from "../assets/images/about-spices-sm.webp";
import { Reveal, scrollToId } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative bg-cream py-20 sm:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 max-w-lg lg:order-1">
          <p className="eyebrow">About FROZZY</p>
          <h2 className="mt-5 text-[2.4rem] leading-[1.08] sm:text-5xl">Your Everyday Frozen Food Partner</h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-charcoal/75">
            At FROZZY Frozen Foods, we make discovering and ordering frozen food simple and convenient. From everyday
            favourites to exciting food choices, we bring a carefully presented selection of products to your doorstep.
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/75">
            Our store in Taliparamba stocks frozen snacks, cheese, sauces and pantry staples, for family kitchens as
            well as cafés, bakeries and restaurants buying in bulk.
          </p>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("products");
            }}
            className="group mt-9 inline-flex items-center gap-3 font-semibold text-forest"
          >
            <span className="border-b border-forest/30 pb-1 transition-colors group-hover:border-forest">
              Discover Our Collection
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-cream transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </Reveal>

        <Reveal className="relative order-1 lg:order-2" delay={0.1}>
          <div className="relative mr-auto aspect-[11/13] w-[86%] overflow-hidden rounded-[2.5rem] rounded-tr-[10rem] shadow-card">
            <img
              src={pantry}
              srcSet={`${pantrySm} 550w, ${pantry} 1100w`}
              sizes="(min-width: 1024px) 40vw, 86vw"
              width={1100}
              height={1300}
              loading="lazy"
              alt="Shelves stocked with jars of pantry ingredients"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-0 w-[40%] rotate-3 overflow-hidden rounded-[1.75rem] border-[6px] border-cream shadow-lift">
            <img
              src={spices}
              width={280}
              height={280}
              loading="lazy"
              alt="Spoons of colourful spices and seasonings"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -left-3 top-10 hidden rounded-2xl bg-forest px-5 py-4 text-cream shadow-lift sm:block">
            <p className="font-display text-3xl leading-none">Since 2025</p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream/70">Taliparamba, Kannur</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
