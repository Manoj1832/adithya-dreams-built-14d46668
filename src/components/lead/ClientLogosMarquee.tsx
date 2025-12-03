import { motion } from "framer-motion";

const files = [
  "asian paints.jpg",
  "finolex pipes.jpg",
  "gm switches.jpg",
  "indrola tmt bars.jpg",
  "jaquar.jpg",
  "jsw steels.jpg",
  "kajaria tiles.jpg",
  "legrand.jpg",
  "nippon paints.jpg",
  "ramco cements.jpg",
  "somany tiles.jpg",
  "supreme plastic.jpg",
  "tata steels.jpg",
  "ultratech cement.jpg",
];

const logos = files.map((name) => `/logos/${encodeURIComponent(name)}`);
const loopLogos = [...logos, ...logos];

const ClientLogosMarquee = () => {
  return (
    <section className="py-16 px-4 lg:px-8 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Brands <span className="text-primary">We use</span>
          </h2>
          <p className="text-muted-foreground mt-2">Trusted by leading brands and partners</p>
        </motion.div>

        <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-medium">
          <div className="absolute left-0 top-0 h-full w-8 md:w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-8 md:w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex items-center gap-6 md:gap-10 py-6 md:py-8 animate-[marquee_14s_linear_infinite] md:animate-[marquee_18s_linear_infinite] lg:animate-[marquee_20s_linear_infinite]" style={{ willChange: 'transform' }}>
            {loopLogos.map((src, i) => (
              <div key={`${src}-${i}`} className="shrink-0">
                <div className="glass-card shadow-soft hover:shadow-medium transition-all duration-300 hover-lift rounded-xl p-3 border border-border">
                  <img
                    src={src}
                    alt="Client logo"
                    className="h-10 md:h-12 w-auto object-contain transition duration-300"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
