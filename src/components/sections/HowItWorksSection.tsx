import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Instagram,
    title: 'Connect Instagram',
    description: 'Link your Instagram account in seconds with secure OAuth. No password required.',
  },
  {
    icon: MessageCircle,
    title: 'Set Triggers',
    description: 'Choose what actions trigger your automations: comments, story replies, DM keywords, and more.',
  },
  {
    icon: Zap,
    title: 'Customize Messages',
    description: 'Create personalized message sequences with variables, delays, and conditions.',
  },
  {
    icon: Rocket,
    title: 'Watch Engagement Soar',
    description: 'Sit back as your automations work 24/7, capturing leads and nurturing relationships.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Setup
          </span>
          <h2 className="text-3xl lg:text-5xl font-black mb-4">
            Get started in
            <span className="text-gradient"> 4 simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No technical skills required. Set up your first automation in under 5 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border/50 text-center relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                    {i + 1}
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 mt-2">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
