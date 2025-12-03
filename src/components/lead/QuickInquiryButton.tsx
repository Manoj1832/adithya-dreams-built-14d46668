import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";
import { sendContactViaWhatsApp } from "@/lib/whatsapp";
import { Mail, MessageCircle } from "lucide-react";

const QuickInquiryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendMethod, setSendMethod] = useState<"email" | "whatsapp">("email");
  const { toast } = useToast();

  // Auto-open once shortly after load (per session) so users don't miss it
  useEffect(() => {
    const shown = sessionStorage.getItem("quickInquiryShown");
    const timer = setTimeout(() => {
      if (!shown) {
        setIsOpen(true);
        sessionStorage.setItem("quickInquiryShown", "true");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: "Quick Inquiry",
      message: formData.get("message") as string,
    };

    try {
      if (sendMethod === "email") {
        await sendContactEmail(data);
        toast({
          title: "Inquiry Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        (e.target as HTMLFormElement).reset();
        setIsOpen(false);
      } else {
        sendContactViaWhatsApp(data);
        toast({
          title: "Opening WhatsApp...",
          description: "You'll be redirected to WhatsApp.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Quick Inquiry Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+7rem)] left-3 z-50 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
      
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping"></span>
          <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300">
            <MessageSquare className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="glass-card px-4 py-2 rounded-lg shadow-large">
              <p className="text-sm font-semibold text-foreground">Quick Inquiry</p>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Quick Inquiry Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            >
              <div className="bg-card rounded-2xl shadow-large max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between rounded-t-2xl">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Quick Inquiry
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Send Method Selection */}
                  <div className="space-y-2 p-3 bg-background-secondary rounded-lg border border-border">
                    <Label className="text-xs font-semibold">Send via:</Label>
                    <RadioGroup
                      value={sendMethod}
                      onValueChange={(value) => setSendMethod(value as "email" | "whatsapp")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="quick-email" />
                        <Label htmlFor="quick-email" className="flex items-center gap-1.5 cursor-pointer font-normal text-sm">
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="quick-whatsapp" />
                        <Label htmlFor="quick-whatsapp" className="flex items-center gap-1.5 cursor-pointer font-normal text-sm">
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="quick-firstName" className="text-sm">First Name *</Label>
                      <Input id="quick-firstName" name="firstName" placeholder="John" required className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="quick-lastName" className="text-sm">Last Name *</Label>
                      <Input id="quick-lastName" name="lastName" placeholder="Doe" required className="h-9" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="quick-email" className="text-sm">Email *</Label>
                    <Input id="quick-email" name="email" type="email" placeholder="john@example.com" required className="h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="quick-phone" className="text-sm">Phone *</Label>
                    <Input id="quick-phone" name="phone" type="tel" placeholder="+91 98765 43210" required className="h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="quick-message" className="text-sm">Message *</Label>
                    <Textarea id="quick-message" name="message" placeholder="Tell us about your project..." rows={3} required className="resize-none" />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {sendMethod === "email" ? (
                      <>
                        <Mail className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4" />
                        {isSubmitting ? "Opening..." : "Send via WhatsApp"}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickInquiryButton;

