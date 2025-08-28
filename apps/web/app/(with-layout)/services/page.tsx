import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';

import { servicesQuery } from '@/lib/sanity-queries';

import ServicesPageClient from './_components/services-page-client';

export const metadata: Metadata = {
  title: 'Services',
};

export const revalidate = 43200; // 12 hours

async function getServices() {
  const services = await sanityClient.fetch(servicesQuery);
  return services;
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesPageClient services={services} />;
}
