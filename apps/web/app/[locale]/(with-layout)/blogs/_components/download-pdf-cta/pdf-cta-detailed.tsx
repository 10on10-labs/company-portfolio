'use client';

import type React from 'react';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Download, Mail, Sparkles } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';

import { DownloadPdfProps } from '.';

type Props = Omit<DownloadPdfProps, 'variant'>;

export function PdfCtaDetailed({ slug, locale = 'en', className }: Props) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDownload = () => setShowEmailForm(true);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const res = await fetch('/api/blogs/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, to: email, locale }),
      });

      const data = await res.json().catch(() => ({}) as any);
      if (!res.ok) throw new Error(data?.error || 'Failed to send PDF');

      setStatus('success');
      setMessage('PDF sent to your email! Check your inbox.');
      setEmail('');
    } catch (err: any) {
      console.error('PDF email error:', err);
      setStatus('error');
      setMessage(err?.message || 'Failed to send PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`my-8 sm:my-12 p-4 sm:p-6 rounded-lg border-2 border-dashed border-orange-200 bg-orange-50/50 ${className ?? ''}`}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 mb-3 sm:mb-4">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Want to save this for later?
        </h3>
        <p className="text-muted-foreground mb-4 max-w-sm sm:max-w-md mx-auto text-sm sm:text-base px-2 sm:px-0">
          Get the complete authentication guide as a PDF and never lose track of these
          implementation details.
        </p>

        {!showEmailForm ? (
          <Button
            onClick={handleDownload}
            className="bg-orange-500 gap-2 w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base hover:bg-orange-600"
          >
            <Download className="h-4 w-4" />
            Get PDF Version
          </Button>
        ) : (
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? 'Sending PDF…' : 'Send PDF to Email'}
              </Button>

              {status !== 'idle' && (
                <div
                  className={`flex items-center justify-center gap-2 text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
