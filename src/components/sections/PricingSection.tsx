import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for getting started',
    features: [
      '1,000 DMs per month',
      '1 Instagram account',
      'Basic automations',
      'Email support',
      '7-day message history',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 29, annual: 24 },
    description: 'For growing creators and businesses',
    features: [
      '10,000 DMs per month',
      '3 Instagram accounts',
      'Advanced workflows',
      'Priority support',
      'Unlimited message history',
      'Lead capture forms',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: { monthly: 79, annual: 65 },
    description: 'For teams and agencies',
    features: [
      '50,000 DMs per month',
      '10 Instagram accounts',
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Dedicated success manager',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl lg:text-5xl font-black mb-4">
            Start free, scale as you
            <span className="text-gradient"> grow</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No hidden fees. No contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative w-14 h-8 rounded-full transition-colors",
              isAnnual ? "bg-primary" : "bg-secondary"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-6 h-6 rounded-full bg-primary-foreground shadow-md transition-transform",
                isAnnual ? "translate-x-7" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium", isAnnual ? "text-foreground" : "text-muted-foreground")}>
            Annual
            <span className="ml-1 text-success">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className={cn(
                "relative bg-card rounded-2xl p-6 lg:p-8 border transition-all duration-300",
                plan.popular
                  ? "border-primary shadow-glow scale-105"
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-lg">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl lg:text-5xl font-black">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "gradient" : "outline"}
                className="w-full"
                asChild
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Need more? <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link> for Enterprise pricing.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Unlimited accounts</span>
            <span>✓ Custom contracts</span>
            <span>✓ SLA guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
