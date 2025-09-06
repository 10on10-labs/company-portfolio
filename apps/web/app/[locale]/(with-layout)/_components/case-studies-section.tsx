'use client';

import { Link } from '@/src/i18n/navigation';
import { AllProjectsQueryResult } from '@company/sanity-shared';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';

import { CaseStudyCard } from '@/components/case-study-card';

interface Projects {
  projects: AllProjectsQueryResult;
}

export default function CaseStudiesSection({ projects }: Projects) {
  const t = useTranslations('case_studies_section');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <section id="case-studies" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">{t('description')}</p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">{t('sub_description')}</p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-8">
          {featuredProjects?.map((project, index) => (
            <CaseStudyCard key={project._id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
          >
            {isRTL ? (
              <>
                {t('view_all')}
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                {t('view_all')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
