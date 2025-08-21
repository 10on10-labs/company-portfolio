'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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
              className={`grid grid-cols-1 ${
                section?.images && section.images.length > 0 ? 'lg:grid-cols-2' : ''
              } gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Section Content */}
              <div
                className={`space-y-4 ${
                  section?.images && section.images.length > 0 && index % 2 === 1
                    ? 'lg:order-2'
                    : ''
                } ${
                  !section?.images || section.images.length === 0
                    ? 'lg:col-span-full max-w-4xl mx-auto'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {section.name || `Section ${index + 1}`}
                  </h3>
                </div>
                {section.content && (
                  <div className="prose prose-gray max-w-none">
                    {section.content.split('\n\n').map((paragraph: string, pIndex: number) => {
                      // Check if it's a heading (starts with **)
                      if (paragraph.startsWith('**') && paragraph.includes('**:')) {
                        const [heading, ...rest] = paragraph.split(':');
                        const cleanHeading = heading.replace(/\*\*/g, '');
                        const content = rest.join(':').replace(/\*\*/g, '');
                        return (
                          <div key={pIndex} className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{cleanHeading}:</h4>
                            <p className="text-gray-600 leading-relaxed">{content}</p>
                          </div>
                        );
                      }
                      // Check if it's a bullet point
                      else if (paragraph.startsWith('- ')) {
                        const items = paragraph
                          .split('\n')
                          .filter((item: string) => item.startsWith('- '));
                        return (
                          <ul key={pIndex} className="list-disc list-inside space-y-2 mb-4">
                            {items.map((item: string, iIndex: number) => (
                              <li key={iIndex} className="text-gray-600">
                                {item.replace('- ', '').replace(/\*\*/g, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Regular paragraph
                      else {
                        return (
                          <p key={pIndex} className="text-gray-600 leading-relaxed mb-4">
                            {paragraph.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                    })}
                  </div>
                )}
              </div>

              {/* Section Images - Only show if images exist */}
              {section?.images && section.images.length > 0 && (
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                      {section.images.slice(0, 1).map((image: any) => {
                        const imageUrl = urlFor(image).width(600).height(400).url();
                        return (
                          <Image
                            key={image?._key}
                            src={imageUrl}
                            width={600}
                            height={400}
                            alt={image?.alt || section.name || ''}
                            className="w-full h-[400px] object-cover"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
