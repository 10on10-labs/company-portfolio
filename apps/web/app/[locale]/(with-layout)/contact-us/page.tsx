import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { sanityFetch } from '@/lib/live';
import { contactUsQuery } from '@/lib/sanity-queries';

import { ContactHero } from './_components/contact-hero';
import { ContactInfo } from './_components/contact-info';
import { ContactSection } from './_components/contact-section';
import { FAQ } from './_components/faq';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const contactResult = await sanityFetch({
    query: contactUsQuery,
    params: { language: locale },
  });

  const contactData = contactResult?.data;

  if (!contactData) {
    return {
      title: 'Contact Us - Start Your Project | 10on10Labs',
      description:
        'Get in touch with our expert team to discuss your project. Quick response guaranteed within 24 hours.',
    };
  }

  return {
    title: contactData.seo?.metaTitle || 'Contact Us - Start Your Project | 10on10Labs',
    description:
      contactData.seo?.metaDescription ||
      'Get in touch with our expert team to discuss your project. Quick response guaranteed within 24 hours.',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  console.log('LOCALE', locale);
  const contactResult = await sanityFetch({
    query: contactUsQuery,
    params: { language: locale },
  });

  const contactData = contactResult?.data;

  if (!contactData) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ContactHero data={contactData.hero} locale={locale} />
      <ContactSection data={contactData.contactSection} />
      <ContactInfo data={contactData.contactInfo} />
      <FAQ data={contactData.faq} />
    </div>
  );
}
