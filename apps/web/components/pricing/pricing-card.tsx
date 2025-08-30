'use client';

import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string | null;
  period: string | null;
  features: string[];
  isHighlighted?: boolean;
  isCustom?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn('relative group', plan.isHighlighted && 'md:scale-105 lg:scale-110 z-20')}
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
          <p className={cn('text-xs', plan.isHighlighted ? 'text-gray-700' : 'text-gray-400')}>
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
  );
}
