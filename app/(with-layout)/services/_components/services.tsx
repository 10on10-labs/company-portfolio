import React from 'react';
import dynamic from 'next/dynamic';

const ServiceCard = dynamic(() => import('./service-card').then(module => module.ServiceCard));
const ServicesCarousel = dynamic(() =>
  import('./service-carousel').then(module => module.ServicesCarousel),
);

export type Service = {
  name: string;
  id: string;
  categories: string[];
};
type Props = {
  services: Service[];
};

export const Services: React.FC<Props> = ({ services }) => {
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
};
