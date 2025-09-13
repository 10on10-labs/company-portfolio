import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export default async function ServicesPage() {
  return <ServicesPageClient />;
}
