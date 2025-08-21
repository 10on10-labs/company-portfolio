import { sanityClient } from '@/sanity/lib/client';
import { servicesQuery } from '@/sanity/lib/queries';

import ServicesPageClient from './_components/services-page-client';

export const revalidate = 43200; // 12 hours

async function getServices() {
  const services = await sanityClient.fetch(servicesQuery);
  return services;
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesPageClient services={services} />;
}
