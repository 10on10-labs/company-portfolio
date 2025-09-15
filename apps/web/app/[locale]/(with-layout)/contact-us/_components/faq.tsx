'use client';

import { useState } from 'react';
import { HelpCircle, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface FAQProps {
  data?: {
    sectionTitle: string;
    sectionSubtitle: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
    ctaSection: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
}

export function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Fallback data if Sanity data is not available
  const fallbackFaqs = [
    {
      question: 'How quickly can you start working on my project?',
      answer:
        'We can typically begin working on your project within 2-3 business days after our initial consultation. For urgent projects, we offer expedited timelines to meet your deadlines.',
    },
    {
      question: 'What is your typical project timeline?',
      answer:
        'Project timelines vary based on scope and complexity. A typical web application takes 8-12 weeks, while smaller projects can be completed in 2-4 weeks. We provide detailed timelines during our consultation.',
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer:
        'Yes! We offer comprehensive post-launch support packages including maintenance, updates, and feature enhancements. Our team remains available to ensure your product continues to perform optimally.',
    },
    {
      question: 'What technologies do you specialize in?',
      answer:
        'We specialize in modern web technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Google Cloud. We choose the best tech stack based on your specific needs.',
    },
    {
      question: 'How do you handle project communication?',
      answer:
        "We maintain transparent communication through regular updates, weekly meetings, and a dedicated project manager. You'll have access to our project management tools to track progress in real-time.",
    },
    {
      question: 'What is your pricing structure?',
      answer:
        "We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. We'll recommend the best approach based on your project requirements and budget.",
    },
  ];

  const faqs = data?.questions || fallbackFaqs;

  return (
    <section className="relative py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {data?.sectionTitle || 'Frequently asked questions'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {data?.sectionSubtitle || 'Everything you need to know about working with us'}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full group"
                >
                  <div
                    className={`relative bg-card rounded-2xl border ${
                      openIndex === index ? 'border-primary/50 shadow-lg' : 'border-border'
                    } p-6 transition-all duration-300 hover:border-primary/30`}
                  >
                    <div className="flex items-center justify-between text-left">
                      <h3 className="text-lg font-semibold text-card-foreground pr-4">
                        {faq.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openIndex === index
                            ? 'bg-primary text-primary-foreground rotate-180'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {openIndex === index ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground mt-4 pr-12">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center p-8 bg-muted/50 rounded-3xl"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {data?.ctaSection?.title || 'Still have questions?'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {data?.ctaSection?.description ||
                "Can't find the answer you're looking for? Our team is here to help."}
            </p>
            <a
              href={data?.ctaSection?.buttonLink || '#get-started'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {data?.ctaSection?.buttonText || 'Get in touch'}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
