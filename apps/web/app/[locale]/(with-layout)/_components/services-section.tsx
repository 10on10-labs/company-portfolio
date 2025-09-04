'use client';

import { Link } from '@/src/i18n/navigation';
import { ArrowRight, Palette, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const ourExpertise = [
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces',
    icon: Palette,
    link: '/services/ui-ux-services',
  },
  {
    title: 'Frontend Development',
    description: 'Fast, scalable applications',
    icon: Sparkles,
    link: '/services/frontend-development',
  },
];

export default function ServicesSection() {
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

        {/* Our Expertise Cards */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ourExpertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link href={item.link} key={index}>
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
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
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
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
