'use client';

import { Link } from '@/src/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

import { PricingCard } from '@/components/pricing/pricing-card';
import { Button } from '@/components/shadcn/button';

// Icon mapping for value props
const iconMap = {
  zap: Zap,
  shield: Shield,
  users: Users,
  'heart-handshake': HeartHandshake,
  target: Users,
  rocket: Sparkles,
  'check-circle': Check,
  star: Sparkles,
};

// Types for pricing data
interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular: boolean;
  features: string[];
  buttonText: string;
}

interface Comparison {
  feature: string;
  us: string;
  them: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface PricingPageData {
  _id: string;
  title: string;
  language: string;
  heroSection: {
    badge: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  valuePropsSection: {
    valueProps: ValueProp[];
  };
  pricingPlansSection: {
    title: string;
    description: string;
    plans: PricingPlan[];
  };
  comparisonSection: {
    title: string;
    description: string;
    comparisons: Comparison[];
  };
  faqsSection: {
    title: string;
    faqs: FAQ[];
  };
  ctaSection: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    disclaimer: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface Props {
  pricingData: PricingPageData;
  locale: string;
}

export default function PricingPageClient({ pricingData, locale }: Props) {
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                {pricingData.heroSection.badge}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {pricingData.heroSection.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              {pricingData.heroSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#plans">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  {pricingData.heroSection.primaryButtonText}{' '}
                  <ArrowIcon className={isRTL ? 'mr-2 w-4 h-4' : 'ml-2 w-4 h-4'} />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {pricingData.heroSection.secondaryButtonText}
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
            {pricingData.valuePropsSection.valueProps.map((valueProp, index) => {
              const IconComponent = iconMap[valueProp.icon as keyof typeof iconMap] || Sparkles;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{valueProp.title}</h3>
                  <p className="text-sm text-gray-600">{valueProp.description}</p>
                </motion.div>
              );
            })}
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
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              {pricingData.pricingPlansSection.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {pricingData.pricingPlansSection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto">
            {pricingData.pricingPlansSection.plans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={{
                  id: `plan-${index}`,
                  name: plan.name,
                  subtitle: plan.description,
                  price: plan.price,
                  period: plan.period,
                  features: plan.features,
                  isHighlighted: plan.isPopular,
                  isCustom: !plan.price,
                }}
                index={index}
              />
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
              {pricingData.comparisonSection.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {pricingData.comparisonSection.description}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {pricingData.comparisonSection.comparisons.map((item, index) => (
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
              {pricingData.faqsSection.title}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {pricingData.faqsSection.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <ChevronIcon className="w-5 h-5 text-primary mt-0.5" />
                  {faq.question}
                </h3>
                <p className={`text-gray-600 ${isRTL ? 'mr-7' : 'ml-7'}`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {pricingData.ctaSection.title}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {pricingData.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  {pricingData.ctaSection.primaryButtonText}
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {pricingData.ctaSection.secondaryButtonText}
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/80">{pricingData.ctaSection.disclaimer}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
