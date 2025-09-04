import { CompanyLeadershipQueryResult, CompanyTimelineQueryResult } from '@company/sanity-shared';
import { sanityClient } from '@company/sanity-shared/client';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import {
  aboutCTAQuery,
  aboutHeroQuery,
  aboutMissionVisionQuery,
  aboutStatsQuery,
  aboutStoryQuery,
  aboutValuesQuery,
  companyLeadershipQuery,
  companyTimelineQuery,
} from '@/lib/sanity-queries/about-queries';

import { CompanyTimeline } from './_components/company-timeline';
import { EmployeeCard } from './_components/employee-card';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

// Icon mapping utility
const iconMap: Record<string, any> = {
  award: Award,
  'check-circle': CheckCircle,
  heart: Heart,
  lightbulb: Lightbulb,
  globe: Globe,
  shield: Shield,
  star: Star,
  trophy: Trophy,
  rocket: Rocket,
  target: Target,
  users: Users,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Award; // fallback to Award if icon not found
};

// Fetch functions for all About sections
const fetchAboutData = async (locale: string) => {
  const targetLanguage = locale === 'ar' ? 'ar' : 'en';

  const [hero, missionVision, stats, story, values, cta, timeline, leadership] = await Promise.all([
    sanityClient.fetch(aboutHeroQuery, { language: targetLanguage }),
    sanityClient.fetch(aboutMissionVisionQuery, { language: targetLanguage }),
    sanityClient.fetch(aboutStatsQuery, { language: targetLanguage }),
    sanityClient.fetch(aboutStoryQuery, { language: targetLanguage }),
    sanityClient.fetch(aboutValuesQuery, { language: targetLanguage }),
    sanityClient.fetch(aboutCTAQuery, { language: targetLanguage }),
    sanityClient.fetch<CompanyTimelineQueryResult>(companyTimelineQuery, {
      language: targetLanguage,
    }),
    sanityClient.fetch<CompanyLeadershipQueryResult>(companyLeadershipQuery, {
      language: targetLanguage,
    }),
  ]);

  return {
    hero,
    missionVision,
    stats,
    story,
    values,
    cta,
    timeline,
    leadership,
  };
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const aboutData = await fetchAboutData(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
              {aboutData.hero?.tagline || 'About Us'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              {aboutData.hero?.title || 'Elevating ideas. Engineering experiences.'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {aboutData.hero?.description ||
                'We create captivating user interfaces and robust frontend systems.'}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutData.missionVision?.mission?.title || 'Our Mission'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.missionVision?.mission?.description ||
                  'To empower businesses with innovative digital solutions.'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {aboutData.missionVision?.vision?.title || 'Our Vision'}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.missionVision?.vision?.description ||
                  'To be the leading digital innovation partner for businesses worldwide.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(aboutData.stats?.stats || []).map(
              (stat: { number: string; label: string; icon?: string }, index: number) => {
                const Icon = getIcon(stat.icon || 'award');
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {aboutData.story?.sectionTitle || 'Our Story'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {aboutData.story?.subtitle ||
                  'From humble beginnings to becoming a trusted digital partner'}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {(aboutData.story?.paragraphs || []).map((paragraph: string, index: number) => (
                  <p
                    key={index}
                    className={`text-gray-600 leading-relaxed ${index < (aboutData.story?.paragraphs?.length || 1) - 1 ? 'mb-6' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
                {(!aboutData.story?.paragraphs || aboutData.story.paragraphs.length === 0) && (
                  <>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Founded in 2024, we started with a simple vision: to help businesses thrive in
                      the digital age.
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      In our first year, we&apos;ve had the privilege of working with over 60
                      clients across various industries.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Today, we continue to push boundaries, embrace new technologies, and create
                      digital experiences.
                    </p>
                  </>
                )}
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
              {aboutData.leadership?.title || 'Meet Our Leadership'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {aboutData.leadership?.subTitle || 'Passionate individuals dedicated to your success'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {aboutData.leadership?.members?.length ? (
              aboutData.leadership.members.map((member, index) => (
                <EmployeeCard key={index} {...member} />
              ))
            ) : (
              <div>No employees data found!</div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {aboutData.timeline?.title || 'Our Journey'}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {aboutData.timeline?.subTitle || 'Key milestones that shaped who we are today'}
            </p>
          </div>
          {aboutData.timeline?.items?.length ? (
            <CompanyTimeline items={aboutData.timeline.items} />
          ) : (
            <div>No company timeline found!</div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {aboutData.values?.sectionTitle || 'Our Core Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {aboutData.values?.subtitle || 'The principles that guide everything we do'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(aboutData.values?.values || []).map(
              (value: { title: string; description: string; icon?: string }, index: number) => {
                const Icon = getIcon(value.icon || 'award');
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
              },
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {aboutData.cta?.title || 'Ready to Start Your Project?'}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {aboutData.cta?.description ||
                'Let&apos;s work together to bring your vision to life'}
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors">
              {aboutData.cta?.buttonText || 'Get in Touch'}
              {locale === 'ar' ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
