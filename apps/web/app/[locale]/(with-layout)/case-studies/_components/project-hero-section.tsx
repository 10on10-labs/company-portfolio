'use client';

import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
import { AllProjectsQueryResult, ProjectBySlugQueryResult } from '@company/sanity-shared';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLinkIcon,
  Layers,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';

import { urlFor } from '@/lib/image';

import { MacBookCarousel } from './macbook-carousel';

type Props = {
  project: ProjectBySlugQueryResult | AllProjectsQueryResult[number];
};

export const ProjectHeroSection: React.FC<Props> = ({ project }) => {
  const t = useTranslations('case_studies_page');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const logoUrl = project?.logo ? urlFor(project.logo).width(128).height(128).url() : null;

  // Process all images
  const allImages: { url: string; alt: string }[] = [];

  if (project?.coverImages && project.coverImages.length > 0) {
    project.coverImages.forEach((img, idx) => {
      if (img) {
        const imageUrl = urlFor(img || '')
          ?.width(1200)
          ?.height(750)
          ?.url();
        if (imageUrl) {
          allImages.push({
            url: imageUrl,
            alt: img?.alt || `${name} screenshot ${idx + 1}`,
          });
        }
      }
    });
  }

  if (allImages.length === 0 && project?.projectSections) {
    project.projectSections.forEach(section => {
      if (section?.images && section.images.length > 0) {
        section.images.forEach((img: any, idx: number) => {
          if (img) {
            const imageUrl = urlFor(img || '')
              ?.width(1200)
              ?.height(750)
              ?.url();
            if (imageUrl) {
              allImages.push({
                url: imageUrl,
                alt: img?.alt || section.name || `Project image ${idx + 1}`,
              });
            }
          }
        });
      }
    });
  }

  const projectStats = [
    { label: 'Timeline', value: project?.timeline || '3 Months', icon: Calendar },
    { label: 'Team Size', value: `${project?.teamSize || 5} Members`, icon: Users },
    { label: 'Technologies', value: `${project?.technologies || 8}+ Tools`, icon: Layers },
    { label: 'Iterations', value: `${project?.iterations || 12} Sprints`, icon: Target },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto px-6 lg:px-12 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 relative z-10"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all cursor-pointer group"
            style={{ cursor: 'pointer' }}
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            ) : (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            )}
            <span>{t('back_to_case_studies')}</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Logo and Title */}
            <div className="flex items-start gap-4">
              {logoUrl ? (
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Image
                    src={logoUrl}
                    alt={`${project?.name} logo`}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-primary">
                    {project?.name?.charAt(0) || 'P'}
                  </span>
                </div>
              )}

              <div className="flex-1">
                <div className="flex">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    {project?.name}
                  </h1>
                  {project?.url && (
                    <a
                      href={project?.url}
                      target="_blank"
                      className="ml-4 text-muted-foreground hover:text-muted-foreground z-20"
                      rel="noreferrer"
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
                {project?.category && (
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {project?.description && (
              <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            )}

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4">
              {projectStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-muted/50 rounded-xl p-4 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - MacBook with Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {allImages.length > 0 ? (
              <MacBookCarousel images={allImages} />
            ) : (
              <div className="relative max-w-[600px] mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
                <span className="text-muted-foreground text-lg">No images available</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
