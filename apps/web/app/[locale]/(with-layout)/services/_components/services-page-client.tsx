'use client';

import { useState } from 'react';
import { ServicesQueryResult } from '@company/sanity-shared';
import { Layers, Palette, Search, Shield, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ServiceCardSimple from '@/components/services/service-card-simple';

interface ServicesPageClientProps {
  services: ServicesQueryResult;
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  const t = useTranslations('Services');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const expertiseData = {
    [t('expertise.category_title')]: [
      {
        title: t('expertise.items.strategic_design.title'),
        description: t('expertise.items.strategic_design.description'),
        icon: Sparkles,
      },
      {
        title: t('expertise.items.seamless_ui.title'),
        description: t('expertise.items.seamless_ui.description'),
        icon: Palette,
      },
      {
        title: t('expertise.items.prototyping.title'),
        description: t('expertise.items.prototyping.description'),
        icon: Layers,
      },
      {
        title: t('expertise.items.research_testing.title'),
        description: t('expertise.items.research_testing.description'),
        icon: Search,
      },
      {
        title: t('expertise.items.design_systems.title'),
        description: t('expertise.items.design_systems.description'),
        icon: Shield,
      },
      {
        title: t('expertise.items.mobile_first.title'),
        description: t('expertise.items.mobile_first.description'),
        icon: Zap,
      },
    ],
  };

  // Get unique categories from all services
  const allCategories = Array.from(
    new Set(services?.flatMap(service => service.categories || []).filter(Boolean)),
  );

  // Filter services based on search and category, excluding Frontend Development
  const filteredServices = services?.filter(service => {
    // Exclude Frontend Development service card
    if (
      service.name?.toLowerCase() === 'frontend development' ||
      service.name?.toLowerCase().includes('frontend development')
    ) {
      return false;
    }

    const matchesSearch =
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || service.categories?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-4 md:py-6 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-wider mb-2 bg-primary/10 px-3 py-1.5 rounded-full">
              {t('ourExpertise')}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t('description')}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="relative">
                <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all bg-white"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t('allServices')}
              </button>
              {allCategories.slice(0, 5).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all capitalize ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Categories Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {Object.entries(expertiseData).map(([category, items]) => (
            <div key={category} className="mb-16 last:mb-0">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{category}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                    >
                      <div className="mb-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          {filteredServices && filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredServices.map((service, index) => (
                <ServiceCardSimple key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('noServicesFound')}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255 255 255) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('cta.title')}</h2>
            <p className="text-xl text-white/90 mb-8">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-secondary transition-all duration-300 shadow-2xl">
                {t('cta.scheduleButton')}
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-primary transition-all duration-300">
                {t('cta.portfolioButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
