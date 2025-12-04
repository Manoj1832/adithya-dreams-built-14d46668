import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, X, Home, Building2, Wrench, Package, Paintbrush, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const categories = ["All", "Residential", "Commercial", "PEB", "Interior", "Renovation"];

const projects = [
  { id: 2, title: "Residential Project", category: "Residential", image: "/assets/project2(residential).jpg", location: "Coimbatore", duration: "6 months", costRange: "28 Lakhs", completion: "2024", area: "2100 sq.ft", feedback: 5 },
  { id: 3, title: "Residential Project", category: "Residential", image: "/assets/project3(residential).jpg", location: "Coimbatore", duration: "6 months", costRange: "32 Lakhs", completion: "2024", area: "2000 sq.ft", feedback: 5 },
  { id: 4, title: "Residential Project", category: "Residential", image: "/assets/project4(residential).jpg", location: "Coimbatore", duration: "7 months", costRange: "35 Lakhs", completion: "2023", area: "2200 sq.ft", feedback: 5 },
  { id: 5, title: "Commercial Project", category: "Commercial", image: "/assets/project5(commercial).jpg", location: "Coimbatore", duration: "8 months", costRange: "45 Lakhs", completion: "2023", area: "3500 sq.ft", feedback: 5 },
  { id: 6, title: "Residential Project", category: "Residential", image: "/assets/project6(residential).jpg", location: "Coimbatore", duration: "5 months", costRange: "25 Lakhs", completion: "2024", area: "1800 sq.ft", feedback: 5 },
  { id: 10, title: "Interior Project", category: "Interior", image: "/assets/int1.jpg", location: "Coimbatore", duration: "2 months", costRange: "8 Lakhs", completion: "2024", area: "1200 sq.ft", feedback: 5 },
  { id: 11, title: "Interior Project", category: "Interior", image: "/assets/int2.jpg", location: "Coimbatore", duration: "3 months", costRange: "10 Lakhs", completion: "2024", area: "1100 sq.ft", feedback: 5 },
  { id: 12, title: "Interior Project", category: "Interior", image: "/assets/int3.jpg", location: "Coimbatore", duration: "2 months", costRange: "9 Lakhs", completion: "2024", area: "900 sq.ft", feedback: 5 },
  { id: 13, title: "Interior Project", category: "Interior", image: "/assets/int5.jpg", location: "Coimbatore", duration: "2 months", costRange: "7 Lakhs", completion: "2024", area: "800 sq.ft", feedback: 5 },
  { id: 14, title: "Interior Project", category: "Interior", image: "/assets/int6.jpg", location: "Coimbatore", duration: "3 months", costRange: "11 Lakhs", completion: "2024", area: "1300 sq.ft", feedback: 5 },
  { id: 15, title: "Interior Project", category: "Interior", image: "/assets/int7.jpg", location: "Coimbatore", duration: "3 months", costRange: "12 Lakhs", completion: "2024", area: "1400 sq.ft", feedback: 5 },
  { id: 16, title: "Interior Project", category: "Interior", image: "/assets/int8.jpg", location: "Coimbatore", duration: "2 months", costRange: "9 Lakhs", completion: "2024", area: "900 sq.ft", feedback: 5 },
  { id: 17, title: "Interior Project", category: "Interior", image: "/assets/int9.jpg", location: "Coimbatore", duration: "2 months", costRange: "8 Lakhs", completion: "2024", area: "950 sq.ft", feedback: 5 },
  { id: 18, title: "Interior Project", category: "Interior", image: "/assets/int10.jpg", location: "Coimbatore", duration: "3 months", costRange: "10 Lakhs", completion: "2024", area: "1000 sq.ft", feedback: 5 },
  { id: 19, title: "Renovation Project", category: "Renovation", image: "/assets/renovation1.jpg", location: "Coimbatore", duration: "4 months", costRange: "15 Lakhs", completion: "2023", area: "1600 sq.ft", feedback: 5 },
  { id: 20, title: "Renovation Project", category: "Renovation", image: "/assets/renovation2.jpg", location: "Coimbatore", duration: "5 months", costRange: "18 Lakhs", completion: "2023", area: "1700 sq.ft", feedback: 5 },
  { id: 21, title: "Renovation Project", category: "Renovation", image: "/assets/renovation3.png", location: "Coimbatore", duration: "4 months", costRange: "16 Lakhs", completion: "2023", area: "1550 sq.ft", feedback: 5 },
  { id: 22, title: "Residential Project", category: "Residential", image: "/assets/project10(residential).jpg", location: "Coimbatore", duration: "6 months", costRange: "30 Lakhs", completion: "2024", area: "2000 sq.ft", feedback: 5 },
  { id: 23, title: "Residential Project", category: "Residential", image: "/assets/project11(residential).jpg", location: "Coimbatore", duration: "6 months", costRange: "29 Lakhs", completion: "2024", area: "1950 sq.ft", feedback: 5 },
  { id: 24, title: "Residential Project", category: "Residential", image: "/assets/project12(residential).jpg", location: "Coimbatore", duration: "7 months", costRange: "33 Lakhs", completion: "2023", area: "2100 sq.ft", feedback: 5 },
  { id: 25, title: "Residential Project", category: "Residential", image: "/assets/project13(residential).jpg", location: "Coimbatore", duration: "6 months", costRange: "28 Lakhs", completion: "2024", area: "1900 sq.ft", feedback: 5 },
  { id: 26, title: "Residential Project", category: "Residential", image: "/assets/project14(residential).jpg", location: "Coimbatore", duration: "7 months", costRange: "34 Lakhs", completion: "2023", area: "2200 sq.ft", feedback: 5 },
  { id: 27, title: "Commercial Project", category: "Commercial", image: "/assets/project15(commercial).jpg", location: "Coimbatore", duration: "8 months", costRange: "48 Lakhs", completion: "2023", area: "3600 sq.ft", feedback: 5 },
  { id: 28, title: "Commercial Project", category: "Commercial", image: "/assets/project16(commercial).jpg", location: "Coimbatore", duration: "9 months", costRange: "52 Lakhs", completion: "2023", area: "4000 sq.ft", feedback: 5 },
  { id: 29, title: "Commercial Project", category: "Commercial", image: "/assets/project17(commercial).jpg", location: "Coimbatore", duration: "8 months", costRange: "50 Lakhs", completion: "2023", area: "3800 sq.ft", feedback: 5 },
  { id: 30, title: "Commercial Project", category: "Commercial", image: "/assets/project18(commercial).jpg", location: "Coimbatore", duration: "9 months", costRange: "55 Lakhs", completion: "2023", area: "4100 sq.ft", feedback: 5 },
  { id: 31, title: "PEB Project", category: "PEB", image: "/assets/peb1.jpg", location: "Coimbatore", duration: "5 months", costRange: "22 Lakhs", completion: "2024", area: "2500 sq.ft", feedback: 5 },
  { id: 32, title: "PEB Project", category: "PEB", image: "/assets/peb2.jpg", location: "Coimbatore", duration: "5 months", costRange: "24 Lakhs", completion: "2024", area: "2600 sq.ft", feedback: 5 },
  { id: 33, title: "PEB Project", category: "PEB", image: "/assets/peb3.jpg", location: "Coimbatore", duration: "6 months", costRange: "26 Lakhs", completion: "2024", area: "2700 sq.ft", feedback: 5 },
  { id: 34, title: "PEB Project", category: "PEB", image: "/assets/peb4.jpg", location: "Coimbatore", duration: "6 months", costRange: "27 Lakhs", completion: "2024", area: "2800 sq.ft", feedback: 5 },
];

