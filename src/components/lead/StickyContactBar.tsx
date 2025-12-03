import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StickyContactBar = () => {
  const phoneNumber = "6374507535";
  const whatsappNumber = "916374507535";
  const whatsappMessage = "Hi! I'd like to know more about your construction services.";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      <div className="bg-card border-t border-border shadow-large">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <a href={`tel:${phoneNumber}`} className="flex-1">
              <Button variant="gold" size="sm" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-xs">Call Now</span>
              </Button>
            </a>
            
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full gap-2 bg-[#25D366] text-white border-[#25D366] hover:bg-[#20BA5A]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">WhatsApp</span>
              </Button>
            </a>
            
            <Link to="/appointment" className="flex-1">
              <Button variant="gold" size="sm" className="w-full gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Book Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyContactBar;

