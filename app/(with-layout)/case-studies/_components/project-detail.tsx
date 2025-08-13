'use client';

import type { ProjectBySlugQueryResult } from '@/sanity.types';

import { ProjectCTASection } from './project-cta-section';
import { ProjectFeaturesSection } from './project-features-section';
import { ProjectHeroSection } from './project-hero-section';
import { ProjectShowcaseSection } from './project-showcase-section';

type Props = {
  project?: ProjectBySlugQueryResult;
};

export const ProjectDetail: React.FC<Props> = ({ project }) => {
  if (!project) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with MacBook Carousel */}
      <ProjectHeroSection project={project} />

      {/* Features Section */}
      <ProjectFeaturesSection />

      {/* Project Showcase Section */}
      <ProjectShowcaseSection projectSections={project.projectSections} />

      {/* Call to Action Section */}
      <ProjectCTASection />
    </div>
  );
};
