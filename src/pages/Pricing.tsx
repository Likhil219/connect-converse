import { useState } from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
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
    notIncluded: [
      'Advanced workflows',
      'Lead capture forms',
      'Analytics dashboard',
      'API access',
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
      'Zapier integration',
    ],
    notIncluded: [
      'Team collaboration',
      'API access',
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
      'White-label options',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: { monthly: 0, annual: 0 },
    description: 'For large organizations',
    features: [
      'Unlimited DMs',
      'Unlimited accounts',
      'Everything in Business',
      'Custom contracts',
      'SLA guarantee',
      'Dedicated infrastructure',
      'On-premise deployment',
      'Custom features',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
    isEnterprise: true,
  },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'What happens if I exceed my DM limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. You can upgrade your plan or wait until the next billing cycle.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer: 'No contracts or commitments. Cancel anytime with no penalties.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes! We offer a 30-day money-back guarantee on all paid plans.',
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <MarketingLayout>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Simple Pricing
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-4">
              Plans for every
              <span className="text-gradient"> stage of growth</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you're ready. No hidden fees, no contracts.
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
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={cn(
                  "relative bg-card rounded-2xl p-6 border transition-all duration-300 flex flex-col",
                  plan.popular
                    ? "border-primary shadow-glow"
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
                    {plan.isEnterprise ? (
                      <span className="text-4xl font-black">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-black">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-muted-foreground">/month</span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
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
                  <Link to={plan.isEnterprise ? "/contact" : "/signup"}>{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl lg:text-3xl font-black text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border/50">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingLayout>
  );
}
