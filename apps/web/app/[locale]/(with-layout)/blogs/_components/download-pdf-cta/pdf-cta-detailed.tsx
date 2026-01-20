'use client';

import type React from 'react';
import { useState } from 'react';
import { Download, RotateCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shadcn/button';

import { DownloadPdfProps } from '.';

type Props = Omit<DownloadPdfProps, 'variant'>;

export function PdfCtaDetailed({ slug, locale = 'en', className }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Generating PDF...');

  const handleDownload = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setProgress(5);
    setStatusText('Initializing...');

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        const increment = Math.random() * 10;
        return Math.min(prev + increment, 90);
      });
    }, 500);

    const statusInterval = setInterval(() => {
      setProgress(p => {
        if (p > 20 && p < 50) setStatusText('Generating layout...');
        if (p >= 50 && p < 80) setStatusText('Processing images...');
        if (p >= 80) setStatusText('Finalizing PDF...');
        return p;
      });
    }, 100);

    try {
      const response = await fetch(`/api/blogs/download-pdf?slug=${slug}&locale=${locale}`);

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      clearInterval(progressInterval);
      clearInterval(statusInterval);
      setProgress(100);
      setStatusText('Downloading...');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${slug}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Your PDF is ready!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while generating the PDF. Please try again.');
    } finally {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        setStatusText('Generating PDF...');
      }, 2000); // Keep success state briefly
    }
  };

  return (
    <div
      className={`my-8 sm:my-12 p-4 sm:p-6 rounded-lg border-2 border-dashed border-orange-200 bg-orange-50/50 ${className ?? ''}`}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 mb-3 sm:mb-4">
          {isLoading ? (
            <RotateCw className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 animate-spin" />
          ) : (
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          {isLoading ? 'Preparing your guide...' : 'Want to save this for later?'}
        </h3>
        <p className="text-muted-foreground mb-4 max-w-sm sm:max-w-md mx-auto text-sm sm:text-base px-2 sm:px-0">
          Get the complete authentication guide as a PDF and never lose track of these
          implementation details.
        </p>

        <div className="max-w-xs mx-auto w-full">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-2 w-full bg-orange-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-orange-700 font-medium animate-pulse">{statusText}</p>
            </div>
          ) : (
            <Button
              onClick={handleDownload}
              className="bg-orange-500 gap-2 w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base hover:bg-orange-600"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
