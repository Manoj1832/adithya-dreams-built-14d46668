import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendToWhatsApp } from "@/lib/whatsapp";

const EntryWhatsAppModal = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const formatted = `*New Website Lead*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Location:* ${location || "-"}\n\n*Message:*\n${message || "-"}\n\n---\nSent from Adithya Constructions website`;
    sendToWhatsApp(formatted);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-2 border-primary/20 shadow-large">
        <DialogHeader>
          <DialogTitle>Get a Free Consultation</DialogTitle>
          <DialogDescription>Share your details to connect on WhatsApp instantly</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / Area" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Brief about your project or requirement" />
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full">Send on WhatsApp</Button>
          <p className="text-xs text-muted-foreground text-center">Response within 2 hours. Mon–Sat, 9 AM – 6 PM</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EntryWhatsAppModal;
