import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Residential", "Commercial", "PEB", "Interior", "Renovation"];

const projects = [
  { id: 1, title: "Commercial Project", category: "Commercial", image: "/assets/project1(commercial).jpg" },
  { id: 2, title: "Residential Project", category: "Residential", image: "/assets/project2(residential).jpg" },
  { id: 3, title: "Residential Project", category: "Residential", image: "/assets/project3(residential).jpg" },
  { id: 4, title: "Residential Project", category: "Residential", image: "/assets/project4(residential).jpg" },
  { id: 5, title: "Commercial Project", category: "Commercial", image: "/assets/project5(commercial).jpg" },
  { id: 6, title: "Residential Project", category: "Residential", image: "/assets/project6(residential).jpg" },
  { id: 7, title: "Commercial Project", category: "Commercial", image: "/assets/project7(commercial).jpg" },
  { id: 8, title: "Residential Project", category: "Residential", image: "/assets/project8(residential).jpg" },
  { id: 9, title: "Residential Project", category: "Residential", image: "/assets/project9(residential).jpg" },
  { id: 10, title: "Interior Project", category: "Interior", image: "/assets/int1.jpg" },
  { id: 11, title: "Interior Project", category: "Interior", image: "/assets/int2.jpg" },
  { id: 12, title: "Interior Project", category: "Interior", image: "/assets/int3.jpg" },
  { id: 13, title: "Interior Project", category: "Interior", image: "/assets/int5.jpg" },
  { id: 14, title: "Interior Project", category: "Interior", image: "/assets/int6.jpg" },
  { id: 15, title: "Interior Project", category: "Interior", image: "/assets/int7.jpg" },
  { id: 16, title: "Interior Project", category: "Interior", image: "/assets/int8.jpg" },
  { id: 17, title: "Interior Project", category: "Interior", image: "/assets/int9.jpg" },
  { id: 18, title: "Interior Project", category: "Interior", image: "/assets/int10.jpg" },
  { id: 19, title: "Renovation Project", category: "Renovation", image: "/assets/renovation1.jpg" },
  { id: 20, title: "Renovation Project", category: "Renovation", image: "/assets/renovation2.jpg" },
  { id: 21, title: "Renovation Project", category: "Renovation", image: "/assets/renovation3.png" },
  { id: 22, title: "Residential Project", category: "Residential", image: "/assets/project10(residential).jpg" },
  { id: 23, title: "Residential Project", category: "Residential", image: "/assets/project11(residential).jpg" },
  { id: 24, title: "Residential Project", category: "Residential", image: "/assets/project12(residential).jpg" },
  { id: 25, title: "Residential Project", category: "Residential", image: "/assets/project13(residential).jpg" },
  { id: 26, title: "Residential Project", category: "Residential", image: "/assets/project14(residential).jpg" },
  { id: 27, title: "Commercial Project", category: "Commercial", image: "/assets/project15(commercial).jpg" },
  { id: 28, title: "Commercial Project", category: "Commercial", image: "/assets/project16(commercial).jpg" },
  { id: 29, title: "Commercial Project", category: "Commercial", image: "/assets/project17(commercial).jpg" },
  { id: 30, title: "Commercial Project", category: "Commercial", image: "/assets/project18(commercial).jpg" },
  { id: 31, title: "PEB Project", category: "PEB", image: "/assets/peb1.jpg" },
  { id: 32, title: "PEB Project", category: "PEB", image: "/assets/peb2.jpg" },
  { id: 33, title: "PEB Project", category: "PEB", image: "/assets/peb3.jpg" },
  { id: 34, title: "PEB Project", category: "PEB", image: "/assets/peb4.jpg" },
];

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  useEffect(() => {
    const currentParam = new URLSearchParams(location.search).get("type")?.toLowerCase() || "";
    const nextParam = selectedCategory !== "All" ? selectedCategory.toLowerCase() : "";
    if (currentParam !== nextParam) {
      const search = nextParam ? `?type=${nextParam}` : "";
      navigate({ pathname: "/projects", search }, { replace: true });
    }
  }, [selectedCategory, navigate, location.search]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const ProjectCard = ({ project, index }: { project: { id: number; title: string; category: string; image: string }; index: number }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-pointer"
      >
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
          <div className="aspect-video overflow-hidden relative">
            {!loaded && <Skeleton className="absolute inset-0" />}
            <img
              src={project.image}
              alt={project.title}
              className={cn("w-full h-full object-cover transition-transform duration-300", "group-hover:scale-105", loaded ? "opacity-100" : "opacity-0")}
              onLoad={() => setLoaded(true)}
            />
            <Badge
              variant="outline"
              className="absolute top-3 left-3 rounded-full backdrop-blur-sm bg-background/40 border-border/60 text-foreground px-3 py-1 text-xs"
            >
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

      {/* Stats Section */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">30+</p>
              <p className="text-muted-foreground">Total Projects</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">80+</p>
              <p className="text-muted-foreground">Residential</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">35+</p>
              <p className="text-muted-foreground">Commercial</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">35+</p>
              <p className="text-muted-foreground">Others</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
