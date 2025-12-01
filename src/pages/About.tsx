import { motion } from "framer-motion";
import { Award, Target, Eye, Users } from "lucide-react";

const About = () => {
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
              About <span className="text-primary">Adithya</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Building Excellence, Creating Legacies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Adithya Constructions & Architects was founded with a simple yet powerful vision: to transform dreams into tangible realities through exceptional construction and architectural services. Based in Coimbatore and Salem, we have been serving our community with dedication, integrity, and unmatched quality for over 15 years.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Under the expert leadership of Er. BOOBALAN .V, B.E., our company has grown from humble beginnings to become one of the most trusted names in construction and architecture in the region. With over 500 successfully completed projects, we take pride in every structure we build and every client relationship we foster.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in turnkey house construction, commercial projects, architectural designing, structural engineering, and building plan approvals. Our commitment to quality is reflected in our comprehensive 70-point quality checklist that ensures every project meets the highest standards of excellence.
              </p>
            </motion.div>

            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 md:p-12 rounded-2xl shadow-medium mb-16"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 gold-gradient rounded-full flex items-center justify-center shadow-gold flex-shrink-0">
                  <span className="text-5xl font-bold text-primary-foreground">B</span>
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Er. BOOBALAN .V, B.E.</h3>
                  <p className="text-primary font-semibold mb-4">Founder & Proprietor</p>
                  <p className="text-muted-foreground leading-relaxed">
                    With a Bachelor's degree in Engineering and over 15 years of industry experience, Er. Boobalan brings technical expertise and visionary leadership to every project. His commitment to innovation, quality, and client satisfaction has been the cornerstone of Adithya's success.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-2xl shadow-soft"
            >
              <div className="w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mb-6 shadow-gold">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional construction and architectural services that exceed client expectations, while maintaining the highest standards of quality, safety, and sustainability in every project we undertake.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-2xl shadow-soft"
            >
              <div className="w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mb-6 shadow-gold">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading construction and architectural firm in South India, recognized for innovation, quality, and trust, creating structures that stand the test of time and enrich communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core <span className="text-primary">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Quality Excellence</h3>
              <p className="text-muted-foreground">
                Uncompromising commitment to quality in materials, workmanship, and service delivery
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Client First</h3>
              <p className="text-muted-foreground">
                Your satisfaction and trust are our top priorities, driving every decision we make
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <span className="text-3xl font-bold text-primary-foreground">✓</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Integrity & Trust</h3>
              <p className="text-muted-foreground">
                Transparent communication, ethical practices, and delivering on our promises
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
