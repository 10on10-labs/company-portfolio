'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft, Calendar, Layers, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';

import { MacBookCarousel } from './macbook-carousel';

interface ProjectHeroSectionProps {
  project: {
    logo?: any;
    name?: string | null;
    description?: string | null;
    category?: string | null;
    coverImages?: any[] | null;
    projectSections?: any[] | null;
  };
}

export const ProjectHeroSection: React.FC<ProjectHeroSectionProps> = ({ project }) => {
  const { logo, name, description, category, coverImages, projectSections } = project;
  const logoUrl = logo ? urlFor(logo).width(128).height(128).url() : null;

  // Process all images
  const allImages: { url: string; alt: string }[] = [];

  if (coverImages && coverImages.length > 0) {
    coverImages.forEach((img, idx) => {
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

  if (allImages.length === 0 && projectSections) {
    projectSections.forEach(section => {
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
    { label: 'Timeline', value: '3 Months', icon: Calendar },
    { label: 'Team Size', value: '5 Members', icon: Users },
    { label: 'Technologies', value: '8+ Tools', icon: Layers },
    { label: 'Iterations', value: '12 Sprints', icon: Target },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
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
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all cursor-pointer group"
            style={{ cursor: 'pointer' }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Case Studies</span>
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
                    alt={`${name} logo`}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-primary">{name?.charAt(0) || 'P'}</span>
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{name}</h1>
                {category && (
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {category}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {description && <p className="text-lg text-gray-600 leading-relaxed">{description}</p>}

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4">
              {projectStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="font-semibold text-gray-900">{stat.value}</p>
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
                <span className="text-gray-400 text-lg">No images available</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
