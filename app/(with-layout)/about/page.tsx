'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

import { CompanyTimeline } from '@/components/company-timeline';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(255, 126, 0, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.3) 0%, transparent 40%)',
          // filter: 'blur(60px)',
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent">
              Crafting Digital Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12">
              We transform ideas into exceptional digital experiences through innovation and
              expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Hover Effects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years Experience', delay: 0 },
              { number: '200+', label: 'Projects Completed', delay: 0.2 },
              { number: '50+', label: 'Team Members', delay: 0.4 },
              { number: '95%', label: 'Client Satisfaction', delay: 0.6 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all hover:shadow-2xl"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Card Hover Effects */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Meet Our Leadership
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                image: 'https://source.unsplash.com/300x300/?portrait,man,1',
                delay: 0.2,
              },
              {
                name: 'Jane Smith',
                role: 'Creative Director',
                image: 'https://source.unsplash.com/300x300/?portrait,woman,1',
                delay: 0.4,
              },
              {
                name: 'Mike Johnson',
                role: 'Tech Lead',
                image: 'https://source.unsplash.com/300x300/?portrait,man,2',
                delay: 0.6,
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: member.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-full" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section>
        <CompanyTimeline />
      </section>

      {/* Values Section with Staggered Animation */}
      <section className="py-20 from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description:
                  'Pushing boundaries and embracing new technologies to create exceptional solutions.',
                delay: 0.2,
              },
              {
                title: 'Excellence',
                description: 'Delivering outstanding quality in every project we undertake.',
                delay: 0.4,
              },
              {
                title: 'Integrity',
                description:
                  'Building trust through honest relationships and transparent communication.',
                delay: 0.6,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: value.delay, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
