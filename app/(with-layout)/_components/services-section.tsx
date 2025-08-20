'use client';

import { ServicesQueryResult } from '@/sanity.types';
import { motion } from 'motion/react';

import { ServiceCard } from '../services/_components/service-card';
import { ServicesCarousel } from '../services/_components/service-carousel';

interface ServicesSectionProps {
  services: ServicesQueryResult;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  // Take only first 6 services for homepage
  const featuredServices = services?.slice(0, 6) || [];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of web development and design services tailored to bring
            your vision to life
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard service={service} step={String(index + 1).padStart(2, '0')} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ServicesCarousel services={featuredServices} />
        </div>
      </div>
    </section>
  );
}
