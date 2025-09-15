'use client';

import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
import { AllProjectsQueryResult } from '@company/sanity-shared';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';

import { urlFor } from '@/lib/image';

interface CaseStudyCardProps {
  project: AllProjectsQueryResult[0];
  index: number;
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('case_studies_section');

  const images =
    project?.coverImages?.slice(0, 4).map((img, idx) => ({
      url: urlFor(img || '')
        ?.width(600)
        ?.url(),
      alt: img?.alt || `${project.name} screenshot ${idx + 1}`,
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="bg-card text-card-foreground rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="p-6 lg:p-10 flex flex-col justify-center">
            {/* Project Logo and Title */}
            <div className="flex items-center gap-4 mb-4">
              {project.logo ? (
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                  <Image
                    src={urlFor(project.logo)?.width(128)?.height(128)?.url() || ''}
                    alt={`${project.name} logo`}
                    width={56}
                    height={56}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {project.name?.charAt(0) || 'P'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight">
                  {project.name}
                </h3>
                {project.category && (
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                )}
              </div>
            </div>

            {project.description && (
              <p className="text-muted-foreground mb-6 text-base leading-relaxed line-clamp-3">
                {project.description}
              </p>
            )}

            {/* Project Details */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{t('industry')}</span>
                <span>{project.category || 'Technology'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{t('services')}</span>
                <span>{t('default_services')}</span>
              </div>
            </div>

            <Link
              href={`/case-studies/${project?.slug}`}
              className={`inline-flex items-center text-primary font-semibold hover:gap-3 transition-all group ${isRTL ? 'gap-2' : ''}`}
            >
              {isRTL ? (
                <>
                  {t('view_case_study')}
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  {t('view_case_study')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Link>
          </div>

          {/* Right Content - MacBook Display */}
          <div className="relative h-[350px] lg:h-[400px] bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center p-6 lg:p-10">
            {images.length > 0 ? (
              <div className="relative w-full h-full max-w-[450px] mx-auto flex items-center justify-center">
                {/* MacBook Frame */}
                <div className="relative w-full">
                  <Image
                    src="/macbook_new-min.webp"
                    alt="MacBook Frame"
                    width={450}
                    height={281}
                    className="w-full h-auto relative z-10"
                  />
                  {/* Project Screenshot Inside MacBook Screen */}
                  <div className="absolute top-[7.2%] left-[10%] right-[10%] bottom-[21%] overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={images[0].url}
                        alt={images[0].alt}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
