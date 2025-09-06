'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { submitContactForm } from '@/app/actions/contact';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(async (_: any, formData: FormData) => {
    return await submitContactForm(formData);
  }, null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Reset form after successful submission
  useEffect(() => {
    if (state?.success && !isPending && !isSubmitted) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  }, [state?.success, isPending, isSubmitted]);

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative bg-white rounded-3xl border border-gray-200 p-8 lg:p-10 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            Quick Response
          </span>
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              Send us a message
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              Tell us about your project and we&apos;ll get back to you within 24 hours
            </p>
          </div>

          {/* Status messages */}
          <AnimatePresence mode="wait">
            {state?.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-green-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">Message sent successfully!</p>
                    <p className="text-sm text-green-600/80">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Something went wrong</p>
                    <p className="text-sm text-red-600/80">{state.error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form action={formAction} className="space-y-6" key={isSubmitted ? 'reset' : 'form'}>
            {/* Name field */}
            <motion.div whileHover={{ scale: 1.01 }} className="relative">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2"
              >
                <User className="w-4 h-4" />
                Your Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="h-12 pl-4 pr-4 bg-background/50 border-border/50 focus:border-primary focus:bg-background rounded-xl transition-all"
                  placeholder="John Doe"
                />
                {focusedField === 'name' && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute -inset-[2px] rounded-xl border-2 border-primary/50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Email field */}
            <motion.div whileHover={{ scale: 1.01 }} className="relative">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="h-12 pl-4 pr-4 bg-background/50 border-border/50 focus:border-primary focus:bg-background rounded-xl transition-all"
                  placeholder="john@example.com"
                  dir="ltr"
                />
                {focusedField === 'email' && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute -inset-[2px] rounded-xl border-2 border-primary/50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Company field */}
            <motion.div whileHover={{ scale: 1.01 }} className="relative">
              <Label
                htmlFor="company"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2"
              >
                <Building2 className="w-4 h-4" />
                Company <span className="text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <Input
                  id="company"
                  name="company"
                  type="text"
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  className="h-12 pl-4 pr-4 bg-background/50 border-border/50 focus:border-primary focus:bg-background rounded-xl transition-all"
                  placeholder="Your company name"
                />
                {focusedField === 'company' && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute -inset-[2px] rounded-xl border-2 border-primary/50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Message field */}
            <motion.div whileHover={{ scale: 1.01 }} className="relative">
              <Label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2"
              >
                <MessageSquare className="w-4 h-4" />
                Your Message
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="p-4 bg-background/50 border-border/50 focus:border-primary focus:bg-background rounded-xl resize-none transition-all"
                  placeholder="Tell us about your project, your goals, timeline, and any specific requirements..."
                />
                {focusedField === 'message' && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute -inset-[2px] rounded-xl border-2 border-primary/50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isPending}
                className="relative w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
