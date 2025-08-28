import { Metadata } from 'next';

import { ContactHero } from './_components/contact-hero';
import { ContactInfo } from './_components/contact-info';
import { ContactSection } from './_components/contact-section';
import { FAQ } from './_components/faq';

export const metadata: Metadata = {
  title: 'Contact Us - Start Your Project | 10on10Labs',
  description:
    'Get in touch with our expert team to discuss your project. Quick response guaranteed within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ContactHero />
      <ContactSection />
      <ContactInfo />
      <FAQ />
    </div>
  );
}
