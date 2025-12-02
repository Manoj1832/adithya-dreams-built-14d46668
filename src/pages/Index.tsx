import Hero from "@/components/home/Hero";
import CraneLogo from "@/components/CraneLogo";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Home, Pencil, CheckCircle, FileCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Turnkey House Construction",
    description: "Complete end-to-end residential construction with premium quality materials and expert craftsmanship.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description: "Professional commercial building solutions for offices, retail spaces, and industrial facilities.",
  },
  {
    icon: Pencil,
    title: "Architectural Designing",
    description: "Innovative architectural designs that blend aesthetics with functionality and sustainability.",
  },
  {
    icon: CheckCircle,
    title: "Structural Designing",
    description: "Robust structural engineering ensuring safety, durability, and compliance with standards.",
  },
  {
    icon: FileCheck,
    title: "Building Plan Approval",
    description: "Hassle-free building plan approval services navigating all regulatory requirements.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Crane Logo Section */}
      <section className="py-12 px-4 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-48 h-48 md:w-64 md:h-64"
            >
              <CraneLogo />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left max-w-md"
            >
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Building <span className="text-primary">Excellence</span>
              </h3>
              <p className="text-muted-foreground">
                With precision engineering and unwavering commitment to quality, 
                we lift your dreams from blueprint to reality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
                className="glass-card p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 hover-lift group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 gold-gradient-subtle rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-gold">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
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
                  <span className="text-4xl font-bold text-primary-foreground">✓</span>
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
                <span className="text-3xl font-bold text-primary-foreground">💰</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                Calculate your construction EMI with our free online calculator
              </p>
              <Button variant="link" asChild className="mt-4">
                <Link to="/emi-calculator">Calculate EMI →</Link>
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
                <span className="text-3xl font-bold text-primary-foreground">⭐</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">15+ Years Experience</h3>
              <p className="text-muted-foreground">
                500+ successfully completed projects across Coimbatore and Salem
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-12 md:p-16 text-center shadow-medium"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Ready to Build Your Dream?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our expert team and turn your vision into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/appointment">Book Free Consultation</Link>
              </Button>
              <Button variant="outline-gold" size="xl" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
