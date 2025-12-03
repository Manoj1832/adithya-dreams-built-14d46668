import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: "Residential House Construction", path: "/services#turnkey" },
    { name: "Commercial Construction", path: "/services#commercial" },
    { name: "Architectural Designing", path: "/services#architectural" },
    { name: "Structural Designing", path: "/services#structural" },
    { name: "Building Plan Approval", path: "/services#approval" },
    { name: "Construction Packages", path: "/packages" },
  ];

  const isPathActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith("/services") || location.pathname.startsWith("/packages");

  const navbarActive = isScrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        navbarActive
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-large"
          : "bg-transparent"
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Back + Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline-gold"
              size="icon"
              aria-label="Back"
              className="inline-flex h-8 w-8"
              onClick={() => navigate(-1)}
            >
              
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 gold-gradient-subtle rounded-xl blur-xl opacity-20 z-0"></div>
                <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center logo-dark-bg border shadow-soft z-10 logo-shine-7s">
                  <img
                    src="/assets/logo.png"
                    alt="Adithya Constructions Logo"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-heading font-bold text-foreground leading-tight">
                  Adithya Constructions
                </h1>
                <p className="text-xs text-muted-foreground leading-tight">We build your dreams</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
              {isPathActive("/") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
            <span className="text-primary/50">•</span>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            {isPathActive("/about") && (
              <span className="w-12 h-0.5 bg-primary" />
            )}
            <span className="text-primary/50">•</span>
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1 text-sm font-medium transition-colors ${
                  isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                {isServicesActive && (
                  <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
                )}
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
            <span className="text-primary/50">•</span>
            
            <Link
              to="/projects"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/projects") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Projects
              {isPathActive("/projects") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
            <span className="text-primary/50">•</span>
            <Link
              to="/construction-cost"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/construction-cost") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Cost Calculator
              {isPathActive("/construction-cost") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
            <span className="text-primary/50">•</span>
            <Link
              to="/quality-checklist"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/quality-checklist") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Quality Checklist
              {isPathActive("/quality-checklist") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
            <span className="text-primary/50">•</span>
            <Link
              to="/careers"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/careers") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Careers
              {isPathActive("/careers") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
            <span className="text-primary/50">•</span>
            <Link
              to="/contact"
              className={`relative text-sm font-medium transition-colors ${
                isPathActive("/contact") ? "text-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Contact
              {isPathActive("/contact") && (
                <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-primary" />
              )}
            </Link>
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
                <Link to="/construction-cost" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                  Cost Calculator
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
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
