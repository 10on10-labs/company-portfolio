'use client';

import { Link } from '@/src/i18n/navigation';
import { HomepageServicesQueryResult } from '@company/sanity-shared';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ServiceCard from '@/components/services/service-card';

interface ServicesSectionType {
  services: HomepageServicesQueryResult;
  locale: string;
}

// Fallback services for when Sanity data is unavailable
const fallbackServices = [
  {
    _id: '1',
    name: 'UI/UX Design',
    slug: 'ui-ux-services',
    shortDescription: 'Beautiful, intuitive interfaces',
    icon: 'palette',
  },
  {
    _id: '2',
    name: 'Frontend Development',
    slug: 'frontend-development',
    shortDescription: 'Fast, scalable applications',
    icon: 'sparkles',
  },
];

export default function ServicesSection({ services, locale }: ServicesSectionType) {
  const t = useTranslations('services_section');
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Clean background without pattern */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
            {t('what_we_do')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Our Expertise Cards */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(services || fallbackServices).map((service, index) => (
              <ServiceCard
                key={service._id || index}
                service={service}
                index={index}
                variant="homepage"
                locale={locale}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
          >
            {t('explore_all_services')}
            <ArrowIcon
              className={`w-5 h-5 transition-transform ${
                isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
