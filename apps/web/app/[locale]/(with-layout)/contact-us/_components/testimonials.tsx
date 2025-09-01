'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStart',
      company: 'TechStart Inc.',
      image: 'https://source.unsplash.com/100x100/?portrait,woman,1',
      content:
        '10on10Labs transformed our vision into a stunning product. Their attention to detail and technical expertise is unmatched. We launched 2 months ahead of schedule!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateCo',
      image: 'https://source.unsplash.com/100x100/?portrait,man,2',
      content:
        'Working with 10on10Labs was a game-changer. They not only delivered exceptional code but also provided valuable insights that improved our product significantly.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'HealthTech Solutions',
      image: 'https://source.unsplash.com/100x100/?portrait,woman,3',
      content:
        "The team's responsiveness and professionalism exceeded our expectations. They turned our complex requirements into an elegant, user-friendly solution.",
      rating: 5,
    },
  ];

  return (
    <section id="success-stories" className="relative py-20 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Trusted by industry leaders</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about working with us and the impact we&apos;ve made on their
            businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-background rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground mb-6 flex-grow">
                  {`"${testimonial.content}"`}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">Trusted by companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map(company => (
              <div key={company} className="text-2xl font-bold">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
