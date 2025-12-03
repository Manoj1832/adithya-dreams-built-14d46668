import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Coimbatore",
    project: "Luxury Villa Construction",
    rating: 5,
    text: "Adithya Constructions delivered beyond our expectations. The quality of work is exceptional and they completed our villa on time. Highly recommended!",
    image: "RK",
  },
  {
    id: 2,
    name: "Priya",
    location: "Salem",
    project: "Commercial Building",
    rating: 5,
    text: "Professional team with excellent attention to detail. They handled all approvals and made the entire process smooth. Great experience!",
    image: "PM",
  },
  {
    id: 3,
    name: "Suresh",
    location: "Coimbatore",
    project: "Home Renovation",
    rating: 5,
    text: "The team was responsive, transparent with pricing, and delivered quality work. Our renovated home looks amazing. Thank you Adithya!",
    image: "SI",
  },
  {
    id: 4,
    name: "Lakshmi Devi",
    location: "Salem",
    project: "Residential House Construction",
    rating: 5,
    text: "From design to completion, Adithya handled everything professionally. The house is exactly as we envisioned. Very satisfied!",
    image: "LD",
  },
];

const Testimonials = () => {
  return (
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
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-foreground font-bold text-sm">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary">{testimonial.project}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Join <span className="text-primary font-semibold">30+</span> satisfied clients
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-foreground font-semibold">4.9/5</span>
            <span className="ml-1 text-muted-foreground text-sm">(Based on 200+ reviews)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

