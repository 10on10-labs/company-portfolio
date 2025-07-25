'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AllProjectsQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Projects {
  projects: AllProjectsQueryResult;
}

export default function CaseStudiesSection({ projects }: Projects) {
  // Take only first 3 projects for homepage
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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

        {/* Projects List - Vertical Layout */}
        <div className="max-w-7xl mx-auto space-y-8">
          {featuredProjects?.map((project, index) => {
            // Get all available images
            const images =
              project?.coverImages?.slice(0, 4).map((img, idx) => ({
                url: urlFor(img || '')
                  ?.width(600)
                  ?.url(),
                alt: img?.alt || `${project.name} screenshot ${idx + 1}`,
              })) || [];

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {project.name}
                      </h3>

                      {project.description && (
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      {/* @TODO will decide on these fields */}
                      <div className="space-y-3 mb-8">
                        {/* {project?.location && (
                          <div className="flex">
                            <span className="text-gray-500 font-medium w-32">Location:</span>
                            <span className="text-gray-700">{project?.location}</span>
                          </div>
                        )}
                         {project.industries && project.industries.length > 0 && (
                          <div className="flex">
                            <span className="text-gray-500 font-medium w-32">Industries:</span>
                            <span className="text-gray-700">{project.industries.join(', ')}</span>
                          </div>
                        )}
                         {project.services && project.services.length > 0 && (
                          <div className="flex">
                            <span className="text-gray-500 font-medium w-32">Services:</span>
                            <span className="text-gray-700 underline">
                              {project.services.join(', ')}
                            </span>
                          </div>
                        )} 
                         {project.technologies && project.technologies.length > 0 && (
                          <div className="flex">
                            <span className="text-gray-500 font-medium w-32">Technologies:</span>
                            <span className="text-gray-700">{project.technologies.join(', ')}</span>
                          </div>
                        )} */}
                      </div>

                      {/* View Case Study Link */}
                      <Link
                        href={`/projects/${project?.slug}`}
                        className="inline-flex items-center text-gray-900 font-semibold hover:gap-3 transition-all group"
                      >
                        VIEW CASE STUDY
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right Images Section - MacBook Display */}
                    <div className="relative h-[500px] lg:h-full min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 lg:p-12">
                      {images.length > 0 ? (
                        <div className="relative w-full h-full max-w-[500px] mx-auto flex items-center justify-center">
                          {/* MacBook Frame */}
                          <div className="relative w-full">
                            <Image
                              src="/macbook_new-min.webp"
                              alt="MacBook Frame"
                              width={500}
                              height={312}
                              className="w-full h-auto relative z-10"
                            />
                            {/* Project Screenshot Inside MacBook Screen */}
                            <div className="absolute top-[8%] left-[13%] right-[13%] bottom-[22%] overflow-hidden">
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
                        // No images placeholder
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
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
