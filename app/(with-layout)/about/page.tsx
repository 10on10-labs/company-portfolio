'use client';

import React from 'react';
import Image from 'next/image';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';

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
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl w-[600px] mx-auto md:text-7xl font-bold mb-6">
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
            {(() => {
              const AnimatedNumber = ({ value }: { value: number }) => {
                const count = useMotionValue(0);
                const rounded = useTransform(count, latest => Math.round(latest));

                React.useEffect(() => {
                  const controls = animate(count, value, { duration: 2 });
                  return controls.stop;
                }, [count, value]);

                return <motion.span>{rounded}</motion.span>;
              };

              const stats = [
                { value: 10, suffix: '+', label: 'Years Experience', delay: 0 },
                { value: 200, suffix: '+', label: 'Projects Completed', delay: 0.2 },
                { value: 50, suffix: '+', label: 'Team Members', delay: 0.4 },
                { value: 95, suffix: '%', label: 'Client Satisfaction', delay: 0.6 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all hover:shadow-2xl"
                >
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ));
              return stats;
            })()}
          </div>
        </div>
      </section>

      {/* Team Section with Dark Theme */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 text-primary"
          >
            It&apos;s all about the people
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: 'Lara Lamprecht',
                role: 'CEO and Founder',
                image: '/team/lara.jpg',
                delay: 0.1,
              },
              {
                name: 'Timothy Chandran',
                role: 'Head of Sales',
                image: '/team/timothy.jpg',
                delay: 0.2,
              },
              {
                name: 'Marie Koniuszek',
                role: 'Customer Success Lead',
                image: '/team/marie.jpg',
                delay: 0.3,
              },
              {
                name: 'Alyssa Chuzeville',
                role: 'Head of Product',
                image: '/team/alyssa.jpg',
                delay: 0.4,
              },
              {
                name: 'Dominik Prasad',
                role: 'Senior Researcher',
                image: '/team/dominik.jpg',
                delay: 0.5,
              },
              {
                name: 'Darya Semenova',
                role: 'Software Engineer',
                image: '/team/darya.jpg',
                delay: 0.6,
              },
              {
                name: 'Mary Puligat',
                role: 'Software Engineer',
                image: '/team/mary.jpg',
                delay: 0.7,
              },
              {
                name: 'Quentin Renvoye',
                role: 'Senior Marketing Manager',
                image: '/team/quentin.jpg',
                delay: 0.8,
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: member.delay, duration: 0.6 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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
            className="text-4xl font-bold text-center mb-16 text-primary"
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
