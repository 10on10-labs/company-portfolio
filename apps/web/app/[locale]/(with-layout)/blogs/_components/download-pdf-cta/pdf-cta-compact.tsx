'use client';

import type React from 'react';
import { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';

import { DownloadPdfProps } from '.';

type Props = Omit<DownloadPdfProps, 'variant'>;

export function PdfCtaCompact({ slug, locale = 'en', className }: Props) {
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
        if (response.status === 504) {
          throw new Error('Timeout: PDF generation took too long.');
        }
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

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Your PDF is ready!');
    } catch (error) {
      console.error(error);
      toast.error('Could not generate PDF. Please try again.');
    } finally {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        setStatusText('Generating PDF...');
      }, 2000);
    }
  };

  return (
    <Card
      className={`my-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 ${className ?? ''}`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 animate-spin" />
                ) : (
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                {isLoading ? 'Generating PDF...' : 'Get the Complete Guide as PDF'}
              </h3>
              {isLoading ? (
                <div className="w-full max-w-sm mt-2">
                  <div className="h-1.5 w-full bg-orange-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-orange-600 mt-1">{statusText}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Download this comprehensive tutorial as a beautifully formatted PDF for offline
                  reading and future reference.
                </p>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-700 text-white w-full sm:w-auto px-4 sm:px-6 py-2.5 gap-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {progress > 90 ? 'Downloading...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
