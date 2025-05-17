'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Clear form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card border border-border p-8 rounded-xl shadow-lg"
    >
      <div className="mb-8 text-sm text-muted-foreground">
        <p className="mb-4">
          Fill in the information required in the form and we will get back to you within one hour.
        </p>
        <p className="mb-4">
          Your information will be kept private and confidential and will be used by 10on10Labs
          only. All details provided by you will be held by 10on10Labs and used in accordance with
          our Privacy Policy.
        </p>
        <div className="flex gap-4 items-center">
          <span>Follow us:</span>
          <a
            href="https://facebook.com/10on10labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:opacity-80"
          >
            <Icons.facebook />
          </a>
          <a
            href="https://linkedin.com/company/10on10labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077B5] hover:opacity-80"
          >
            <Icons.linkedin />
          </a>
          <a
            href="https://x.com/10on10labs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Icons.X />
          </a>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="block text-sm font-medium mb-2">Name</Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-border bg-background"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2">Email</Label>
          <Input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-border bg-background"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2">Message</Label>
          <Textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-border bg-background"
          />
        </div>
        <Button type="submit" disabled={sending} className="w-full">
          {sending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
}
