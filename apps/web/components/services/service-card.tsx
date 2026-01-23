'use client';

import { Link } from '@/src/i18n/navigation';
import { HomepageServicesQueryResult, ServicesQueryResult } from '@company/sanity-shared';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Cloud,
  Code,
  Database,
  Globe,
  Monitor,
  Palette,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  service:
    | ServicesQueryResult[number]
    | HomepageServicesQueryResult[number]
    | {
        _id: string;
        name: string;
        slug: string;
        shortDescription?: string;
        description?: string;
        icon?: string;
        categories?: string[];
      };
  index: number;
  variant?: 'homepage' | 'services-page' | 'enhanced';
  locale?: string;
  featured?: boolean;
}

// Comprehensive icon mapping
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
  sparkles: Sparkles,
  globe: Globe,

  // Fallback name-based mapping
  'web development': Globe,
  'mobile development': Smartphone,
  'ui/ux design': Palette,
  'backend development': Code,
  'frontend development': Monitor,
  default: Code,
};

const getServiceIcon = (service: any) => {
  // First try to use the icon field from Sanity
  if (service?.icon && iconMap[service.icon]) {
    return iconMap[service.icon];
  }

  // Fallback to name-based mapping
  const lower = service?.name?.toLowerCase() || '';
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return icon;
  }

  return iconMap.default;
};

export default function ServiceCard({
  service,
  index,
  variant = 'homepage',
  locale = 'en',
  featured = false,
}: ServiceCardProps) {
  const t = useTranslations('Services');
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const Icon = getServiceIcon(service);

  // Homepage variant (simple, equal height)
  if (variant === 'homepage') {
    return (
      <Link
        href={`/services/${'slug' in service ? service.slug : 'id' in service ? service.id : '#'}`}
        className="block h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full cursor-pointer overflow-hidden flex flex-col"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-gray-50 rounded-xl p-3 mb-4 group-hover:bg-primary/10 transition-colors w-fit mx-auto">
              <Icon className="text-primary w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors flex-shrink-0">
              {service.name || 'Service'}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed flex-grow">
              {'shortDescription' in service
                ? service.shortDescription
                : service.description || 'Professional service'}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      </Link>
    );
  }

  // Enhanced variant (for services page or featured sections)
  if (variant === 'enhanced') {
    return (
      <Link
        href={`/services/${'slug' in service ? service.slug : 'id' in service ? service.id : '#'}`}
        className="block h-full"
      >
        <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 transition-transform transition-shadow duration-300 hover:shadow-xl shadow-sm h-full flex flex-col transform-gpu">
          {/* Premium Badge for Featured */}
          {featured && index === 0 && (
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20">
              <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3 h-3" />
                Popular
              </div>
            </div>
          )}

          {/* Card Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Icon and Number Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                {/* Icon Container with Gradient Background */}
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 transform-gpu group-hover:scale-110">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Service Number - More subtle */}
              <span className="text-3xl font-bold bg-gradient-to-br from-gray-200 to-gray-300 bg-clip-text text-transparent">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Service Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize group-hover:text-primary transition-colors duration-300">
              {service?.name}
            </h3>

            {/* Description */}
            {(('description' in service ? service?.description : false) ||
              ('shortDescription' in service ? service?.shortDescription : false)) && (
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                {('description' in service ? service.description : null) ||
                  ('shortDescription' in service ? service.shortDescription : '') ||
                  ''}
              </p>
            )}

            {/* Categories with Better Styling */}
            {('categories' in service ? service?.categories : false) &&
              ('categories' in service ? (service.categories?.length || 0) > 0 : false) && (
                <div className="space-y-2 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {('categories' in service ? service.categories || [] : [])
                      .slice(0, 4)
                      .map((category: string, catIndex: number) => (
                        <span
                          key={`${category}-${catIndex}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                        >
                          {category}
                        </span>
                      ))}

                    {('categories' in service ? service.categories || [] : []).length > 4 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        +{('categories' in service ? service.categories || [] : []).length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

            {/* View Service Link */}
            <div className="flex items-center gap-2 text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm">{t('card.view_service') || 'View Service'}</span>
              <ArrowIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default/Services page variant
  return (
    <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col">
      <div className="mb-4 flex justify-center">
        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors flex-shrink-0">
        {service?.name}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
        {'description' in service
          ? service?.description
          : 'shortDescription' in service
            ? service?.shortDescription
            : ''}
      </p>

      {/* Categories */}
      {('categories' in service ? service?.categories : false) &&
        ('categories' in service ? (service.categories?.length || 0) > 0 : false) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {('categories' in service ? service.categories || [] : [])
                .slice(0, 3)
                .map((category: string, catIndex: number) => (
                  <span
                    key={`${category}-${catIndex}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {category}
                  </span>
                ))}
              {('categories' in service ? service.categories || [] : []).length > 3 && (
                <span className="text-xs text-gray-500">
                  +{('categories' in service ? service.categories || [] : []).length - 3}
                </span>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
