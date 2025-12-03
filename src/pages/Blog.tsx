import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Planning Your Dream Home Construction",
    excerpt: "Planning to build your dream home? Here are the key considerations you should keep in mind before starting your construction journey.",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Construction Tips",
    image: "/assets/pro1.jpg",
  },
  {
    id: 2,
    title: "Understanding Building Permits and Approvals in Tamil Nadu",
    excerpt: "A comprehensive guide to navigating the building approval process in Coimbatore and Salem regions.",
    date: "December 10, 2024",
    readTime: "7 min read",
    category: "Regulations",
    image: "/assets/pro2.jpg",
  },
  {
    id: 3,
    title: "Modern Architectural Trends in South Indian Homes",
    excerpt: "Explore the latest architectural trends that are shaping modern homes in South India.",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Architecture",
    image: "/assets/pro3.jpg",
  },
  {
    id: 4,
    title: "Quality Materials: The Foundation of Long-Lasting Construction",
    excerpt: "Learn why choosing the right construction materials is crucial for the longevity of your building.",
    date: "November 28, 2024",
    readTime: "5 min read",
    category: "Quality",
    image: "/assets/pro4.jpg",
  },
  {
    id: 5,
    title: "Budgeting for Your Construction Project: A Complete Guide",
    excerpt: "Everything you need to know about construction budgeting, from initial planning to final execution.",
    date: "November 20, 2024",
    readTime: "8 min read",
    category: "Finance",
    image: "/assets/pro5.jpg",
  },
  {
    id: 6,
    title: "Sustainable Building Practices for Eco-Friendly Homes",
    excerpt: "Discover how to incorporate sustainable practices in your construction project.",
    date: "November 15, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    image: "/assets/pro6.jpg",
  },
];

const Blog = () => {
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
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tips, and guides on construction, architecture, and design
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-150"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <Button variant="link" className="mt-4 p-0 h-auto group-hover:text-primary">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
