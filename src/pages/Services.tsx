import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Building2, Pencil, CheckCircle, FileCheck, ArrowRight } from "lucide-react";

const services = [
  {
    id: "turnkey",
    icon: Home,
    title: "Residential House Construction",
    description: "Complete end-to-end residential construction services from design to handover.",
    image:
      "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: [
      "Complete project management",
      "Quality materials sourcing",
      "Expert craftsmanship",
      "Timely project delivery",
      "Post-construction support",
    ],
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Construction",
    description: "Professional construction solutions for offices, retail spaces, and industrial facilities.",
    image:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: [
      "Office buildings & complexes",
      "Retail & shopping centers",
      "Industrial facilities",
      "Educational institutions",
      "Healthcare facilities",
    ],
  },
  {
    id: "architectural",
    icon: Pencil,
    title: "Architectural Designing",
    description: "Innovative architectural designs that blend aesthetics with functionality.",
    image:
      "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: [
      "3D visualization & rendering",
      "Space planning & optimization",
      "Sustainable design solutions",
      "Modern & traditional styles",
      "Interior design integration",
    ],
  },
  {
    id: "structural",
    icon: CheckCircle,
    title: "Structural Designing",
    description: "Robust structural engineering ensuring safety, durability, and compliance.",
    image:
      "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: [
      "Load bearing analysis",
      "Framed Structure analysis",
      "Steel Structure analysis(PEB)",
      "Cost-effective solutions",
    ],
  },
  {
    id: "approval",
    icon: FileCheck,
    title: "Building Plan Approval",
    description: "Hassle-free building plan approval services navigating all regulatory requirements.",
    image:
      "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1920",
    features: [
      "DTCP approval assistance",
      "Panchayat approval support",
      "Municipality approval process",
      "Documentation handling",
      "Fast-track processing",
    ],
  },
];

const Services = () => {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive construction and architectural solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center mb-6 shadow-gold">
                    <service.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm">✓</span>
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="gold" size="lg" asChild>
                    <Link to="/appointment">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-medium border border-border">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-12 md:p-16 text-center shadow-medium"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/appointment">Schedule Consultation</Link>
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

export default Services;
