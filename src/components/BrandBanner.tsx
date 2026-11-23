import { ArrowRight } from "lucide-react";
import banner from "../assets/images/banner.webp";
import bannerSm from "../assets/images/banner-sm.webp";
import { Seal } from "./Logo";
import { Reveal, ScallopEdge, scrollToId } from "./ui";

export default function BrandBanner() {
  return (
    <section aria-labelledby="banner-heading" className="relative overflow-hidden bg-emerald-ink">
      <img
        src={banner}
        srcSet={`${bannerSm} 960w, ${banner} 1920w`}
        sizes="100vw"
        width={1920}
        height={1080}
        loading="lazy"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-ink/95 via-emerald-ink/80 to-emerald-ink/40" />
      <ScallopEdge color="#005541" className="relative" />

      <div className="container-site relative flex min-h-[26rem] flex-col justify-center py-20 sm:min-h-[32rem]">
        <Reveal className="max-w-2xl">
          <h2 id="banner-heading" className="text-[2.6rem] leading-[1.05] !text-cream sm:text-6xl">
            Make Every Meal a Little More <span className="italic text-gold">Convenient.</span>
          </h2>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("products");
            }}
            className="btn-cream mt-9"
          >
            Explore Our Collection <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Seal
          className="spin-slow absolute bottom-10 right-6 hidden w-32 opacity-90 md:block lg:right-12 lg:w-40"
          fill="#FFF7E8"
          ink="#005541"
        />
      </div>
      <ScallopEdge color="#FFF7E8" direction="up" className="relative" />
    </section>
  );
}
