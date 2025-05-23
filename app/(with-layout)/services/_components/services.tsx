import React from 'react';
import dynamic from 'next/dynamic';
import { getClient } from '@/sanity/lib/client';
import { servicesQuery } from '@/sanity/lib/queries/queries';

const ServiceCard = dynamic(() => import('./service-card').then(module => module.ServiceCard));
const ServicesCarousel = dynamic(() =>
  import('./service-carousel').then(module => module.ServicesCarousel),
);

export type Service = {
  name: string;
  id: string;
  categories: string[];
};

async function getServices() {
  const client = getClient();
  return client.fetch<Service[]>(servicesQuery);
}

export const Services = async () => {
  const services = await getServices();

  return (
    <>
      <div className="hidden p-5 sm:flex md:flex  min-[768px]:flex-col min-[768px]:pb-10 min-[1440px]:flex-row min-[1440px]:pb-0 overflow-hidden gap-4 overflow-y-auto max-h-[calc(100vh)]  hide-scrollbar content-center items-center w-full h-full">
        {services.map((service, index) => {
          const step = index < 10 ? `0${index + 1}` : index + 1;
          return <ServiceCard key={service.id} service={service} step={step} />;
        })}
      </div>
      <div className="w-full h-full pt-20 p-5 sm:hidden">
        <ServicesCarousel services={services} />
      </div>
    </>
  );
};
