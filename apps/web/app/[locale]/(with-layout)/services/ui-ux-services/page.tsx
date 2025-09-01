'use client';

import { Link } from '@/src/i18n/navigation';
import {
  ArrowRight,
  CheckCircle,
  Layers,
  Palette,
  PenTool,
  Smartphone,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';

const services = [
  {
    icon: PenTool,
    title: 'User Research & Strategy',
    description:
      'Deep dive into user behavior, needs, and pain points to create data-driven design strategies that align with your business goals.',
  },
  {
    icon: Layers,
    title: 'Wireframing & Prototyping',
    description:
      'Create detailed wireframes and interactive prototypes to visualize user flows and test concepts before development.',
  },
  {
    icon: Palette,
    title: 'Visual Design',
    description:
      'Craft stunning visual designs with perfect typography, color schemes, and visual hierarchy that reflect your brand identity.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description:
      'Design seamless experiences across all devices and screen sizes, ensuring consistency and usability everywhere.',
  },
  {
    icon: Zap,
    title: 'Interaction Design',
    description:
      'Create engaging micro-interactions and animations that delight users and enhance the overall experience.',
  },
  {
    icon: Target,
    title: 'Usability Testing',
    description:
      'Conduct thorough testing with real users to validate designs and identify areas for improvement.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'Understanding your business goals, target audience, and project requirements through research and analysis.',
  },
  {
    step: '02',
    title: 'Strategy',
    description:
      'Developing a comprehensive design strategy based on user insights and business objectives.',
  },
  {
    step: '03',
    title: 'Design',
    description:
      'Creating wireframes, mockups, and prototypes that bring your vision to life with pixel-perfect precision.',
  },
  {
    step: '04',
    title: 'Testing',
    description:
      'Validating designs through user testing and iterating based on feedback for optimal results.',
  },
  {
    step: '05',
    title: 'Delivery',
    description:
      'Providing complete design systems, assets, and documentation for seamless development handoff.',
  },
];

const benefits = [
  'Increased user engagement and retention',
  'Higher conversion rates and ROI',
  'Reduced development costs through better planning',
  'Improved brand perception and loyalty',
  'Faster time-to-market with validated designs',
  'Competitive advantage through superior UX',
];

export default function UIUXServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                UI/UX Design Services
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Design Experiences That <span className="text-primary">Delight Users</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              We create intuitive, beautiful, and user-centric designs that transform your digital
              presence and drive meaningful engagement with your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="px-8 py-6 text-lg font-semibold border-2">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our UI/UX Design Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive design solutions that cover every aspect of the user experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Design Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures exceptional results
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent hidden lg:block" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {process.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-primary/20 relative z-10">
                      <span className="text-primary font-bold text-lg">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose Our UI/UX Design Services?
              </h2>
              <p className="text-lg text-white/90">
                Transform your digital presence with designs that deliver real business value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span className="text-lg text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/contact-us">
                <Button className="px-8 py-6 text-lg font-semibold bg-white text-primary hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '200+', label: 'Designs Delivered' },
              { value: '95%', label: 'Client Satisfaction' },
              { value: '50+', label: 'Happy Clients' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate to design experiences that your users will love and your
              business will benefit from.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button className="px-8 py-6 text-lg font-semibold bg-white text-primary hover:bg-gray-100">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
