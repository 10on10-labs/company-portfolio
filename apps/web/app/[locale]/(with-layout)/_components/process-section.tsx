'use client';

import { ProcessSection } from '@/components/process';

interface ProcessData {
  _id: string;
  title: string;
  language: string;
  badge: string;
  heading: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    tag: string;
  }>;
  progressLabel: string;
}

interface ProcessProps {
  processData?: ProcessData | null;
}

export default function Process({ processData }: ProcessProps) {
  return (
    <section id="process">
      <ProcessSection processData={processData} />
    </section>
  );
}
