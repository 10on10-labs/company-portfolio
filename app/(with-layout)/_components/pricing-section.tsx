'use client';

import Link from 'next/link';
import { Check, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string | null;
  period: string | null;
  features: string[];
  isHighlighted?: boolean;
  isCustom?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'advance-design',
    name: 'Advance Design',
    subtitle: 'Product design as a service',
    price: '$3,799',
    period: '/mo',
    features: [
      'Dedicated Product Designer',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
  },
  {
    id: 'advance-combo',
    name: 'Advance Combo',
    subtitle: 'Product design and frontend engineering as a service',
    price: '$6,399',
    period: '/mo',
    features: [
      'Dedicated Product Designer',
      'Dedicated Frontend Engineer (Vue.js, Angular.js, React.js)',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
    isHighlighted: true,
  },
  {
    id: 'advance-frontend',
    name: 'Advance Frontend',
    subtitle: 'Frontend engineering as a service',
    price: '$3,799',
    period: '/mo',
    features: [
      'Dedicated Frontend Engineer (Vue.js, Angular.js, React.js)',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
  },
  {
    id: 'custom-plan',
    name: 'Get Custom Plan',
    subtitle: 'Product design and frontend engineering as a service',
    price: null,
    period: null,
    features: ['All subject to Decided Plan'],
    isCustom: true,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-900 py-16 lg:py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Flat & Simple Monthly Pricing
          </h2>
          <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No hidden costs, no hiring cost, just pay only for the pure work. Save thousands with
            our Simple and Flat Monthly Pricing. All Plans come with a 7 days money back guarantee,
            no questions asked.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto mb-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                'relative group',
                plan.isHighlighted && 'md:scale-105 lg:scale-110 z-20',
              )}
            >
              {/* Highlight badge */}
              {plan.isHighlighted && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center z-30">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 animate-pulse">
                    <Star className="w-4 h-4 fill-white" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div
                className={cn(
                  'h-full rounded-2xl p-6 transition-all duration-300 relative flex flex-col',
                  'backdrop-blur-sm',
                  plan.isHighlighted
                    ? 'bg-gradient-to-b from-white to-orange-50 border-2 border-orange-400 shadow-2xl shadow-orange-500/30 transform hover:scale-105'
                    : 'bg-gray-800/50 border border-gray-700 hover:border-orange-400 hover:bg-gray-800/70 hover:shadow-xl',
                )}
              >
                {/* Glow effect for highlighted plan */}
                {plan.isHighlighted && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 blur-xl -z-10" />
                )}

                {/* Plan Header */}
                <div className="mb-4">
                  <h3
                    className={cn(
                      'text-xl font-bold mb-1',
                      plan.isHighlighted ? 'text-gray-900' : 'text-white',
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      'text-xs',
                      plan.isHighlighted ? 'text-gray-700' : 'text-gray-400',
                    )}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  {plan.price ? (
                    <div className="flex items-baseline">
                      <span
                        className={cn(
                          'text-3xl font-bold',
                          plan.isHighlighted ? 'text-orange-600' : 'text-white',
                        )}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          'ml-1 text-sm',
                          plan.isHighlighted ? 'text-gray-600' : 'text-gray-400',
                        )}
                      >
                        {plan.period}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white">Custom Pricing</div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          'w-4 h-4 mt-0.5 flex-shrink-0',
                          plan.isHighlighted ? 'text-orange-600' : 'text-orange-400',
                        )}
                      />
                      <span
                        className={cn(
                          'text-xs leading-relaxed',
                          plan.isHighlighted ? 'text-gray-700' : 'text-gray-300',
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/contact-us" className="mt-auto">
                  <Button
                    className={cn(
                      'w-full py-4 text-sm font-semibold transition-all duration-300 transform hover:scale-105',
                      plan.isHighlighted
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                        : plan.isCustom
                          ? 'bg-white hover:bg-gray-100 text-gray-900'
                          : 'bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white',
                    )}
                  >
                    {plan.isCustom ? 'Get Custom Plan' : 'Choose Plan'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-orange-500 mt-16 mb-4 text-base font-medium"
        >
          All plans include unlimited revisions and priority support
        </motion.p>
      </div>
    </section>
  );
}
