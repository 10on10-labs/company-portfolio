'use client';

import { Link } from '@/src/i18n/navigation';
import { HomepageServicesQueryResult } from '@company/sanity-shared';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Cloud,
  Code,
  Database,
  Monitor,
  Palette,
  Rocket,
  Settings,
  Shield,
  Smartphone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ServicesSectionType {
  services: HomepageServicesQueryResult;
  locale: string;
}

// Icon mapping for services (matches service schema)
const iconMap: Record<string, any> = {
  monitor: Monitor,
  code: Code,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  chart: BarChart3,
  palette: Palette,
  rocket: Rocket,
  settings: Settings,
};

const getServiceIcon = (iconName: string) => {
  return iconMap[iconName] || Palette; // fallback to Palette
};

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
            {(services || fallbackServices).map((service, index) => {
              console.log(service);
              const Icon = getServiceIcon(service.icon || 'palette');
              return (
                <Link href={`/services/${service.slug || '#'}`} key={service._id || index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[180px] cursor-pointer overflow-hidden"
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="bg-gray-50 rounded-xl p-3 inline-block mb-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="text-primary w-7 h-7" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {service.name || 'Service'}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.shortDescription || 'Professional service'}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                </Link>
              );
            })}
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
