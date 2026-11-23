import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import WholesaleRetail from "./components/WholesaleRetail";
import BrandBanner from "./components/BrandBanner";
import Instagram from "./components/Instagram";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-cream">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <WhyChooseUs />
        <WholesaleRetail />
        <BrandBanner />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
