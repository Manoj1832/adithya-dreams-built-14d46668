import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Layers, ShieldCheck, BadgeCheck } from "lucide-react";

const Hero = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        spotlightRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full pt-24 pb-24 md:pt-[120px] md:pb-[140px] flex items-center justify-center overflow-hidden">

      {/* --- Premium Background Layers --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-white"></div>
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/assets/textures/noise.png')] pointer-events-none"></div>

      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"
      ></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:max-w-[1200px] mx-auto">

          {/* --- Left Content --- */}
          <div className="col-span-12 lg:col-span-6 text-center lg:text-left">

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-[32px] md:text-[48px] lg:text-[60px] tracking-tight font-heading font-bold text-neutral-900 leading-[1.25] md:leading-[1.1]"
            >
              Premium Construction
              <br />
              <span className="bg-gradient-to-r from-primary to-neutral-700 bg-clip-text text-transparent">
                Delivered On-Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 md:mt-5 text-neutral-600 max-w-[450px] mx-auto lg:mx-0 text-[16px] md:text-[17px] leading-relaxed"
            >
              Residential, commercial, and structural projects built with 
              premium materials, strict engineering standards, and guaranteed timelines.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                className="h-11 md:h-12 rounded-full px-6 md:px-7 text-sm md:text-base bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:translate-y-[-2px] transition-all w-auto"
              >
                <Link to="/appointment">Book Free Consultation</Link>
              </Button>

              <a href="tel:6374507535">
                <Button
                  variant="outline"
                  className="h-11 md:h-12 rounded-full px-6 md:px-7 text-sm md:text-base border border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-100 shadow-md hover:translate-y-[-2px] transition-all flex gap-2 w-auto"
                >
                  <Phone className="w-[20px] h-[20px]" />
                  Call: 63745 07535
                </Button>
              </a>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-500 text-sm mt-5 flex items-center gap-2 justify-center lg:justify-start"
            >
              <BadgeCheck className="w-4 h-4 text-primary" />
              30+Completed Projects • Since 2012
            </motion.p>
          </div>

          {/* --- Hero Image --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-12 lg:col-span-6 flex lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-neutral-200"
            >
              <img
                src="/assets/hero1.jpg"

                alt="Construction Hero"
                className="w-full max-w-[520px] h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { value: "M20", label: "Concrete Grade", icon: Layers },
              { value: "Fe550", label: "Steel Quality", icon: ShieldCheck },
              { value: "IS Codes", label: "Compliance", icon: BadgeCheck },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="group w-[9.5rem] h-[9.5rem] sm:w-[10.5rem] sm:h-[10.5rem] md:w-[11rem] md:h-[11rem] rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-5 sm:p-6 shadow-xl hover:scale-[1.04] hover:shadow-2xl transition-all text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-[26px] font-heading font-bold">
                  {stat.value}
                </p>
                <p className="text-[13px] mt-1 opacity-70 tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
