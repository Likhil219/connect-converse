import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Zap, 
  BarChart3, 
  Users, 
  Workflow, 
  Settings2
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Comment-to-DM Automation',
    description: 'Automatically send personalized DMs to anyone who comments on your posts. Capture leads while the interest is hot.',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Story Reply Automation',
    description: 'Engage with story replies instantly. Send automated follow-ups that feel personal and drive conversions.',
    color: 'warning',
  },
  {
    icon: BarChart3,
    title: 'Lead Capture & Analytics',
    description: 'Collect emails, phone numbers, and custom data. Track every interaction with powerful analytics dashboards.',
    color: 'success',
  },
  {
    icon: Users,
    title: 'Multi-Account Management',
    description: 'Manage multiple Instagram accounts from one dashboard. Perfect for agencies and multi-brand businesses.',
    color: 'accent',
  },
  {
    icon: Workflow,
    title: 'Advanced Workflows',
    description: 'Build complex automation sequences with conditions, delays, and branching logic. No coding required.',
    color: 'primary',
  },
  {
    icon: Settings2,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate on automations. Built for growing teams.',
    color: 'warning',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl lg:text-5xl font-black mb-4">
            Everything you need to
            <span className="text-gradient"> dominate Instagram</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From simple auto-replies to complex multi-step workflows, InstaFlow has all the tools you need to automate your Instagram growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
