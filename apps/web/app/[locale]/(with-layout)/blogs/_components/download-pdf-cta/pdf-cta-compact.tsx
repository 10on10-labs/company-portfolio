'use client';

import type React from 'react';
import { useState } from 'react';
import { Download, FileText } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';

import { DownloadPdfProps } from '.';

type Props = Omit<DownloadPdfProps, 'variant'>;

export function PdfCtaCompact({ slug, locale = 'en', className }: Props) {
  const [isLoading] = useState(false);

  const handleDownload = () => {
    window.open(`/api/blogs/download-pdf?slug=${slug}&locale=${locale}`, '_blank');
  };

  return (
    <Card
      className={`mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 ${className ?? ''}`}
    >
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
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-700 text-white w-full sm:w-auto px-4 sm:px-6 py-2.5 gap-2 text-sm sm:text-base"
            >
              <Download className="h-4 w-4" />
              {isLoading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
