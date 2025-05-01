import React from 'react';

import { ServiceCard } from './service-card';
import { ServicesCarousel } from './service-carousel';

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
    <>
      <div className="hidden sm:flex md:flex  min-[768px]:flex-col min-[768px]:pb-10 min-[1440px]:flex-row min-[1440px]:pb-0 overflow-hidden gap-4 overflow-y-auto max-h-[calc(100vh)]  hide-scrollbar content-center items-center w-full h-full">
        {services.map((service, index) => {
          const step = index < 10 ? `0${index + 1}` : index + 1;
          return <ServiceCard key={service.id} service={service} step={step} />;
        })}
      </div>
      <ServicesCarousel services={services} />
    </>
  );
};
