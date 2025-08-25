'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronRight,
  HeartHandshake,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

import { PricingCard } from '@/components/pricing/pricing-card';
import { pricingPlans } from '@/components/pricing/pricing-data';
import { Button } from '@/components/shadcn/button';

const comparisons = [
  {
    feature: 'Traditional Agency',
    us: 'Simple flat monthly pricing',
    them: 'Complex project-based quotes',
  },
  {
    feature: 'Hiring In-House',
    us: 'No hiring costs or benefits',
    them: '$100k+ salary + benefits',
  },
  {
    feature: 'Freelancers',
    us: 'Consistent quality & availability',
    them: 'Variable quality & reliability',
  },
  { feature: 'Turnaround Time', us: '48 hours average', them: 'Weeks to months' },
  {
    feature: 'Communication',
    us: 'Direct Slack/Teams integration',
    them: 'Email chains & meetings',
  },
  { feature: 'Flexibility', us: 'Pause or cancel anytime', them: 'Long-term contracts' },
];

const faqs = [
  {
    question: 'How does the subscription model work?',
    answer:
      'You pay a flat monthly fee and get unlimited requests. We work on them one at a time with an average 48-hour turnaround. You can have as many requests in your queue as needed.',
  },
  {
    question: 'What if I need to pause my subscription?',
    answer:
      'You can pause your subscription anytime and resume when you need us again. Billing cycles are prorated, so you only pay for the time you use.',
  },
  {
    question: 'How fast will I receive my designs or code?',
    answer:
      'Most requests are completed within 48 hours. Complex projects are broken into smaller milestones, each delivered within 48 hours.',
  },
  {
    question: 'Is there a limit to revisions?',
    answer:
      "No! We offer unlimited revisions until you're 100% satisfied with the work. Your satisfaction is our priority.",
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'We specialize in modern frontend frameworks like React, Vue.js, Angular, Next.js, and design tools like Figma, Sketch, and Adobe XD.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes! You can change your plan anytime. Upgrades take effect immediately, and downgrades apply at the next billing cycle.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
                Transparent Pricing
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Simple, Flat Monthly Pricing
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              No hidden costs, no hourly billing, no surprises. Just pure value delivered monthly.
              Save thousands compared to traditional agencies or in-house teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#plans">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Plans <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Book a Call
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">48-hour average turnaround on all requests</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk-Free</h3>
              <p className="text-sm text-gray-600">
                7-day money-back guarantee, no questions asked
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dedicated Team</h3>
              <p className="text-sm text-gray-600">
                Your own designer & developer, always available
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Terms</h3>
              <p className="text-sm text-gray-600">
                Pause or cancel anytime, no contracts required
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="relative py-20 bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              All plans include unlimited requests, unlimited revisions, and daily updates. Scale up
              or down as your needs change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Model?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we compare to traditional alternatives
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-200"
              >
                <div className="font-semibold text-gray-900">{item.feature}</div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{item.us}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{item.them}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-orange-500 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have simplified their design and development process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Start Your 7-Day Trial
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/80">
              No credit card required • Cancel anytime • 7-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
