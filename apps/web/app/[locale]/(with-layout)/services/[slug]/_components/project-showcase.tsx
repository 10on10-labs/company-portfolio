'use client';

import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
import { AllProjectsQueryResult } from '@company/sanity-shared';
import { ArrowRight, Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { urlFor } from '@/lib/image';

interface ProjectShowcaseProps {
  projects: AllProjectsQueryResult;
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const t = useTranslations('Services.projectShowcase');

  // Show up to 6 related projects (or all if less than 6)
  const displayProjects = projects?.slice(0, 6) || [];

  // Don't render the section if there are no projects
  if (!displayProjects.length) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => {
            const mainImage = project?.coverImages?.[0];
            const imageUrl = mainImage ? urlFor(mainImage)?.width(600)?.height(400)?.url() : null;

            return (
              <Link
                key={project._id || index}
                href={`/case-studies/${project.slug || ''}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.name || 'Project'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {/* Category */}
                    {project.category && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* View Project Link */}
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>{t('viewProject')}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
          >
            {t('viewAllCaseStudies')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