const categoryIcons: Record<string, LucideIcon> = {
  Residential: Home,
  Commercial: Building2,
  Renovation: Wrench,
  PEB: Package,
  Interior: Paintbrush,
};

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerId, setViewerId] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const normalizedCategories = useMemo(() =>
    categories.map((c) => c.toLowerCase()),
  []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get("type")?.toLowerCase();
    const hash = location.hash.replace("#", "").toLowerCase();
    const desired = typeParam || (hash ? hash : undefined);
    if (desired) {
      const idx = normalizedCategories.indexOf(desired);
      if (idx !== -1) {
        const target = categories[idx];
        setSelectedCategory(target);
      }
    } else {
      setSelectedCategory("All");
    }
  }, [location.search, location.hash, normalizedCategories]);

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === selectedCategory),
    [selectedCategory]
  );

  // Close viewer if current image not present in new filtered set
  useEffect(() => {
    if (viewerOpen && viewerId !== null) {
      const exists = filteredProjects.some((p) => p.id === viewerId);
      if (!exists) setViewerOpen(false);
    }
  }, [filteredProjects, viewerOpen, viewerId]);

  useEffect(() => {
    const currentParam = new URLSearchParams(location.search).get("type")?.toLowerCase() || "";
    const nextParam = selectedCategory !== "All" ? selectedCategory.toLowerCase() : "";
    if (currentParam !== nextParam) {
      const search = nextParam ? `?type=${nextParam}` : "";
      navigate({ pathname: "/projects", search }, { replace: true });
    }
  }, [selectedCategory, navigate, location.search]);

  type Project = (typeof projects)[number];
  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-pointer"
        onClick={() => {
          setViewerId(project.id);
          setViewerOpen(true);
        }}
      >
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all">
          <div className="aspect-video overflow-hidden relative">
            {!loaded && <Skeleton className="absolute inset-0" />}
            <img
              src={project.image}
              alt={project.title}
              className={cn("w-full h-full object-cover transition-transform duration-300", "group-hover:scale-[1.03]", loaded ? "opacity-100" : "opacity-0")}
              onLoad={() => setLoaded(true)}
            />
            {/* removed project details overlay */}
            <Badge
              variant="outline"
              className="absolute top-3 left-3 rounded-full backdrop-blur-sm bg-background/50 border-[#D4AF37] text-foreground px-3 py-1 text-xs flex items-center gap-1"
            >
              {(() => {
                const Icon = categoryIcons[project.category] || Home;
                return <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />;
              })()}
              {project.category}
            </Badge>
            <ArrowRight className="absolute bottom-3 right-3 w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              {project.title}
            </h3>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Premium Header Section */}
      <section className="relative py-20 px-4 lg:px-8 bg-background-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 24px)",
          }}
        />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our <span className="text-primary">Completed Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A showcase of quality, precision, and engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full px-5 py-2.5 backdrop-blur-sm border border-border/60 bg-card/40 transition-all",
                    "hover:bg-card/60 hover:shadow-md",
                    isActive && "ring-2 ring-primary/40 bg-primary/10 text-primary shadow-medium"
                  )}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Viewer */}
      <Dialog open={viewerOpen} onOpenChange={(open) => setViewerOpen(open)}>
        <DialogContent className="max-w-[92vw] md:max-w-[80vw] bg-transparent p-0 border-none shadow-none">
          <button
            aria-label="Close"
            onClick={() => setViewerOpen(false)}
            className="absolute right-3 top-3 z-50 rounded-full bg-black/75 text-white border border-white/40 p-2 shadow-large hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <X className="h-5 w-5" />
          </button>
          {(() => {
            const currentIdx = viewerId !== null ? filteredProjects.findIndex((p) => p.id === viewerId) : -1;
            const current = currentIdx >= 0 ? filteredProjects[currentIdx] : null;
            if (!current) return null;
            return (
              <div className="relative w-full h-[80vh] grid grid-cols-1 md:grid-cols-12 gap-4 p-2">
                <div
                  className="md:col-span-8 w-full h-full flex items-center justify-center relative"
                  onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                  onTouchEnd={(e) => {
                    const delta = (touchStartX ?? e.changedTouches[0].clientX) - e.changedTouches[0].clientX;
                    if (Math.abs(delta) > 50) {
                      if (delta > 0) {
                        const nextIdx = (currentIdx + 1) % filteredProjects.length;
                        setViewerId(filteredProjects[nextIdx].id);
                      } else {
                        const prevIdx = (currentIdx - 1 + filteredProjects.length) % filteredProjects.length;
                        setViewerId(filteredProjects[prevIdx].id);
                      }
                    }
                    setTouchStartX(null);
                  }}
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-elevated"
                    loading="eager"
                  />
                  <div className="absolute top-3 right-14 z-40 bg-black/60 text-white backdrop-blur-md rounded-full px-3 py-1 text-xs border border-white/20">
                    {currentIdx + 1} / {filteredProjects.length}
                  </div>
                  <button
                    aria-label="Previous"
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = currentIdx;
                      const nextIdx = (idx - 1 + filteredProjects.length) % filteredProjects.length;
                      setViewerId(filteredProjects[nextIdx].id);
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white backdrop-blur-md border border-white/30 rounded-full px-3 py-2 text-sm shadow-medium hover:bg-black/60"
                  >
                    Prev
                  </button>
                  <button
                    aria-label="Next"
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = currentIdx;
                      const nextIdx = (idx + 1) % filteredProjects.length;
                      setViewerId(filteredProjects[nextIdx].id);
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white backdrop-blur-md border border-white/30 rounded-full px-3 py-2 text-sm shadow-medium hover:bg-black/60"
                  >
                    Next
                  </button>
                </div>
                {/* removed right panel project details */}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* removed stats section */}
    </div>
  );
};

export default Projects;
