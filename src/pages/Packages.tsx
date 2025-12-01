import PackageDetailsTable from "@/components/packages/PackageDetailsTable";
import PricingPackages from "@/components/packages/PricingPackages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Packages = () => {
  return (
    <div className="min-h-screen" data-testid="page-packages">
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-packages">Construction Packages</Badge>
            <h1 className="text-4xl md:text-5xl heading-display mb-4" data-testid="heading-packages">
              Our <span className="text-primary">Pricing Packages</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We offer transparent and competitive pricing for all our construction services. 
              Choose from our carefully curated packages designed to meet every budget and requirement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/construction-cost">
                <Button className="gold-gradient text-white gap-2" data-testid="button-hero-calculator">
                  <Calculator className="w-4 h-4" />
                  Calculate Your Cost
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="gap-2" data-testid="button-hero-contact">
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PricingPackages />
      
      <PackageDetailsTable />

      <section className="py-16 px-4 md:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl heading-display mb-4">
              Ready to Build Your <span className="text-primary">Dream Home?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us today for a free consultation. Our team of experts will help you choose 
              the perfect package for your construction needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/appointment">
                <Button size="lg" className="gold-gradient text-white" data-testid="button-book-appointment">
                  Book Free Consultation
                </Button>
              </Link>
              <a href="tel:+916374507535">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-call-now">
                  <Phone className="w-4 h-4" />
                  Call: 63745 07535
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
