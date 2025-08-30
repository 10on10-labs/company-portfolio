'use client';

import Image from 'next/image';
import { CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { urlFor } from '@/lib/image';

interface ProjectShowcaseSectionProps {
  projectSections?: any[] | null;
}

export const ProjectShowcaseSection: React.FC<ProjectShowcaseSectionProps> = ({
  projectSections,
}) => {
  if (!projectSections || projectSections.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Showcase</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the different sections and features of this project in detail
          </p>
        </motion.div>

        <div className="space-y-24">
          {projectSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Section Content */}
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-lg lg:text-xl font-medium text-primary uppercase tracking-wider">
                    {section.name || `Section ${index + 1}`}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  This section showcases the implementation and design choices made for{' '}
                  {section.name?.toLowerCase()}. Our approach focused on creating an intuitive and
                  engaging user experience.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Fully responsive design</span>
                </div>
              </div>

              {/* Section Images */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {section?.images && section.images.length > 0 ? (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                      {section.images.map((image: any) => {
                        const imageUrl = urlFor(image).width(800).url();
                        return (
                          <Image
                            key={image?._key}
                            src={imageUrl}
                            width={800}
                            height={500}
                            alt={image?.alt || section.name || ''}
                            className="w-full h-auto"
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 flex items-center justify-center min-h-[300px]">
                    <span className="text-gray-400">No preview available</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
