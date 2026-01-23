import { FC } from 'react';

import { PdfCtaCompact } from './pdf-cta-compact';
import { PdfCtaDetailed } from './pdf-cta-detailed';

export type DownloadPdfProps = {
  variant: 'compact' | 'detailed';
  slug: string;
  locale?: string;
  className?: string;
};

export const DownloadPdfCta: FC<DownloadPdfProps> = ({ variant, ...restProps }) =>
  variant === 'compact' ? <PdfCtaCompact {...restProps} /> : <PdfCtaDetailed {...restProps} />;
