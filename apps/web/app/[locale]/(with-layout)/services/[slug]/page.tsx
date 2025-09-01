import React from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/src/i18n/navigation';
import { sanityClient } from '@company/sanity-shared/client';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Palette,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { groq } from 'next-sanity';

import { ServiceQueryResult } from '@/types/sanity.types';
import { allProjectsQuery } from '@/lib/sanity-queries';

import ProjectShowcase from './_components/project-showcase';

// Icon mapping
const iconMap: Record<string, any> = {
  code: Code2,
  zap: Zap,
  users: Users,
  palette: Palette,
  shield: Shield,
  gauge: Gauge,
  gitbranch: GitBranch,
  globe: Globe,
  smartphone: Smartphone,
  rocket: Rocket,
  monitor: Code2,
  database: Database,
  cloud: Cloud,
  chart: BarChart3,
  settings: Settings,
};

// Query for single service with localization
const serviceQuery = groq`
  *[_type == "service" && id.current == $slug && language == $language][0] {
    _id,
    name,
    "slug": id.current,
    shortDescription,
    description,
    categories,
    icon,
    heroSection {
      tagline,
      headline,
      subheadline,
      primaryButtonText,
      secondaryButtonText
    },
    featuresSection {
      title,
      description
    },
    technologiesSection {
      title,
      description
    },
    processSection {
      title,
      description
    },
    features[] {
      title,
      description,
      icon
    },
    technologies[] {
      name,
      icon
    },
    processSteps[] {
      number,
      title,
      description
    },
    benefits,
    whyChooseUs {
      headline,
      description,
      reasons[] {
        title,
        description,
        icon
      }
    },
    ctaSection {
      headline,
      description,
      primaryButtonText,
      secondaryButtonText
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Query for all unique service slugs (for generateStaticParams)
const servicesSlugQuery = groq`
  *[_type == "service"] {
    "slug": id.current
  } | order(slug)
`;

export async function generateStaticParams() {
  const services = await sanityClient.fetch(servicesSlugQuery);
  // Get unique slugs - Next.js will generate paths for each locale automatically
  const uniqueSlugs = [...new Set(services.map((service: { slug: string }) => service.slug))];
  return uniqueSlugs.map(slug => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const service = await sanityClient.fetch<ServiceQueryResult>(serviceQuery, {
    slug,
    language: locale,
  });

  return {
    title: { absolute: `Service - ${service?.heroSection?.tagline}` },
    description: service?.seo?.metaDescription || service?.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const service = await sanityClient.fetch<ServiceQueryResult>(serviceQuery, {
    slug,
    language: locale,
  });
  const projects = await sanityClient.fetch(allProjectsQuery);

  if (!service) {
    notFound();
  }

  // Get icon component
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName?.toLowerCase()] || Code2;
    return Icon;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {service.heroSection?.tagline && (
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  {service.heroSection.tagline}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {service.heroSection?.headline || service.name}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.heroSection?.subheadline || service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
                >
                  {service.heroSection?.primaryButtonText || 'Start Your Project'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {service.heroSection?.secondaryButtonText || 'View Our Work'}
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  {React.createElement(getIcon(service.icon || ''), {
                    className: 'w-24 h-24 text-primary/50 mx-auto mb-4',
                  })}
                  <p className="text-gray-500">{service.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {service.features && service.features.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.featuresSection?.title || `Why Choose Our ${service.name}`}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {service.featuresSection?.description ||
                  'We combine technical expertise with creative vision to deliver outstanding solutions'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.features.map((feature, index: number) => {
                const Icon = getIcon(feature.icon || '');
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Technology Stack */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.technologiesSection?.title || 'Technologies We Master'}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {service.technologiesSection?.description ||
                  'Leveraging cutting-edge technologies to build modern applications'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {service.technologies.map((tech, index: number) => (
                <div
                  key={index}
                  className="bg-gray-800 border-2 border-gray-700 rounded-2xl px-6 py-4 hover:border-primary hover:bg-gray-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-semibold text-white">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.processSection?.title || 'Our Development Process'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {service.processSection?.description ||
                  'A proven methodology that ensures project success from concept to deployment'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.processSteps.map((step, index: number) => (
                <div key={index} className="relative">
                  <div className="bg-white p-6 rounded-2xl h-full">
                    <span className="text-4xl font-bold text-primary/20 mb-4 block">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {index < (service.processSteps ?? []).length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {service.whyChooseUs && (
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {service.whyChooseUs.headline}
                </h2>
                <p className="text-lg text-gray-300 mb-8">{service.whyChooseUs.description}</p>
                {service.benefits && service.benefits.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {service.whyChooseUs.reasons && service.whyChooseUs.reasons.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.whyChooseUs.reasons.map((reason: any, index: number) => {
                    const Icon = getIcon(reason.icon);
                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl border border-gray-700"
                      >
                        <Icon className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                        <p className="text-sm text-gray-300">{reason.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects Showcase */}
      <ProjectShowcase projects={projects} />

      {/* CTA Section */}
      {service.ctaSection && (
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {service.ctaSection.headline}
              </h2>
              <p className="text-lg text-white/90 mb-8">{service.ctaSection.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  {service.ctaSection.primaryButtonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  {service.ctaSection.secondaryButtonText}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
