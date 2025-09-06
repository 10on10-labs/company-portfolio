import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';
import { getTranslations } from 'next-intl/server';

import { servicesQuery } from '@/lib/sanity-queries';

import ServicesPageClient from './_components/services-page-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const revalidate = 43200; // 12 hours

async function getServices(language: string) {
  const services = await sanityClient.fetch(servicesQuery, { language });
  return services;
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const services = await getServices(locale);
  return <ServicesPageClient services={services} />;
}
