'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { PricingCard, PricingPlan } from '@/components/pricing/pricing-card';

interface PricingData {
  pricingPlansSection: {
    title: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      isPopular: boolean;
      features: string[];
      buttonText: string;
    }>;
  };
}

interface PricingSectionProps {
  pricingData: PricingData | null;
}

export default function PricingSection({ pricingData }: PricingSectionProps) {
  const t = useTranslations('pricing_section');
  return (
    <section
      id="pricing"
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-900 dark:bg-gray-800 py-16 lg:py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
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
              {t('badge')}
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {pricingData?.pricingPlansSection?.title || 'Flat & Simple Monthly Pricing'}
          </h2>
          <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {pricingData?.pricingPlansSection?.description ||
              'No hidden costs, no hiring cost, just pay only for the pure work. Save thousands with our Simple and Flat Monthly Pricing. All Plans come with a 7 days money back guarantee, no questions asked.'}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto mb-8">
          {pricingData?.pricingPlansSection?.plans?.map((plan, index) => {
            const formattedPlan: PricingPlan = {
              id: `plan-${index}`,
              name: plan.name,
              subtitle: plan.description,
              price: plan.price || null,
              period: plan.period || null,
              features: plan.features || [],
              isHighlighted: plan.isPopular || false,
              isCustom: !plan.price,
            };

            return <PricingCard key={formattedPlan.id} plan={formattedPlan} index={index} />;
          }) || []}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-orange-500 mt-16 mb-4 text-base font-medium"
        >
          {t('bottom_note')}
        </motion.p>
      </div>
    </section>
  );
}
