'use client';

import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';
import { ServicesQueryResult } from '@company/sanity-shared';
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Cloud,
  Code,
  Database,
  Globe,
  Monitor,
  Palette,
  Rocket,
  Server,
  Settings,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceCardSimpleProps {
  service: ServicesQueryResult[number];
  index: number;
}

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
  zap: Zap,
  globe: Globe,
  server: Server,
  // Fallback name-based mapping
  'web development': Globe,
  'mobile development': Smartphone,
  'ui/ux design': Palette,
  'backend development': Server,
  'frontend development': Monitor,
  default: Code,
};

export default function ServiceCardSimple({ service, index }: ServiceCardSimpleProps) {
  const t = useTranslations('Services');
  const [showAll, setShowAll] = useState(false);

  const getIcon = (service: any) => {
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

  const Icon = getIcon(service);
  const categories = service?.categories || [];
  const visibleCategories = showAll ? categories : categories.slice(0, 4);
  const serviceSlug = service?.id || '';

  return (
    <Link href={`/services/${serviceSlug}`} className="block h-full">
      <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-100">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize group-hover:text-primary transition-colors">
          {service?.name}
        </h3>

        {/* Description */}
        {service?.description ? (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        ) : null}

        {/* Categories as Bullet Points */}
        {categories.length > 0 && (
          <div className="mt-auto space-y-1.5">
            {visibleCategories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                <span className="capitalize">{cat}</span>
              </div>
            ))}
            {categories.length > 4 && (
              <button
                onClick={e => {
                  e.preventDefault();
                  setShowAll(!showAll);
                }}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium mt-2"
              >
                {showAll
                  ? t('card.show_less')
                  : t('card.view_more', { count: categories.length - 4 })}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${showAll ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
        )}

        {/* View Service Link */}
        <div className="flex items-center gap-2 text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm">{t('card.view_service')}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </div>
      </div>
    </Link>
  );
}
