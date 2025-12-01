import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-accent"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      {/* 3D Spotlight Effect with Enhanced Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] gradient-radial blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-2 border-primary/30 rounded-2xl rotate-12 animate-float shadow-soft"></div>
      <div className="absolute bottom-32 right-10 w-32 h-32 border-2 border-primary/30 rounded-2xl -rotate-6 animate-float shadow-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 gold-gradient-subtle rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-20 w-16 h-16 gold-gradient-subtle rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Logo/Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-10 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 gold-gradient rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-glow"></div>
              <div className="relative w-28 h-28 gold-gradient rounded-3xl flex items-center justify-center shadow-gold-hover transform hover:rotate-12 hover:scale-110 transition-all duration-300">
                <span className="text-6xl font-bold text-primary-foreground font-heading">A</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Heading with Gradient */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-foreground mb-6 leading-[1.1]"
          >
            Building Dreams Into{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Reality
              </span>
              <span className="absolute inset-0 blur-xl bg-primary/20"></span>
            </span>
          </motion.h1>

          {/* Enhanced Taglines */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-3 font-medium"
          >
            Premium Construction & Architecture Services
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Coimbatore & Salem's Most Trusted Construction Partner · 15+ Years Experience
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button variant="gold" size="xl" className="group relative overflow-hidden" asChild>
              <Link to="/projects">
                <span className="relative z-10">View Our Projects</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </Button>
            <Button variant="outline-gold" size="xl" className="group" asChild>
              <Link to="/appointment">
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Book Appointment</span>
              </Link>
            </Button>
          </motion.div>

          {/* Enhanced Stats with Cards */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "15+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-card p-4 md:p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover-lift"
              >
                <p className="text-3xl md:text-5xl font-heading font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
