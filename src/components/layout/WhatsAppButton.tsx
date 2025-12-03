import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const phoneNumber = "916374507535"; // Format: country code + number without +
  const message = "Hi! I'd like to know more about your construction services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-2 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* Pulsing rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse"></span>
        
        {/* Button */}
        <div className="relative w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:shadow-gold-hover transition-all duration-300">
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glass-card px-4 py-2 rounded-lg shadow-large whitespace-nowrap">
            <p className="text-sm font-semibold text-foreground">Chat with us on WhatsApp</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
