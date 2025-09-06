import { FC } from 'react';

import { PdfCtaCompact } from './pdf-cta-compact';
import { PdfCtaDetailed } from './pdf-cta-detailed';

type Props = {
  variant: 'compact' | 'detailed';
};

export const DownloadPdfCta: FC<Props> = ({ variant }) =>
  variant === 'compact' ? <PdfCtaCompact /> : <PdfCtaDetailed />;
