'use client';

import { Code2, Palette, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const projectFeatures = [
  { icon: Code2, label: 'Clean Code', value: 'TypeScript & React' },
  { icon: Palette, label: 'Design System', value: 'Tailwind CSS' },
  { icon: Zap, label: 'Performance', value: '95+ Lighthouse' },
  { icon: Users, label: 'User Experience', value: 'Mobile First' },
];

export const ProjectFeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the core features and technologies that power this project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.label}</h3>
              <p className="text-sm text-gray-600">{feature.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
