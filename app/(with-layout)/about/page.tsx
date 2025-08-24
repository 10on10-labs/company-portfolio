import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, Award, CheckCircle, Rocket, Target, Users } from 'lucide-react';

import { CompanyTimeline } from './_components/company-timeline';
import { EmployeeCard } from './_components/employee-card';

export const metadata: Metadata = {
  title: 'About',
};

const stats = [
  { number: '10+', label: 'Years Experience', icon: Award },
  { number: '60+', label: 'Projects Completed', icon: Target },
  { number: '15+', label: 'Team Members', icon: Users },
  { number: '95%', label: 'Client Satisfaction', icon: Rocket },
];

const values = [
  {
    title: 'Uncompromising Quality',
    description:
      'We believe that anything worth doing is worth doing to a perfect standard. Our name is our promise: every project is a relentless pursuit of a flawless 10/10. From pixel-perfect designs to clean, robust code, our work is a testament to our commitment to excellence.',
    icon: Award,
  },
  {
    title: 'Empathetic Design',
    description:
      'At the heart of every great product is a deep understanding of its users. We are not just designers and developers; we are problem-solvers who put people first. We conduct thorough research to create intuitive, human-centered experiences that are a joy to use and truly connect with your audience.',
    icon: Users,
  },
  {
    title: 'Transparent Partnership',
    description:
      'Your vision is our mission. We believe in working as a true extension of your team, not just a service provider. We maintain open, honest communication throughout the entire process, ensuring you are informed and involved at every step. Your success is our shared goal.',
    icon: CheckCircle,
  },
  {
    title: 'Driven by Innovation',
    description:
      'The digital world is always evolving, and so are we. We are passionate about staying ahead of the curve, constantly exploring new technologies and design trends. We apply this forward-thinking approach to every project, delivering modern, scalable, and cutting-edge solutions that will stand the test of time.',
    icon: Rocket,
  },
];

const teamMembers = [
  {
    fullName: 'Danish Mehmood',
    role: 'CEO & Founder',
    image: '/danish-mehmood.jpeg',
    redirectUrl: '#',
  },
  {
    fullName: 'Kaleem Ullah',
    role: 'Co-Founder & CTO',
    image: '/kaleem.png',
    redirectUrl: '#',
  },
  {
    fullName: 'Osama Ehsan',
    role: 'Co-Founder & COO',
    image: '/osama.jpg',
    redirectUrl: '#',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Elevating ideas. Engineering experiences.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              We create captivating user interfaces and robust frontend systems that look amazing
              and work even better.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance
                user experiences, and create lasting value in the digital landscape.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading digital innovation partner for businesses worldwide, setting new
                standards in web development and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to becoming a trusted digital partner
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2024, we started with a simple vision: to help businesses thrive in the
                  digital age. What began as a small team of passionate developers is rapidly
                  growing into a full-service digital agency.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  In our first year, we&apos;ve had the privilege of working with over 60 clients
                  across various industries, delivering solutions that not only meet but exceed
                  expectations.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we continue to push boundaries, embrace new technologies, and create
                  digital experiences that make a difference.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-gray-500">Company Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate individuals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <EmployeeCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Key milestones that shaped who we are today
            </p>
          </div>
          <CompanyTimeline />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Let&apos;s work together to bring your vision to life
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
