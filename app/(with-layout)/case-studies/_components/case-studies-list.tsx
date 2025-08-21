'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AllProjectsQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  projects: AllProjectsQueryResult | null;
}

export default function CaseStudiesList({ projects }: Props) {
  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Case Studies</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
          Explore our complete portfolio of successful projects and see how {`we've`} helped
          businesses transform their digital presence
        </p>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          From innovative startups to established enterprises, {`we've`} delivered custom solutions
          that drive growth, enhance user experience, and create lasting impact
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto space-y-8">
        {projects?.map((project, index) => {
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Content */}
                  <div className="p-6 lg:p-10 flex flex-col justify-center">
                    {/* Project Logo and Title */}
                    <div className="flex items-center gap-4 mb-4">
                      {project.logo ? (
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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

                  {/* Right Content - MacBook Display */}
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
                            {/* <div className="absolute top-[8%] left-[13%] right-[13%] bottom-[22%] overflow-hidden"> */}
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
    </div>
  );
}
