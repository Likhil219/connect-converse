import { motion } from 'framer-motion';

const logos = [
  { name: 'Nike', width: 100 },
  { name: 'Shopify', width: 120 },
  { name: 'Stripe', width: 80 },
  { name: 'Notion', width: 100 },
  { name: 'Figma', width: 90 },
  { name: 'Slack', width: 100 },
  { name: 'Vercel', width: 100 },
  { name: 'Linear', width: 90 },
];

const stats = [
  { value: '10M+', label: 'DMs Automated' },
  { value: '47%', label: 'Avg Response Rate' },
  { value: '3 Hours', label: 'Saved Daily' },
  { value: '50K+', label: 'Happy Users' },
];

const testimonials = [
  {
    quote: "InstaFlow completely transformed how we handle DMs. Our response rate went from 12% to 67% in just 2 weeks.",
    author: "Sarah Chen",
    role: "Founder, StyleBox",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    metric: "+458% engagement"
  },
  {
    quote: "We've captured 10,000+ leads through automated DMs. The ROI is absolutely insane.",
    author: "Marcus Johnson",
    role: "Marketing Director, FitLife",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    metric: "10K+ leads"
  },
  {
    quote: "The best investment we've made this year. Saved us 20+ hours per week on manual DM responses.",
    author: "Emily Rodriguez",
    role: "CEO, BeautyBrand Co",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    metric: "20hrs/week saved"
  },
];

export function SocialProofSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by 50,000+ creators and brands worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="text-xl lg:text-2xl font-bold text-muted-foreground"
                style={{ width: logo.width }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-card border border-border/50">
              <div className="text-4xl lg:text-5xl font-black text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border/50 hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                {testimonial.metric}
              </div>
              <blockquote className="text-lg text-foreground mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full bg-secondary"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
