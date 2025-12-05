import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Phone, Mail, MapPin, Instagram, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";
import { sendContactViaWhatsApp } from "@/lib/whatsapp";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendMethod, setSendMethod] = useState<"email" | "whatsapp">("email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      if (sendMethod === "email") {
        await sendContactEmail(data);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        sendContactViaWhatsApp(data);
        toast({
          title: "Opening WhatsApp...",
          description: "You'll be redirected to WhatsApp to send your message.",
        });
        // Don't reset form for WhatsApp as user might want to edit
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Let's discuss your project!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-card p-6 rounded-2xl shadow-medium border border-border flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-xl p-[3px] gold-gradient-subtle shadow-gold">
                  <Avatar className="w-full h-full rounded-xl overflow-hidden">
                    <AvatarImage src="/assets/owner.png" alt="Owner" />
                    <AvatarFallback className="text-xl font-bold">B</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">Er. BOOBALAN .V, B.E.</h3>
                  <p className="text-primary font-semibold">Founder & Proprietor</p>
                  <p className="text-sm text-muted-foreground">Leading Adithya with quality, innovation, and client-first values</p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl shadow-medium border border-border flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-xl p-[3px] gold-gradient-subtle shadow-gold">
                  <Avatar className="w-full h-full rounded-xl overflow-hidden">
                    <AvatarImage src="/assets/owner2.jpg" alt="Proprietor" />
                    <AvatarFallback className="text-xl font-bold">P</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">Er. , B.E.</h3>
                  <p className="text-primary font-semibold">Proprietor • Operations & Client Relations</p>
                  <p className="text-sm text-muted-foreground">Premium client experience, documentation, approvals, and on-site coordination</p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of the following channels. We're here to help you build your dreams.
                </p>
              </div>

              <div className="space-y-4">
                <div className="group bg-card p-6 rounded-xl shadow-soft border border-border transition-colors duration-200 hover:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <div className="mt-1 space-y-0.5">
                        <a href="tel:6374507535" className="text-muted-foreground hover:text-primary">63745 07535</a>
                        <br />
                        <a href="tel:7538880504" className="text-muted-foreground hover:text-primary">75388 80504</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group bg-card p-6 rounded-xl shadow-soft border border-border transition-colors duration-200 hover:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:adithyaconstructionscbe@gmail.com"
                        className="mt-1 block text-muted-foreground hover:text-primary break-words"
                      >
                        adithyaconstructionscbe@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group bg-card p-6 rounded-xl shadow-soft border border-border transition-colors duration-200 hover:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="mt-1 text-muted-foreground">Coimbatore, Salem</p>
                      <p className="text-sm text-muted-foreground">Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-card p-6 rounded-xl shadow-soft border border-border transition-colors duration-200 hover:bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Instagram</h3>
                      <a
                        href="https://instagram.com/_adithya_constructions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-muted-foreground hover:text-primary"
                      >
                        @_adithya_constructions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-medium space-y-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                {/* Send Method Selection */}
                <div className="space-y-3 p-4 bg-background-secondary rounded-lg border border-border">
                  <Label className="text-sm font-semibold">Choose how to send your message:</Label>
                  <ToggleGroup type="single" value={sendMethod} onValueChange={(v) => v && setSendMethod(v as "email" | "whatsapp")}
                    className="w-full justify-start gap-2">
                    <ToggleGroupItem
                      value="email"
                      aria-label="Send via Email"
                      className="rounded-full gap-2 data-[state=on]:ring-2 data-[state=on]:ring-primary/40 data-[state=on]:bg-primary/10"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="whatsapp"
                      aria-label="Send via WhatsApp"
                      className="rounded-full gap-2 data-[state=on]:ring-2 data-[state=on]:ring-primary/40 data-[state=on]:bg-primary/10"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input id="firstName" name="firstName" required placeholder="First Name" className="peer placeholder-transparent" />
                      <Label
                        htmlFor="firstName"
                        className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                      >
                        First Name *
                      </Label>
                    </div>
                    <div className="relative">
                      <Input id="lastName" name="lastName" required placeholder="Last Name" className="peer placeholder-transparent" />
                      <Label
                        htmlFor="lastName"
                        className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                      >
                        Last Name *
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input id="phone" name="phone" type="tel" required placeholder="Phone" className="peer placeholder-transparent" />
                      <Label
                        htmlFor="phone"
                        className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                      >
                        Phone Number *
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Input id="email" name="email" type="email" required placeholder="Email" className="peer placeholder-transparent" />
                  <Label
                    htmlFor="email"
                    className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                  >
                    Email *
                  </Label>
                </div>

                

                <div className="relative">
                  <Input id="subject" name="subject" required placeholder="Subject" className="peer placeholder-transparent" />
                  <Label
                    htmlFor="subject"
                    className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                  >
                    Subject *
                  </Label>
                </div>

                <div className="relative">
                  <Textarea id="message" name="message" rows={5} required placeholder="Message" className="peer placeholder-transparent" />
                  <Label
                    htmlFor="message"
                    className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                  >
                    Message *
                  </Label>
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
                      <Send className="w-5 h-5" />
                      {isSubmitting ? "Sending..." : "Send via Email"}
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      {isSubmitting ? "Opening..." : "Send via WhatsApp"}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Find Us on the Map
            </h2>
            <div className="bg-card rounded-2xl overflow-hidden shadow-medium aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125511.19949764838!2d76.83987694999999!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
