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
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Case Studies</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Explore our portfolio of successful projects and see how {`we've`} helped businesses
            transform their digital presence
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            From innovative startups to established enterprises, {`we've`} delivered custom
            solutions that drive growth, enhance user experience, and create lasting impact in the
            digital landscape
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-8">
          {featuredProjects?.map((project, index) => {
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
                    <div className="p-6 lg:p-10 flex flex-col justify-center">
                      {/* Project Logo and Title */}
                      <div className="flex items-center gap-4 mb-4">
                        {project.logo ? (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                            <Image
                              src={urlFor(project.logo)?.width(128)?.height(128)?.url() || ''}
                              alt={`${project.name} logo`}
                              width={64}
                              height={64}
                              className="w-12 h-12 object-contain"
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
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                            {project.name}
                          </h3>
                          {project.category && (
                            <span className="text-sm text-gray-500 uppercase tracking-wider">
                              {project.category}
                            </span>
                          )}
                        </div>
                      </div>

                      {project.description && (
                        <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      {/* Project Details */}
                      <div className="mb-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-medium">Industry:</span>
                          <span>{project.category || 'Technology'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-medium">Services:</span>
                          <span>UI/UX Design, Development, Strategy</span>
                        </div>
                      </div>

                      <Link
                        href={`/case-studies/${project?.slug}`}
                        className="inline-flex items-center text-gray-900 font-semibold hover:gap-3 transition-all group"
                      >
                        VIEW CASE STUDY
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className="relative h-[350px] lg:h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 lg:p-10">
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
                            <div className="absolute  top-[7.2%] left-[10%] right-[10%] bottom-[21%]  overflow-hidden">
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
            href="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
          >
            View All Case Studies
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
