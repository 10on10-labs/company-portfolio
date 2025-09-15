'use client';

import { AllProjectsQueryResult } from '@company/sanity-shared';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { CaseStudyCard } from '@/components/case-study-card';

interface Props {
  projects: AllProjectsQueryResult | null;
}

export default function CaseStudiesList({ projects }: Props) {
  const t = useTranslations('case_studies_page');

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">{t('description')}</p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">{t('sub_description')}</p>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto space-y-8">
        {projects?.map((project, index) => (
          <CaseStudyCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
