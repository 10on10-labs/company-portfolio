'use client';

import { Layers, Palette, Search, Shield, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ServicesPageClient() {
  const t = useTranslations('Services');

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-4 md:py-6 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-wider mb-2 bg-primary/10 px-3 py-1.5 rounded-full">
              {t('ourExpertise')}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('title')}</h1>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Expertise Categories Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {Object.entries(expertiseData).map(([category, items]) => (
            <div key={category} className="mb-16 last:mb-0">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{category}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-border group"
                    >
                      <div className="mb-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-secondary-foreground/90 mb-8">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-background text-primary font-semibold rounded-full hover:bg-muted transition-all duration-300 shadow-2xl">
                {t('cta.scheduleButton')}
              </button>
              <button className="px-8 py-4 bg-transparent text-secondary-foreground font-semibold rounded-full border-2 border-secondary-foreground hover:bg-background hover:text-primary transition-all duration-300">
                {t('cta.portfolioButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
