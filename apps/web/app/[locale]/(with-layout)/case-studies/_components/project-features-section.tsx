'use client';

import { Code2, Palette, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Code2,
  Palette,
  Zap,
  Users,
};

interface ProjectFeaturesSectionProps {
  keyFeatures?: {
    title: string | null;
    subtitle: string | null;
    features: Array<{
      icon: string | null;
      label: string | null;
      value: string | null;
    }> | null;
  };
}

export const ProjectFeaturesSection: React.FC<ProjectFeaturesSectionProps> = ({ keyFeatures }) => {
  // Fallback data if Sanity data is not available
  const fallbackFeatures = [
    { icon: 'Code2', label: 'Clean Code', value: 'TypeScript & React' },
    { icon: 'Palette', label: 'Design System', value: 'Tailwind CSS' },
    { icon: 'Zap', label: 'Performance', value: '95+ Lighthouse' },
    { icon: 'Users', label: 'User Experience', value: 'Mobile First' },
  ];

  const features = keyFeatures?.features || fallbackFeatures;
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {keyFeatures?.title || 'Key Features'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {keyFeatures?.subtitle ||
              'Discover the core features and technologies that power this project'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Code2;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{feature.label}</h3>
                <p className="text-sm text-muted-foreground">{feature.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
