'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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

  // Get the first blog as featured
  const [featuredBlog, ...otherBlogs] = featuredBlogs;

  return (
    <section id="insights" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Latest Insights</h2>
              <p className="text-lg text-gray-600">
                Stay updated with our thoughts on technology and innovation
              </p>
            </div>
            <Link
              href="/blogs"
              className="hidden md:inline-flex items-center text-primary font-medium hover:gap-3 transition-all group"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Featured Blog - Left Side */}
          {featuredBlog && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Link href={`/blogs/${featuredBlog.slug || ''}`} className="block h-full">
                <div className="relative h-full bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    {featuredBlog.image ? (
                      <Image
                        src={urlFor(featuredBlog.image)?.width(800)?.height(400)?.url() || ''}
                        alt={
                          (featuredBlog.image as any)?.alt || featuredBlog.title || 'Featured blog'
                        }
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Category */}
                    {featuredBlog.category && (
                      <span
                        className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                        style={{
                          backgroundColor: featuredBlog.category.color?.hex
                            ? `${featuredBlog.category.color.hex}20`
                            : '#f3f4f6',
                          color: featuredBlog.category.color?.hex || '#6b7280',
                        }}
                      >
                        {featuredBlog.category.title}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {featuredBlog.title}
                    </h3>

                    {/* Excerpt */}
                    {featuredBlog.excerpt && (
                      <p className="text-gray-600 line-clamp-3 mb-6">{featuredBlog.excerpt}</p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {featuredBlog.publishedAt && (
                          <time dateTime={featuredBlog.publishedAt}>
                            {format(parseISO(featuredBlog.publishedAt), 'MMM d, yyyy')}
                          </time>
                        )}
                        {featuredBlog.publishedAt && featuredBlog.estimatedReadingTime && (
                          <span>•</span>
                        )}
                        {featuredBlog.estimatedReadingTime && (
                          <span>{featuredBlog.estimatedReadingTime} min read</span>
                        )}
                      </div>
                      {featuredBlog.author && (
                        <div className="flex items-center gap-2">
                          {featuredBlog.author.picture && (
                            <Image
                              src={
                                urlFor(featuredBlog.author.picture)?.width(40)?.height(40)?.url() ||
                                ''
                              }
                              alt={featuredBlog.author.name || 'Author'}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-sm font-medium text-gray-700">
                            {featuredBlog.author.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Other Blogs - Right Side */}
          <div className="space-y-6">
            {otherBlogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blogs/${blog.slug || ''}`} className="block">
                  <div className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      {blog.image ? (
                        <Image
                          src={urlFor(blog.image)?.width(300)?.height(300)?.url() || ''}
                          alt={(blog.image as any)?.alt || blog.title || 'Blog thumbnail'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-400">
                            {blog.title?.charAt(0) || 'B'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category & Date */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        {blog.category && (
                          <span
                            className="font-medium"
                            style={{ color: blog.category.color?.hex || '#6b7280' }}
                          >
                            {blog.category.title}
                          </span>
                        )}
                        {blog.category && blog.publishedAt && <span>•</span>}
                        {blog.publishedAt && (
                          <time dateTime={blog.publishedAt}>
                            {format(parseISO(blog.publishedAt), 'MMM d, yyyy')}
                          </time>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                      )}

                      {/* Author & Reading Time */}
                      <div className="flex items-center justify-between mt-3">
                        {blog.author && (
                          <span className="text-xs text-gray-500">By {blog.author.name}</span>
                        )}
                        {blog.estimatedReadingTime && (
                          <span className="text-xs text-gray-500">
                            {blog.estimatedReadingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 md:hidden"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
