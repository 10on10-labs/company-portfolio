'use client';

import type React from 'react';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Download, FileText, Mail } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';

export function PdfCtaCompact() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDownload = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      // Simulate API call for PDF generation/email collection
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add your actual PDF download/email logic here
      console.log('Sending PDF to:', email);

      setStatus('success');
      setMessage('PDF sent to your email! Check your inbox.');
      setEmail('');
      setTimeout(() => {
        setShowEmailForm(false);
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error', error);
      setStatus('error');
      setMessage('Failed to send PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  // </CHANGE>

  return (
    <Card className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                Get the Complete Guide as PDF
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Download this comprehensive tutorial as a beautifully formatted PDF for offline
                reading and future reference.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            {!showEmailForm ? (
              <Button
                onClick={handleDownload}
                className="bg-orange-500 animate-bounce hover:bg-orange-700 text-white w-full sm:w-auto px-4 sm:px-6 py-2.5 gap-2 text-sm sm:text-base"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            ) : (
              <div className="w-full sm:w-80">
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary hover:bg-orange-700 text-white px-4"
                    >
                      {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                  {status !== 'idle' && (
                    <div
                      className={`flex items-center gap-2 text-sm ${
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
            {/* </CHANGE> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
