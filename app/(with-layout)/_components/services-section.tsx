'use client';

import Link from 'next/link';
import { ServicesQueryResult } from '@/sanity.types';
import { ArrowRight } from 'lucide-react';

import ServiceCardSimple from '@/components/services/service-card-simple';

interface ServicesSectionProps {
  services: ServicesQueryResult;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  // Take only first 6 services for homepage
  const featuredServices = services?.slice(0, 6) || [];

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Clean background without pattern */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Services That Drive Results
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we deliver comprehensive web solutions that transform your ideas
            into powerful digital experiences
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {featuredServices.map((service, index) => (
            <ServiceCardSimple key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
