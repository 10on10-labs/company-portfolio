'use client';

import { useRef } from 'react';
import { ArrowRight, Globe2, Star, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Users,
  Zap,
  Star,
  Globe2,
};

interface ContactHeroProps {
  data?: {
    badge: string;
    title: string;
    subtitle: string;
    ctaButtons: Array<{
      text: string;
      link: string;
      variant: 'primary' | 'secondary' | 'outline';
    }>;
    stats: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
  };
  locale?: string;
}

export function ContactHero({ data, locale }: ContactHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  // Fallback data if Sanity data is not available
  const fallbackStats = [
    { icon: 'Users', value: '500+', label: 'Happy Clients' },
    { icon: 'Zap', value: '24 Hours', label: 'Avg. Response Time' },
    { icon: 'Star', value: '4.9/5', label: 'Client Rating' },
    { icon: 'Globe2', value: '24/7', label: 'Support Available' },
  ];

  const fallbackCtaButtons = [
    { text: 'Start your project', link: '#get-started', variant: 'primary' as const },
    { text: 'View success stories', link: '#success-stories', variant: 'outline' as const },
  ];

  const stats = data?.stats || fallbackStats;
  const ctaButtons = data?.ctaButtons || fallbackCtaButtons;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="relative container mx-auto px-4 pb-10 lg:pb-15">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-muted/50 to-muted/80 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow text-foreground text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm shadow-green-500/50"></span>
              </span>
              {data?.badge || "We're online and ready to help"}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {data?.title || 'Contact Us'}
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-muted-foreground text-center max-w-3xl mx-auto mb-12"
          >
            {data?.subtitle ||
              "Join hundreds of companies who trust us to build their digital products. Let's discuss how we can accelerate your success."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-20"
          >
            {ctaButtons?.map((button: any, index: number) => {
              const baseClasses =
                'group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all';
              const variantClasses = {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
                outline:
                  'bg-transparent border border-border hover:bg-primary hover:text-white hover:border-primary',
              };

              return (
                <a
                  key={index}
                  href={button?.link || '#'}
                  className={`${baseClasses} ${variantClasses[button?.variant as keyof typeof variantClasses] || variantClasses.primary}`}
                >
                  {button?.text || 'Button'}
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                    }`}
                  />
                </a>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats?.map((stat: any, index: number) => {
              const IconComponent = iconMap[stat?.icon as keyof typeof iconMap] || Users;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative bg-card/50 border border-border rounded-2xl p-6 text-center hover:border-primary/50 hover:bg-card/80 transition-all">
                    <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                    <div className="text-sm text-muted-foreground">{stat?.label}</div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
