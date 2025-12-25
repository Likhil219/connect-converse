import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Zap, 
  BarChart3, 
  Users, 
  Workflow, 
  Settings2,
  Target,
  Send,
  Clock,
  Layers,
  Globe,
  Shield
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Automation Triggers',
    description: 'Start automations based on user actions',
    features: [
      { icon: MessageCircle, name: 'Comment Triggers', description: 'Automatically respond when users comment on your posts' },
      { icon: Send, name: 'Story Replies', description: 'Engage with users who reply to your stories' },
      { icon: Target, name: 'DM Keywords', description: 'Trigger workflows based on specific words in DMs' },
      { icon: Users, name: 'New Followers', description: 'Welcome new followers with personalized messages' },
    ],
  },
  {
    title: 'Workflow Builder',
    description: 'Create powerful automation sequences',
    features: [
      { icon: Workflow, name: 'Visual Builder', description: 'Drag-and-drop interface for building complex workflows' },
      { icon: Clock, name: 'Delays & Timing', description: 'Add strategic delays between messages' },
      { icon: Layers, name: 'Conditions', description: 'Branch workflows based on user responses' },
      { icon: Zap, name: 'Actions', description: 'Send messages, collect data, tag contacts, and more' },
    ],
  },
  {
    title: 'Lead Generation',
    description: 'Capture and nurture leads automatically',
    features: [
      { icon: Target, name: 'Lead Forms', description: 'Collect emails, phone numbers, and custom data' },
      { icon: Users, name: 'Contact Management', description: 'Organize leads with tags and segments' },
      { icon: Send, name: 'Broadcasts', description: 'Send mass messages to your contact list' },
      { icon: Globe, name: 'Integrations', description: 'Sync leads with your CRM and email tools' },
    ],
  },
  {
    title: 'Analytics & Insights',
    description: 'Track performance and optimize',
    features: [
      { icon: BarChart3, name: 'Performance Dashboard', description: 'Real-time metrics and KPIs at a glance' },
      { icon: Target, name: 'Conversion Tracking', description: 'Track link clicks and goal completions' },
      { icon: Clock, name: 'Response Analytics', description: 'Monitor response rates and timing' },
      { icon: Users, name: 'Audience Insights', description: 'Understand your audience better' },
    ],
  },
];

export default function Features() {
  return (
    <MarketingLayout>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-4">
              Everything you need to
              <span className="text-gradient"> automate Instagram</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Powerful automation tools designed to help you capture leads, nurture relationships, and grow your business.
            </p>
          </motion.div>

          {/* Feature Categories */}
          <div className="space-y-20">
            {featureCategories.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.features.map((feature, fi) => (
                    <motion.div
                      key={fi}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * fi }}
                      className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-secondary/30 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Enterprise-Grade Security</h2>
                <p className="text-muted-foreground">
                  Your data is protected with bank-level encryption, SOC 2 compliance, and regular security audits. 
                  We never store your Instagram password and use official Meta APIs for all integrations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  );
}
