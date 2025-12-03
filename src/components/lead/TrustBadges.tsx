import { motion } from "framer-motion";
import { Award, Shield, CheckCircle, Users, Building2, FileCheck } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "8+ Years Experience",
    description: "Proven track record",
  },
  {
    icon: Building2,
    title: "30+Projects",
    description: "Successfully completed",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully certified",
  },
  {
    icon: CheckCircle,
    title: "70-Point Quality Check",
    description: "Rigorous standards",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals",
  },
  {
    icon: FileCheck,
    title: "Approved Plans",
    description: "DTCP & Municipality",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-16 px-4 lg:px-8 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Why Trust <span className="text-primary">Adithya?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <badge.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

