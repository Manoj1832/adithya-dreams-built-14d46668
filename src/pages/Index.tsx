import Hero from "@/components/home/Hero";
import Testimonials from "@/components/lead/Testimonials";
import TrustBadges from "@/components/lead/TrustBadges";
import ClientLogosMarquee from "@/components/lead/ClientLogosMarquee";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Home, Pencil, CheckCircle, FileCheck, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const services = [
  {
    icon: Home,
    title: "Residential House Construction",
    description: "Complete end-to-end residential construction with premium quality materials and expert craftsmanship.",
    image: "/assets/residential service.jpg",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description: "Professional commercial building solutions for offices, retail spaces, and industrial facilities.",
    image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    icon: Pencil,
    title: "Architectural Designing",
    description: "Innovative architectural designs that blend aesthetics with functionality and sustainability.",
    image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    icon: CheckCircle,
    title: "Structural Designing",
    description: "Robust structural engineering ensuring safety, durability, and compliance with standards.",
    image: "/assets/structural design.jpg",
  },
  {
    icon: FileCheck,
    title: "Building Plan Approval",
    description: "Hassle-free building plan approval services navigating all regulatory requirements.",
    image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
];

const StatCounter = ({ end, duration = 1500 }: { end: number; duration?: number }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(16, Math.floor(duration / end));
    const interval = setInterval(() => {
      start += 1;
      setValue(start);
      if (start >= end) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [end, duration]);
  return <span className="tabular-nums">{value}</span>;
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* Services Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive construction and architectural solutions tailored to bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 hover-lift group relative overflow-hidden border border-border"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="relative w-12 h-12 gold-gradient rounded-xl flex items-center justify-center mb-4 shadow-gold">
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="gold" size="lg" asChild>
              <Link to="/services">
                Explore All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <TrustBadges />
      </motion.div>

      {/* Stats Section */}
      <section className="py-16 px-4 lg:px-8 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="glass-card p-8 rounded-2xl text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-5xl font-heading font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                <StatCounter end={8} duration={1200} />+
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Years of Experience</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-5xl font-heading font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                <StatCounter end={30} duration={1500} />+
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Completed Projects</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-5xl font-heading font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                <StatCounter end={100} duration={1600} />+
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clients Logos Marquee */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <ClientLogosMarquee />
      </motion.div>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">Adithya?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality, trust, and excellence in every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gold-gradient rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-glow"></div>
                <div className="relative w-24 h-24 gold-gradient rounded-full flex items-center justify-center shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:scale-110">
                  <span className="text-4xl font-bold text-foreground">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">70-Point Quality Checklist</h3>
              <p className="text-muted-foreground">
                Every project undergoes rigorous quality checks at every stage
              </p>
              <Button variant="link" asChild className="mt-4">
                <Link to="/quality-checklist">View Checklist →</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <span className="text-3xl font-bold text-foreground">💰</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                Estimate your construction cost with our free online calculator
              </p>
              <Button variant="link" asChild className="mt-4">
                <Link to="/construction-cost">Open Cost Calculator →</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <span className="text-3xl font-bold text-foreground">⭐</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">8+ Years Experience</h3>
              <p className="text-muted-foreground">
                30+successfully completed projects across Coimbatore and Salem
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <Testimonials />
      </motion.div>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-12 md:p-16 text-center shadow-medium border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 gold-gradient-subtle rounded-full blur-3xl opacity-30"></div>
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-primary/20 rounded-full mb-6"
              >
                <p className="text-sm font-semibold text-primary">Limited Time Offer</p>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Ready to Build Your Dream?
              </h2>
              <p className="text-lg text-muted-foreground mb-2 max-w-2xl mx-auto">
                Schedule a <span className="text-primary font-semibold">FREE consultation</span> with our expert team
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Get instant quote • No obligation • Expert advice
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button variant="gold" size="xl" asChild className="group w-full sm:w-auto">
                  <Link to="/appointment">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Book Free Consultation
                  </Link>
                </Button>
                <a href="tel:6374507535" className="w-full sm:w-auto">
                  <Button variant="gold" size="xl" className="group w-full sm:w-auto">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Call: 63745 07535
                  </Button>
                </a>
                <a
                  href="https://wa.me/916374507535?text=Hi! I'd like to know more about your construction services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="xl" className="group w-full sm:w-auto bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BA5A]">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    WhatsApp
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                ⚡ Response within 2 hours • 📞 Available Mon-Sat 9 AM - 6 PM
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
