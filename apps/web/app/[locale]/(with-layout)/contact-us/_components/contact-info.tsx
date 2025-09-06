'use client';

import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      primary: 'sales@10on10labs.com',
      secondary: 'We reply within 24 hours',
      action: 'mailto:sales@10on10labs.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      primary: '+92 334 5600371',
      secondary: 'Mon-Fri from 9am to 6pm',
      action: 'tel:+923345600371',
    },
    {
      icon: MapPin,
      title: 'Office',
      primary: 'Bahria Town, Phase 7',
      secondary: 'Islamabad, Pakistan',
      action: '#',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      primary: '9:00 AM - 6:00 PM',
      secondary: 'Monday to Friday',
      action: '#',
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const isClickable = method.action !== '#';

            if (isClickable) {
              return (
                <motion.a
                  key={index}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-background rounded-2xl p-6 border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{method.title}</h3>
                  <p
                    className="font-semibold text-foreground mb-1"
                    dir={method.title === 'Email' || method.title === 'Phone' ? 'ltr' : undefined}
                  >
                    {method.primary}
                  </p>
                  <p className="text-sm text-muted-foreground">{method.secondary}</p>

                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.a>
              );
            } else {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-background rounded-2xl p-6 border border-border transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg transition-colors">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{method.title}</h3>
                  <p
                    className="font-semibold text-foreground mb-1"
                    dir={method.title === 'Email' || method.title === 'Phone' ? 'ltr' : undefined}
                  >
                    {method.primary}
                  </p>
                  <p className="text-sm text-muted-foreground">{method.secondary}</p>
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
