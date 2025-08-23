import { Metadata } from 'next';

import { ProcessSection } from './process-section';

export const metadata: Metadata = {
  title: 'Process',
};

export default function Process() {
  return (
    <div className=" h-screen w-full flex flex-col items-center justify-center p-5">
      <ProcessSection />
    </div>
  );
}
