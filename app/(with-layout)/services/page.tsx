import dynamic from 'next/dynamic';
import { sanityClient } from '@/sanity/lib/client';
import { servicesQuery } from '@/sanity/lib/queries';

const ServiceCard = dynamic(() =>
  import('./_components/service-card').then(module => module.ServiceCard),
);
const ServicesCarousel = dynamic(() =>
  import('./_components/service-carousel').then(module => module.ServicesCarousel),
);

export const revalidate = 43200; // 12 hours

async function getServices() {
  const services = await sanityClient.fetch(servicesQuery);
  return services;
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div>
      <h1 className="text-3xl md:text-4xl text-center"> Our services</h1>
      <div className="hidden p-5 sm:grid min-[768px]:pb-10 min-[1440px]:grid-cols-3 min-[1440px]:pb-0 gap-6 content-center items-start w-full h-full">
        {services.map((service, index) => {
          const step = index < 10 ? `0${index + 1}` : index + 1;
          return <ServiceCard key={service.id} service={service} step={step} />;
        })}
      </div>
      <div className="w-full h-full  pt-10 sm:pt-20 p-5 sm:hidden">
        <ServicesCarousel services={services} />
      </div>
    </div>
  );
}
