import { motion } from 'framer-motion';
import { Play, Sparkles, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-float" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Meta Partner • 50,000+ Users • 4.9★ Rating</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6"
          >
            Automate Instagram DMs
            <br />
            <span className="text-gradient">& 10x Your Engagement</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Turn every comment, story reply, and DM into a sales opportunity. 
            Capture leads, nurture relationships, and grow your business on autopilot.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                Start Free Trial
                <Sparkles className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="xl">
              <Play className="w-5 h-5 mr-1" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 lg:mt-24 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50">
              <div className="bg-card p-2">
                {/* Browser Bar */}
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg mb-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    app.instaflow.io/dashboard
                  </div>
                </div>
                
                {/* Mock Dashboard */}
                <div className="bg-background rounded-lg p-6 min-h-[400px]">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Messages Sent', value: '12,847', color: 'primary' },
                      { label: 'Response Rate', value: '47%', color: 'success' },
                      { label: 'Leads Captured', value: '1,234', color: 'accent' },
                      { label: 'Active Automations', value: '8', color: 'warning' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-secondary/50 rounded-xl p-4">
                        <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                        <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="bg-secondary/30 rounded-xl p-6 h-48 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-primary rounded-t-lg"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-card rounded-xl p-4 shadow-elevated border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success text-lg">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium">New Lead Captured</div>
                  <div className="text-xs text-muted-foreground">sarah@example.com</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-elevated border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg">📩</span>
                </div>
                <div>
                  <div className="text-sm font-medium">1,847 DMs Sent Today</div>
                  <div className="text-xs text-muted-foreground">92% delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Activity Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 overflow-hidden"
        >
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-8">
                {[
                  'Sarah just automated 1,500 DMs',
                  'Mike captured 234 leads today',
                  'Emma converted 15 customers',
                  'Alex saved 4 hours with automation',
                  'Lisa hit 10K followers',
                  'Tom increased sales by 47%',
                ].map((text, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
