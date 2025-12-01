import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const services = [
    { name: "Turnkey House Construction", path: "/services#turnkey" },
    { name: "Commercial Construction", path: "/services#commercial" },
    { name: "Architectural Designing", path: "/services#architectural" },
    { name: "Structural Designing", path: "/services#structural" },
    { name: "Building Plan Approval", path: "/services#approval" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-medium" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-gold transition-transform group-hover:scale-110">
              <span className="text-2xl font-bold text-primary-foreground">A</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-heading font-bold text-foreground">
                Adithya Constructions
              </h1>
              <p className="text-xs text-muted-foreground">We build your dreams</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-medium border border-border overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-3 text-sm hover:bg-muted transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/emi-calculator" className="text-sm font-medium hover:text-primary transition-colors">
              EMI Calculator
            </Link>
            <Link to="/quality-checklist" className="text-sm font-medium hover:text-primary transition-colors">
              Quality Checklist
            </Link>
            <Link to="/careers" className="text-sm font-medium hover:text-primary transition-colors">
              Careers
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            
            <Button variant="gold" size="lg" asChild>
              <Link to="/appointment">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <Link to="/" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Home
                </Link>
                <Link to="/about" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  About Us
                </Link>
                <div className="px-4 py-2">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between w-full text-sm font-medium"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-4 space-y-2"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link to="/projects" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Projects
                </Link>
                <Link to="/emi-calculator" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  EMI Calculator
                </Link>
                <Link to="/quality-checklist" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Quality Checklist
                </Link>
                <Link to="/careers" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Careers
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Contact
                </Link>
                <div className="px-4 pt-2">
                  <Button variant="gold" size="lg" className="w-full" asChild>
                    <Link to="/appointment">Book Appointment</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
