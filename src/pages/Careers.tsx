import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendCareerApplicationViaWhatsApp } from "@/lib/whatsapp-utils";

const positions = [
  {
    title: "Site Engineer",
    department: "Construction",
    location: "Coimbatore",
    type: "Full-time",
    experience: "2-5 years",
  },
  {
    title: "Architect",
    department: "Design",
    location: "Salem",
    type: "Full-time",
    experience: "3-7 years",
  },
  {
    title: "Project Manager",
    department: "Management",
    location: "Coimbatore",
    type: "Full-time",
    experience: "5-10 years",
  },
  {
    title: "Structural Engineer",
    department: "Engineering",
    location: "Coimbatore",
    type: "Full-time",
    experience: "3-6 years",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Great Team Culture",
    description: "Work with passionate professionals in a collaborative environment",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Continuous learning opportunities and clear career progression paths",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Competitive benefits and flexible working arrangements",
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data = {
      position: selectedPosition,
      name: (form.get("name") as string) || "",
      email: (form.get("email") as string) || "",
      phone: (form.get("phone") as string) || "",
      location: (form.get("location") as string) || "",
      experience: (form.get("experience") as string) || "",
      resumeLink: (form.get("resumeLink") as string) || "",
      message: (form.get("message") as string) || "",
    };
    try {
      sendCareerApplicationViaWhatsApp(data);
      toast({ title: "Opening WhatsApp...", description: "You'll be redirected to send your application." });
      setOpen(false);
      (e.target as HTMLFormElement).reset();
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
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build your career while building dreams. Explore opportunities at Adithya Constructions & Architects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Why Work <span className="text-primary">With Us?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-soft text-center"
              >
                <div className="w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Open <span className="text-primary">Positions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore current opportunities and find the perfect role for you
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 md:p-8 rounded-xl shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                        <span>•</span>
                        <span>{position.experience}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline-gold"
                    onClick={() => {
                      setSelectedPosition(position.title);
                      setOpen(true);
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-12 md:p-16 text-center shadow-medium max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Send Your Resume</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for {selectedPosition || "Position"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input id="name" name="name" required placeholder="Full Name" className="peer placeholder-transparent" />
                <Label htmlFor="name" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Full Name *
                </Label>
              </div>
              <div className="relative">
                <Input id="phone" name="phone" type="tel" required placeholder="Phone" className="peer placeholder-transparent" />
                <Label htmlFor="phone" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Phone *
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input id="email" name="email" type="email" required placeholder="Email" className="peer placeholder-transparent" />
                <Label htmlFor="email" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Email *
                </Label>
              </div>
              <div className="relative">
                <Input id="location" name="location" placeholder="Location" className="peer placeholder-transparent" />
                <Label htmlFor="location" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Location
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input id="experience" name="experience" placeholder="Experience (years)" className="peer placeholder-transparent" />
                <Label htmlFor="experience" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Experience
                </Label>
              </div>
              <div className="relative">
                <Input id="resumeLink" name="resumeLink" placeholder="Resume/Portfolio Link" className="peer placeholder-transparent" />
                <Label htmlFor="resumeLink" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                  Resume/Portfolio Link
                </Label>
              </div>
            </div>
            <div className="relative">
              <Textarea id="message" name="message" rows={4} placeholder="Your message" className="peer placeholder-transparent" />
              <Label htmlFor="message" className="pointer-events-none absolute left-3 -top-3 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary">
                Message
              </Label>
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
              Send via WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Careers;
