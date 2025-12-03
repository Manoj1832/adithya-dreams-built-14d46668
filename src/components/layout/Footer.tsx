import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-background">
              Adithya Constructions & Architects
            </h3>
            <p className="text-sm text-background/80 mb-4">
              We build your dreams with precision, quality, and dedication.
            </p>
            <p className="text-sm text-background/70">
              Er. BOOBALAN .V, B.E.
              <br />
              Proprietor
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-background/80 hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-background/80 hover:text-background transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/quality-checklist" className="text-sm text-background/80 hover:text-background transition-colors">
                  Quality Checklist
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-background/80 hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-background/80">Residential House Construction</li>
              <li className="text-sm text-background/80">Commercial Construction</li>
              <li className="text-sm text-background/80">Architectural Designing</li>
              <li className="text-sm text-background/80">Structural Designing</li>
              <li className="text-sm text-background/80">Building Plan Approval</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-background flex-shrink-0" />
                <div className="text-sm text-background/80">
                  <a href="tel:6374507535" className="hover:text-background transition-colors">
                    63745 07535
                  </a>
                  <br />
                  <a href="tel:7538880504" className="hover:text-background transition-colors">
                    75388 80504
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-background flex-shrink-0" />
                <a
                  href="mailto:adithyaconstructionscbe@gmail.com"
                  className="text-sm text-background/80 hover:text-background transition-colors break-all"
                >
                  adithyaconstructionscbe@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-background flex-shrink-0" />
                <span className="text-sm text-background/80">Coimbatore, Salem</span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="w-4 h-4 mt-1 text-background flex-shrink-0" />
                <a
                  href="https://instagram.com/_adithya_constructions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  @_adithya_constructions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} Adithya Constructions & Architects. All rights reserved.
          </p>
          <p className="text-xs text-background/60 mt-2">
            Developed by Manoj,{' '}
            <a href="mailto:manoj12k6@gmail.con" className="underline hover:text-background">
              manoj12k6@gmail.con
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
