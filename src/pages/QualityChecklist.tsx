import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";

const categories = [
  {
    name: "Foundation Quality",
    items: [
      "Soil testing and analysis completed",
      "Foundation depth as per soil report",
      "RCC grade concrete used (M20 or higher)",
      "Anti-termite treatment applied",
      "Proper curing of foundation",
      "Steel reinforcement as per design",
      "Foundation level verification",
      "Plinth beam installation",
    ],
  },
  {
    name: "Concrete Strength Standards",
    items: [
      "M20 grade concrete for columns",
      "M25 grade for beams and slabs",
      "Cement quality certification",
      "Steel quality certification (Fe500/Fe550)",
      "Proper concrete mix ratio",
      "Concrete cube testing",
      "28-day curing protocol",
      "Slump test for workability",
    ],
  },
  {
    name: "Waterproofing Standards",
    items: [
      "Basement waterproofing applied",
      "Roof waterproofing with warranty",
      "Bathroom waterproofing (2 coats)",
      "External wall waterproofing",
      "Terrace waterproofing and drainage",
      "Water tank waterproofing",
      "Balcony waterproofing",
      "Expansion joint treatment",
    ],
  },
  {
    name: "Electrical Safety Standards",
    items: [
      "ISI marked wires and cables",
      "Proper earthing system",
      "MCB/ELCB installation",
      "Fire-resistant wire conduits",
      "Adequate power points as per plan",
      "Three-phase connection for >5kW load",
      "Electrical load calculation verified",
      "Testing and certification",
    ],
  },
  {
    name: "Plumbing Layout & Testing",
    items: [
      "ISI marked pipes and fittings",
      "Proper drainage slope maintained",
      "Water pressure testing done",
      "Hot and cold water lines separated",
      "Sewage line pressure testing",
      "Overhead tank connection verified",
      "Underground tank installation",
      "Leak detection test completed",
    ],
  },
  {
    name: "Interior Material Quality",
    items: [
      "ISI marked cement for plastering",
      "Branded paint with warranty",
      "Quality flooring tiles/marble",
      "Termite-resistant wood",
      "Quality bathroom fittings",
      "Kitchen fixtures and fittings",
      "Door and window quality check",
      "Hardware quality verification",
    ],
  },
  {
    name: "Site Supervision Protocol",
    items: [
      "Daily site inspection by engineer",
      "Weekly progress reports",
      "Quality control at each stage",
      "Material quality verification",
      "Safety measures implemented",
      "Work schedule adherence",
      "Client visit coordination",
      "Photo documentation maintained",
    ],
  },
  {
    name: "Final Handover Standards",
    items: [
      "Complete snag list clearance",
      "All electrical fittings tested",
      "All plumbing fixtures tested",
      "Paint touch-ups completed",
      "Door and window operation checked",
      "Final cleaning completed",
      "As-built drawings provided",
      "Warranty documentation provided",
      "Operation manuals provided",
      "Completion certificate issued",
    ],
  },
];

const QualityChecklist = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

  const totalChecks = categories.reduce((acc, cat) => acc + cat.items.length, 0);

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
            <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              {totalChecks}-Point <span className="text-primary">Quality Checklist</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Our comprehensive quality assurance process ensures excellence at every stage of construction
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card p-8 rounded-2xl shadow-soft text-center"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Every Item, <span className="text-primary">Adithya Certified</span>
            </h2>
            <p className="text-muted-foreground">
              Our rigorous quality checklist covers every aspect of construction, from foundation to final handover. Each checkpoint is verified and certified by our expert engineers to ensure your project meets the highest standards of quality, safety, and durability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Sidebar Navigation */}
            <div className="lg:sticky lg:top-24 h-fit space-y-2">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setExpandedCategory(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    expandedCategory === index
                      ? "bg-primary text-primary-foreground shadow-gold"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  <p className={`font-semibold text-sm ${expandedCategory === index ? "text-primary-foreground" : "text-foreground"}`}>
                    {category.name}
                  </p>
                  <p className={`text-xs ${expandedCategory === index ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {category.items.length} checks
                  </p>
                </button>
              ))}
            </div>

            {/* Checklist Items */}
            <div className="lg:col-span-3 space-y-6">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: expandedCategory === categoryIndex ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={expandedCategory === categoryIndex ? "" : "hidden lg:block"}
                >
                  <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.items.length} quality checkpoints
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-4">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                            className="flex items-start gap-4 p-4 bg-background-secondary rounded-lg hover:shadow-soft transition-shadow"
                          >
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="text-foreground font-medium">{item}</p>
                              <p className="text-xs text-primary mt-1">✓ Adithya Certified</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-card px-8 py-4 rounded-full shadow-gold mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-heading font-bold text-foreground">
                Quality Guaranteed
              </span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project undergoes our comprehensive {totalChecks}-point quality checklist verification. This systematic approach ensures that no detail is overlooked, and you receive a construction that stands the test of time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QualityChecklist;
