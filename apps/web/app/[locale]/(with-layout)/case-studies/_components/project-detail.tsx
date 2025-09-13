'use client';

import type { AllProjectsQueryResult, ProjectBySlugQueryResult } from '@company/sanity-shared';

import { ProjectCTASection } from './project-cta-section';
import { ProjectFeaturesSection } from './project-features-section';
import { ProjectHeroSection } from './project-hero-section';
import { ProjectShowcaseSection } from './project-showcase-section';

type Props = {
  project?: ProjectBySlugQueryResult | AllProjectsQueryResult[number];
  locale?: string;
};

export const ProjectDetail: React.FC<Props> = ({ project, locale = 'en' }) => {
  if (!project) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with MacBook Carousel */}
      <ProjectHeroSection project={project} />

      {/* Features Section - only show if pageContent exists */}
      {'pageContent' in project && project.pageContent?.keyFeatures && (
        <ProjectFeaturesSection keyFeatures={project.pageContent.keyFeatures} />
      )}

      {/* Project Showcase Section */}
      <ProjectShowcaseSection
        projectSections={project.projectSections}
        projectShowcase={
          'pageContent' in project ? project.pageContent?.projectShowcase : undefined
        }
        locale={locale}
      />

      {/* Call to Action Section - only show if pageContent exists */}
      {'pageContent' in project && project.pageContent?.callToAction && (
        <ProjectCTASection callToAction={project.pageContent.callToAction} />
      )}
    </div>
  );
};
