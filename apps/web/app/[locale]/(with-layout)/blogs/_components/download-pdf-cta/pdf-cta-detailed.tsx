'use client';

import type React from 'react';
import { useState } from 'react';
import { Download, Sparkles } from 'lucide-react';

import { Button } from '@/components/shadcn/button';

import { DownloadPdfProps } from '.';

type Props = Omit<DownloadPdfProps, 'variant'>;

export function PdfCtaDetailed({ slug, locale = 'en', className }: Props) {
  const [isLoading] = useState(false);

  const handleDownload = () => {
    window.open(`/api/blogs/download-pdf?slug=${slug}&locale=${locale}`, '_blank');
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

        <Button
          onClick={handleDownload}
          disabled={isLoading}
          className="bg-orange-500 gap-2 w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base hover:bg-orange-600"
        >
          <Download className="h-4 w-4" />
          {isLoading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
}
