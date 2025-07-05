'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

import { Badge } from '@/components/shadcn/badge';
import { Card, CardContent } from '@/components/shadcn/card';

interface Project {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  category?: string;
  logoUrl?: string;
  coverImages?: Array<{ url: string; alt?: string }>;
}

interface CaseStudiesSectionProps {
  projects: Project[];
}

export default function CaseStudiesSection({ projects }: CaseStudiesSectionProps) {
  // Take only first 3 projects for homepage
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Case Studies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful projects and see how {`we've`} helped businesses
            transform their digital presence
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredProjects?.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug.current}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    {project.coverImages && project.coverImages?.[0]?.url ? (
                      <Image
                        src={project.coverImages[0].url || ''}
                        alt={project.coverImages[0].alt || project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Category Badge */}
                    {project.category && (
                      <Badge variant="secondary" className="mb-3">
                        {project.category}
                      </Badge>
                    )}

                    {/* Project Name */}
                    <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    {project.description && (
                      <p className="text-gray-600 line-clamp-2 mb-4">{project.description}</p>
                    )}

                    {/* View Project Link */}
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                      View Project
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
          >
            View All Projects
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
