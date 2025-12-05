import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const Hero = () => {
  const slides = [
    { src: "/assets/hero0.jpg", title: "The family is incomplete without a own home", sub: "Adithya ensures the Happy Customers" },
    { src: "/assets/hero1.jpg", title: "Build With Confidence", sub: "Residential & commercial projects" },
    { src: "/assets/hero2.jpg", title: "On-Time Delivery", sub: "Planned, tracked, delivered" },
    { src: "/assets/hero3.jpg", title: "Premium Materials", sub: "IS/ISO certified brands" },
    { src: "/assets/hero4.jpg", title: "Experienced Engineers", sub: "Structural integrity assured" },
    { src: "/assets/hero5.jpg", title: "Transparent Pricing", sub: "Clear scope and stages" },
    { src: "/assets/hero6.jpg", title: "Warranty & Support", sub: "Post-handover assistance" },
  ];
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 4000);
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      clearInterval(interval);
      api.off("select", update);
    };
  }, [api]);

  return (
    <section className="relative w-full pt-20 md:pt-24 overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light"></div>
      <div className="absolute inset-0 opacity-[0.06] bg-[url('/assets/textures/noise.png')] pointer-events-none"></div>

      <div className="relative z-10">
        <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
          <CarouselContent>
            {slides.map((s, index) => (
              <CarouselItem key={s.src} className="">
                <div className="relative w-full h-[58vh] sm:h-[64vh] md:h-[78vh]">
                  <img src={s.src} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-4 sm:left-8 max-w-[720px]">
                    <motion.h1
                      key={`title-${current}`}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className={`text-3xl sm:text-4xl md:text-5xl font-heading font-bold ${
                        slides[current].title === "Transparent Pricing" ? "text-black" : "text-white"
                      }`}
                    >
                      {slides[current].title}
                    </motion.h1>
                    <motion.p
                      key={`sub-${current}`}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="mt-2 text-white/80 text-sm sm:text-base"
                    >
                      {slides[current].sub}
                    </motion.p>
                    <motion.div
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mt-3 flex gap-2"
                    >
                      <Button variant="gold" size="lg" asChild>
                        <Link to="/appointment">Get Started</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
