import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Calendar, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the page
      if (e.clientY <= 0 && !hasShown && !shown) {
        setIsVisible(true);
        sessionStorage.setItem("exitIntentShown", "true");
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (hasShown && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-2xl shadow-large max-w-md w-full relative overflow-hidden border-2 border-primary/20">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 gold-gradient-subtle rounded-full blur-2xl opacity-30"></div>
              
              <div className="relative p-8">
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold">
                    <Gift className="w-8 h-8 text-foreground" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Wait! Don't Go Yet! 🏗️
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    Get a <span className="text-primary font-semibold">FREE consultation</span> and quote
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Limited time offer • No obligation • Expert advice
                  </p>
                </div>

                <div className="space-y-3">
                  <Link to="/appointment" onClick={() => setIsVisible(false)}>
                    <Button variant="gold" size="lg" className="w-full gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Free Consultation
                    </Button>
                  </Link>
                  
                  <a href="tel:6374507535" onClick={() => setIsVisible(false)}>
                    <Button variant="gold" size="lg" className="w-full gap-2">
                      <Phone className="w-5 h-5" />
                      Call: 63745 07535
                    </Button>
                  </a>
                  
                  <a
                    href="https://wa.me/916374507535?text=Hi! I'd like to know more about your construction services."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsVisible(false)}
                  >
                    <Button variant="outline" size="lg" className="w-full gap-2 bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BA5A]">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  ⚡ Response within 2 hours
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;

