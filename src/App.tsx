import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import StickyContactBar from "./components/lead/StickyContactBar";
import ExitIntentPopup from "./components/lead/ExitIntentPopup";
import EntryWhatsAppModal from "./components/lead/EntryWhatsAppModal";
import AdhiAI from "./pages/ai-bot";
import { MessageCircle } from "lucide-react";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Appointment from "./pages/Appointment";
import QualityChecklist from "./pages/QualityChecklist";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Packages from "./pages/Packages";
import ConstructionCost from "./pages/ConstructionCost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search, hash]);
  return null;
};


const WhatsAppFloating = () => {
  const whatsappNumber = "916374507535";
  const whatsappMessage = "Hi! I'd like to know more about your construction services.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:bg-[#20BA5A]"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pb-[calc(env(safe-area-inset-bottom)+4.5rem)] lg:pb-0">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/emi-calculator" element={<ConstructionCost />} />
              <Route path="/quality-checklist" element={<QualityChecklist />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/construction-cost" element={<ConstructionCost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <EntryWhatsAppModal />
          <div className="hidden lg:block">
            <WhatsAppFloating />
          </div>
          <AdhiAI />
          <StickyContactBar />
          <ExitIntentPopup />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
