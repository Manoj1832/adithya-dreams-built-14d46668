import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User, Phone, Mail, MapPin, MessageSquare, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendAppointmentEmail, type AppointmentFormData } from "@/lib/emailjs";
import { sendAppointmentViaWhatsApp } from "@/lib/whatsapp";

const Appointment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendMethod, setSendMethod] = useState<"email" | "whatsapp">("email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: AppointmentFormData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      description: formData.get("description") as string,
    };

    try {
      if (sendMethod === "email") {
        await sendAppointmentEmail(data);
        toast({
          title: "Appointment Request Sent!",
          description: "We'll contact you shortly to confirm your appointment.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        sendAppointmentViaWhatsApp(data);
        toast({
          title: "Opening WhatsApp...",
          description: "You'll be redirected to WhatsApp to send your appointment request.",
        });
        // Don't reset form for WhatsApp as user might want to edit
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send appointment request. Please try again later.",
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
              Book an <span className="text-primary">Appointment</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Schedule a free consultation with our expert team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and our team will get back to you within 24 hours. You can also reach us directly through the contact information below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:6374507535" className="text-muted-foreground hover:text-primary">
                      63745 07535
                    </a>
                    <br />
                    <a href="tel:7538880504" className="text-muted-foreground hover:text-primary">
                      75388 80504
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:adithyaconstructionscbe@gmail.com"
                      className="text-muted-foreground hover:text-primary break-all"
                    >
                      adithyaconstructionscbe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Coimbatore, Salem</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-medium space-y-6">
                {/* Send Method Selection */}
                <div className="space-y-3 p-4 bg-background-secondary rounded-lg border border-border">
                  <Label className="text-sm font-semibold">Choose how to send your request:</Label>
                  <RadioGroup
                    value={sendMethod}
                    onValueChange={(value) => setSendMethod(value as "email" | "whatsapp")}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email-method" />
                      <Label
                        htmlFor="email-method"
                        className="flex items-center gap-2 cursor-pointer font-normal"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                      <Label
                        htmlFor="whatsapp-method"
                        className="flex items-center gap-2 cursor-pointer font-normal"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your phone"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Your location"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Required *</Label>
                  <Select name="service" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="turnkey">Residential House Construction</SelectItem>
                      <SelectItem value="commercial">Commercial Construction</SelectItem>
                      <SelectItem value="architectural">Architectural Designing</SelectItem>
                      <SelectItem value="structural">Structural Designing</SelectItem>
                      <SelectItem value="structural">Interior Works</SelectItem>
                      <SelectItem value="approval">Building Plan Approval</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="pl-10"
                    />
                  </div>
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
                      <Mail className="w-5 h-5" />
                      {isSubmitting ? "Submitting..." : "Submit via Email"}
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      {isSubmitting ? "Opening..." : "Submit via WhatsApp"}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
