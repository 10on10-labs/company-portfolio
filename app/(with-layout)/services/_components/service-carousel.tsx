import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';

import { ServiceCard } from './service-card';

export type Service = {
  name: string;
  id: string;
  categories: string[];
};
type Props = {
  services: Service[];
};

export const ServicesCarousel: React.FC<Props> = ({ services }) => {
  return (
    <>
      <Carousel className="block sm:hidden" opts={{ loop: true }} orientation="horizontal">
        <CarouselContent>
          {services.map((service, index) => {
            const step = index < 10 ? `0${index + 1}` : index + 1;
            return (
              <CarouselItem key={service.id}>
                <ServiceCard key={service.id} service={service} step={step} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-3" />
        <CarouselNext className="-right-3" />
      </Carousel>
    </>
  );
};
