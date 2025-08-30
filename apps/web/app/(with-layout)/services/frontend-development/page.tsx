'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '@company/sanity-shared/client';
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Gauge,
  GitBranch,
  Palette,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

import { AllProjectsQueryResult } from '@/types/sanity.types';
import { allProjectsQuery } from '@/lib/sanity-queries';

import ProjectShowcase from './_components/project-showcase';

// Technology stack icons
const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Vue', icon: '💚' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'GraphQL', icon: '◈' },
];

// Service features
const features = [
  {
    icon: Code2,
    title: 'Expert Frontend Developers',
    description:
      'Skilled engineers specialized in modern JavaScript frameworks and best practices.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    description:
      'Agile development process ensuring rapid iterations and timely project completion.',
  },
  {
    icon: Palette,
    title: 'Pixel-Perfect Implementation',
    description: 'Translating designs into responsive, accessible, and beautiful user interfaces.',
  },
  {
    icon: Users,
    title: 'Collaborative Approach',
    description: 'Working closely with your team to align with your vision and goals.',
  },
];

// Process steps
const processSteps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'Understanding your requirements, goals, and technical needs.',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description: 'Creating scalable frontend architecture and component systems.',
  },
  {
    number: '03',
    title: 'Development & Testing',
    description: 'Building robust applications with comprehensive testing coverage.',
  },
  {
    number: '04',
    title: 'Deploy & Optimize',
    description: 'Launching your application with performance optimization and monitoring.',
  },
];

// Benefits
const benefits = [
  'Responsive Design',
  'Cross-browser Compatibility',
  'Performance Optimization',
  'SEO-friendly Code',
  'Accessibility Compliance',
  'Progressive Web Apps',
  'Single Page Applications',
  'Component Libraries',
];

export default function FrontendDevelopmentPage() {
  const [projects, setProjects] = useState<AllProjectsQueryResult>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await sanityClient.fetch(allProjectsQuery);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Frontend Engineering Excellence
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Frontend Development
                <span className="text-primary block">as a Service</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Build exceptional user experiences with our expert frontend developers. From React
                to Vue, we craft scalable, performant applications that delight users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#case-studies"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <Code2 className="w-24 h-24 text-primary/50 mx-auto mb-4" />
                  <p className="text-gray-500">Frontend Excellence</p>
                </div>
              </div>
              {/* Code snippet decoration */}
              <div className="absolute top-10 right-10 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                <pre className="text-xs text-gray-700">
                  <code>{`const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Frontend Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with creative vision to deliver outstanding frontend
              solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technologies We Master
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies to build modern web applications
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-800 border-2 border-gray-700 rounded-2xl px-6 py-4 hover:border-primary hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-semibold text-white">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Gauge className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Performance First</h3>
                <p className="text-sm text-gray-300">Optimized for speed and efficiency</p>
              </div>
              <div>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Secure & Reliable</h3>
                <p className="text-sm text-gray-300">Built with security best practices</p>
              </div>
              <div>
                <GitBranch className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Version Control</h3>
                <p className="text-sm text-gray-300">Clean, maintainable code structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures project success from concept to deployment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-2xl h-full">
                  <span className="text-4xl font-bold text-primary/20 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why teams choose 10on10 Labs
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Modern web development is complex — we make it feel simple. With 10on10 Labs, you
                get a development partner that understands both cutting-edge technology and your
                business goals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl border border-gray-700">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Dedicated Frontend Teams</h3>
                <p className="text-sm text-gray-300">
                  We build complex user experiences like dashboards, e-commerce flows, real-time
                  applications, and multi-step processes.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl border border-gray-700">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Speed + Flexibility</h3>
                <p className="text-sm text-gray-300">
                  Start within days, not weeks. No hiring delays, no lengthy contracts. Scale your
                  team up or down as your roadmap evolves.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl border border-gray-700">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise-Grade Quality</h3>
                <p className="text-sm text-gray-300">
                  Security-first development with clean, maintainable code that scales with your
                  business growth and requirements.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl border border-gray-700">
                <Code2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Modern Tech Stack</h3>
                <p className="text-sm text-gray-300">
                  Latest frameworks and tools including React, Next.js, TypeScript, and cloud-native
                  solutions for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      {!loading && <ProjectShowcase projects={projects} />}

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Let&apos;s discuss your frontend development needs and create exceptional user
              experiences together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
