'use client';

import { useState } from 'react';
import { ServicesQueryResult } from '@/sanity.types';
import { Search } from 'lucide-react';

import ServiceCardSimple from '@/components/services/service-card-simple';

interface ServicesPageClientProps {
  services: ServicesQueryResult;
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories from all services
  const allCategories = Array.from(
    new Set(services?.flatMap(service => service.categories || []).filter(Boolean)),
  );

  // Filter services based on search and category
  const filteredServices = services?.filter(service => {
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
              Our Expertise
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Professional Services
            </h1>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Comprehensive digital solutions tailored to elevate your business and drive meaningful
              results.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all bg-white"
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
                All Services
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
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {`Let's`} discuss how our services can help transform your business and achieve your
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-secondary transition-all duration-300 shadow-2xl">
                Schedule a Consultation
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-primary transition-all duration-300">
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
