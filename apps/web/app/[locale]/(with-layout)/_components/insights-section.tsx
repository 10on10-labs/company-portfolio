'use client';

import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
import { format, parseISO } from 'date-fns';
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

import { urlFor } from '@/lib/image';

export interface Blog {
  _id: string;
  title?: string | null;
  excerpt?: string | null;
  slug?: string | null;
  image?: any;
  publishedAt?: string | null;
  estimatedReadingTime?: number | null;
  author?: {
    name?: string | null;
    picture?: any;
  } | null;
  category?: {
    title?: string | null;
    color?: {
      hex?: string | null;
    } | null;
  } | null;
}

interface InsightsSectionProps {
  blogs: Blog[] | null;
}

export default function InsightsSection({ blogs }: InsightsSectionProps) {
  // Take only the latest 4 blogs
  const featuredBlogs = (blogs?.slice(0, 4) || []).filter(blog => blog !== null);

  // If no blogs, return null
  if (!featuredBlogs || featuredBlogs.length === 0) {
    return null;
  }

  // Split blogs for different layouts
  const [mainBlog, ...sideBlogs] = featuredBlogs;

  return (
    <section id="insights" className="relative py-20 md:py-28 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Fresh Perspectives
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Latest <span className="text-primary">Insights</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Explore cutting-edge ideas in technology, design, and digital innovation
              </p>
            </div>

            <Link
              href="/blogs"
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 group"
            >
              <span className="font-medium">All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Asymmetric Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Blog - Large Card */}
          {mainBlog && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 group"
            >
              <Link href={`/blogs/${mainBlog.slug || ''}`} className="block h-full">
                <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Large Image */}
                  <div className="relative h-72 lg:h-96 overflow-hidden">
                    {mainBlog.image ? (
                      <Image
                        src={urlFor(mainBlog.image)?.width(800)?.height(500)?.url() || ''}
                        alt={(mainBlog.image as any)?.alt || mainBlog.title || 'Featured blog'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-orange-200/50" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-gray-900">Featured</span>
                    </div>

                    {/* Category */}
                    {mainBlog.category && (
                      <div className="absolute top-6 right-6">
                        <span
                          className="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: mainBlog.category.color?.hex || '#FB923C',
                            color: '#ffffff',
                          }}
                        >
                          {mainBlog.category.title}
                        </span>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                        {mainBlog.title}
                      </h3>
                      {mainBlog.excerpt && (
                        <p className="text-white/90 line-clamp-2 mb-4 max-w-2xl">
                          {mainBlog.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        {mainBlog.author && (
                          <div className="flex items-center gap-2">
                            {mainBlog.author.picture && (
                              <Image
                                src={
                                  urlFor(mainBlog.author.picture)?.width(32)?.height(32)?.url() ||
                                  ''
                                }
                                alt={mainBlog.author.name || 'Author'}
                                width={28}
                                height={28}
                                className="rounded-full border-2 border-white/50"
                              />
                            )}
                            <span className="font-medium">{mainBlog.author.name}</span>
                          </div>
                        )}
                        {mainBlog.publishedAt && (
                          <>
                            <span>•</span>
                            <time dateTime={mainBlog.publishedAt}>
                              {format(parseISO(mainBlog.publishedAt), 'MMMM d, yyyy')}
                            </time>
                          </>
                        )}
                        {mainBlog.estimatedReadingTime && (
                          <>
                            <span>•</span>
                            <span>{mainBlog.estimatedReadingTime} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Side Blogs - Vertical Stack */}
          <div className="lg:col-span-5 space-y-6">
            {sideBlogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <Link href={`/blogs/${blog.slug || ''}`} className="block">
                  <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30">
                    <div className="flex gap-5">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        {blog.image ? (
                          <Image
                            src={urlFor(blog.image)?.width(200)?.height(200)?.url() || ''}
                            alt={(blog.image as any)?.alt || blog.title || 'Blog thumbnail'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-orange-200/30 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary/50" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category & Date */}
                        <div className="flex items-center gap-2 mb-2">
                          {blog.category && (
                            <span
                              className="text-xs font-bold"
                              style={{ color: blog.category.color?.hex || '#FB923C' }}
                            >
                              {blog.category.title}
                            </span>
                          )}
                          {blog.category && blog.publishedAt && (
                            <span className="text-gray-400">•</span>
                          )}
                          {blog.publishedAt && (
                            <time className="text-xs text-gray-500" dateTime={blog.publishedAt}>
                              {format(parseISO(blog.publishedAt), 'MMM d')}
                            </time>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>

                        {/* Read More */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {blog.estimatedReadingTime || '5'} min read
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Read
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}

            {/* View All Mobile/Tablet */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:hidden"
            >
              <Link
                href="/blogs"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                <span className="font-medium">View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden lg:flex items-center justify-center mt-16"
        >
          <div className="text-center">
            <p className="text-gray-600 mb-4">Want to dive deeper into our insights?</p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              Explore All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
