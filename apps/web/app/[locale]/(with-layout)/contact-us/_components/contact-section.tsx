'use client';

import { useState } from 'react';
import { Calendar, CalendarCheck, Clock, MessageSquare, Send, Shield } from 'lucide-react';
import { motion } from 'motion/react';

import { CalendlyEmbed } from './calendly-embed';
import { ContactForm } from './contact-form';

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<'message' | 'schedule'>('schedule');

  const benefits = [
    { icon: Clock, text: 'Quick response within 24 hours' },
    { icon: Shield, text: 'Your data is secure and confidential' },
    { icon: MessageSquare, text: 'Direct communication with our experts' },
    { icon: Calendar, text: 'Flexible meeting scheduling' },
  ];

  return (
    <section id="get-started" className="relative pb-10 lg:py-20 bg-gray-700">
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/90 via-gray-700 to-gray-800/90 pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-semibold mb-4">
            Get Started
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Choose your preferred way to connect
          </h2>
          <p className="text-lg text-gray-200">
            Whether you prefer a quick message or a scheduled call, we&apos;re here to discuss your
            project and help bring your vision to life.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-gray-200">{benefit.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-800/50 rounded-full p-1.5 backdrop-blur-sm border border-gray-600">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                Schedule a Call
              </span>
            </button>
            <button
              onClick={() => setActiveTab('message')}
              className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'message'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {activeTab === 'schedule' ? (
            <CalendlyEmbed />
          ) : (
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          )}
        </motion.div>

        {/* Alternative CTA */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-200">
              Prefer to send a message instead?{' '}
              <button
                onClick={() => setActiveTab('message')}
                className="text-primary hover:text-primary/80 hover:underline font-medium"
              >
                Click here to send a message
              </button>
            </p>
          </motion.div>
        )}

        {activeTab === 'message' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-200">
              Want to schedule a call instead?{' '}
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-primary hover:text-primary/80 hover:underline font-medium"
              >
                Book a meeting time
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
